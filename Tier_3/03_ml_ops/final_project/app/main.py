"""
FastAPI app for model inference with drift detection and Prometheus metrics.
"""

from __future__ import annotations

import asyncio
import json
import logging
import os
import time
from collections import deque
from pathlib import Path
from typing import Deque, List, Optional, Tuple

import httpx
import joblib
import numpy as np
from alibi_detect.cd.ks import KSDrift
from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel, Field, conlist
from prometheus_client import CONTENT_TYPE_LATEST, Counter, Histogram, generate_latest
from starlette.responses import Response

logger = logging.getLogger("mlops.inference")
logging.basicConfig(
    level=os.getenv("LOG_LEVEL", "INFO"),
    format="%(asctime)s %(levelname)s %(name)s - %(message)s",
)

APP_VERSION = os.getenv("APP_VERSION", "1.0.0")

MODEL_PATH = Path(os.getenv("MODEL_PATH", "model/model.pkl"))
REFERENCE_PATH = Path(os.getenv("REFERENCE_PATH", "model/reference.npy"))

DRIFT_ENABLED = os.getenv("DRIFT_ENABLED", "true").lower() in {"1", "true", "yes", "y"}
DRIFT_PVAL = float(os.getenv("DRIFT_PVAL", "0.05"))
DRIFT_WINDOW_SIZE = int(os.getenv("DRIFT_WINDOW_SIZE", "50"))

DRIFT_WEBHOOK_URL = os.getenv("DRIFT_WEBHOOK_URL", "").strip()
DRIFT_WEBHOOK_TOKEN = os.getenv("DRIFT_WEBHOOK_TOKEN", "").strip()

# Prometheus metrics
REQUESTS_TOTAL = Counter(
    "mlops_requests_total",
    "Total number of HTTP requests",
    ["method", "path", "status"],
)
REQUEST_LATENCY = Histogram(
    "mlops_request_latency_seconds",
    "HTTP request latency in seconds",
    ["path"],
    buckets=(0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2, 5, 10),
)
PREDICT_LATENCY = Histogram(
    "mlops_predict_latency_seconds",
    "Model predict latency in seconds",
    buckets=(0.0005, 0.001, 0.0025, 0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1),
)
DRIFT_EVENTS_TOTAL = Counter(
    "mlops_drift_events_total",
    "Number of drift detections triggered",
)

app = FastAPI(title="MLOps Inference Service", version=APP_VERSION)

# Global state
_model = None
_drift_detector: Optional[KSDrift] = None
_window: Optional[Deque[List[float]]] = None
_feature_dim: Optional[int] = None


class PredictRequest(BaseModel):
    """
    Request model for /predict endpoint.

    features: List of input features
    request_id: Optional client-provided request id
    """

    features: conlist(float, min_length=1) = Field(..., description="Feature vector")
    request_id: Optional[str] = Field(
        default=None, description="Client-provided request id"
    )


class PredictResponse(BaseModel):
    """
    Response model for /predict endpoint.

    prediction: Predicted class label
    probabilities: List of class probabilities
    drift_detected: Whether drift was detected for this input
    """

    prediction: int
    probabilities: List[float]
    drift_detected: bool = False


def predict(features: List[float]) -> Tuple[int, List[float]]:
    """
    Pure predict function (no web framework objects).

    :param features: Input feature vector
    :type features: List[float]
    :return: Tuple of (predicted class, list of class probabilities)
    :rtype: Tuple[int, List[float]]
    """

    if _model is None:
        raise RuntimeError("Model is not loaded")

    x = np.asarray(features, dtype=np.float32).reshape(1, -1)
    with PREDICT_LATENCY.time():
        proba = _model.predict_proba(x)[0].tolist()
        pred = int(np.argmax(proba))
    return pred, proba


async def _post_drift_webhook(payload: dict) -> None:
    """
    Post drift detection event to webhook URL.

    :param payload: Payload dictionary to send
    :type payload: dict
    :return: None
    :rtype: None
    """

    if not DRIFT_WEBHOOK_URL:
        return

    headers = {"Content-Type": "application/json"}
    if DRIFT_WEBHOOK_TOKEN:
        headers["Authorization"] = f"Bearer {DRIFT_WEBHOOK_TOKEN}"

    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            r = await client.post(DRIFT_WEBHOOK_URL, json=payload, headers=headers)
            logger.info("Drift webhook POST status=%s", r.status_code)
    except Exception as e:
        logger.warning("Drift webhook call failed: %s", e)


def _drift_ready() -> bool:
    return bool(
        DRIFT_ENABLED
        and (_drift_detector is not None)
        and (_window is not None)
        and (_feature_dim is not None)
    )


async def detect_drift(features: List[float]) -> bool:
    """
    Drift detection using a sliding window and KSDrift vs reference data.

    Returns True only when the window is full AND drift is detected.

    :param features: Input feature vector
    :type features: List[float]
    :return: Whether drift was detected
    :rtype: bool
    """

    if not _drift_ready():
        return False

    assert _window is not None and _drift_detector is not None

    _window.append(features)
    if len(_window) < DRIFT_WINDOW_SIZE:
        return False

    x = np.asarray(list(_window), dtype=np.float32)
    try:
        pred = _drift_detector.predict(x, return_p_val=True)
        is_drift = bool(pred.get("data", {}).get("is_drift", 0))
    except Exception as e:
        logger.warning("Drift detector failed: %s", e)
        return False

    if is_drift:
        DRIFT_EVENTS_TOTAL.inc()
        logger.warning("Drift detected")
        asyncio.create_task(
            _post_drift_webhook(
                {"event": "drift_detected", "window_size": DRIFT_WINDOW_SIZE}
            )
        )
        return True

    return False


@app.on_event("startup")
def startup() -> None:
    """
    Load model and reference data on startup.

    :return: None
    :rtype: None
    """

    global _model, _drift_detector, _window, _feature_dim

    if not MODEL_PATH.exists():
        raise RuntimeError(
            f"Model file not found: {MODEL_PATH}. Run `python -m model.train` to create it."
        )

    _model = joblib.load(MODEL_PATH)
    logger.info("Loaded model from %s", MODEL_PATH)

    if DRIFT_ENABLED:
        if not REFERENCE_PATH.exists():
            raise RuntimeError(
                f"Reference file not found: {REFERENCE_PATH}. Run `python -m model.train` to create it."
            )

        x_ref = np.load(REFERENCE_PATH).astype(np.float32)
        if x_ref.ndim != 2:
            raise RuntimeError(
                f"Reference data must be 2D array; got shape {x_ref.shape}"
            )

        _feature_dim = int(x_ref.shape[1])
        _window = deque(maxlen=DRIFT_WINDOW_SIZE)
        _drift_detector = KSDrift(x_ref=x_ref, p_val=DRIFT_PVAL)

        logger.info(
            "Drift detector enabled (KSDrift). ref_shape=%s p_val=%s window=%s",
            x_ref.shape,
            DRIFT_PVAL,
            DRIFT_WINDOW_SIZE,
        )
    else:
        logger.info("Drift detector disabled")


@app.middleware("http")
async def metrics_middleware(request: Request, call_next) -> Response:
    """
    Middleware to collect Prometheus metrics for each request.

    :param request: Incoming request
    :type request: Request
    :param call_next: Function to call the next middleware or endpoint
    :type call_next: Callable
    :return: Response object
    :rtype: Response
    """

    start = time.perf_counter()
    status_code = 500
    try:
        response = await call_next(request)
        status_code = response.status_code
        return response
    finally:
        elapsed = time.perf_counter() - start
        path = request.url.path
        REQUEST_LATENCY.labels(path=path).observe(elapsed)
        REQUESTS_TOTAL.labels(
            method=request.method, path=path, status=str(status_code)
        ).inc()


@app.get("/health")
async def health() -> dict:
    """
    Health check endpoint.

    :return: Health status
    :rtype: dict
    """

    return {"status": "ok", "version": APP_VERSION}


@app.get("/metrics")
async def metrics() -> Response:
    """
    Prometheus metrics endpoint.

    :return: Prometheus metrics response
    :rtype: Response
    """

    data = generate_latest()
    return Response(content=data, media_type=CONTENT_TYPE_LATEST)


@app.post("/predict", response_model=PredictResponse)
async def predict_endpoint(req: PredictRequest) -> PredictResponse:
    """
    Prediction endpoint with drift detection.

    :param req: Prediction
    :type req: PredictRequest
    :return: Prediction response
    :rtype: PredictResponse
    """

    try:
        if _feature_dim is not None and len(req.features) != _feature_dim:
            raise HTTPException(
                status_code=400,
                detail=f"Expected {_feature_dim} features, got {len(req.features)}",
            )

        pred, proba = predict(req.features)
        drift = await detect_drift(req.features)

        logger.info(
            "predict request_id=%s features=%s prediction=%s drift=%s",
            req.request_id,
            json.dumps(req.features),
            pred,
            drift,
        )

        return PredictResponse(
            prediction=pred, probabilities=proba, drift_detected=drift
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.exception("Prediction failed")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/")
async def root() -> dict:
    """
    Root endpoint with basic info.
    :return: Basic info
    :rtype: dict
    """

    return {
        "message": "MLOps Inference Service",
        "docs": "/docs",
        "health": "/health",
        "metrics": "/metrics",
    }

"""
Training / retraining script.

This script trains a small sklearn model and writes:
- model/model.pkl        (serialized model)
- model/reference.npy    (reference feature matrix for drift detector)
"""

from __future__ import annotations  # avoids NameError in type hints

import argparse
import logging
from pathlib import Path

import joblib
import numpy as np
from sklearn.datasets import load_iris
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

logger = logging.getLogger("model.train")
logging.basicConfig(
    level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s - %(message)s"
)


def train(output_dir: Path, seed: int = 42) -> dict:
    """
    Train a simple model and write artifacts to output_dir.

    :param output_dir: Directory to write model artifacts into.
    :param seed: Random seed for reproducibility.

    :return: Dictionary with training results.
    :rtype: dict
    """
    output_dir.mkdir(parents=True, exist_ok=True)

    iris = load_iris()
    X = iris.data.astype(np.float32)
    y = iris.target.astype(np.int64)

    X_train, X_val, y_train, y_val = train_test_split(
        X, y, test_size=0.2, random_state=seed, stratify=y
    )

    model = Pipeline(
        steps=[
            ("scaler", StandardScaler()),
            (
                "clf",
                LogisticRegression(
                    max_iter=500, n_jobs=1, multi_class="auto", random_state=seed
                ),
            ),
        ]
    )
    model.fit(X_train, y_train)
    val_acc = float(model.score(X_val, y_val))

    model_path = output_dir / "model.pkl"
    ref_path = output_dir / "reference.npy"

    # Reference data for drift detector: use a slice of training features.
    # In real projects, reference is typically a stable baseline dataset.
    np.save(ref_path, X_train)
    joblib.dump(model, model_path)

    logger.info("Saved model to %s", model_path)
    logger.info("Saved reference data to %s (shape=%s)", ref_path, X_train.shape)
    logger.info("Validation accuracy: %.4f", val_acc)

    return {
        "model_path": str(model_path),
        "reference_path": str(ref_path),
        "val_accuracy": val_acc,
    }


def parse_args() -> argparse.Namespace:
    """
    Function to parse command line arguments.

    :return: Description
    :rtype: Namespace
    """
    p = argparse.ArgumentParser()
    p.add_argument(
        "--output-dir", default="model", help="Directory to write model artifacts into."
    )
    p.add_argument("--seed", type=int, default=42)
    return p.parse_args()


def main() -> None:
    """
    Main entry point.
    """
    args = parse_args()
    result = train(Path(args.output_dir), seed=args.seed)
    print(result)


if __name__ == "__main__":
    main()

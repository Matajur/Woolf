# Tier 3. Module 3 - MLOps CI/CD

## Final Project

### Technical task

#### Expected project structure

```bash
final-project/
├── app/
│  └── main.py          # FastAPI‑interface
├── model/
│  └── train.py         # Script for retrain
├── helm/
│  ├── Chart.yaml
│  ├── values.yaml
│  └── templates/
│     ├── deployment.yaml
├── argocd/
│  └── application.yaml
├── .gitlab-ci.yml
├── grafana/
│  └── dashboards.json
├── prometheus/
│  └── additionalScrapeConfigs.yaml
├── Dockerfile
├── requirements.txt
└── README.md
```

#### Key system components

| Component                          | Description                                                 |
| ---------------------------------- | ----------------------------------------------------------- |
| FastAPI                            | Wrapping a trained .pt or .pkl file as an inference service |
| Helm chart                         | To deploy the FastAPI service to a cluster                  |
| ArgoCD                             | GitOps deploy service from repository                       |
| Prometheus + Grafana               | Pod performance metrics, latencies, number of requests      |
| Loki + Promtail                    | Logging of input data and responses                         |
| Great Expectations or Alibi Detect | Analysis of input data quality or drift                     |
| GitLab CI                          | Restarting model training on new data when drifting/td>     |

#### What should be in the project

1. Inference service

- FastAPI code in `app/main.py`, model is loaded at startup;
- There is a separate function `predict(data)` — returns predictions;
- Call drift detector (optional — async/optional).

2. Drift detector

- Use one of the options:
- `Great Expectations` with eval predictions;
- `Alibi Detect` with pre-trained drift detector;
- In case of drift — logging (`print("Drift detected")`) or calling Webhook.

3. CI for retrain

- In `.gitlab-ci.yml` the `retrain-model` job is described:

  - Runs the training script (can be mock);
  - Generates a new model;
  - Builds a new Docker image;
  - Updates Helm chart or pushes a new version to the branch;

- The job can be started manually or via webhook from the service.

4. Helm + ArgoCD

- In `helm/` — standard Helm chart;
- In `argocd/` — `application.yaml` with auto-sync;
- ArgoCD is connected to Git repository with chart.

5. Monitoring and logging

- Prometheus scrape config for service or pods;
- Loki + Promtail collects stdout;
- In Grafana — dashboard with main metrics:

  - Requests/min
  - Latency
  - Drift alerts (number or event)

#### Check:

- `kubectl port-forward` shows a working API
- Responses contain a prediction sign + are logged
- Drift messages are visible in the logs (`kubectl logs`)
- Grafana shows traffic
- GitLab CI runs retrain
- ArgoCD pulls up an updated Helm chart

#### README.md should include

- Infrastructure description
- How to launch the project
- How to test the query
- How to check logging
- How to check if the detector is triggered
- How to check if the retrain pipeline is working
- How to update the model

#### Execution result

- A FastAPI service is running in the cluster, deployed via ArgoCD;
- Its Helm chart is configured to log to Loki and collect metrics;
- For each request:

  - input data is logged,
  - the model calculates the response,
  - an anomaly/drift check is performed;

- If the `drift_detector` is triggered, the GitLab CI pipeline `retrain-model` is launched;
- The result of retrain is:

  - a new model artifact,
  - a new version of the Docker image,
  - an updated Helm deployment (or auto-sync via ArgoCD);

- In Grafana you can see:

  - service load metrics,
  - number of drift detector hits,
  - model response time;

- README.md describes in detail **what has been done, how to check, and how to update the model**.

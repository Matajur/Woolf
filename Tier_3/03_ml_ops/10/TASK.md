# Tier 3. Module 3 - MLOps CI/CD

## Homework for Topic 9 - Monitoring the quality of models and tracking experiments

### Technical task

You're already familiar with containerization, deploying models via Helm and GitOps, logging metrics, and alerts. But the real MLOps process doesn't do without **controlled, reproducible model training** — and that's what we automate through **GitLab CI** and **AWS Step Functions**.

#### The goal

- Create a Step Function in AWS that runs a multi-step training pipeline;
- Create Lambda functions for individual stages (for example, validation and logging);
- Deploy infrastructure through Terraform;
- Configure GitLab CI to automatically run Step Function on push.

#### Expected structure of the project:

```bash
mlops-train-automation/
├── terraform/
│  ├── main.tf
│  ├── variables.tf
│  └── lambda/
│    ├── validate.py
│    ├── log_metrics.py
│    ├── validate.zip
│    └── log_metrics.zip
├── .gitlab-ci.yml
├── README.md
```

#### Task performance steps

1. Create Lambda functions

- Create `terraform/lambda/validate.py` and `log_metrics.py`;
- The logic can be conditional (for example, `print("Validating data...")`);
- Collect archives:

```bash
cd terraform/lambda
zip validate.zip validate.py
zip log_metrics.zip log_metrics.py
```

2. Write a Terraform configuration

- In the `terraform/main.tf` file:

  - Create IAM roles for Lambda and Step Function;
  - Describe 2 Lambda functions;
  - Describe a Step Function with two stages that sequentially call the functions `validate` → `log_metrics`;

- After that:

```bash
terraform init
terraform apply
```

3. Configure GitLab CI

- Create a `.gitlab-ci.yml` file;
- Add a job that runs the Step Function:

```bash
train-model:
 stage: train
 image: amazon/aws-cli:2.15.0
 script:
  - aws stepfunctions start-execution \
    --state-machine-arn arn:aws:states:... \
    --name "train-$(date +%s)" \
    --input '{"source":"gitlab-ci", "commit":"'$CI_COMMIT_SHORT_SHA'"}'
```

- Add AWS variables to GitLab CI (via CI Settings or OIDC if you can).

4. Create `README.md`

The documentation must contain:

- How to collect Lambda archives;
- How to deploy infrastructure through Terraform;
- How to manually run the Step Function;
- How GitLab CI works and what variables are needed;
- Example of JSON being passed.

terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

locals {
  validate_zip_path    = "${path.module}/lambda/validate.zip"
  log_metrics_zip_path = "${path.module}/lambda/log_metrics.zip"
}

############################
# IAM: Lambda execution role
############################
resource "aws_iam_role" "lambda_exec" {
  name = "${var.project_name}_lambda_exec_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Action    = "sts:AssumeRole",
      Effect    = "Allow",
      Principal = { Service = "lambda.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_policy" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

############################
# Lambdas
############################
resource "aws_lambda_function" "validate" {
  filename         = local.validate_zip_path
  function_name    = "${var.project_name}-validateData"
  role             = aws_iam_role.lambda_exec.arn
  handler          = "validate.lambda_handler"
  runtime          = "python3.12"
  source_code_hash = filebase64sha256(local.validate_zip_path)
  timeout          = 10
}

resource "aws_lambda_function" "log_metrics" {
  filename         = local.log_metrics_zip_path
  function_name    = "${var.project_name}-log-metrics"
  role             = aws_iam_role.lambda_exec.arn
  handler          = "log_metrics.lambda_handler"
  runtime          = "python3.12"
  source_code_hash = filebase64sha256(local.log_metrics_zip_path)
  timeout          = 10
}

###################################
# IAM: Step Functions execution role
###################################
data "aws_iam_policy_document" "stepfunction_trust" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["states.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "stepfunction_exec" {
  name               = "${var.project_name}_stepfunction_exec_role"
  assume_role_policy = data.aws_iam_policy_document.stepfunction_trust.json
}

# Least-privilege policy: allow Step Functions to invoke only these Lambdas
resource "aws_iam_role_policy" "stepfunction_invoke_lambda" {
  name = "${var.project_name}_sfn_invoke_lambda"
  role = aws_iam_role.stepfunction_exec.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect = "Allow",
      Action = ["lambda:InvokeFunction"],
      Resource = [
        aws_lambda_function.validate.arn,
        aws_lambda_function.log_metrics.arn
      ]
    }]
  })
}

############################
# Step Function State Machine
############################
resource "aws_sfn_state_machine" "mlops_pipeline" {
  name     = "${var.project_name}_MLOpsPipeline"
  role_arn = aws_iam_role.stepfunction_exec.arn

  definition = jsonencode({
    Comment = "MLOps training pipeline: validate -> log_metrics",
    StartAt = "ValidateData",
    States = {
      ValidateData = {
        Type     = "Task",
        Resource = aws_lambda_function.validate.arn,
        Next     = "LogMetrics"
      },
      LogMetrics = {
        Type     = "Task",
        Resource = aws_lambda_function.log_metrics.arn,
        End      = true
      }
    }
  })
}

output "state_machine_arn" {
  value       = aws_sfn_state_machine.mlops_pipeline.arn
  description = "ARN of the Step Functions state machine"
}

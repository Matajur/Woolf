variable "aws_region" {
  type    = string
  default = "us-east-1"
}

# Path to infra state when using local backend for infra.
# If you use an S3 backend, replace terraform_remote_state config accordingly.
variable "infra_state_path" {
  type    = string
  default = "../infra/terraform.tfstate"
}

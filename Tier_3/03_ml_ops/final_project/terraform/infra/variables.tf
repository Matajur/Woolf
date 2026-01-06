variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "project_name" {
  type    = string
  default = "mlops-final"
}

variable "cluster_name" {
  type    = string
  default = "mlops-final-eks"
}

variable "cluster_version" {
  type    = string
  default = "1.29"
}

variable "vpc_cidr" {
  type    = string
  default = "10.0.0.0/16"
}

variable "azs" {
  type    = list(string)
  default = ["us-east-1a", "us-east-1b", "us-east-1c"]
}

variable "node_instance_types" {
  type    = list(string)
  default = ["t3.small"]
}

variable "desired_size" {
  type    = number
  default = 4
}

variable "min_size" {
  type    = number
  default = 4
}

variable "max_size" {
  type    = number
  default = 5
}

variable "my_ip_address" {
  description = "Your public IP address for EKS cluster access"
  type        = string
  default     = "Put your IP here without /32"
}

variable "aws_user_id" {
  description = "Your AWS account ID"
  type        = string
  default     = "Put your AWS account ID here"
}

variable "aws_user_name" {
  description = "Your AWS IAM user name"
  type        = string
  default     = "Put your AWS IAM user name here"

}

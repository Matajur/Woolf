# Tier 3. Module 2 - Foundations of Cloud Computing

## Final assignment

### Technical Task

1. Choose a deployment environment

You can choose from:

- Elastic Beanstalk for automated web application deployment.
- Amazon ECS for containerized applications managed via AWS Fargate or EC2.
- Amazon EKS for scalable Kubernetes applications.
- Amazon EC2 for manual server management.

For the final project, the deployment of a containerized Django web application with a simple service that guesses objects in photos that can be uploaded to this service was chosen on the AWS cloud. The ECS service (serverless Fagate architecture) is best suited for this task, as its use greatly simplifies the deployment, control, and scaling of Dockerized applications.

![Elastic Container Service](./img/ecs.png)

2. Infrastructure and security

The following are the requirements:

- Set up VPC, public and private subnets.

Since this is a small training task and the application does not need to receive significant traffic from all over the world, only two availability zones with two public and two private subnets are sufficient to limit the budget.

![Virtual Private Cloud](./img/vpc.png)

![Public Subnet](./img/public.png)

![Private Subnet](./img/private.png)

- Set up security groups to control traffic.

Security groups for public and private subnets.

The security group for the ALB is the only one accessible from the Internet. All others are only available from the cloud.

![Security group for Application Load Balancer](./img/sg-alb.png)

The security group for RDS allows inbound traffic on the default PostgreSQL port.

![Security group for RDS](./img/sg-rds.png)

The web application in the container will be accessible on port 8000.

![Security group for ECS tasks](./img/sg-ecs.png)

Route table for public subnets with an Internet gateway.

![Public rout table](./img/rt-public.png)

Route table for private subnets with an NAT gateway.

![Private rout table](./img/rt-private.png)

- Set up IAM roles to access AWS services.

IAM roles required for application access, operation, and read-only Cloudcraft access to automatically create network diagrams.

![IAM Roles](./img/iam.png)

3. Database

Choose from the following:

- Using Amazon RDS for relational databases (MySQL, PostgreSQL).

The Django web application requires a PostgreSQL RDS database to store user roles and image object guessing results.

![RDS](./img/rds.png)

- Using Amazon DynamoDB for NoSQL storage.

Amazon DynamoDB is not required for this type of application.

- Optimize connections and protect passwords.

Secret manager for storing RDB access credentials.

![Secret Manager](./img/secrets.png)

4. Monitoring and Scaling

Required:

- Use Amazon CloudWatch to monitor system health.

Log group for monitoring ECS tasks.

![ECS tasks log group](./img/task-logs.png)

Log group for monitoring ECS cluster.

![ECS cluster log group](./img/cluster-logs.png)

- Set up AWS Auto Scaling.

Auto scaling based on 70% SCU utilization.

![Auto Scaling](./img/scale.png)

- Add a load balancer (ALB or NLB).

Application load balancer Interner-facing and accesible on port 80.

![ALB](./img/alb.png)

Target group for ALB.

![Target group](./img/target.png)

5. Cost Optimization

You will be expected to:

- Use AWS Cost Explorer to analyze costs.

![Cost Explorer](./img/costs.png)

- Set up AWS Budgets to control costs.

![Monthly budget](./img/budget.png)

#### Steps to Complete

1. Design your solution architecture

- Draw a diagram that shows how different AWS services interact with each other.

The diagram made on Cloudcraft.

![Diagram](./img/diagram.png)

- Determine which technology stack will be used. Justify your choice.

The ECS service (serverless Fagate architecture) was ysed for deployment of the containerized Django web application, as its use greatly simplifies the deployment, control, and scaling of Dockerized applications. RDS (Postgres) is required directly by the application. And the Application Load Balancer is used as the internet-facing entry point (HTTPS listener) for forwarding rules to ECS service and load distribution.

2. Deploy the infrastructure in AWS

- Use the AWS Console to create resources.

3. Deploy the web application

- If using containerization, upload images to Amazon ECR.

ECR with lates image. The application souce code is available under the [**Link**](https://github.com/Matajur/ImageClassifier).

![ECR](./img/ecr.png)

- If using EC2 or Elastic Beanstalk, ensure that the code runs correctly.

Not required for this type of application.

4. Set up monitoring and logging

- Ensure that CloudWatch is collecting the right metrics.

CPU and memory utilization metrics for ECS.

![CPU and memory utilization](./img/metrics.png)

- Add SNS notifications for critical events.

Alarm in case when CPU usage is above 70%.

![CPU utilization alarm](./img/alarm.png)

SNS topic for the alarm.

![SNS topic](./img/sns.png)

5. Optimize costs

- Set up AWS Budgets to control costs.

Notification of the monthly overbudget.

![Overbudget notification](./img/overbudget.png)

- Use Cost Explorer to analyze the most expensive services.

The largest costs are associated with EC2 service, this can be explained by the presence of ALB in this project, as well as a large number of EC2 instances from previous homework that were stopped, but not deleted (in the stopped state, they also incur costs, although less than in the working state).

![Expences](./img/expences.png)

6. Test and verify system operation

- Ensure that your application is accessible at the intended URL.

The application is accessible under the link

http://my-app-tg-655650863.eu-central-1.elb.amazonaws.com/

![Desktop and mobile application](./img/app.png)

- Perform load testing.

![Load test](./img/test.png)

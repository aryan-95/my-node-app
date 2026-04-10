 AWS DevOps CI/CD Pipeline – Detailed Documentation


📌 1. Project Overview

This project demonstrates the implementation of a fully automated CI/CD pipeline on AWS for deploying a containerized Node.js application.

The pipeline integrates multiple AWS services to enable continuous integration, automated builds, containerization, and deployment with minimal manual intervention.





🎯 2. Objectives


Automate build and deployment process
Implement CI/CD using AWS-native services
Use Docker for containerization
Deploy application using scalable infrastructure
Ensure faster and reliable releases




🧩 3. Architecture Overview



The system follows a modern DevOps pipeline:

GitHub →  CodePipeline  →  CodeBuild  →  ECR  →  ECS (Fargate)  →  Load Balancer  →  User




🛠️ 4. Services Used

🔹 AWS CodePipeline

   Orchestrates the CI/CD workflow
   Connects source, build, and deployment stages


🔹 AWS CodeBuild

   Builds the application
   Creates Docker image
   Pushes image to registry


🔹 Amazon ECR

   Stores Docker images
   Acts as private container registry


🔹 Amazon ECS


   Runs containers
   Manages deployment and scaling


🔹 AWS Fargate

   Serverless compute for containers
   Eliminates server management


🔹 Elastic Load Balancing

   Distributes traffic
   Provides public access to application


🔹 AWS IAM

   Manages roles and permissions

⚙️ 5. Application Details

     Backend: Node.js (Express)
    Port: 3000
    Endpoints:
    / → Main application
    /health → Health check
    /debug → Debug info
    /change → Deployment verification


🐳 6. Docker Configuration

      Dockerfile
      FROM node:18

     WORKDIR /app
     COPY package*.json ./
     RUN npm install

     COPY . .

     EXPOSE 3000
     CMD ["node", "app.js"]


🔄 7. CI/CD Pipeline Workflow


      Step-by-Step Process
      Developer pushes code to GitHub
      AWS CodePipeline detects change
      Source code is sent to build stage
      AWS CodeBuild:
      Builds Docker image
      Tags image
      Pushes image to Amazon ECR
      Generates imagedefinitions.json
      Deployment stage:
      Amazon ECS pulls latest image
      Updates running service
      Performs rolling deployment


📄 8. Build Specification (buildspec.yml)


version: 0.2

env:
  variables:
    IMAGE_REPO_NAME: node-app
    IMAGE_TAG: latest

phases:
  pre_build:
    commands:
      - echo Logging into Amazon ECR
      - ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
      - REGION=us-east-1
      - REPO_URI=$ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/$IMAGE_REPO_NAME
      - aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $REPO_URI

  build:
    commands:
      - docker build -t $IMAGE_REPO_NAME .
      - docker tag $IMAGE_REPO_NAME:$IMAGE_TAG $REPO_URI:$IMAGE_TAG

  post_build:
    commands:
      - docker push $REPO_URI:$IMAGE_TAG
      - printf '[{"name":"container","imageUri":"%s"}]' $REPO_URI:$IMAGE_TAG > imagedefinitions.json

artifacts:
  files:
    - imagedefinitions.json




🚀 9. Deployment Strategy


Deployment Type: Rolling Update
Platform: ECS Fargate
Load Balancer: Application Load Balancer



🧪 10. Testing the Pipeline


Modify application code
Push changes to GitHub
Pipeline triggers automatically
Verify updated output in browser


⚠️ 11. Challenges Faced


❌ Issues
ECR repository mismatch
Incorrect region configuration
Container name mismatch
Missing imagedefinitions.json
✅ Solutions
Standardized naming conventions
Verified AWS region
Matched ECS container name with buildspec
Debugged using build logs


📈 12. Key Features


Fully automated CI/CD pipeline
Docker-based deployment
Scalable container orchestration
Load-balanced architecture
Zero manual deployment


🎯 13. Key Learnings


CI/CD pipeline design
AWS DevOps services integration
Docker container lifecycle
Debugging cloud deployments


🔮 14. Future Enhancements


Add Amazon CloudWatch for monitoring
Integrate Amazon RDS
Implement Blue-Green deployment
Add HTTPS with domain


🏁 15. Conclusion

This project successfully demonstrates a real-world DevOps pipeline using AWS services, enabling automated, scalable, and efficient application deployment.

👨‍💻 Author

Aryan

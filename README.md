AWS DevOps CI/CD Pipeline Project
📌 Overview

This project demonstrates a fully automated CI/CD pipeline on AWS that builds, containerizes, and deploys a Node.js application using managed AWS services.

The pipeline ensures continuous integration and continuous deployment with zero manual intervention.

🧩 Architecture

GitHub → CodePipeline → CodeBuild → ECR → ECS (Fargate) → Load Balancer
🛠️ AWS Services Used
AWS CodePipeline – CI/CD orchestration
AWS CodeBuild – Build & Docker image creation
Amazon ECR – Docker image storage
Amazon ECS – Container deployment
AWS Fargate – Serverless compute
Elastic Load Balancing – Application exposure
⚙️ How It Works
Developer pushes code to GitHub
AWS CodePipeline is triggered automatically
AWS CodeBuild builds Docker image
Image is pushed to Amazon ECR
Amazon ECS pulls latest image
Application is deployed via Load Balancer
🐳 Dockerization

The application is containerized using Docker for:

Environment consistency
Easy deployment
Scalability
📁 Project Structure
.
├── app.js
├── package.json
├── Dockerfile
├── buildspec.yml
└── README.md

🔄 CI/CD Pipeline Features
Fully automated deployment
Continuous integration & delivery
Zero downtime deployment (ECS rolling update)
Scalable infrastructure

🌐 Application Endpoints
Endpoint	Description
/Main application
/health	Health check
/debug	Debug information
/change	Deployment verification
🧪 How to Test Pipeline
Make changes in code
Push to GitHub
Pipeline triggers automatically
Verify updated output in browser

⚠️ Challenges Faced

ECR repository mismatch issues
Container name mismatch in ECS
Buildspec configuration errors

✅ Solutions

Ensured consistent naming across services
Debugged using build logs
Corrected imagedefinitions.json

🎯 Key Learnings
End-to-end CI/CD pipeline design
Docker containerization
AWS DevOps services integration
Debugging real-world deployment issues

🚀 Future Enhancements
Add Amazon CloudWatch for monitoring
Integrate Amazon RDS
Implement Blue-Green deployment strategy
Add custom domain with HTTPS
🏆 Conclusion

This project showcases a real-world DevOps workflow using AWS, demonstrating automation, scalability, and efficient deployment practices.

👨‍💻 Author

Aryan
📘 React Portfolio – Enterprise CI/CD & Production Deployment
🧭 1. Overview

This document describes the end-to-end lifecycle of building, validating, containerizing, and deploying a React (Vite) application using modern DevOps practices.

🎯 Objective

To implement a production-ready CI/CD pipeline with:

Automated build & validation
Code quality enforcement
Containerized deployment
Secure HTTPS access
Cloud hosting
🔧 Technologies Used
GitHub – Source Control
GitHub Actions – CI/CD
SonarCloud – Static Analysis
Docker – Containerization
GitHub Container Registry – Image storage
Amazon Web Services EC2 – Hosting
Nginx – Reverse Proxy
Let’s Encrypt – SSL
No-IP – Domain
🏗️ 2. Architecture Diagram
┌────────────────────────────┐
│ Developer │
└────────────┬───────────────┘
│
▼
┌────────────────────────────┐
│ GitHub Repo │
└────────────┬───────────────┘
│ PR / Push
▼
┌────────────────────────────┐
│ GitHub Actions CI │
│ - Install Dependencies │
│ - Build (Vite) │
│ - SonarCloud Analysis │
└────────────┬───────────────┘
│
▼
┌────────────────────────────┐
│ Docker Build + GHCR │
└────────────┬───────────────┘
│
▼
┌────────────────────────────┐
│ AWS EC2 │
│ │
│ ┌────────────────────┐ │
│ │ Nginx │ │
│ │ (SSL + Routing) │ │
│ └────────┬─────────┘ │
│ │ │
│ ┌────────▼─────────┐ │
│ │ Docker App │ │
│ │ (React Build) │ │
│ └──────────────────┘ │
└────────────┬──────────────┘
│
▼
┌────────────────────────────┐
│ https://basusharma.ddns.net │
└────────────────────────────┘
🔰 3. Git Repository Setup
📍 What

Initialize project and connect to GitHub

🎯 Why
Version control
CI/CD trigger source
Collaboration
⚙️ Commands
git init
git add .
git commit -m "Initial commit"

git remote add origin https://github.com/<username>/React_portfolio.git
git branch -M main
git push -u origin main
📄 File: .gitignore
node_modules
dist
.env
🌿 Branch Strategy
main → production
dev → integration
feature/\* → development
⚙️ 4. CI Pipeline (Build + SonarCloud)
📍 What

Automated pipeline for validation

🎯 Why
Prevent bad code merge
Ensure quality
📄 File: .github/workflows/ci.yml
name: CI Pipeline

on:
pull_request:
branches: ['main', 'dev']

jobs:
build:
runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - run: npm ci
      - run: npm run build

      - uses: SonarSource/sonarqube-scan-action@v2
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}

🔍 5. SonarCloud Integration
📍 What

Static code analysis

🎯 Why
Detect bugs
Security vulnerabilities
📄 File: sonar-project.properties
sonar.projectKey=basu1312_React_portfolio
sonar.organization=basu1312
sonar.sources=src
🐳 6. Docker Setup
📍 What

Containerize application

🎯 Why
Same environment everywhere
Easy deployment
📄 File: Dockerfile
FROM node:20 as builder

WORKDIR /app
COPY package\*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
📦 7. CD Pipeline (Docker → GHCR)
📍 What

Push Docker image

📄 File: .github/workflows/cd.yml
name: CD Pipeline

on:
push:
branches: [main]

jobs:
build:
runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - uses: docker/build-push-action@v5
        with:
          push: true
          tags: ghcr.io/${{ github.repository }}:latest

☁️ 8. AWS EC2 Setup (Detailed Execution)
📍 What

Provision and configure a virtual machine (EC2 instance) on Amazon Web Services to host the containerized React application.

🎯 Why
Publicly accessible hosting environment
Full control over OS, networking, and runtime
Supports containerized workloads (Docker)
Industry-standard infrastructure for production deployment
🧱 8.1 Infrastructure Planning (Before Launch)
🔑 Key Decisions
Component Selection Reason
OS Ubuntu 24.04 LTS Stable + widely supported
Instance Type t2.micro Free tier eligible
Region ap-south-1 (Mumbai) Lower latency (India)
Storage 8–20 GB (gp3) Lightweight React app
🚀 8.2 Launch EC2 Instance
🔧 Steps
Go to AWS Console → EC2 → Launch Instance
Configure:
Name: react-portfolio-server
AMI: Ubuntu 24.04
Instance Type: t2.micro
Key Pair: Create new (react-key.pem)
🔐 8.3 Key Pair Management
📍 What

Used for secure SSH authentication

⚠️ Important Rules
File permission must be restricted:
chmod 400 react-key.pem
Never commit .pem file to GitHub
🌐 8.4 Security Group Configuration
📍 What

Acts as a virtual firewall

⚙️ Inbound Rules
Port Protocol Source Purpose
22 TCP Your IP SSH access
80 TCP 0.0.0.0/0 HTTP traffic
443 TCP 0.0.0.0/0 HTTPS traffic
🎯 Best Practice
Restrict port 22 to your IP only
Avoid 0.0.0.0/0 for SSH in production
🔌 8.5 Connect to EC2 Instance
ssh -i react-key.pem ubuntu@<EC2_PUBLIC_IP>
❌ Common Issues
Issue Root Cause Fix
Permission denied (publickey) Wrong file permission chmod 400
Connection timeout Port 22 blocked Check security group
Host not reachable Wrong IP Verify EC2 public IP
🧰 8.6 Initial Server Setup (Post Login)
🔧 Update System
sudo apt update && sudo apt upgrade -y
🔧 Install Basic Utilities
sudo apt install -y curl git unzip
🐳 8.7 Docker Pre-Requisites

Before installing Docker:

sudo apt install -y ca-certificates gnupg
📡 8.8 Networking Deep Dive
🧠 Public vs Private IP
Type Usage
Public IP Access from internet
Private IP Internal AWS communication
⚠️ Note
Public IP may change on restart (unless Elastic IP used)
🌍 8.9 Elastic IP (Recommended for Production)
📍 What

Static public IP provided by AWS

🎯 Why
Prevent IP changes on restart
Stable DNS mapping
🔧 Steps
Go to EC2 → Elastic IPs
Allocate new IP
Associate with instance
🔐 8.10 IAM Role (Advanced Best Practice)
📍 What

Attach role to EC2 for secure access to AWS services

🎯 Why
Avoid hardcoding credentials
Secure access to S3, ECR, etc.
📊 8.11 Monitoring & Logging
🧰 Tools
AWS CloudWatch (basic monitoring)
System logs:
top
htop
df -h
free -m
🔁 8.12 Restart & Lifecycle Management
🔧 Commands
sudo reboot
sudo shutdown now
⚠️ Behavior
Instance restart → IP may change (if no Elastic IP)
🛡️ 8.13 Security Hardening (Production-Level)
🔒 Steps
Disable root login
Use SSH key only (disable password login)
sudo nano /etc/ssh/sshd_config

Set:

PasswordAuthentication no
PermitRootLogin no

Restart SSH:

sudo systemctl restart ssh
📦 8.14 Deployment Readiness Checklist

Before deploying Docker app:

✅ EC2 instance running
✅ Security group configured
✅ SSH access working
✅ Docker installed
✅ Ports 80 & 443 open
✅ Domain mapped (No-IP)
⚠️ 8.15 Real Issues Faced & Fixes
Issue Root Cause Resolution
SSH not connecting Wrong key / permissions Fix chmod
Website not accessible Port blocked Update SG
Domain not resolving Wrong IP mapping Fix No-IP
SSL generation failed Port conflict Stop Docker
🧠 Key DevOps Insight

EC2 is not just “a server” — it is a programmable infrastructure unit where networking, security, compute, and deployment layers intersect.

🐳 9. Docker Installation & Setup
📍 What

Install Docker runtime

🎯 Why

Run containerized app

🔧 Commands
sudo apt update
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker
🔍 Verify
docker ps
📦 10. First Deployment Attempt (Learning Phase)
🔧 Command Used
docker run -d -p 80:80 ghcr.io/basu1312/react_portfolio:latest
❌ Issue
Port 80 already in use
🎯 Root Cause
Nginx + Docker both trying port 80
🔁 11. Docker + Nginx Conflict Resolution
🔧 Fix Strategy
Docker → 3000
Nginx → 80/443
🔧 Command
docker run -d -p 3000:80 ghcr.io/basu1312/react_portfolio:latest
🔍 Verify
docker ps

Expected:

0.0.0.0:3000->80
🌐 12. Domain Setup (No-IP)
📍 What

Free domain using No-IP

🎯 Why

Avoid buying domain initially

🔧 Steps
Create account
Create hostname
⚙️ Correct Settings
Host: basusharma
Domain: ddns.net
IP: <EC2_PUBLIC_IP>
🔍 Verify
ping basusharma.ddns.net
❌ Issue Faced
No address associated with hostname
✅ Fix
Domain not created properly
IP mismatch
🌐 13. First Public Access
🔗 URL
http://basusharma.ddns.net
❌ Issue
ERR_CONNECTION_REFUSED
🎯 Root Cause
No service running on port 80
✅ Fix
docker run -d -p 80:80 ghcr.io/basu1312/react_portfolio:latest
🔐 14. SSL Setup (Let’s Encrypt)
📍 What

Enable HTTPS

🎯 Why

Secure connection + production standard

🔧 Command
sudo certbot certonly --standalone -d basusharma.ddns.net
❌ Issue
Port 80 already in use
✅ Fix
docker stop $(docker ps -q)

Then retry SSL command

📂 Output
/etc/letsencrypt/live/basusharma.ddns.net/
🔁 15. Nginx Setup (Reverse Proxy)
📍 What

Route traffic to container

🎯 Why
Handle HTTPS
Reverse proxy
🔧 Install
sudo apt install nginx -y
❌ Issue Faced
nginx failed to start
🎯 Root Cause
Port 80 conflict
✅ Fix
docker stop <container>
⚙️ 16. Nginx Configuration
📄 File
/etc/nginx/sites-available/default
❌ Issue
server directive not allowed
🎯 Root Cause
Nested server block
✅ Fix (Final Config)
server {
listen 80;
server_name basusharma.ddns.net;
return 301 https://$host$request_uri;
}

server {
listen 443 ssl;
server_name basusharma.ddns.net;

    ssl_certificate /etc/letsencrypt/live/basusharma.ddns.net/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/basusharma.ddns.net/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
    }

}
🔧 Apply Config
sudo nginx -t
sudo systemctl restart nginx
🔁 17. Final Deployment
🔧 Run App
docker run -d -p 3000:80 ghcr.io/basu1312/react_portfolio:latest
🔍 Verify
docker ps
🌐 18. Final Output
🔗 URL
https://basusharma.ddns.net
🎯 Final Architecture
User → HTTPS (443)
↓
Nginx
↓
Docker (3000)
↓
React App
⚠️ 19. Major Issues Summary
Issue Root Cause Fix
Port conflict Docker vs Nginx Separate ports
SSL failed Port 80 busy Stop Docker
DNS error Wrong IP Fix mapping
Nginx crash Wrong config Clean config
🧠 20. Key Learning (Real DevOps Level)
✔ Debugging infra issues
✔ Port management
✔ Reverse proxy concept
✔ SSL lifecycle
✔ CI/CD integration
✔ Cloud deployment
🚀 FINAL RESULT
✔ Fully automated CI/CD
✔ Dockerized deployment
✔ Secure HTTPS domain
✔ Production-grade architecture

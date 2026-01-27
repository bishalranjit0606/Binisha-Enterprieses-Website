#!/bin/bash

# Simple Deployment Script for EC2
# This script is intended to be run ON the EC2 instance for the first-time setup

echo "🚀 Starting Binisha Enterprises auto-setup..."

# 1. Update and Install Docker (if not present)
if ! command -v docker &> /dev/null
then
    echo "📦 Installing Docker..."
    sudo apt-get update
    sudo apt-get install -y ca-certificates curl gnupg
    sudo install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    sudo chmod a+r /etc/apt/keyrings/docker.gpg
    
    # Setup Docker repository (Fixed typo here)
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    
    sudo apt-get update
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
fi

# 2. Go to home directory
cd /home/ubuntu

# 3. Handle Repository
if [ ! -d "Binisha-Enterprieses-Website" ]; then
    echo "📥 Cloning repository..."
    git clone https://github.com/bishalranjit0606/Binisha-Enterprieses-Website.git
fi

cd /home/ubuntu/Binisha-Enterprieses-Website

# 4. Check for .env file
if [ ! -f ".env" ]; then
    echo "⚠️  No .env file found!"
    echo "Please create one with: nano .env"
    echo "Inside, put: VITE_API_URL=http://your-server-ip"
    exit 1
fi

# 5. Ensure Uploads directory exists and is writable
mkdir -p backend/uploads
sudo chmod -R 777 backend/uploads

# 6. Start the engine
echo "🏗️  Starting containers..."
sudo docker compose up -d --build

echo "✅ Success! Visit http://$(curl -s ifconfig.me)"

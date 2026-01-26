#!/bin/bash

# EC2 Initial Setup Script
# Run this script on your EC2 instance after first login

set -e

echo "🚀 Starting Binisha Enterprises server setup..."

# Update system
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Docker
echo "🐳 Installing Docker..."
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io

# Install Docker Compose
echo "🔧 Installing Docker Compose..."
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Add user to docker group
echo "👤 Adding user to docker group..."
sudo usermod -aG docker $USER

# Install Git
echo "📚 Installing Git..."
sudo apt install -y git

# Create application directory
echo "📁 Creating application directory..."
mkdir -p /home/ubuntu/binisha
cd /home/ubuntu/binisha

# Clone repository (you'll need to add your GitHub repo URL)
echo "📥 Cloning repository..."
echo "⚠️  Please run manually: git clone https://github.com/bishalranjit0606/Binisha-Enterprieses-Website.git ."

# Create .env file
echo "⚙️  Creating .env file..."
cat > .env << 'EOF'
# Database Configuration
DB_NAME=binisha_db
DB_USER=postgres
DB_PASS=CHANGE_THIS_PASSWORD

# JWT Secret (generate a strong random string)
JWT_SECRET=CHANGE_THIS_SECRET

# API URL (update with your domain)
VITE_API_URL=https://binishaenterprises.app
EOF

echo "⚠️  IMPORTANT: Edit /home/ubuntu/binisha/.env and set secure passwords!"

# Install useful tools
echo "🛠️  Installing additional tools..."
sudo apt install -y htop wget curl vim ufw

# Configure firewall
echo "🔒 Configuring firewall..."
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw --force enable

# Enable Docker to start on boot
echo "🔄 Enabling Docker to start on boot..."
sudo systemctl enable docker

# Create uploads directory
mkdir -p /home/ubuntu/binisha/backend/uploads

echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Log out and log back in for docker group changes to take effect"
echo "2. Clone your repository: cd /home/ubuntu/binisha && git clone <your-repo-url> ."
echo "3. Edit .env file with secure passwords: nano /home/ubuntu/binisha/.env"
echo "4. Run: docker-compose up -d"
echo "5. Seed database: docker-compose exec backend node seed.js"
echo ""
echo "🎉 Your server is ready!"

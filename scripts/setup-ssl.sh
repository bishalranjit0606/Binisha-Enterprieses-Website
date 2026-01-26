#!/bin/bash

# SSL Setup Script using Let's Encrypt and Nginx
# Run this after your domain is pointing to your EC2 instance

set -e

DOMAIN="binishaenterprises.app"
EMAIL="pathlaiya123@gmail.com"

echo "🔒 Setting up SSL for $DOMAIN..."

# Install Certbot
echo "📦 Installing Certbot..."
sudo apt update
sudo apt install -y certbot

# Stop containers temporarily
echo "⏸️  Stopping containers..."
cd /home/ubuntu/binisha
docker-compose down

# Get SSL certificate
echo "📜 Obtaining SSL certificate..."
sudo certbot certonly --standalone -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos -m $EMAIL

# Create nginx configuration for SSL
echo "⚙️  Creating SSL nginx configuration..."
sudo tee /home/ubuntu/binisha/nginx-ssl.conf > /dev/null << 'EOF'
# HTTP - redirect to HTTPS
server {
    listen 80;
    server_name binishaenterprises.app www.binishaenterprises.app;
    
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
    
    location / {
        return 301 https://$host$request_uri;
    }
}

# HTTPS - Frontend
server {
    listen 443 ssl http2;
    server_name binishaenterprises.app www.binishaenterprises.app;

    ssl_certificate /etc/letsencrypt/live/binishaenterprises.app/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/binishaenterprises.app/privkey.pem;
    
    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    
    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Proxy to frontend container
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Proxy to backend API
    location /api {
        proxy_pass http://localhost:5001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

# Update docker-compose to use different ports and add nginx
echo "🔧 Updating docker-compose for SSL..."
cat > /home/ubuntu/binisha/docker-compose.prod.yml << 'EOF'
version: '3.8'

services:
  postgres:
    image: postgres:14-alpine
    container_name: binisha-postgres
    restart: unless-stopped
    environment:
      POSTGRES_DB: ${DB_NAME:-binisha_db}
      POSTGRES_USER: ${DB_USER:-postgres}
      POSTGRES_PASSWORD: ${DB_PASS:-postgres}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - binisha-network

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: binisha-backend
    restart: unless-stopped
    environment:
      DB_NAME: ${DB_NAME:-binisha_db}
      DB_USER: ${DB_USER:-postgres}
      DB_PASS: ${DB_PASS:-postgres}
      DB_HOST: postgres
      DB_DIALECT: postgres
      JWT_SECRET: ${JWT_SECRET}
      PORT: 5001
      NODE_ENV: production
    volumes:
      - ./backend/uploads:/app/uploads
    ports:
      - "5001:5001"
    depends_on:
      - postgres
    networks:
      - binisha-network

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
      args:
        VITE_API_URL: ${VITE_API_URL:-https://binishaenterprises.app}
    container_name: binisha-frontend
    restart: unless-stopped
    ports:
      - "3000:80"
    depends_on:
      - backend
    networks:
      - binisha-network

  nginx:
    image: nginx:alpine
    container_name: binisha-nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx-ssl.conf:/etc/nginx/conf.d/default.conf
      - /etc/letsencrypt:/etc/letsencrypt:ro
      - /var/www/certbot:/var/www/certbot
    depends_on:
      - frontend
      - backend
    networks:
      - binisha-network

networks:
  binisha-network:
    driver: bridge

volumes:
  postgres_data:
    driver: local
EOF

# Start containers with SSL
echo "🚀 Starting containers with SSL..."
docker-compose -f docker-compose.prod.yml up -d --build

# Setup auto-renewal
echo "🔄 Setting up SSL auto-renewal..."
sudo tee /etc/cron.d/certbot-renew > /dev/null << 'EOF'
0 0,12 * * * root certbot renew --quiet --deploy-hook "cd /home/ubuntu/binisha && docker-compose -f docker-compose.prod.yml restart nginx"
EOF

echo "✅ SSL setup complete!"
echo "🌐 Your website is now available at: https://$DOMAIN"

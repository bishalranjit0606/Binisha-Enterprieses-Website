# Deployment Scripts

This directory contains scripts for deploying and managing the Binisha Enterprises website on AWS EC2.

## Scripts

### 1. `ec2-setup.sh`

**Purpose:** Initial EC2 instance setup

**What it does:**
- Updates system packages
- Installs Docker and Docker Compose
- Installs Git and useful tools
- Configures firewall (UFW)
- Creates application directory
- Sets up Docker permissions

**Usage:**
```bash
# Upload to EC2
scp -i ~/path/to/key.pem ec2-setup.sh ubuntu@YOUR_IP:/home/ubuntu/

# Run on EC2
chmod +x ec2-setup.sh
./ec2-setup.sh
```

**When to use:** First time setting up a new EC2 instance

---

### 2. `setup-ssl.sh`

**Purpose:** Configure SSL/HTTPS with Let's Encrypt

**What it does:**
- Installs Certbot
- Obtains SSL certificate
- Configures Nginx reverse proxy
- Sets up automatic certificate renewal
- Updates Docker Compose for production

**Usage:**
```bash
# Upload to EC2
scp -i ~/path/to/key.pem setup-ssl.sh ubuntu@YOUR_IP:/home/ubuntu/

# Run on EC2 (after DNS is configured)
chmod +x setup-ssl.sh
sudo ./setup-ssl.sh
```

**Prerequisites:**
- Domain must be pointing to EC2 instance
- DNS propagation complete
- Basic deployment already running

**When to use:** After domain DNS is configured and verified

---

## Deployment Workflow

### Initial Setup

1. **Create EC2 instance** (via AWS Console)
2. **Run `ec2-setup.sh`** (sets up server)
3. **Clone repository** (get your code)
4. **Configure `.env`** (set environment variables)
5. **Start Docker** (`docker-compose up -d`)
6. **Seed database** (`docker-compose exec backend node seed.js`)

### SSL Configuration

7. **Configure DNS** (point domain to EC2)
8. **Wait for propagation** (10-60 minutes)
9. **Run `setup-ssl.sh`** (enable HTTPS)

### Ongoing Deployments

10. **Use GitHub Actions** (automatic on git push)

---

## Manual Deployment Commands

If you need to deploy manually without GitHub Actions:

```bash
# SSH to EC2
ssh -i ~/path/to/key.pem ubuntu@YOUR_IP

# Navigate to project
cd /home/ubuntu/binisha

# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose up -d --build

# Check status
docker-compose ps
docker-compose logs -f
```

---

## Troubleshooting

### Script fails with "Permission denied"

```bash
chmod +x script-name.sh
```

### Docker commands fail

```bash
# Log out and back in after running ec2-setup.sh
exit
ssh -i ~/path/to/key.pem ubuntu@YOUR_IP
```

### SSL script fails

**Check DNS first:**
```bash
ping binishaenterprises.app
nslookup binishaenterprises.app
```

Must return your EC2 IP address.

---

## Security Notes

- Never commit `.env` files to Git
- Keep SSH keys secure
- Use strong passwords in `.env`
- Regularly update system packages
- Monitor access logs

---

## Additional Resources

- [Full Deployment Guide](../aws_deployment_guide.md)
- [Quick Start Guide](../QUICKSTART.md)
- [Main README](../README.md)

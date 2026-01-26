# AWS EC2 Deployment - Quick Start

**⚡ Fast track to get your website live in ~30 minutes**

## Prerequisites Checklist

- [ ] AWS account created
- [ ] Domain `binishaenterprises.app` ready
- [ ] GitHub repository with your code
- [ ] Terminal/SSH client ready

---

## Part 1: AWS Setup (10 minutes)

### 1. Create EC2 Instance

1. Login to AWS Console → EC2
2. Click **"Launch Instance"**
3. Configure:
   - **Name:** `binisha-production`
   - **OS:** Ubuntu Server 22.04 LTS
   - **Instance type:** t2.micro (free tier)
   - **Key pair:** Create new → `binisha-ec2-key` → Download `.pem` file
   - **Storage:** 20 GB
   - **Security group:** Allow ports 22, 80, 443
4. Click **"Launch Instance"**

### 2. Get Elastic IP

1. EC2 Dashboard → Elastic IPs → Allocate
2. Associate with your instance
3. **Copy the IP address** (e.g., `54.123.45.67`)

---

## Part 2: Server Setup (10 minutes)

### 1. Connect to EC2

```bash
# Set permissions (Mac/Linux)
chmod 400 ~/Downloads/binisha-ec2-key.pem

# Connect
ssh -i ~/Downloads/binisha-ec2-key.pem ubuntu@YOUR_ELASTIC_IP
```

### 2. Upload and Run Setup Script

**On your local machine:**
```bash
scp -i ~/Downloads/binisha-ec2-key.pem \
    /Users/bishalranjitkar/Desktop/binisha/scripts/ec2-setup.sh \
    ubuntu@YOUR_ELASTIC_IP:/home/ubuntu/
```

**On EC2:**
```bash
chmod +x ec2-setup.sh
./ec2-setup.sh
```

**Log out and back in:**
```bash
exit
ssh -i ~/Downloads/binisha-ec2-key.pem ubuntu@YOUR_ELASTIC_IP
```

### 3. Clone and Configure

```bash
cd /home/ubuntu/binisha
git clone https://github.com/bishalranjit0606/Binisha-Enterprieses-Website.git .

# Edit environment variables
nano .env
```

**Update these values:**
```bash
DB_PASS=YourSecurePassword123!
JWT_SECRET=YourSecureJWTSecret456!
VITE_API_URL=https://binishaenterprises.app
```

Save: `Ctrl+X`, `Y`, `Enter`

### 4. Start Application

```bash
docker-compose up -d --build
docker-compose exec backend node seed.js
```

**Test:** Visit `http://YOUR_ELASTIC_IP` in browser

---

## Part 3: Domain & SSL (5 minutes)

### 1. Configure DNS

**At your domain registrar:**
- Add A record: `@` → `YOUR_ELASTIC_IP`
- Add A record: `www` → `YOUR_ELASTIC_IP`

**Wait 10-60 minutes for DNS propagation**

**Verify:**
```bash
ping binishaenterprises.app
```

### 2. Setup SSL

**Upload SSL script:**
```bash
scp -i ~/Downloads/binisha-ec2-key.pem \
    /Users/bishalranjitkar/Desktop/binisha/scripts/setup-ssl.sh \
    ubuntu@YOUR_ELASTIC_IP:/home/ubuntu/
```

**Run SSL setup:**
```bash
chmod +x setup-ssl.sh
sudo ./setup-ssl.sh
```

**Test:** Visit `https://binishaenterprises.app` 🔒

---

## Part 4: GitHub Actions (5 minutes)

### 1. Create Deployment Key

**On EC2:**
```bash
ssh-keygen -t rsa -b 4096 -f ~/.ssh/github_deploy -N ""
cat ~/.ssh/github_deploy.pub >> ~/.ssh/authorized_keys
cat ~/.ssh/github_deploy
```

**Copy the private key output**

### 2. Add GitHub Secrets

**Go to:** GitHub repo → Settings → Secrets → Actions

**Add 3 secrets:**
- `EC2_HOST` = `YOUR_ELASTIC_IP`
- `EC2_USERNAME` = `ubuntu`
- `EC2_SSH_KEY` = Paste private key from step 1

### 3. Test Deployment

```bash
# On your local machine
cd /Users/bishalranjitkar/Desktop/binisha
git add .
git commit -m "Test deployment"
git push origin main
```

**Watch:** GitHub → Actions tab

**Result:** Changes auto-deploy to production! 🚀

---

## ✅ Verification Checklist

- [ ] Website loads: `https://binishaenterprises.app`
- [ ] SSL certificate shows (🔒 padlock icon)
- [ ] Admin panel works: `https://binishaenterprises.app/login`
- [ ] GitHub Actions workflow passes
- [ ] Test push auto-deploys

---

## 🎯 Quick Commands

```bash
# SSH to server
ssh -i ~/Downloads/binisha-ec2-key.pem ubuntu@YOUR_ELASTIC_IP

# View logs
docker-compose logs -f

# Restart
docker-compose restart

# Check status
docker-compose ps
```

---

## 📊 Cost Summary

- **First year:** FREE (AWS free tier)
- **After year 1:** ~$10-12/month
- **Domain:** Already owned ✅
- **SSL:** FREE (Let's Encrypt)

---

## 🆘 Troubleshooting

**Website not loading?**
```bash
docker-compose ps  # Check containers
docker-compose logs  # Check errors
```

**SSL not working?**
```bash
sudo certbot certificates  # Check cert
```

**Deployment failing?**
- Check GitHub Secrets are correct
- Verify SSH key is complete (including BEGIN/END lines)

---

## 📚 Full Documentation

For detailed explanations, see:
- [Complete AWS Deployment Guide](aws_deployment_guide.md)
- [Troubleshooting Guide](aws_deployment_guide.md#troubleshooting)

---

**🎉 That's it! Your website is live with automated deployments!**

**Next:** Login to admin panel and change the default password!

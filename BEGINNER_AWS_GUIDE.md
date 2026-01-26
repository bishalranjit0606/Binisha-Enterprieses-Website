# 🚀 Beginner's Guide: Deploying to AWS EC2

This guide will help you put your website live on the internet using AWS. I have used very simple words and explained every step.

## 📋 Phase 1: Set up your AWS Server

### 1. Create an AWS Account
- Go to [aws.amazon.com](https://aws.amazon.com/) and create a free account.
- You will need a Credit/Debit card for verification, but you won't be charged if you stay in the "Free Tier."

### 2. Launch your EC2 Instance (The Server)
- Once logged in, search for **EC2** in the search bar.
- Click the orange **"Launch Instance"** button.
- **Name:** Type `Binisha-Server`.
- **Application Image (OS):** Select **Ubuntu** (it's the most beginner-friendly).
- **Instance Type:** Select `t2.micro` (This is the **FREE** one).
- **Key Pair:** Click "Create new key pair." Name it `binisha-key`. Download the `.pem` file and keep it safe! You need this to talk to your server.

### 3. Network Settings (Security)
- In the same "Launch Instance" screen, look for "Network settings."
- Check these boxes:
  - [x] Allow SSH traffic (so you can manage the server)
  - [x] Allow HTTP traffic from the internet (so people can see your site)
  - [x] Allow HTTPS traffic from the internet (for secure browsing later)
- Click **"Launch Instance"** at the bottom.

### 4. Get your Server's Public IP
- Go to your EC2 Dashboard -> Instances.
- Click on your running instance.
- Look for **"Public IPv4 address"** (Example: `54.12.34.56`). **Copy this!** This is your website's home address.

---

## 📋 Phase 2: Putting your Code on the Server

### 1. Log into your Server
- Open your computer's terminal.
- Go to the folder where you saved `binisha-key.pem`.
- Type this command to fix permissions: `chmod 400 binisha-key.pem`.
- Type this command to log in (replace `54.12.34.56` with your IP):
  ```bash
  ssh -i "binisha-key.pem" ubuntu@54.12.34.56
  ```
- Type "yes" if it asks.

### 2. Run the "Auto-Setup" Assistant
- I created a script called `deploy_ec2.sh` in your project to handle everything.
- On your server terminal, type:
  ```bash
  git clone https://github.com/bishalranjit0606/Binisha-Enterprieses-Website.git
  cd Binisha-Enterprieses-Website
  chmod +x deploy_ec2.sh
  ```

### 3. Create your configuration (.env)
- You need to tell the website what its public address is.
- Inside the `Binisha-Enterprieses-Website` folder on your server, type:
  ```bash
  nano .env
  ```
- Paste this inside (replace with your IP):
  ```text
  VITE_API_URL=http://54.12.34.56
  ```
- Press `Ctrl+O`, then `Enter` to save. Press `Ctrl+X` to exit.

### 4. Start the Website!
- Run the assistant script:
  ```bash
  ./deploy_ec2.sh
  ```
- **WAIT** 2-3 minutes. It will install Docker and start your website automatically.

---

## 📋 Phase 3: Setup Automated Updates (CI/CD)

Now, we want the website to update automatically every time you make a "git push."

### 1. Add Secrets to GitHub
- Go to your project on **GitHub.com**.
- Click **Settings** -> **Secrets and variables** -> **Actions**.
- Click **"New repository secret"** for each of these:
  - **Name:** `EC2_HOST` | **Value:** Your Server IP (e.g. `54.12.34.56`)
  - **Name:** `EC2_USERNAME` | **Value:** `ubuntu`
  - **Name:** `EC2_SSH_KEY` | **Value:** Open your `binisha-key.pem` file on your laptop in a text editor. Copy EVERY line inside and paste it here.

### 2. Test it!
- Make a small text change in any file on your computer.
- Git add, commit, and push.
- Go to the **"Actions"** tab on GitHub. You will see the rocket ship emoji 🚀 and "Deploy to EC2." When it finishes, your live website is updated!

---

## ✅ Deployment Complete!
Your website is now live at: **http://your-server-ip**

### Important Notes:
- **Cost:** This uses the AWS Free Tier, so it is **$0** for the first 12 months.
- **Cleanup:** If you push many changes, your server disk might get full. Our GitHub Action automatically cleans up old files to keep it running smoothly.
- **Admin Access:** Login at `http://your-server-ip/login` using the default credentials in the README.

🚀 **Everything is ready!**

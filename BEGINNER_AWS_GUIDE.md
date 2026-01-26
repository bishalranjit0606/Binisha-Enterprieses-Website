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
  - [x] Allow SSH traffic (for management)
  - [x] Allow HTTP traffic (for the website)
  - [x] Allow HTTPS traffic (for secure site)

> [!IMPORTANT]
> **Essential Step:** After launching, you MUST go to your Security Group and add an **Inbound Rule** for **Port 5001** (Custom TCP) from source `0.0.0.0/0`. This is where your database-api lives!

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

---

## 📋 Phase 4: Connecting your Domain (Name.com)

Now let's make your website look professional with your own domain name.

### 1. Point Domain to your Server (Name.com)
1.  Log in to your **Name.com** account.
2.  Click on **"My Domains"** and select your domain (e.g., `binishaenterprises.app`).
3.  On the left side, click **"Manage DNS Records"**.
4.  You need to add two records:
    - **Record 1 (The Main Domain):**
        - **Type:** `A`
        - **Host:** Leave blank (or type `@`)
        - **Answer:** Paste your Server IP: `13.61.35.220`
    - **Record 2 (The WWW version):**
        - **Type:** `A` (or CNAME)
        - **Host:** `www`
        - **Answer:** Paste your Server IP: `13.61.35.220`
5.  Click **"Add Record"**. 
    *Note: It might take 10-20 minutes for the internet to update.*

### 2. Update the Website Settings
Now your server needs to know it has a name. log into your EC2 terminal:
```bash
cd ~/Binisha-Enterprieses-Website
nano .env
```
Change the line to your domain (No port number needed now!):
```text
VITE_API_URL=https://binishaenterprises.app
```
(Save and Exit)

### 3. Setup Free SSL (HTTPS)
Since Port 80 is used by the website, we must briefly stop it to let Certbot through:
```bash
# 1. Go to project and STOP the website briefly
cd ~/Binisha-Enterprieses-Website
sudo docker compose down

# 2. Get the certificate (replace with your domain)
sudo certbot certonly --standalone -d binishaenterprises.app -d www.binishaenterprises.app

# 3. Double check your .env is correct (use https now!)
nano .env
# VITE_API_URL=https://binishaenterprises.app
```
*(Certbot will save files to `/etc/letsencrypt`, which my new config will automatically find!)*

### 4. Restart with Domain & Security
Now, rebuild to apply the "Padlock" security:
```bash
sudo docker compose up -d --build
```

---

## ✅ Deployment Complete!
Your website is live and secure at: **https://binishaenterprises.app**

### Important Notes:
- **Cost:** This uses the AWS Free Tier, so it is **$0** for the first 12 months.
- **Cleanup:** If you push many changes, your server disk might get full. Our GitHub Action automatically cleans up old files to keep it running smoothly.
- **Admin Access:** Login at `http://your-server-ip/login` using the default credentials in the README.

🚀 **Everything is ready!**

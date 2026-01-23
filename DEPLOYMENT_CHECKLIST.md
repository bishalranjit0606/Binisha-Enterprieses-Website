# 🚀 Deployment Checklist for Binisha Enterprises

## ✅ Code Preparation (COMPLETED)

- [x] Updated `vite.config.js` with API proxy configuration
- [x] Created `frontend/.env.production` with Render backend URL
- [x] Created `frontend/src/config.js` for API base URL
- [x] Updated `App.jsx` to use `API_BASE_URL`
- [x] Added Render database template to `backend/.env`

---

## 📝 Next Steps: Deploy to Render + Vercel

### Step 1: Push to GitHub (5 minutes)

```bash
cd /Users/bishalranjitkar/Desktop/Binisha-Enterprieses-Website

# Check current status
git status

# Add all changes
git add .

# Commit
git commit -m "Prepare for Vercel and Render deployment"

# Push to GitHub (create repo first if needed)
git push origin main
```

**If you don't have a GitHub repo yet:**
1. Go to github.com and create a new repository
2. Name it: `Binisha-Enterprises-Website`
3. Don't initialize with README
4. Run:
```bash
git remote add origin https://github.com/YOUR_USERNAME/Binisha-Enterprises-Website.git
git branch -M main
git push -u origin main
```

---

### Step 2: Deploy Database on Render (5 minutes)

1. Go to [render.com](https://render.com) and sign up with GitHub
2. Click **"New +"** → **"PostgreSQL"**
3. Fill in:
   - **Name**: `binisha-db`
   - **Database**: `binisha_db`
   - **User**: `binisha_user` (auto-generated)
   - **Region**: `Singapore` (closest to Nepal)
   - **Plan**: **Free**
4. Click **"Create Database"**
5. **IMPORTANT**: Copy these values (you'll need them):
   - **Internal Database URL** (for backend environment variables)
   - **External Database URL** (for seeding from your computer)

---

### Step 3: Seed Your Database (5 minutes)

Update `backend/.env` with the **External Database URL** from Render:

```bash
# Example format (use YOUR actual values from Render):
DB_HOST=dpg-xxxxxxxxxxxxx.singapore-postgres.render.com
DB_PORT=5432
DB_NAME=binisha_db
DB_USER=binisha_user
DB_PASSWORD=xxxxxxxxxxxxxxxxxxxxx
```

Then run the seed script:

```bash
cd backend
node seed.js
```

You should see: "Database seeded successfully!"

---

### Step 4: Deploy Backend on Render (10 minutes)

1. In Render dashboard, click **"New +"** → **"Web Service"**
2. Click **"Connect GitHub"** and select your repository
3. Configure:
   - **Name**: `binisha-api`
   - **Region**: `Singapore`
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: **Free**

4. Click **"Advanced"** and add these **Environment Variables**:

**IMPORTANT**: Use the **Internal Database URL** values here!

```
NODE_ENV=production
PORT=10000
DB_HOST=<from Internal Database URL>
DB_PORT=5432
DB_NAME=binisha_db
DB_USER=binisha_user
DB_PASSWORD=<from Internal Database URL>
DB_DIALECT=postgres
```

5. Click **"Create Web Service"**

Wait 3-5 minutes for deployment. Your backend will be at:
`https://binisha-api.onrender.com`

**Test it**: Visit `https://binisha-api.onrender.com/api/content`
You should see JSON data!

---

### Step 5: Update Frontend Environment (2 minutes)

Update `frontend/.env.production` with your actual Render backend URL:

```
VITE_API_URL=https://binisha-api.onrender.com
```

Commit and push:

```bash
git add .
git commit -m "Update production API URL"
git push
```

---

### Step 6: Deploy Frontend on Vercel (5 minutes)

1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository: `Binisha-Enterprises-Website`
4. Configure:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (should auto-detect)
   - **Output Directory**: `dist` (should auto-detect)
   - **Install Command**: `npm install` (should auto-detect)

5. Add **Environment Variable**:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://binisha-api.onrender.com`

6. Click **"Deploy"**

Wait 2-3 minutes. Your site will be live at:
`https://binisha-enterprises.vercel.app`

---

### Step 7: Update Backend CORS (5 minutes)

Update `backend/index.js` to allow requests from Vercel:

Find the CORS configuration and update it:

```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://binisha-enterprises.vercel.app',
    /\.vercel\.app$/ // Allow all Vercel preview deployments
  ],
  credentials: true
}));
```

Commit and push:

```bash
git add .
git commit -m "Update CORS for Vercel"
git push
```

Render will automatically redeploy your backend!

---

### Step 8: Test Your Live Site! 🎉

1. Visit: `https://binisha-enterprises.vercel.app`
2. Wait 30-50 seconds on first load (backend waking up from sleep)
3. Your site should load completely!

**If it doesn't work:**
- Check browser console for errors
- Visit backend directly: `https://binisha-api.onrender.com/api/content`
- Check Render logs: Dashboard → Your Service → Logs

---

## 🎯 Optional: Keep Backend Awake

Free tier backends sleep after 15 minutes. To keep it awake:

1. Go to [uptimerobot.com](https://uptimerobot.com)
2. Sign up free
3. Add New Monitor:
   - **Type**: HTTP(s)
   - **URL**: `https://binisha-api.onrender.com/api/content`
   - **Interval**: 5 minutes
4. Save

Now your backend stays awake 24/7!

---

## 📊 What You've Deployed

| Component | Platform | URL | Cost |
|-----------|----------|-----|------|
| Frontend | Vercel | https://binisha-enterprises.vercel.app | FREE |
| Backend | Render | https://binisha-api.onrender.com | FREE |
| Database | Render | (internal) | FREE |

**Total Monthly Cost: $0** ✨

---

## 🔄 Future Updates

To update your site:

```bash
# Make changes to your code
git add .
git commit -m "Your update message"
git push
```

Both Vercel and Render will **automatically redeploy**! 🚀

---

## 🆘 Troubleshooting

### Frontend shows "Failed to load content"
- Wait 50 seconds (backend waking up)
- Check: `https://binisha-api.onrender.com/api/content`
- Verify CORS is updated in backend

### Backend won't start
- Check Render logs
- Verify all environment variables are set
- Ensure database credentials are correct

### Database connection failed
- Use **Internal Database URL** for backend env vars
- Use **External Database URL** for local seeding
- Check database is in same region as backend

---

## ✅ Final Checklist

- [ ] Code pushed to GitHub
- [ ] PostgreSQL database created on Render
- [ ] Database seeded with content
- [ ] Backend deployed on Render
- [ ] Backend environment variables configured
- [ ] Backend tested: `/api/content` returns JSON
- [ ] Frontend environment updated
- [ ] Frontend deployed on Vercel
- [ ] CORS updated in backend
- [ ] Live site tested and working
- [ ] UptimeRobot configured (optional)

---

**Need help?** Check the full deployment guide or ask me! 🚀

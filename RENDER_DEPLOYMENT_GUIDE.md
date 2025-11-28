# 🚀 Complete Render Deployment Guide - HealBot Avatar

This guide will help you deploy your HealBot Avatar application to Render with the same functionality as it runs locally.

## 📋 Prerequisites

1. **GitHub Account** - Your code needs to be in a GitHub repository
2. **Render Account** - Sign up at [render.com](https://render.com) (free tier works!)
3. **Git Installed** - To push your code to GitHub

---

## 🎯 Deployment Overview

We'll deploy in two parts:
1. **Backend** (Node.js Web Service) - Handles chat, TTS, and lip-sync
2. **Frontend** (Static Site) - React app with 3D avatar

---

## 📦 Step 1: Prepare Your Code

### 1.1 Update Production Backend URL

Edit `apps/frontend/.env.production` and replace the backend URL with your actual Render backend URL:

```env
VITE_BACKEND_URL=https://YOUR-BACKEND-NAME.onrender.com
```

**Note:** You'll get this URL after deploying the backend in Step 3.

### 1.2 Verify Files

Make sure these files exist (they should already be there):
- ✅ `apps/backend/server.js` - Uses `process.env.PORT`
- ✅ `apps/frontend/.env.production` - Production backend URL
- ✅ `apps/frontend/.env.development` - Local backend URL

---

## 🐙 Step 2: Push to GitHub

If you haven't already pushed your code to GitHub:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Prepare for Render deployment"

# Add your GitHub repository
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Push to GitHub
git push -u origin main
```

**Important:** Make sure your repository is public or Render has access to it.

---

## 🖥️ Step 3: Deploy Backend to Render

### 3.1 Create Backend Web Service

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Click **"Connect a repository"** and select your GitHub repo
4. Configure the service:

   | Setting | Value |
   |---------|-------|
   | **Name** | `healbotavator-backend` (or your choice) |
   | **Region** | Choose closest to you |
   | **Root Directory** | `apps/backend` |
   | **Environment** | `Node` |
   | **Build Command** | `npm install` |
   | **Start Command** | `npm start` |
   | **Instance Type** | `Free` |

5. Click **"Create Web Service"**

### 3.2 Wait for Deployment

- Deployment takes 5-10 minutes
- Watch the logs for any errors
- Once complete, you'll see: **"Your service is live 🎉"**

### 3.3 Copy Backend URL

- Find your backend URL (e.g., `https://healbotavator-backend.onrender.com`)
- **Copy this URL** - you'll need it for the frontend!

### 3.4 Test Backend

Open in browser: `https://YOUR-BACKEND-URL.onrender.com/voices`

You should see: `[]` (empty array)

✅ **Backend is working!**

---

## 🎨 Step 4: Update Frontend Configuration

### 4.1 Update Backend URL

Edit `apps/frontend/.env.production`:

```env
VITE_BACKEND_URL=https://healbotavator-backend.onrender.com
```

Replace with your **actual backend URL** from Step 3.3.

### 4.2 Commit and Push

```bash
git add apps/frontend/.env.production
git commit -m "Update production backend URL"
git push
```

---

## 🌐 Step 5: Deploy Frontend to Render

### 5.1 Create Static Site

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Static Site"**
3. Select your GitHub repository
4. Configure the site:

   | Setting | Value |
   |---------|-------|
   | **Name** | `healbotavator` (or your choice) |
   | **Region** | Same as backend |
   | **Root Directory** | `apps/frontend` |
   | **Build Command** | `npm install && npm run build` |
   | **Publish Directory** | `dist` |

5. **Environment Variables** (click "Advanced"):
   - Click **"Add Environment Variable"**
   - **Key:** `VITE_BACKEND_URL`
   - **Value:** `https://healbotavator-backend.onrender.com` (your backend URL)

6. Click **"Create Static Site"**

### 5.2 Wait for Deployment

- Deployment takes 5-10 minutes
- Watch the build logs
- Once complete, you'll get your frontend URL!

---

## 🎉 Step 6: Test Your Deployment

### 6.1 Open Your App

Visit: `https://YOUR-FRONTEND-NAME.onrender.com`

### 6.2 Test Features

1. **Wait for backend to wake up** (first request takes 30-60 seconds on free tier)
2. **Type a message** in the chat box
3. **Send** and watch the avatar respond
4. **Try voice input** (click microphone button)
5. **Check animations** and lip-sync

### 6.3 Check Console

Press **F12** to open browser console:
- ✅ No CORS errors
- ✅ Backend responding
- ✅ Audio playing
- ✅ Lip-sync working

---

## ⚙️ Important Notes

### Free Tier Limitations

| Feature | Free Tier Behavior |
|---------|-------------------|
| **Backend Sleep** | Sleeps after 15 min of inactivity |
| **Wake Time** | 30-60 seconds for first request |
| **Bandwidth** | 100 GB/month |
| **Build Minutes** | 500 min/month |

**Solution:** Upgrade to Starter plan ($7/month) to prevent backend sleep.

### CORS Configuration

✅ Already configured in `apps/backend/server.js`:
```javascript
app.use(cors());
```

This allows requests from any origin.

### Environment Variables

The app automatically uses the correct backend URL:
- **Development:** `http://localhost:3000` (from `.env.development`)
- **Production:** Your Render backend URL (from `.env.production`)

### Audio Processing

- ✅ **FFmpeg** is pre-installed on Render
- ✅ **Rhubarb Lip-Sync** binary works on Render's Linux environment
- ✅ **Edge TTS** works without API keys

---

## 🐛 Troubleshooting

### Backend Won't Start

**Check Render Logs:**
1. Go to your backend service
2. Click **"Logs"** tab
3. Look for errors

**Common Issues:**
- Missing dependencies → Check `package.json`
- Port issues → Verify `process.env.PORT` is used
- Module errors → Ensure all imports are correct

### Frontend Can't Connect to Backend

**Symptoms:**
- "Failed to fetch" errors
- No avatar response
- CORS errors

**Solutions:**
1. Verify backend URL in `.env.production`
2. Check backend is running (visit `/voices` endpoint)
3. Check browser console for errors
4. Ensure backend service is not sleeping

### Audio Not Working

**Check:**
1. Browser console for audio errors
2. Backend logs for TTS errors
3. Network tab (F12) - verify audio data is returned
4. Try different browser (Chrome recommended)

### Voice Input Not Working

**Requirements:**
- ✅ HTTPS (Render provides this automatically)
- ✅ Microphone permissions granted
- ✅ Chrome, Edge, or Safari browser

**If not working:**
1. Check microphone permissions
2. Try different browser
3. Check console for errors

---

## 💰 Cost Breakdown

### Free Tier (Recommended for Testing)
- **Backend:** Free (with sleep)
- **Frontend:** Free
- **Total:** $0/month

### Starter Plan (Recommended for Production)
- **Backend:** $7/month (no sleep)
- **Frontend:** Free
- **Total:** $7/month

### Professional (For High Traffic)
- **Backend:** $25/month
- **Frontend:** Free
- **Total:** $25/month

---

## 🔄 Updating Your Deployment

### Code Changes

```bash
# Make your changes
git add .
git commit -m "Your changes"
git push
```

Render will **automatically redeploy** when you push to GitHub!

### Environment Variables

1. Go to Render Dashboard
2. Select your service
3. Click **"Environment"** tab
4. Update variables
5. Service will automatically restart

---

## 📊 Monitoring

### Backend Logs

1. Go to backend service
2. Click **"Logs"** tab
3. See real-time logs

### Frontend Logs

1. Go to static site
2. Click **"Logs"** tab
3. See build logs

### Metrics

- Click **"Metrics"** tab
- See bandwidth, requests, response times

---

## 🎯 Quick Checklist

Before deploying:
- [ ] Code pushed to GitHub
- [ ] Backend uses `process.env.PORT`
- [ ] Frontend `.env.production` exists
- [ ] All dependencies in `package.json`

After deploying backend:
- [ ] Backend URL copied
- [ ] Frontend `.env.production` updated
- [ ] Changes committed and pushed

After deploying frontend:
- [ ] App loads successfully
- [ ] Avatar responds to messages
- [ ] Voice input works
- [ ] No console errors

---

## 🆘 Need Help?

### Check These First:
1. **Render Logs** - Most errors show here
2. **Browser Console** - Frontend errors appear here
3. **Network Tab** - See API requests/responses

### Common Commands:

```bash
# Test backend locally
cd apps/backend
npm install
npm start

# Test frontend locally
cd apps/frontend
npm install
npm run dev

# Check environment variables
cat apps/frontend/.env.production
cat apps/frontend/.env.development
```

---

## 🎊 Success!

Your HealBot Avatar is now live on Render! 🚀

**Share your deployment:**
- Frontend: `https://YOUR-FRONTEND-NAME.onrender.com`
- Backend: `https://YOUR-BACKEND-NAME.onrender.com`

**Next Steps:**
- [ ] Test all features thoroughly
- [ ] Share with users
- [ ] Monitor logs for issues
- [ ] Consider upgrading to paid plan for production

---

## 📝 Notes

- **First request is slow** - Backend wakes up from sleep (free tier)
- **HTTPS is automatic** - Render provides SSL certificates
- **Auto-deploy enabled** - Push to GitHub = automatic deployment
- **Logs are persistent** - Check anytime for debugging

Enjoy your deployed HealBot Avatar! 🎉

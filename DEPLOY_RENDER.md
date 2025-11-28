# Deployment Guide for Render

This guide will help you deploy the Talking Avatar application to Render.

## Prerequisites

1. A GitHub account
2. A Render account (free tier works fine)
3. Push your code to a GitHub repository

## Deployment Steps

### Part 1: Deploy Backend

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Create Backend Service on Render**:
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click **"New +"** → **"Web Service"**
   - Connect your GitHub repository
   - Configure:
     - **Name**: `talking-avatar-backend`
     - **Root Directory**: `apps/backend`
     - **Environment**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Instance Type**: `Free`

3. **Add Environment Variables** (if needed):
   - Click **"Environment"** tab
   - Add any required variables

4. **Deploy**:
   - Click **"Create Web Service"**
   - Wait for deployment (5-10 minutes)
   - Copy the backend URL (e.g., `https://talking-avatar-backend.onrender.com`)

### Part 2: Deploy Frontend

1. **Update Frontend Configuration**:
   - Edit `apps/frontend/src/hooks/useSpeech.jsx`
   - Change line 3:
     ```javascript
     const backendUrl = "https://YOUR-BACKEND-URL.onrender.com";
     ```
   - Replace with your actual backend URL from Part 1

2. **Commit Changes**:
   ```bash
   git add .
   git commit -m "Update backend URL for production"
   git push
   ```

3. **Create Frontend Service on Render**:
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click **"New +"** → **"Static Site"**
   - Connect your GitHub repository
   - Configure:
     - **Name**: `talking-avatar-frontend`
     - **Root Directory**: `apps/frontend`
     - **Build Command**: `npm install && npm run build`
     - **Publish Directory**: `dist`

4. **Deploy**:
   - Click **"Create Static Site"**
   - Wait for deployment (5-10 minutes)
   - Your app will be live at `https://talking-avatar-frontend.onrender.com`

## Important Notes

### Free Tier Limitations
- **Backend sleeps after 15 minutes of inactivity**
- First request after sleep takes 30-60 seconds
- Solution: Upgrade to paid plan ($7/month) to prevent sleeping

### CORS Configuration
The backend is already configured to accept requests from any origin (`cors()` middleware).

### FFmpeg on Render
FFmpeg is pre-installed on Render's Node environment, so audio processing will work.

### Rhubarb Lip Sync
The Rhubarb binary is included in the repository and will work on Render's Linux environment.

## Testing Your Deployment

1. Open your frontend URL: `https://talking-avatar-frontend.onrender.com`
2. Wait for the backend to wake up (first request may take 30-60 seconds)
3. Try sending a message
4. Check browser console (F12) for any errors

## Troubleshooting

### Backend won't start
- Check Render logs for errors
- Ensure all dependencies are in `package.json`
- Verify Node version compatibility

### Frontend can't connect to backend
- Verify backend URL in `useSpeech.jsx`
- Check CORS settings
- Ensure backend is running (check Render dashboard)

### Audio not working
- Check browser console for errors
- Verify TTS API is responding
- Check audio data is being returned

## Alternative: Deploy Both Together

If you want to deploy both as a single service:

1. Create a new `package.json` in the root:
   ```json
   {
     "scripts": {
       "build": "cd apps/frontend && npm install && npm run build",
       "start": "cd apps/backend && npm install && npm start"
     }
   }
   ```

2. Configure Render to serve frontend from backend:
   - Add static file serving in `apps/backend/server.js`
   - Point to `apps/frontend/dist`

## Cost Estimate

- **Free Tier**: $0/month (with sleep)
- **Starter Plan**: $7/month per service (no sleep)
- **Total for both**: $14/month (recommended for production)

## Support

If you encounter issues:
1. Check Render logs
2. Check browser console
3. Verify all URLs are correct
4. Test locally first with `npm run dev`

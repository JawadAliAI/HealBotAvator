# 🚀 Quick Deploy to Render - Cheat Sheet

## 1️⃣ Push to GitHub
```bash
git add .
git commit -m "Ready for Render deployment"
git push
```

## 2️⃣ Deploy Backend
1. Go to [render.com/dashboard](https://dashboard.render.com/)
2. **New +** → **Web Service**
3. Connect your GitHub repo
4. Settings:
   - **Root Directory:** `apps/backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. **Create Web Service**
6. **Copy the backend URL** (e.g., `https://healbotavator-backend.onrender.com`)

## 3️⃣ Update Frontend Config
Edit `apps/frontend/.env.production`:
```env
VITE_BACKEND_URL=https://YOUR-BACKEND-URL.onrender.com
```

Commit and push:
```bash
git add apps/frontend/.env.production
git commit -m "Update backend URL"
git push
```

## 4️⃣ Deploy Frontend
1. Go to [render.com/dashboard](https://dashboard.render.com/)
2. **New +** → **Static Site**
3. Connect your GitHub repo
4. Settings:
   - **Root Directory:** `apps/frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
5. **Environment Variables:**
   - Key: `VITE_BACKEND_URL`
   - Value: `https://YOUR-BACKEND-URL.onrender.com`
6. **Create Static Site**

## 5️⃣ Done! 🎉
Visit your frontend URL and test the avatar!

---

## ⚡ Quick Test
1. Open your frontend URL
2. Wait 30-60 seconds (backend waking up - first time only)
3. Type a message
4. Watch avatar respond!

---

## 🐛 Troubleshooting

**Backend not responding?**
- Check Render logs
- Visit `https://YOUR-BACKEND-URL.onrender.com/voices` (should show `[]`)

**Frontend can't connect?**
- Verify backend URL in `.env.production`
- Check browser console (F12)

**Audio not working?**
- Check browser console
- Try Chrome browser
- Check backend logs

---

## 💡 Pro Tips

✅ **Free tier backend sleeps** after 15 min → First request takes 30-60 sec
✅ **Upgrade to $7/month** to prevent sleep
✅ **Auto-deploy enabled** → Push to GitHub = automatic deployment
✅ **HTTPS automatic** → Voice input works out of the box

---

## 📋 Deployment Checklist

Before deploying:
- [ ] Code pushed to GitHub
- [ ] `apps/backend/server.js` uses `process.env.PORT`
- [ ] `apps/frontend/.env.production` exists

After backend deploy:
- [ ] Backend URL copied
- [ ] `.env.production` updated with backend URL
- [ ] Changes pushed to GitHub

After frontend deploy:
- [ ] App loads
- [ ] Avatar responds
- [ ] Voice works
- [ ] No errors in console

---

**Need detailed help?** See `RENDER_DEPLOYMENT_GUIDE.md`

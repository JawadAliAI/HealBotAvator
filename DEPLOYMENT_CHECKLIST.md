# ✅ Render Deployment Checklist

Use this checklist to ensure a smooth deployment to Render.

---

## 📋 Pre-Deployment Checklist

### Local Testing
- [ ] Backend runs locally (`cd apps/backend && npm start`)
- [ ] Frontend runs locally (`cd apps/frontend && npm run dev`)
- [ ] Text chat works locally
- [ ] Voice input works locally (HTTPS not required locally)
- [ ] Avatar animations work
- [ ] Lip-sync works
- [ ] No console errors

### Code Preparation
- [ ] All changes committed (`git status` shows clean)
- [ ] Code pushed to GitHub (`git push`)
- [ ] Repository is public (or Render has access)
- [ ] `.env.production` file exists in `apps/frontend/`
- [ ] `.env.development` file exists in `apps/frontend/`

### File Verification
- [ ] `apps/backend/server.js` uses `process.env.PORT || 3000`
- [ ] `apps/frontend/src/hooks/useSpeech.jsx` uses `import.meta.env.VITE_BACKEND_URL`
- [ ] `render.yaml` exists in root directory
- [ ] All deployment guides created

---

## 🖥️ Backend Deployment Checklist

### Create Service
- [ ] Logged into [Render Dashboard](https://dashboard.render.com/)
- [ ] Clicked "New +" → "Web Service"
- [ ] Connected GitHub repository
- [ ] Selected correct repository

### Configure Service
- [ ] **Name:** `healbotavator-backend` (or your choice)
- [ ] **Region:** Selected (e.g., Oregon)
- [ ] **Root Directory:** `apps/backend`
- [ ] **Environment:** `Node`
- [ ] **Build Command:** `npm install`
- [ ] **Start Command:** `npm start`
- [ ] **Instance Type:** `Free` (or Starter)

### Deploy
- [ ] Clicked "Create Web Service"
- [ ] Watched logs for errors
- [ ] Deployment completed successfully
- [ ] Service shows "Live" status

### Verify Backend
- [ ] Copied backend URL (e.g., `https://healbotavator-backend.onrender.com`)
- [ ] Visited `https://YOUR-BACKEND-URL.onrender.com/voices`
- [ ] Saw `[]` response (empty array)
- [ ] No errors in Render logs

**Backend URL:** _______________________________________________

---

## 🎨 Frontend Configuration Checklist

### Update Environment File
- [ ] Opened `apps/frontend/.env.production`
- [ ] Updated `VITE_BACKEND_URL` with actual backend URL
- [ ] Saved file

**Example:**
```env
VITE_BACKEND_URL=https://healbotavator-backend.onrender.com
```

### Commit Changes
- [ ] Ran `git add apps/frontend/.env.production`
- [ ] Ran `git commit -m "Update production backend URL"`
- [ ] Ran `git push`
- [ ] Verified push succeeded

---

## 🌐 Frontend Deployment Checklist

### Create Static Site
- [ ] Logged into [Render Dashboard](https://dashboard.render.com/)
- [ ] Clicked "New +" → "Static Site"
- [ ] Connected GitHub repository
- [ ] Selected correct repository

### Configure Site
- [ ] **Name:** `healbotavator` (or your choice)
- [ ] **Region:** Same as backend
- [ ] **Root Directory:** `apps/frontend`
- [ ] **Build Command:** `npm install && npm run build`
- [ ] **Publish Directory:** `dist`

### Environment Variables
- [ ] Clicked "Advanced" → "Add Environment Variable"
- [ ] **Key:** `VITE_BACKEND_URL`
- [ ] **Value:** Your backend URL (e.g., `https://healbotavator-backend.onrender.com`)

### Deploy
- [ ] Clicked "Create Static Site"
- [ ] Watched build logs for errors
- [ ] Build completed successfully
- [ ] Site shows "Live" status

### Verify Frontend
- [ ] Copied frontend URL (e.g., `https://healbotavator.onrender.com`)
- [ ] Visited frontend URL in browser
- [ ] Page loads without errors
- [ ] 3D avatar appears

**Frontend URL:** _______________________________________________

---

## 🧪 Testing Checklist

### Initial Load
- [ ] Frontend loads in < 5 seconds
- [ ] 3D avatar renders correctly
- [ ] No errors in browser console (F12)
- [ ] Chat interface visible

### Backend Wake (First Request)
- [ ] Waited 30-60 seconds for backend to wake
- [ ] Backend responded successfully
- [ ] No timeout errors

### Text Chat
- [ ] Typed a test message
- [ ] Clicked send
- [ ] Avatar responded with speech
- [ ] Lip-sync matched audio
- [ ] Animations triggered correctly
- [ ] Facial expressions worked

### Voice Input
- [ ] Clicked microphone button
- [ ] Granted microphone permission
- [ ] Spoke a message
- [ ] Speech recognized correctly
- [ ] Avatar responded
- [ ] Voice input stopped after response

### Multiple Messages
- [ ] Sent 3-5 messages in a row
- [ ] All responses worked
- [ ] No memory leaks
- [ ] No audio glitches
- [ ] Animations smooth

### Different Browsers
- [ ] Tested in Chrome
- [ ] Tested in Edge
- [ ] Tested in Safari (if available)
- [ ] Voice input works (Chrome/Edge/Safari only)

### Mobile Testing (Optional)
- [ ] Tested on mobile device
- [ ] Avatar renders on mobile
- [ ] Touch controls work
- [ ] Audio plays on mobile

---

## 🔍 Verification Checklist

### Backend Health
- [ ] `/voices` endpoint returns `[]`
- [ ] No errors in Render logs
- [ ] Service status is "Live"
- [ ] No memory warnings

### Frontend Health
- [ ] No 404 errors for assets
- [ ] No CORS errors
- [ ] WebGL working
- [ ] Audio context created

### Network
- [ ] Backend URL correct in frontend
- [ ] HTTPS on both services
- [ ] API requests succeeding
- [ ] Audio data transferring

### Performance
- [ ] First load < 5 seconds
- [ ] Response time < 3 seconds
- [ ] Audio latency < 2 seconds
- [ ] Smooth animations (30+ FPS)

---

## 📊 Monitoring Checklist

### Set Up Monitoring
- [ ] Bookmarked Render dashboard
- [ ] Checked backend logs
- [ ] Checked frontend logs
- [ ] Reviewed metrics

### Regular Checks
- [ ] Check logs daily (first week)
- [ ] Monitor bandwidth usage
- [ ] Check for errors
- [ ] Verify uptime

---

## 🐛 Troubleshooting Checklist

### If Backend Won't Start
- [ ] Checked Render logs for errors
- [ ] Verified `package.json` has all dependencies
- [ ] Confirmed `server.js` uses `process.env.PORT`
- [ ] Tried manual redeploy

### If Frontend Won't Build
- [ ] Checked build logs for errors
- [ ] Verified `package.json` is correct
- [ ] Confirmed all imports are valid
- [ ] Checked for TypeScript errors

### If Can't Connect
- [ ] Verified backend URL in `.env.production`
- [ ] Checked CORS configuration
- [ ] Confirmed backend is running
- [ ] Tested `/voices` endpoint directly

### If Audio Not Working
- [ ] Checked browser console
- [ ] Verified TTS API responding
- [ ] Confirmed audio data returned
- [ ] Tested in different browser

### If Voice Input Not Working
- [ ] Confirmed using HTTPS
- [ ] Checked microphone permissions
- [ ] Verified browser support (Chrome/Edge/Safari)
- [ ] Tested with different microphone

---

## 💰 Cost Tracking Checklist

### Free Tier
- [ ] Confirmed using free tier
- [ ] Noted sleep behavior (15 min)
- [ ] Aware of bandwidth limits (100 GB/month)
- [ ] Monitoring usage

### Upgrade Considerations
- [ ] Backend sleep is acceptable? (Yes/No)
- [ ] Traffic within limits? (Yes/No)
- [ ] Need 24/7 uptime? (Yes/No)
- [ ] Budget for $7/month? (Yes/No)

---

## 🎉 Post-Deployment Checklist

### Documentation
- [ ] Updated README with live URLs
- [ ] Documented any issues encountered
- [ ] Created user guide (if needed)
- [ ] Shared deployment experience

### Sharing
- [ ] Shared frontend URL with team/users
- [ ] Created demo video (optional)
- [ ] Posted on social media (optional)
- [ ] Gathered feedback

### Maintenance
- [ ] Set up monitoring alerts
- [ ] Planned update schedule
- [ ] Documented known issues
- [ ] Created backup plan

---

## 📝 Notes Section

### Backend Deployment Notes
```
Date: __________
Time: __________
Issues: _________________________________________________________
Solutions: ______________________________________________________
```

### Frontend Deployment Notes
```
Date: __________
Time: __________
Issues: _________________________________________________________
Solutions: ______________________________________________________
```

### Testing Notes
```
Date: __________
Browsers Tested: ________________________________________________
Issues Found: ___________________________________________________
Performance: ____________________________________________________
```

### User Feedback
```
Date: __________
Feedback: _______________________________________________________
Action Items: ___________________________________________________
```

---

## ✅ Final Sign-Off

- [ ] All checklist items completed
- [ ] App fully functional
- [ ] No critical errors
- [ ] Ready for users

**Deployed By:** _______________________________________________

**Date:** _______________________________________________

**Frontend URL:** _______________________________________________

**Backend URL:** _______________________________________________

**Status:** ✅ LIVE AND WORKING

---

## 🎊 Congratulations!

Your HealBot Avatar is now deployed on Render!

**Next Steps:**
1. Monitor logs for first 24 hours
2. Gather user feedback
3. Plan improvements
4. Enjoy your deployed app! 🚀

---

**Need help?** Refer to:
- `QUICK_DEPLOY.md` - Quick reference
- `RENDER_DEPLOYMENT_GUIDE.md` - Detailed guide
- `DEPLOYMENT_WORKFLOW.md` - Visual workflow
- `DEPLOYMENT_SUMMARY.md` - Changes summary

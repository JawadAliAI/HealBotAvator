# 🏥 HealBot Avatar - AI Medical Assistant with 3D Avatar

A fully interactive 3D medical avatar powered by AI that can chat, speak, and respond with realistic lip-sync and animations.

![HealBot Avatar](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![Platform](https://img.shields.io/badge/Platform-Render-purple)

## ✨ Features

- 🤖 **AI-Powered Chat** - Intelligent medical assistant conversations
- 🎙️ **Voice Input** - Speak to the avatar using Web Speech API
- 🔊 **Text-to-Speech** - Natural voice responses with Edge TTS
- 💋 **Lip Sync** - Realistic mouth movements synced to speech
- 🎭 **Emotional Animations** - Dynamic facial expressions and body language
- 🌐 **Web-Based** - No installation required, runs in browser
- 🆓 **100% Free** - Uses free APIs and services

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/HealBotAvator.git
   cd HealBotAvator
   ```

2. **Start the backend**
   ```bash
   cd apps/backend
   npm install
   npm start
   ```

3. **Start the frontend** (in a new terminal)
   ```bash
   cd apps/frontend
   npm install
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Deploy to Render

See **[QUICK_DEPLOY.md](QUICK_DEPLOY.md)** for rapid deployment or **[RENDER_DEPLOYMENT_GUIDE.md](RENDER_DEPLOYMENT_GUIDE.md)** for detailed instructions.

**One-Click Deploy:**
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

## 📁 Project Structure

```
HealBotAvator/
├── apps/
│   ├── backend/              # Node.js Express server
│   │   ├── server.js         # Main server file
│   │   ├── modules/
│   │   │   ├── customAPI.mjs # Chat, TTS, STT integration
│   │   │   └── lip-sync.mjs  # Lip-sync generation
│   │   └── package.json
│   │
│   └── frontend/             # React + Three.js app
│       ├── src/
│       │   ├── components/   # 3D Avatar components
│       │   ├── hooks/        # React hooks (useSpeech)
│       │   └── constants/    # Animations, expressions
│       ├── public/           # 3D models, animations
│       └── package.json
│
├── render.yaml               # Render deployment config
├── QUICK_DEPLOY.md          # Quick deployment guide
└── RENDER_DEPLOYMENT_GUIDE.md # Detailed deployment guide
```

## 🛠️ Technology Stack

### Frontend
- **React** - UI framework
- **Three.js** - 3D rendering
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful Three.js helpers
- **Vite** - Build tool
- **Tailwind CSS** - Styling

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **Edge TTS** - Free text-to-speech
- **Rhubarb Lip-Sync** - Phoneme generation
- **Custom Chat API** - AI conversation

## 🎯 How It Works

1. **User Input** → User types or speaks a message
2. **Speech Recognition** → Web Speech API converts voice to text (frontend)
3. **Chat API** → Message sent to custom medical AI API
4. **AI Response** → AI generates medical advice/response
5. **Text-to-Speech** → Edge TTS converts text to audio
6. **Lip-Sync** → Rhubarb generates phoneme timings
7. **Animation** → Avatar speaks with synced lip movements
8. **Facial Expressions** → Emotions detected and displayed

## 🎨 Avatar Features

### Animations
- **Talking** - Multiple talking variations
- **Happy** - Joyful expressions
- **Sad** - Empathetic responses
- **Surprised** - Reactive animations
- **Angry** - Serious tone
- **Idle** - Natural breathing and blinking

### Facial Expressions
- Smile, Sad, Angry, Surprised, Crazy, Funky Face
- Automatic emotion detection from text
- Smooth transitions between expressions

### Lip Sync
- Real-time phoneme mapping
- 9 viseme positions (A, B, C, D, E, F, G, H, X)
- Synchronized with audio playback

## 🔧 Configuration

### Environment Variables

**Frontend** (`apps/frontend/.env.production`):
```env
VITE_BACKEND_URL=https://your-backend.onrender.com
```

**Backend**:
- `PORT` - Auto-assigned by Render (default: 3000)
- `NODE_ENV` - Set to `production` on Render

### Custom API Integration

The backend uses a custom medical chatbot API. To use your own:

Edit `apps/backend/modules/customAPI.mjs`:
```javascript
const API_BASE_URL = "https://your-api.com";
```

API Requirements:
- **POST /chat** - Chat endpoint
  - Request: `{ message: string, user_id: string, language: string }`
  - Response: `{ reply: string }`
- **POST /tts** - Text-to-speech endpoint
  - Request: `{ text: string }`
  - Response: Audio buffer (MP3/WAV)
- **POST /stt** - Speech-to-text endpoint (optional, frontend uses Web Speech API)
  - Request: FormData with audio file
  - Response: `{ text: string }`

## 📊 Performance

- **First Load** - 2-3 seconds
- **Backend Wake** - 30-60 seconds (free tier, first request only)
- **Response Time** - 1-3 seconds
- **Audio Generation** - 1-2 seconds
- **Lip-Sync Processing** - 0.5-1 second

## 🌐 Browser Support

| Browser | Voice Input | Audio | 3D Avatar |
|---------|-------------|-------|-----------|
| Chrome  | ✅ | ✅ | ✅ |
| Edge    | ✅ | ✅ | ✅ |
| Safari  | ✅ | ✅ | ✅ |
| Firefox | ❌ | ✅ | ✅ |

**Note:** Voice input requires HTTPS (automatic on Render)

## 🐛 Troubleshooting

### Backend Issues
- **Service sleeping** - First request takes 30-60s on free tier
- **Port errors** - Ensure `process.env.PORT` is used
- **Module errors** - Run `npm install` in `apps/backend`

### Frontend Issues
- **Can't connect to backend** - Check `VITE_BACKEND_URL` in `.env.production`
- **CORS errors** - Backend already configured with `cors()`
- **3D model not loading** - Check browser console, ensure WebGL is supported

### Audio Issues
- **No sound** - Check browser permissions, unmute tab
- **Lip-sync off** - Check backend logs for Rhubarb errors
- **TTS fails** - Edge TTS might be rate-limited, wait and retry

### Voice Input Issues
- **Not working** - Requires HTTPS, Chrome/Edge/Safari
- **No permission** - Grant microphone access in browser settings
- **Not detecting speech** - Speak clearly, check microphone

## 💰 Costs

### Free Tier (Render)
- **Backend** - Free (sleeps after 15 min)
- **Frontend** - Free
- **Total** - $0/month

### Production (Recommended)
- **Backend** - $7/month (no sleep)
- **Frontend** - Free
- **Total** - $7/month

### APIs Used
- **Chat API** - Custom (free/paid depending on your API)
- **Edge TTS** - Free (Microsoft)
- **Web Speech API** - Free (browser built-in)

## 📝 License

MIT License - See [LICENSE](LICENSE) file for details

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 🙏 Acknowledgments

- **3D Model** - Ready Player Me
- **Animations** - Mixamo
- **Lip-Sync** - Rhubarb Lip-Sync
- **TTS** - Microsoft Edge TTS
- **Framework** - React Three Fiber

## 📧 Support

- **Issues** - [GitHub Issues](https://github.com/YOUR-USERNAME/HealBotAvator/issues)
- **Discussions** - [GitHub Discussions](https://github.com/YOUR-USERNAME/HealBotAvator/discussions)

## 🎉 Live Demo

**Frontend:** https://healbotavator.onrender.com
**Backend:** https://healbotavator-backend.onrender.com

---

Made with ❤️ by [Your Name]

**Star ⭐ this repo if you find it helpful!**

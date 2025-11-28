# Talking Avatar with AI

This project implements a 3D talking avatar that interacts with users via text or speech. It features a React frontend with Three.js for the 3D avatar and a Node.js backend that handles text-to-speech (TTS), speech-to-text (STT), and lip-sync generation.

## ✨ Features

*   **3D Avatar**: Realistic 3D avatar with idle, talking, and emotional animations.
*   **Lip Sync**: Accurate lip synchronization using Rhubarb Lip Sync.
*   **Voice Interaction**: Speak to the avatar using the microphone (Speech-to-Text).
*   **Text Interaction**: Type messages to chat with the avatar.
*   **Patient Context**: Enter a specific Patient Name or ID to maintain conversation context with the backend API.
*   **Custom API Integration**: Fully integrated with a custom medical chatbot API.

## Prerequisites

Before running the application, ensure you have the following installed:

1.  **Node.js** (v18 or higher recommended)
2.  **FFmpeg**: Required for audio processing (converting MP3 to WAV).
    *   **Windows**: Download from [ffmpeg.org](https://ffmpeg.org/download.html), extract it, and add the `bin` folder to your system PATH.
    *   **Mac**: `brew install ffmpeg`
    *   **Linux**: `sudo apt install ffmpeg`
3.  **Rhubarb Lip Sync**: The binary is included in the `Rhubarb-Lip-Sync-1.14.0-Windows` folder. The backend is configured to use this automatically.

## Installation

1.  Clone the repository.
2.  Install dependencies for the entire workspace (root, backend, and frontend):

    ```bash
    npm install
    ```

## Running the Application

To start both the backend and frontend servers concurrently:

```bash
npm run dev
```

*   **Frontend**: Runs on `http://localhost:5173` (default Vite port)
*   **Backend**: Runs on `http://localhost:3000`

## 🩺 Usage Guide

1.  **Open the App**: Navigate to `http://localhost:5173` in your browser.
2.  **Set Patient ID**:
    *   At the bottom of the screen, you will see an input field labeled **"Patient Name / ID (Optional)"**.
    *   Enter a unique identifier (e.g., "JohnDoe" or "Patient_101").
    *   *Default*: If left empty, it uses `demo_user_123`.
3.  **Chat**:
    *   **Type**: Type your message in the main input box and press Enter or click Send.
    *   **Speak**: Click the **Microphone** button. Allow browser permissions if asked. Speak your message, and click the button again to stop (or wait for it to finish).
4.  **Response**: The avatar will respond with audio and lip-sync animations based on the medical chatbot's reply.

## Integration Guide

To integrate this talking avatar into your existing website, you have two main options:

### Method 1: Iframe (Recommended)

This is the simplest way to embed the avatar.

1.  **Host the Application**: Deploy this application (frontend and backend) to a hosting provider (e.g., Vercel/Netlify for frontend, Render/Heroku for backend).
2.  **Embed via Iframe**: Add the following HTML to your website:

    ```html
    <iframe
      src="https://your-deployed-frontend-url.com"
      width="100%"
      height="600px"
      frameborder="0"
      allow="microphone"
      style="border-radius: 10px; overflow: hidden;"
    ></iframe>
    ```

    *   **Note**: The `allow="microphone"` attribute is crucial if you want to enable voice interaction.

### Method 2: Custom Integration (Advanced)

If you want deeper integration (e.g., overlaying the avatar on your site without an iframe):

1.  **Build the Frontend**:
    ```bash
    cd apps/frontend
    npm run build
    ```
    This will generate a `dist` folder with static assets.

2.  **Serve Static Files**: You can serve these files from a subpath of your main website (e.g., `/avatar`).

3.  **Modify Styling**:
    The current `App.jsx` is designed to take up the full screen (`100vw`, `100vh`). You may need to modify `apps/frontend/src/App.jsx` to fit within a specific container:

    ```jsx
    // apps/frontend/src/App.jsx
    <Canvas
      style={{ position: 'relative', width: '100%', height: '100%' }}
      // ...
    >
    ```

## Project Structure

*   `apps/frontend`: React application (Vite + Three.js + React Three Fiber).
*   `apps/backend`: Express server handling API requests, audio generation, and lip-syncing.
*   `apps/backend/modules`: Contains logic for `customAPI` (Chat/TTS/STT) and `lip-sync`.
*   `Rhubarb-Lip-Sync-1.14.0-Windows`: Tool used for generating lip-sync data from audio.

## API Configuration

The backend connects to a custom API for Chat, TTS, and STT.
To modify the API endpoint, edit `apps/backend/modules/customAPI.mjs`:

```javascript
const API_BASE_URL = "https://your-custom-api-url.com";
```

The `chat` function now accepts a `userId` to maintain session context:

```javascript
chat: async (message, userId) => { ... }
```

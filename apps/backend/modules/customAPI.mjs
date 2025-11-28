import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const API_BASE_URL = "https://finalchatdoc.onrender.com";

const customAPI = {
    chat: async (message, userId) => {
        try {
            const effectiveUserId = userId || "demo_user_123";
            console.log(`Sending Chat request to ${API_BASE_URL}/chat for user: ${effectiveUserId}`);
            const response = await fetch(`${API_BASE_URL}/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: message,
                    user_id: effectiveUserId,
                    language: "en"
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Chat API error: ${response.status} ${response.statusText} - ${errorText}`);
            }

            const data = await response.json();

            // The API returns the message in the 'reply' field
            const botResponse = data.reply || data.response || data.message || "I didn't get a reply.";

            return botResponse;
        } catch (error) {
            console.error("Chat API Error:", error);
            return "I'm having trouble connecting to the doctor right now. Please try again later.";
        }
    },

    tts: async (text) => {
        try {
            console.log(`Sending TTS request to ${API_BASE_URL}/tts for text: "${text.substring(0, 20)}..."`);
            const response = await fetch(`${API_BASE_URL}/tts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`TTS API error: ${response.status} ${response.statusText} - ${errorText}`);
            }

            const arrayBuffer = await response.arrayBuffer();
            return Buffer.from(arrayBuffer);
        } catch (error) {
            console.error("TTS API Error:", error);
            // Fallback to silent buffer to prevent crash
            return Buffer.alloc(1024);
        }
    },

    stt: async (audioBuffer) => {
        try {
            console.log(`Sending STT request to ${API_BASE_URL}/stt`);

            // Create a Blob from the buffer
            const blob = new Blob([audioBuffer], { type: 'audio/wav' });

            const formData = new FormData();
            formData.append("audio", blob, "input.wav");

            const response = await fetch(`${API_BASE_URL}/stt`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`STT API error: ${response.status} ${response.statusText} - ${errorText}`);
            }

            const data = await response.json();
            return data.text;
        } catch (error) {
            console.error("STT API Error:", error);
            return "I couldn't hear you.";
        }
    },
};

export default customAPI;

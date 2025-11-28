import say from 'say';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateSystemTTS = async (text) => {
    return new Promise((resolve, reject) => {
        try {
            // Create a temporary file path
            const tempFile = path.join(__dirname, '..', 'tmp', `tts_${Date.now()}.wav`);

            // Ensure tmp directory exists
            const tmpDir = path.join(__dirname, '..', 'tmp');
            if (!fs.existsSync(tmpDir)) {
                fs.mkdirSync(tmpDir, { recursive: true });
            }

            // Export to WAV file using system TTS
            // On Windows, this will use Microsoft David (male voice) by default
            say.export(text, null, 1.0, tempFile, (err) => {
                if (err) {
                    reject(err);
                    return;
                }

                // Read the file and return as buffer
                const audioBuffer = fs.readFileSync(tempFile);

                // Clean up temp file
                try {
                    fs.unlinkSync(tempFile);
                } catch (cleanupErr) {
                    console.warn('Could not delete temp file:', cleanupErr);
                }

                resolve(audioBuffer);
            });
        } catch (error) {
            reject(error);
        }
    });
};

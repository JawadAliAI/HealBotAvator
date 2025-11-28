import gTTS from 'gtts';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateGoogleTTS = async (text) => {
    return new Promise((resolve, reject) => {
        try {
            // Create a gtts instance - use default export
            const speech = new gTTS.default(text, 'en');

            // Create a temporary file path
            const tempFile = path.join(__dirname, '..', 'tmp', `tts_${Date.now()}.mp3`);

            // Ensure tmp directory exists
            const tmpDir = path.join(__dirname, '..', 'tmp');
            if (!fs.existsSync(tmpDir)) {
                fs.mkdirSync(tmpDir, { recursive: true });
            }

            // Save to file
            speech.save(tempFile, (err) => {
                if (err) {
                    console.error('gTTS save error:', err);
                    reject(err);
                    return;
                }

                // Read the file and return as buffer
                try {
                    const audioBuffer = fs.readFileSync(tempFile);

                    // Clean up temp file
                    try {
                        fs.unlinkSync(tempFile);
                    } catch (cleanupErr) {
                        console.warn('Could not delete temp file:', cleanupErr);
                    }

                    resolve(audioBuffer);
                } catch (readErr) {
                    console.error('File read error:', readErr);
                    reject(readErr);
                }
            });
        } catch (error) {
            console.error('gTTS creation error:', error);
            reject(error);
        }
    });
};

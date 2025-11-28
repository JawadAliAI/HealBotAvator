import { WebSocket } from 'ws';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

const VOICE = 'en-US-ChristopherNeural'; // Male voice, professional
// Other options: en-US-AriaNeural, en-US-GuyNeural, en-US-JennyNeural

const createSSML = (text, voice) => `
<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='en-US'>
    <voice name='${voice}'>
        <prosody rate='0%' pitch='0%'>
            ${text}
        </prosody>
    </voice>
</speak>
`;

export const generateEdgeTTS = async (text) => {
    return new Promise((resolve, reject) => {
        const ws = new WebSocket('wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1?TrustedClientToken=6A5AA1D4-EA85-44CA-8150-78AA12FDF9A8');
        const requestId = uuidv4();
        const audioChunks = [];

        ws.on('open', () => {
            // Send configuration
            ws.send(`X-Timestamp:${new Date().toString()}\r\nContent-Type:application/json; charset=utf-8\r\nPath:speech.config\r\n\r\n{"context":{"synthesis":{"audio":{"metadataoptions":{"sentenceBoundaryEnabled":"false","wordBoundaryEnabled":"false"},"outputFormat":"audio-24khz-48kbitrate-mono-mp3"}}}}`);

            // Send SSML
            const ssml = createSSML(text, VOICE);
            ws.send(`X-RequestId:${requestId}\r\nContent-Type:application/ssml+xml\r\nX-Timestamp:${new Date().toString()}\r\nPath:ssml\r\n\r\n${ssml}`);
        });

        ws.on('message', (data, isBinary) => {
            if (isBinary) {
                const separator = "Path:audio\r\n";
                const index = data.indexOf(separator);
                if (index >= 0) {
                    const audioData = data.slice(index + separator.length);
                    audioChunks.push(audioData);
                }
            }
        });

        ws.on('close', () => {
            const audioBuffer = Buffer.concat(audioChunks);
            if (audioBuffer.length > 0) {
                resolve(audioBuffer);
            } else {
                reject(new Error('No audio data received from Edge TTS'));
            }
        });

        ws.on('error', (error) => {
            reject(error);
        });
    });
};

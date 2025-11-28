import { textToSpeech } from 'edge-tts-client';

// Male voices available:
// 'en-US-GuyNeural' - Adult Male
// 'en-US-ChristopherNeural' - Adult Male (Professional)
// 'en-US-EricNeural' - Adult Male
// 'en-US-RogerNeural' - Senior Male
// 'en-GB-RyanNeural' - British Male

const VOICE = 'en-US-GuyNeural'; // Professional male voice

export const generateEdgeTTSProper = async (text) => {
    try {
        const audioBuffer = await textToSpeech(text, {
            voice: VOICE,
            rate: '0%',
            pitch: '0Hz'
        });

        return Buffer.from(audioBuffer);
    } catch (error) {
        console.error('Edge TTS generation error:', error);
        throw error;
    }
};

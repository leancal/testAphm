// pages/api/audio.js
import { getAllAudio } from '../../../database/controllers/AudioController';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        await getAllAudio(req, res);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

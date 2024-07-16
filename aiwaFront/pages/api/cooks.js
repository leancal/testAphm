// pages/api/audio.js
import { getAllCooks } from '../../../database/controllers/CooksController';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        await getAllCooks(req, res);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

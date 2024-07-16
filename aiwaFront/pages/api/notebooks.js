// pages/api/audio.js
import { getAllNotebooks } from '../../../database/controllers/NotebooksController';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        await getAllNotebooks(req, res);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

// pages/api/headsets.js
import { getAllHeadsets } from '../../../database/controllers/HeadsetsController';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        await getAllHeadsets(req, res);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

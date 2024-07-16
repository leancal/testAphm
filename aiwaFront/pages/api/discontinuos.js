
import { getAllDiscontinuos } from '../../../database/controllers/DiscontinuosControllers';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        await getAllDiscontinuos(req, res);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

import { getAllTablet } from '../../../database/controllers/TabletsController';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        await getAllTablet(req, res);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

import { getAllFeatures } from "../../../database/controllers/FeaturesController";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        await getAllFeatures(req, res);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
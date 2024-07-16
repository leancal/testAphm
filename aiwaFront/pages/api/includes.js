import { getAllInclude } from "../../../database/controllers/IncludeController";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        await getAllInclude(req, res);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
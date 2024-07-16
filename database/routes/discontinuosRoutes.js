import express from 'express';
import { createDiscontinuo, deleteDiscontinuo, getAllDiscontinuos, getDiscontinuo, updateDiscontinuo } from '../controllers/DiscontinuosControllers.js';

const router = express.Router();

router.get('/', getAllDiscontinuos);
router.get('/:id', getDiscontinuo);
router.post('/', createDiscontinuo);
router.put('/:id', updateDiscontinuo);
router.delete('/:id', deleteDiscontinuo);

export default router;
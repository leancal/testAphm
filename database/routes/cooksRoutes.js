import express from 'express';
import { getAllCooks, getCooks, createCooks, updateCooks, deleteCooks } from '../controllers/CooksController.js';

const router = express.Router();

router.get('/', getAllCooks);
router.get('/:id', getCooks);
router.post('/', createCooks);
router.put('/:id', updateCooks);
router.delete('/:id', deleteCooks);

export default router;
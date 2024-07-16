import express from 'express';
import { createNotebooks, deleteNotebooks, getAllNotebooks, getNotebooks, updateNotebooks } from '../controllers/NotebooksController.js';

const router = express.Router();

router.get('/', getAllNotebooks);
router.get('/:id', getNotebooks);
router.post('/', createNotebooks);
router.put('/:id', updateNotebooks);
router.delete('/:id', deleteNotebooks);

export default router;
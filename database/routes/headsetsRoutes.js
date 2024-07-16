
import express from 'express';
import { createHeadsets, deleteHeadsets, getAllHeadsets, getHeadsets, updateHeadsets } from '../controllers/HeadsetsController.js';

const router = express.Router();

router.get('/', getAllHeadsets);
router.get('/:id', getHeadsets);
router.post('/', createHeadsets);
router.put('/:id', updateHeadsets);
router.delete('/:id', deleteHeadsets);

export default router;
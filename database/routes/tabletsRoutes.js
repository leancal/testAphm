import express from 'express';
import { createTablet, deleteTablet, getAllTablet, getTablet, updateTablet } from '../controllers/TabletsController.js';

const router = express.Router();

router.get('/', getAllTablet);
router.get('/:id', getTablet);
router.post('/', createTablet);
router.put('/:id', updateTablet);
router.delete('/:id', deleteTablet);

export default router;
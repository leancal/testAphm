import express from 'express';
import { getAllInclude, getInclude, createInclude, updateInclude, deleteInclude } from '../controllers/IncludeController.js';

const router = express.Router();


router.get('/', getAllInclude);
router.get('/:id', getInclude);
router.post('/', createInclude);
router.put('/:id', updateInclude);
router.delete('/:id', deleteInclude);

export default router;
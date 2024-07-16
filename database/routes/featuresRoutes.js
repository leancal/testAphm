import express from 'express';
import { createFeatures, deleteFeatures, getAllFeatures, getFeatures, updateFeatures } from '../controllers/FeaturesController.js';

const router = express.Router();


router.get('/', getAllFeatures);
router.get('/:id', getFeatures);
router.post('/', createFeatures);
router.put('/:id', updateFeatures);
router.delete('/:id', deleteFeatures);

export default router;
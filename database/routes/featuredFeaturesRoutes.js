import express from 'express';
import { createFeaturedFeatures, deleteFeaturedFeatures, getAllFeaturedFeatures, getFeaturedFeatures, updateFeaturedFeatures } from '../controllers/FeaturedFeaturesController.js';

const router = express.Router();


router.get('/', getAllFeaturedFeatures);
router.get('/:id', getFeaturedFeatures);
router.post('/', createFeaturedFeatures);
router.put('/:id', updateFeaturedFeatures);
router.delete('/:id', deleteFeaturedFeatures);

export default router;
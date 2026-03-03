import express from 'express';
import { getResourcesByCategory } from '../controllers/resourceController.js';

const router = express.Router();

router.get('/:category', getResourcesByCategory);

export default router;
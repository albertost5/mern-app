import { Router } from 'express';
import vetsRouter from './veterinaryRoutes.js';

const router = Router();

router.use('/api/vets', vetsRouter);

export default router;
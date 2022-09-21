import { Router } from 'express';
import vetsRouter from './veterinaryRoutes.js';
import patientsRouter from './patientRoutes.js';

const router = Router();

router.use('/api/vets', vetsRouter);
router.use('/api/patients', patientsRouter);

export default router;
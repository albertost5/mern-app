import express from 'express';
import { register, confirmation, auth } from '../controllers/veterinaryController.js';

const router = express.Router();

router.post('/', register);
router.get('/confirm/:token', confirmation);
router.post('/login', auth);

export default router;


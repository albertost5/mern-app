import express from 'express';
import { profile, register, confirmation } from '../controllers/veterinaryController.js';

const router = express.Router();

router.post('/', register);
router.get('/profile', profile);
router.get('/confirm/:token', confirmation);

export default router;


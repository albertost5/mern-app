import express from 'express';
import { profile, register } from '../controllers/veterinaryController.js';

const router = express.Router();

router.post('/', register);
router.get('/profile', profile);

export default router;


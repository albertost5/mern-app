import express from 'express';
import { register, confirmation, auth, profile } from '../controllers/veterinaryController.js';
import validateJWT from '../middlewares/validateJWT.js';

const router = express.Router();

router.post('/', register);
router.get('/confirm/:token', confirmation);
router.post('/login', auth);
router.get('/profile', validateJWT, profile);

export default router;


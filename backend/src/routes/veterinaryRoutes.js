import express from 'express';
import { register, confirmation, auth, profile, reset, validateToken, newPassword, updateProfile } from '../controllers/veterinaryController.js';
import checkAuth from '../middlewares/checkAuth.js';

const router = express.Router();

router.post('/', register);
router.get('/confirm/:token', confirmation);
router.post('/login', auth);
router.post('/reset-password', reset);
router.route('/reset-password/:token')
        .get(validateToken)
        .post(newPassword);

router.get('/profile', checkAuth, profile);
router.put('/profile/:id', checkAuth, updateProfile)

export default router;


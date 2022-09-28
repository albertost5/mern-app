import express from 'express';
import { addPatient, getPatients, getPatient, updatePatient, deletePatient } from '../controllers/patientController.js';
import checkAuth from '../middlewares/checkAuth.js';


const router = express.Router();

router.route('/')
        .post(checkAuth, addPatient)
        .get(checkAuth, getPatients);
router.route('/:patientId')
        .get(checkAuth, getPatient)
        .put(checkAuth, updatePatient)
        .delete(checkAuth, deletePatient);

export default router;
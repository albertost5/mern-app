import express from 'express';
import { addPatient, getPatients, getPatient, updatePatient, deletePatient } from '../controllers/patientController.js';


const router = express.Router();

router.route('/')
    .post(addPatient)
    .get(getPatients);
router.route('/:patientId')
    .get(getPatient)
    .put(updatePatient)
    .delete(deletePatient);


export default router;
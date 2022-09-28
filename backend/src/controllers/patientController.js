import Patient from '../models/Patient.js';
import errorResponse from '../utils/error.utils.js';
import isValidId from '../helpers/isValid.js';

const addPatient = async (req, res) => {

    const { name, owner, email, description } = req.body;

    if( !name || !owner || !email || !description ) {
        return res.status(400).json( errorResponse('40001', 'Invalid body.') );
    }

    try {
        const patient = new Patient(req.body);
        patient.vet = req.vet.id;
        patient.save();

        res.json({
            message: 'New patient added!'
        });
    } catch (error) {
        return res.status(400).json( errorResponse('40000', 'There was a problem adding the patient.') );
    }
}

const getPatients = async (req, res) => {
    try {
        const patients = await Patient.find({ vet: req.vet.id }).exec();
        // const patients = await Patient.find().where('vet').equals(req.vet.id);
        if( !patients ) return res.status(404).json('40400', 'Patients not found.');

        return res.json({
            patients
        });
    } catch (error) {
        return res.status(400).json( errorResponse('40000', 'There was a problem getting all the patients.') );
    }
}

const getPatient = async(req, res) => {

    const { patientId } = req.params;

    if( !isValidId( patientId) ) return res.status(400).json( errorResponse('40001', 'Invalid id') );
    if( patient.vet !== req.vet.id ) return res.status(403).json( errorResponse('40300', 'Not allowed.') );

    try {
        const patient = await Patient.findById(req.params.patientId);
        if( !patient ) return res.status(404).json('40400', 'Patient not found.');

        return res.json(patient);
    } catch (error) {
        return res.status(400).json( errorResponse('40000', 'There was a proble getting the patient.') );
    }
}

const updatePatient = async (req, res) => {
    const { patientId } = req.params;
    let patient;

    if( !isValidId( patientId) ) return res.status(400).json( errorResponse('40002', 'Invalid id') );
    
    try {
        patient = await Patient.findById(req.params.patientId);
        if( !patient ) return res.status(404).json('40400', 'Patient not found.');
        if( patient.vet != req.vet.id ) return res.status(403).json( errorResponse('40300', 'Not allowed.') );      
    } catch (error) {
        return res.status(400).json( errorResponse('40001', 'There was a proble getting the patient.') );
    }
    
    patient.name = req.body.name || patient.name;
    patient.owner = req.body.owner || patient.owner;
    patient.email = req.body.email || patient.email;
    patient.date = req.body.date || patient.date;
    patient.description = req.body.description || patient.description;

    try {
        const patientUpdated = await patient.save();
        return res.json( patientUpdated );
    } catch (error) {
        return res.status(400).json( errorResponse('40000', 'There was an error updating the patient.') );
    }
}

const deletePatient = async (req, res) => {
    const { patientId } = req.params;

    if( !isValidId( patientId) ) return res.status(400).json( errorResponse('40002', 'Invalid id') );

    let patient; 

    try {
        patient = await Patient.findById(patientId);
    } catch (error) {
        return res.status(400).json( errorResponse('40001', 'Patient not found.') );
    }

    if( !patient ) return res.status(404).json( errorResponse('40400', 'Patient not found.') );
    if( patient.vet != req.vet.id )  return res.status(403).json( errorResponse('40300', 'Not allowed.') );

    try {
        await Patient.deleteOne({ id: patientId });
        return res.json({
            message: 'Patient deleted!'
        });
    } catch (error) {
        return res.status(400).json( errorResponse('40000', 'There was an error deleting the patient.') );
    }
}

export {
    addPatient,
    getPatients,
    getPatient,
    updatePatient,
    deletePatient
}


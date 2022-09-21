
const addPatient = (req, res) => {
    res.json('addPatient');
}

const getPatients = (req, res) => {
    res.json('getPatients');
}

const getPatient = (req, res) => {
    res.json('getPatient');
}

const updatePatient = (req, res) => {
    res.json('updatePatient');
}

const deletePatient = (req, res) => {
    res.json('deletePatient');
}

export {
    addPatient,
    getPatients,
    getPatient,
    updatePatient,
    deletePatient
}


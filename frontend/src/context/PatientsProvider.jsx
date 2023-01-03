import { createContext, useState, useEffect } from "react"
import axiosClient from "../config/axios"
import useAuth from "../hooks/useAuth"


const PatientsContext = createContext()

export const PatientsProvider = ({children}) => {

    const [patients, setPatients] = useState([])
    const [patient, setPatient] = useState({})

    const { auth } = useAuth()

    useEffect(() => {
        
        const findAllPatients = async() => {
            const token = localStorage.getItem('token')
            if ( !token ) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await axiosClient.get('/patients', config)
                setPatients(data)
            } catch (error) {
                console.log('Error finding all patients: ', error)
            }
        }

        findAllPatients();
    }, [auth])


    const savePatient = async(patient) => {
        const token = localStorage.getItem('token')
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if ( patient.id ) {
            try {
                const { data } = await axiosClient.put(`/patients/${patient.id}`, patient, config)
                
                const patientsUpdated = patients.map( patient => patient._id === data._id ? data : patient )
                setPatients(patientsUpdated)
            } catch (error) {
                console.log('Error editing the patient: ', error);
            }
        } else {
            
    
            try {
                const { data } = await axiosClient.post('/patients', patient, config)
                setPatients([data, ...patients])
            } catch (error) {
                console.log('Error creating new patient: ', error.response.data.message);
            }
        }

    }

    const setEdit = (patient) => {
        setPatient(patient)
    }

    const deletePatient = async(id) => {

        const confirmation = confirm('Do you want to delete this patient?')
        
        if ( confirmation ) {
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const { data } = await axiosClient.delete(`/patients/${id}`, config)
                const patientsNotDeleted = patients.filter( p => p._id !== id)
                setPatients(patientsNotDeleted)
            } catch (error) {
                console.log('Error deleting the patient: ', error);
            }
        }
    }

    return (
        <PatientsContext.Provider 
            value={{
                patients,
                savePatient,
                patient,
                setEdit,
                deletePatient
            }}
        >
            {children}
        </PatientsContext.Provider>
    )
}

export default PatientsContext

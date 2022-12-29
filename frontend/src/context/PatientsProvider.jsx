import { createContext, useState, useEffect } from "react"
import axiosClient from "../config/axios"


const PatientsContext = createContext()

export const PatientsProvider = ({children}) => {

    const [patients, setPatients] = useState([])

    const savePatient = async(patient) => {
        const token = localStorage.getItem('token')
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axiosClient.post('/patients', patient, config)
            setPatients([data, ...patients])
        } catch (error) {
            console.log('Error creating new patient: ', error.response.data.message);
        }
    }

    return (
        <PatientsContext.Provider 
            value={{
                patients,
                savePatient
            }}
        >
            {children}
        </PatientsContext.Provider>
    )
}

export default PatientsContext

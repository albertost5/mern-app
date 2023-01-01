import usePatients from "../hooks/usePatients"
import Patient from "./Patient"

const PatientsList = () => {

  const { patients } = usePatients()
  
  return (
    <>
      { patients.length 
        ? (
          <>
            <h2 className="font-black text-3xl text-center">Patients List</h2>
            <p className="text-xl mt-5 mb-10 text-center">Manage your <span className="text-indigo-600 font-bold">patients</span></p>
            { 
              patients.map( patient => (
                <Patient 
                  key={patient._id} 
                  patient={patient} 
                />
              ))
            }
          </>
        )
        : (
            <>
              <h2 className="font-black text-3xl text-center">There are not patients</h2>
              <p className="text-xl mt-5 mb-10 text-center">Start adding your first <span className="text-indigo-600 font-bold">patients</span></p>
            </>
        )
      }
    </>
  )
}

export default PatientsList


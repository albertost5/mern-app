import { useState } from "react"
import Alert from "./Alert"
import usePatients from "../hooks/usePatients"

const Form = () => {

    const [name, setName] = useState('')
    const [owner, setOwner] = useState('')
    const [email, setEamil] = useState('')
    const [date, setDate] = useState('')
    const [description, setDescription] = useState('')

    const [alert, setAlert] = useState({})

    const { patients, savePatient } = usePatients()

    const handleSubmit = e => {
        e.preventDefault()
        
        if ( [name, owner, email, date, description].includes('') ) {
            setAlert({
                message: 'All fields are required!',
                error: true
            })
        }
        
        setAlert({})
        savePatient({
            name,
            owner,
            email,
            date,
            description
        })
    }

    const { message } = alert;

    return (
        <>  
            
            <p className="text-lg text-center mb-10">
                Add your patients &
                <span className="text-indigo-600 font-bold"> Admin them</span>
            </p>
            
            <form
                className="bg-white py-10 px-5 mb-10 lg:mb-3 shadow-md rounded-md"
                onSubmit={handleSubmit}
            >
                <div className="mb-5">
                    <label 
                        htmlFor="name"
                        className="text-gray-700 uppercase font-bold"
                    >Pet's Name</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Pet's Name"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={name}
                        onChange={ e => setName(e.target.value)}   
                    />
                </div>
                <div className="mb-5">
                    <label 
                        htmlFor="owner"
                        className="text-gray-700 uppercase font-bold"
                    >Owner Name</label>
                    <input
                        id="owner"
                        type="text"
                        placeholder="Owner"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"   
                        value={owner}
                        onChange={ e => setOwner(e.target.value)}   
                    />
                </div>
                <div className="mb-5">
                    <label 
                        htmlFor="email"
                        className="text-gray-700 uppercase font-bold"
                    >Owner Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Owner email"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={email}
                        onChange={ e => setEamil(e.target.value)}   
                    />
                </div>
                <div className="mb-5">
                    <label 
                        htmlFor="date"
                        className="text-gray-700 uppercase font-bold"
                    >Date</label>
                    <input
                        id="date"
                        type="date"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={date}
                        onChange={ e => setDate(e.target.value)}    
                    />
                </div>
                <div className="mb-5">
                    <label 
                        htmlFor="description"
                        className="text-gray-700 uppercase font-bold"
                    >Description</label>
                    <textarea
                        id="description"
                        placeholder="Describe the symptoms"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={description}
                        onChange={ e => setDescription(e.target.value)}   
                    />
                </div>
                <input
                    type="submit"
                    value="Add Patient"
                    className="bg-indigo-600 w-full p-3 text-white font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                />
            </form>

            { message && <Alert alert={alert} /> }
        </>
    )
}

export default Form

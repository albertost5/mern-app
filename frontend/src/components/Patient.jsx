import usePatients from "../hooks/usePatients"

const Patient = ({patient}) => {

    const { setEdit, deletePatient } = usePatients()

    const { email, date, name, owner, description, _id } = patient

    const formatDate = (date) => {
        const newDate = new Date(date);
        return `${newDate.getMonth()+1}/${newDate.getDate()}/${newDate.getFullYear()}`
    }

    return (
        <div className="bg-white mx-5 my-10 shadow-md px-5 py-10 rounded-xl">
            <p className="font-bold uppercase text-indigo-800">Name:
                <span className="font-normal normal-case text-black"> {name}</span>
            </p>
            <p className="font-bold uppercase text-indigo-800">Owner:
                <span className="font-normal normal-case text-black"> {owner}</span>
            </p>
            <p className="font-bold uppercase text-indigo-800">Email:
                <span className="font-normal normal-case text-black"> {email}</span>
            </p>
            <p className="font-bold uppercase text-indigo-800">Date:
                <span className="font-normal normal-case text-black"> {formatDate(date)}</span>
            </p>
            <p className="font-bold uppercase text-indigo-800">Description:
                <span className="font-normal normal-case text-black"> {description}</span>
            </p>
            <div className="flex justify-between my-5">
                <button
                    type="button"
                    className="py-2 px-10 bg-indigo-600 font-bold rounded-lg text-white hover:bg-indigo-700 uppercase"
                    onClick={() => setEdit(patient)}
                >
                    Edit
                </button>

                <button
                    type="button"
                    className="py-2 px-10 bg-red-600 font-bold rounded-lg text-white hover:bg-red-700 uppercase"
                    onClick={() => deletePatient(_id)}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default Patient
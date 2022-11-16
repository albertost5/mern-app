import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axiosClient from '../config/axios'

import Alert from '../components/Alert'

const ConfirmAccount = () => {

  const [accConfirmed, setAccConfirmed] = useState(false)
  const [loading, setLoading] = useState(true)
  const [alert, setAlert] = useState({})

  const { id } = useParams()
  
  useEffect(() => {

    const confirmAccount = async () => {
      try {
        const url = `vets/confirm/${id}`
        const { data } = await axiosClient(url)
        setAccConfirmed(true)
        setAlert({
          message: data.message,
          error: false
        });
      } catch (error) {
        console.log('axios_error: ', error);
        setAlert({ 
          message: error.response.data.message, 
          error: true 
        });
      }
      setLoading(false)
    }

    confirmAccount()

  }, []);
  
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">Confirm your account to Manage <span className="text-black">Your Patients</span></h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        { !loading && 
          <Alert alert={alert} /> 
        }

        { accConfirmed && 
          (<Link className='block text-center my-5 text-gray-500' to="/">
            Login
          </Link>)
        }
      </div>
    </>
  )
}

export default ConfirmAccount;


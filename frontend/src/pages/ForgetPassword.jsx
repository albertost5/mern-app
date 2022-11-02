import { Link } from 'react-router-dom'
import { useState } from 'react'
import Alert from '../components/Alert'
import axiosClient from '../config/axios'

const ForgetPassword = () => {

  const [ email, setEmail ] = useState('')
  const [alert, setAlert] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email) {
      setAlert({ message: 'The email is required.', error: true })
      return
    }

    try {
      const { data } = await axiosClient.post('/vets/reset-password', { email })
      setAlert({ message: data.message, error: false })
    } catch (error) {
      setAlert({ 
        message: error.response.data.message, 
        error: true 
      })
    }

  }

  const { message } = alert;

  return (
    <>
      
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">Reclaim Your Account And Don't Lose <span className="text-black">Your Patients</span></h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
          
          { message && <Alert alert={alert} /> }  

          <form onSubmit={handleSubmit}>
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">
                Email
              </label>
              <input
                type="email" placeholder="Insert your email.."
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={email}
                onChange={ e => setEmail(e.target.value)}
              />
            </div>

            <input type="submit" value="Send" className="bg-indigo-700 rounded-xl w-full py-3 px-10 text-white mt-5 uppercase font-bold hover:cursor-pointer hover:bg-indigo-800 md:w-auto"/>
          </form>

          <nav className='mt-10 lg:flex lg:justify-between'>
            <Link to="/register" className='block text-center my-5 text-gray-500'>You don't have an account? Register</Link>
            <Link to="/" className='block text-center my-5 text-gray-500'>Do you already have an account? Login</Link>
          </nav>
        </div>
    </>
  )
}

export default ForgetPassword;

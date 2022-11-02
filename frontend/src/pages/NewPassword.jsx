import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Alert from '../components/Alert'
import axiosClient from '../config/axios'

const NewPassword = () => {

  const { token } = useParams()

  const [ password, setPassword ] = useState('')
  const [ alert, setAlert ] = useState({})
  const [ validToken, setValidToken ] = useState(false)
  const [ passwordChanged, setPasswordChanged ] = useState(false)
 
  useEffect(() => {

    const checkToken = async () => {
      try {
        await axiosClient(`/vets/reset-password/${token}`)
        setAlert({
          message: 'Valid token, insert your new password!'
        })
        setValidToken(true)
      } catch (error) {
        setAlert({
          message: 'There was a problem with the link.',
          error: true
        })
      }
    }

    checkToken()

  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if ( password.length < 6 ) {
      setAlert({
        message: 'Password length min. is 6 chars.',
        error: true
      })
      return
    }

    try {
      const endpoint = `/vets/reset-password/${token}`
      const { data } = await axiosClient.post( endpoint , { password })
      setAlert({
        message: data.message,
        error: false
      })
      setPasswordChanged(true)
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
        <h1 className="text-indigo-600 font-black text-6xl">Reset Your Password to Manage <span className="text-black">Your Patients</span></h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

        { message && <Alert alert={ alert } /> }

        { validToken && !passwordChanged &&
          (
            <>
              <form onSubmit={handleSubmit}>
                <div className="my-5">
                  <label className="uppercase text-gray-600 block text-xl font-bold">
                    New Password
                  </label>
                  <input
                    type="password" placeholder="Insert your new password.."
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                    value={password}
                    onChange={ e => setPassword(e.target.value) }
                  />
                </div>  

                <input type="submit" value="Save" 
                  className="bg-indigo-700 rounded-xl w-full py-3 px-10 text-white mt-5 uppercase font-bold hover:cursor-pointer hover:bg-indigo-800 md:w-auto"/>
              </form>

              
            </>
          )
        }

        { passwordChanged && ( <Link to="/" className='block text-center my-5 text-gray-500'>Login</Link> ) }
        
      </div>
    </>
  )
}

export default NewPassword;

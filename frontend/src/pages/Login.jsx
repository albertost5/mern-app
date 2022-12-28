import { Link, useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { useState } from 'react'
import Alert from '../components/Alert'
import axiosClient from '../config/axios'

const Login = () => {

  const { auth } = useAuth()
  
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ alert, setAlert ] = useState({})

  const { setAuth } = useAuth()
  
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()

    console.log('Login...')

    if( [email, password].includes('') ) {
      setAlert({
        message: 'All fields are required!',
        error: true
      })
      return 
    }

    try {
      // response => { message, token }
      const { data } = await axiosClient.post('/vets/login', { email, password })
      localStorage.setItem('token', data.token)
      console.log('Data: ', data)
      setAuth(data)
      // Redirect the user after the login
      navigate('/admin')
    } catch (error) {
      setAlert({
        message: error.response.data.message,
        error: true
      })
    }
  }


  const { message } = alert

  return (
    <>  
        <div>
          <h1 className="text-indigo-600 font-black text-6xl">Login to Manage Your <span className="text-black">Patients</span></h1>
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
                onChange={ e => setEmail(e.target.value) }
              />
            </div>
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">
                Password
              </label>
              <input
                type="password" placeholder="Insert your password..."
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={password}
                onChange={ e => setPassword(e.target.value) }
              />
            </div>

            <input type="submit" value="Login" className="bg-indigo-700 rounded-xl w-full py-3 px-10 text-white mt-5 uppercase font-bold hover:cursor-pointer hover:bg-indigo-800 md:w-auto"/>
          </form>

          <nav className='mt-10 lg:flex lg:justify-between'>
            <Link to="/register" className='block text-center my-5 text-gray-500'>You don't have an account? Register</Link>
            <Link to="/forget-password" className='block text-center my-5 text-gray-500'>Forget my password</Link>
          </nav>
        </div>
    </>
  )
}

export default Login;

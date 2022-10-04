import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <>

      <div>
        <h1 className="text-indigo-600 font-black text-6xl">Create Your Account to Manage <span className="text-black">Your Patients</span></h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

        <form>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Name
            </label>
            <input
              type="text" placeholder="Insert your name.."
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Email
            </label>
            <input
              type="email" placeholder="Insert your email.."
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Password
            </label>
            <input
              type="password" placeholder="Insert your password.."
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Repeat Your Password
            </label>
            <input
              type="password" placeholder="Repeat your password.."
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
            />
          </div>

          <input type="submit" value="Register" className="bg-indigo-700 rounded-xl w-full py-3 px-10 text-white mt-5 uppercase font-bold hover:cursor-pointer hover:bg-indigo-800 md:w-auto"/>

        </form>

        <nav className='mt-10 lg:flex lg:justify-between'>
          <Link to="/" className='block text-center my-5 text-gray-500'>Do you already have an account? Login</Link>
          <Link to="/forget-password" className='block text-center my-5 text-gray-500'>Forget my password</Link>
        </nav>
      </div>

    </>
  )
}

export default Register;

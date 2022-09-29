import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <>
      <h1>MVP - Veterinary App</h1>

      <Outlet />
    </>
  )
}

export default AuthLayout;

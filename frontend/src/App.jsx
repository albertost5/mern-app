import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import ProtectedRoute from './layouts/ProtectedRoute'

import Login from './pages/Login'
import Register from './pages/Register'
import ConfirmAccount from './pages/ConfirmAccount'
import ForgetPassword from './pages/ForgetPassword'
import NewPassword from './pages/NewPassword'
import ManagePatients from './pages/ManagePatients'

import { AuthProvider } from './context/AuthProvider'
import { PatientsProvider } from './context/PatientsProvider'

function App() {
  
  return (
    <BrowserRouter>
      <AuthProvider>
        <PatientsProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forget-password" element={<ForgetPassword />} />
              <Route path="forget-password/:token" element={<NewPassword />} />
              <Route path="confirm-account/:id" element={<ConfirmAccount />} />
            </Route>

            <Route path="/admin" element={<ProtectedRoute />}>
              <Route index element={<ManagePatients />} />
            </Route>
          </Routes>
        </PatientsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

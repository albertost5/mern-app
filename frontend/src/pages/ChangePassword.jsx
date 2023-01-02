import AdminNav from "../components/AdminNav"

const ChangePassword = () => {
  return (
    <>
        <AdminNav />
        <h2 className="text-3xl text-center mt-10 font-black uppercase">Change password</h2>
        <p className="text-xl mt-5 mb-10 text-center">Change your <span className="text-indigo-600 font-bold">password here!</span></p>
    </>
  )
}

export default ChangePassword

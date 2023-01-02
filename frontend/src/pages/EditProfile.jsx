import AdminNav from "../components/AdminNav"

const EditProfile = () => {
  return (
    <>
        <AdminNav />
        <h2 className="text-3xl text-center mt-10 font-black uppercase">Edit Profile</h2>
        <p className="text-xl mt-5 mb-10 text-center">Edit your <span className="text-indigo-600 font-bold">profile here!</span></p>
    </>
  )
}

export default EditProfile
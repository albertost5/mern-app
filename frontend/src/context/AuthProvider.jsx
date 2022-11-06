import { useState, useEffect, createContext } from 'react'
import axiosClient from '../config/axios'

const AuthContext = createContext()

// props { children ... }
const AuthProvider = ({ children }) => {

    const [ auth, setAuth ] = useState({})
    
    useEffect( () => {
        const userAuth =  async () => {
            const token = localStorage.getItem('token')
            console.log('AUTH TOKEN: ', token)
            if ( !token ) return

            const config = {
                headers: {
                    "Contet-Type": "application/json",
                    Authorization: `Bearer ${token}`
                 }
            }

            try {
                const { data } = await axiosClient('/vets/profile', config)
                console.log({data});
                setAuth(data)
            } catch (error) {
                console.log(error.response.data.message);
                setAuth({})
            }

        }

        userAuth()
    }, [])

    return (
        <AuthContext.Provider value={{
            auth,
            setAuth
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext
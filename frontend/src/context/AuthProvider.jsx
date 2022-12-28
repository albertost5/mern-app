import { useState, useEffect, createContext } from 'react'
import axiosClient from '../config/axios'

const AuthContext = createContext()

// props { children ... }
const AuthProvider = ({ children }) => {

    const [ auth, setAuth ] = useState({})
    const [ loading, setLoading ] = useState(true);
    
    useEffect( () => {
        const userAuth =  async () => {
            const token = localStorage.getItem('token')
            console.log('AUTH TOKEN: ', token)
            if ( !token ) {
                setLoading(false)
                return
            }

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

            setLoading(false)
        }

        userAuth()
    }, [])

    const logOut = () => {
        localStorage.removeItem('token')
        setAuth({})
    }

    return (
        <AuthContext.Provider value={{
            auth,
            setAuth,
            loading,
            logOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext
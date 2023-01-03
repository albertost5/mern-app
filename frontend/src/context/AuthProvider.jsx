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

    const updateProfile = async( profileData ) => {
        const token = localStorage.getItem('token')
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
            const url = `/vets/profile/${profileData._id}`
            const { data } = await axiosClient.put(url, profileData, config)
            return {
                message: 'Data saved correctly!',
                error: false
            }
        } catch (error) {
            return {
                message: 'The email is already in use.',
                error: true
            }
        }
    }

    const savePassword = async(passwords) => {
        const token = localStorage.getItem('token')
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
            const url = '/vets/update-password'
            const {data} = await axiosClient.put(url, passwords, config)
            return {
                message: data.message
            }
        } catch (error) {
            return {
                message: error.response.data.message,
                error: true
            }
        }
    }

    return (
        <AuthContext.Provider value={{
            auth,
            setAuth,
            loading,
            logOut,
            updateProfile,
            savePassword
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext
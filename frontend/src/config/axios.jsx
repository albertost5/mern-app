import axios from 'axios'

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_BASEPATH}/api`
});

export default axiosClient
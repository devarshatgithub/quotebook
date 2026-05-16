import axios from "axios";

const clientAPI = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
})

clientAPI.interceptors.request.use(
    req => req,
    error => Promise.reject(error)
)

clientAPI.interceptors.response.use(
    res => res.data,
    error => {
        console.error("API Error:", error.res?.data?.message || 'Something went wrong')
        return Promise.reject(error)
    }
)

export default clientAPI;
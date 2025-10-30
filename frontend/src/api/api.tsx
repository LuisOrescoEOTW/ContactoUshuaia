import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL

export const Api = axios.create({
    baseURL: apiUrl
})

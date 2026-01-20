import axios from 'axios';
import { store } from '../redux/store';
import { startLoading, stopLoading } from '../redux/slices/ui/uiSlice';
const apiUrl = import.meta.env.VITE_API_URL

export const Api = axios.create({
    baseURL: apiUrl
})

Api.interceptors.request.use(
  (config) => {
    store.dispatch(startLoading());
    return config;
  },
  (error) => {
    store.dispatch(stopLoading());
    return Promise.reject(error);
  }
);

Api.interceptors.response.use(
  (response) => {
    store.dispatch(stopLoading());
    return response;
  },
  (error) => {
    store.dispatch(stopLoading());
    return Promise.reject(error);
  }
);

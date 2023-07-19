import axios from 'axios';
import { getToken } from '../utils/authUtils';

export const axiosConfig = () => {
  return axios.interceptors.request.use(
    (config) => {
      if(!config.url) throw new Error("No config provided")
      // Verifica si la solicitud es POST y si la URL actual no es "/login"
      if (config.method === 'post' && !config.url.includes('/login')) {
        const token = getToken();
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        } else {
          delete config.headers['Authorization'];
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

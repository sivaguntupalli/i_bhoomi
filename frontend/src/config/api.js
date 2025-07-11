// src/config/api.js
import axios from 'axios';

const createApiClient = (baseURL, withCredentials = false) => {
  const instance = axios.create({
    baseURL,
    withCredentials,
  });

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
};

export default createApiClient;

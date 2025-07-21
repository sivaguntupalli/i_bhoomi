// src/services/axios/axiosConfig.js
import axios from 'axios';
import API_CONFIG from '../config/apiConfig';
import tokenService from '../../utils/tokenService';
import authService from '../auth/authService';

const axiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 10000
});

// Request interceptor
axiosInstance.interceptors.request.use(config => {
  const token = tokenService.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const { access } = await authService.refreshToken();
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        tokenService.clearAuthData();
        window.location.href = '/login?session_expired=1';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
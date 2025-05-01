import axios from 'axios';
import API_CONFIG from '../config/api';

// Create axios instance with interceptors
const api = axios.create({
  baseURL: API_CONFIG.USER_SERVICE,
  timeout: 10000,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await axios.post(`${API_CONFIG.USER_SERVICE}/token/refresh/`, {
          refresh: refreshToken
        });
        
        localStorage.setItem('access_token', response.data.access);
        originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
        return axios(originalRequest);
      } catch (err) {
        console.error('Refresh token failed', err);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default {
  login: async (credentials) => {
    const response = await api.post('/token/', credentials);
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    return response;
  },

  register: async (userData) => {
    return await api.post('/register/', userData);
  },

  getProfile: async () => {
    return await api.get('/profile/');
  },

  updateProfile: async (profileData) => {
    return await api.patch('/profile/', profileData);
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
};
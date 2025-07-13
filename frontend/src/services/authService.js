// src/services/authService.js
import axiosInstance from '../api/axiosConfig';
import API_CONFIG from '../config/apiConfig';
import tokenService from '../utils/tokenService';

const authService = {
  // 🔐 Login user and save token + user info from backend response
  login: async (credentials) => {
    const response = await axiosInstance.post(
      API_CONFIG.AUTH_ENDPOINTS.LOGIN,
      credentials
    );
    return response.data;
  },

  // 📝 Register a new user
  register: async (userData) => {
    const url = API_CONFIG.USER_SERVICE + API_CONFIG.AUTH_ENDPOINTS.REGISTER;
    const response = await axiosInstance.post(url, userData);
    return response.data;
  },

  // 🚪 Logout and clear all auth info
  logout: () => {
    tokenService.clearAuthData();
  },
};

export default authService;

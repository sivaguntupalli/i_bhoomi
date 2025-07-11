// src/services/authService.js (Refactored & Cleaned Up)
import axiosInstance from '../api/axiosConfig';
import API_CONFIG from '../config/apiConfig';
import tokenService from '../utils/tokenService';

const authService = {
  login: async (credentials) => {
    const response = await axiosInstance.post(API_CONFIG.AUTH_ENDPOINTS.LOGIN, credentials);
    const { access, refresh } = response.data;

    // Optional: fetch user profile here
    try {
      const userRes = await axiosInstance.get('/auth/user/');
      const user = userRes.data;
      tokenService.setAuthData({ access, refresh, user });
      return { access, refresh, user };
    } catch (userErr) {
      // Fallback if user info is not available immediately
      tokenService.setAuthData({ access, refresh, user: null });
      return { access, refresh, user: null };
    }
  },

  register: async (userData) => {
    const response = await axiosInstance.post(API_CONFIG.AUTH_ENDPOINTS.REGISTER, userData);
    return response.data;
  },

  logout: () => {
    tokenService.clearAuthData();
  },
};

export default authService;
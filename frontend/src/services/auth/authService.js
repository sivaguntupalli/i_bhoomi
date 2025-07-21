import axiosInstance from '../axios/axiosConfig';
import API_CONFIG from '../config/apiConfig';
import tokenService from '../../utils/tokenService';
import { handleApiError } from '../../utils/errorHandler';

const authService = {
  // Login with credentials
  login: async (credentials) => {
    try {
      const response = await axiosInstance.post(
        API_CONFIG.getFullUrl('AUTH', 'LOGIN'),
        credentials
      );
      tokenService.setAuthData(response.data);
      return response.data;
    } catch (error) {
      tokenService.clearAuthData();
      throw handleApiError(error, {
        fallback: 'Login failed',
        context: 'auth/login'
      });
    }
  },

  // Register new user
  register: async (userData) => {
    try {
      const response = await axiosInstance.post(
        API_CONFIG.getFullUrl('AUTH', 'REGISTER'),
        userData
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error, {
        fallback: 'Registration failed',
        fieldPriority: ['email', 'username'], // Check these fields first
        context: 'auth/register'
      });
    }
  },

  // Refresh access token
  refreshToken: async () => {
    const refresh = tokenService.getRefreshToken();
    if (!refresh) {
      authService.logout();
      throw new Error('No refresh token available');
    }

    try {
      const response = await axiosInstance.post(
        API_CONFIG.getFullUrl('AUTH', 'REFRESH'),
        { refresh }
      );
      tokenService.setAuthData({
        access: response.data.access,
        refresh: response.data.refresh || refresh, // Fallback to existing
        user: tokenService.getUser()
      });
      return response.data;
    } catch (error) {
      authService.logout();
      throw handleApiError(error, {
        fallback: 'Session expired. Please login again.',
        context: 'auth/refresh'
      });
    }
  },

  logout: () => tokenService.clearAuthData()
};

export default authService;
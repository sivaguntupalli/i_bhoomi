/**
 * authService.js
 * 
 * Purpose: Handle all authentication-related API calls
 * Methods:
 * - login(credentials)
 * - register(userData)
 * - logout()
 * - refreshToken()
 */

import axios from '../config/api';

export const login = async (credentials) => {
  const response = await axios.post('/api/token/', credentials);
  return response.data;
};

// Add other auth methods
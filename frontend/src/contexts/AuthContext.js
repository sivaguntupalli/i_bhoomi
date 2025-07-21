import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../services/axios/axiosConfig';
import { handleApiError } from '../utils/errorHandler';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ loading state

  // ✅ Computed flag
  const isAuthenticated = !!accessToken && !!user;

  // 🔄 Sync from localStorage on initial mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('accessToken');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setAccessToken(storedToken);
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }

    setLoading(false); // ✅ done loading
  }, []);

  // ✅ Login function
  const login = async (username, password) => {
    try {
      const res = await axiosInstance.post('/auth/token/', { username, password });
      const { access, refresh, user: userData } = res.data;

      setAccessToken(access);
      setUser(userData);

      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
      localStorage.setItem('user', JSON.stringify(userData));

      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access}`;

      return { success: true };
    } catch (error) {
      handleApiError(error);
      return { success: false, message: error.response?.data?.detail || 'Login failed' };
    }
  };

  // ✅ Register function
  const register = async (userInfo) => {
    try {
      const res = await axiosInstance.post('/auth/register/', userInfo);
      return { success: true, data: res.data };
    } catch (error) {
      handleApiError(error);
      return { success: false, message: error.response?.data?.detail || 'Registration failed' };
    }
  };

  // ✅ Logout function
  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.clear();
    delete axiosInstance.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{
      user,
      accessToken,
      isAuthenticated,
      loading,
      login,
      register,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

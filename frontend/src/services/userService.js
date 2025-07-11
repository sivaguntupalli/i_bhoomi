// src/services/userService.js
import userApi from '../../api/userApi';

export const getUsers = (params = {}) => userApi.get('/users/', { params });

export const updateProfile = (data) =>
  userApi.patch('/users/profile/', data);

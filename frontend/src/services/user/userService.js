// src/services/userService.js
import userApi from './userApi'; 

export const getUsers = (params = {}) => userApi.get('/users/', { params });

export const updateProfile = (data) =>
  userApi.patch('/users/profile/', data);

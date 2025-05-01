import axios from 'axios';
import API_CONFIG from '../config/api';

const api = axios.create({
  baseURL: API_CONFIG.PROPERTY_SERVICE,
  timeout: 10000,
});

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

export default {
  getAllProperties: async () => {
    return await api.get('/properties/');
  },

  getProperty: async (id) => {
    return await api.get(`/properties/${id}/`);
  },

  createProperty: async (propertyData) => {
    return await api.post('/properties/', propertyData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  updateProperty: async (id, propertyData) => {
    return await api.patch(`/properties/${id}/`, propertyData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  deleteProperty: async (id) => {
    return await api.delete(`/properties/${id}/`);
  }
};
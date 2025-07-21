// src/services/property/propertyApi.js

import axiosInstance from '../axios/axiosConfig';
import API_CONFIG from '../config/apiConfig';
import { handleApiError } from '../../utils/errorHandler';

const BASE_URL = `${API_CONFIG.getServiceUrl(API_CONFIG.SERVICES.PROPERTY)}${API_CONFIG.ENDPOINTS.PROPERTY.LIST}`;

const propertyApi = {
  list: async (params = {}) => {
    try {
      const response = await axiosInstance.get(BASE_URL, { params });
      return response.data;
    } catch (error) {
      handleApiError(error);
      return []; // fallback for consumers expecting an array
    }
  },

  getById: async (id) => {
    try {
      const response = await axiosInstance.get(`${BASE_URL}${id}/`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Add create/update/delete methods here if needed
};

export default propertyApi;

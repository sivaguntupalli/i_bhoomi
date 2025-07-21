// src/services/config/apiConfig.js

// 🔧 Base configuration
const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';
const PROPERTY_URL = process.env.REACT_APP_PROPERTY_API || 'http://localhost:8001';
const API_PREFIX = '/api'; // Explicit API prefix

const API_CONFIG = {
  // 🌐 Base URLs
  BASE_URL,
  PROPERTY_URL,
  API_PREFIX,

  // 🧭 Service endpoints (used for full service base paths)
  SERVICES: {
    AUTH: `${BASE_URL}${API_PREFIX}/auth/`,
    USER: `${BASE_URL}${API_PREFIX}/users/`,
    PROPERTY: `${PROPERTY_URL}${API_PREFIX}/`
  },

  // 🔁 Relative endpoint paths (appended to service URLs)
  ENDPOINTS: {
    AUTH: {
      LOGIN: 'token/',
      REGISTER: 'register/',
      REFRESH: 'token/refresh/',
      LOGOUT: 'logout/' // ← Added LOGOUT endpoint placeholder
    },
    USER: {
      PROFILE: 'profile/',
      BULK_ACTIONS: 'bulk_actions/'
    },
    PROPERTY: {
      LIST: 'list/' // Example property endpoint
    }
  },

  // 🧱 Helper method for full URL construction
  getFullUrl: function (service, endpoint) {
    return `${this.SERVICES[service]}${this.ENDPOINTS[service][endpoint]}`;
  },

  // 🧱 Optional: Get base service URL only
  getServiceUrl: function (servicePath) {
    return servicePath;
  }
};

export default API_CONFIG;

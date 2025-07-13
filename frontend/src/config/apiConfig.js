// src/config/apiConfig.js

const API_CONFIG = {
  USER_SERVICE: process.env.REACT_APP_USER_SERVICE_URL ||
    `${process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000'}/api/users/`,
  AUTH_ENDPOINTS: {
    REGISTER: 'register/', // no leading slash
    LOGIN: 'auth/token/',  // no leading slash
    REFRESH: 'auth/token/refresh/'
  }
};

export default API_CONFIG;
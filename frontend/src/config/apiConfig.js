const API_CONFIG = {
  USER_SERVICE: 
    process.env.REACT_APP_USER_SERVICE_URL ||
    `${process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000'}/api`,
  AUTH_ENDPOINTS: {
    REGISTER: '/auth/register/',
    LOGIN: '/auth/token/',
    REFRESH: '/auth/token/refresh/'
  }
};

export default API_CONFIG;
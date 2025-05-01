// frontend/src/config/api.js
const API_CONFIG = {
    USER_SERVICE: process.env.REACT_APP_USER_SERVICE_URL || 'http://localhost:8000/api/users',
    PROPERTY_SERVICE: process.env.REACT_APP_PROPERTY_SERVICE_URL || 'http://localhost:8001/api/properties'
  };
  
  export default API_CONFIG;
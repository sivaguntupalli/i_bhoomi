// src/config/propertyApi.js
import createApiClient from './api';

const propertyApi = createApiClient(
  process.env.REACT_APP_PROPERTY_API || 'http://localhost:8001/api/'
);

export default propertyApi;

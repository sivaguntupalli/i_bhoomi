// src/utils/errorHandler.js

/**
 * Standardizes API error responses
 * @param {Error|AxiosError} error - Raw error object
 * @param {object} options - Configuration
 * @param {string} [options.fallback='Request failed'] - Default message
 * @param {boolean} [options.log=true] - Whether to log to console
 * @returns {{message: string, code?: number, fields?: object}} - Standardized error
 */
export const handleApiError = (
  error,
  { fallback = 'Request failed', log = true } = {}
) => {
  // Debug logging (dev-only)
  if (log && process.env.NODE_ENV !== 'production') {
    console.groupCollapsed('[API Error]');
    console.error('Raw error:', error);
    console.log('Response data:', error.response?.data);
    console.groupEnd();
  }

  // Handle axios errors
  if (error.response) {
    const { data, status } = error.response;

    return {
      message: data.detail || 
               data.message ||
               getFirstFieldError(data) ||
               fallback,
      code: status,
      fields: data
    };
  }

  // Handle network errors
  if (error.request) {
    return { 
      message: 'Network error - please check your connection',
      code: 0 
    };
  }

  // Fallback for other errors
  return { message: fallback };
};

// Helper: Extract first validation error from response
const getFirstFieldError = (data) => {
  if (typeof data !== 'object') return null;
  
  const fieldErrors = Object.values(data)
    .flatMap(errors => Array.isArray(errors) ? errors : [])
    .filter(Boolean);

  return fieldErrors[0] || null;
};

// Convenience wrapper for common cases
export const authErrorHandler = (error) => 
  handleApiError(error, { fallback: 'Authentication failed' });

export const apiErrorHandler = (error) => 
  handleApiError(error, { log: false });
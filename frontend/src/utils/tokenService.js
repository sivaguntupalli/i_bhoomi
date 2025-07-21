// src/utils/tokenService.js

const TOKEN_KEYS = {
  ACCESS: 'access_token',
  REFRESH: 'refresh_token',
  USER: 'user_data'
};

const safeStorage = {
  get: (key) => {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.error('LocalStorage read failed:', e);
      return null;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (e) {
      console.error(`LocalStorage write failed for ${key}:`, e);
      return false;
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error(`LocalStorage removal failed for ${key}:`, e);
    }
  }
};

const safeJSON = {
  stringify: (data) => {
    try {
      return JSON.stringify(data);
    } catch (e) {
      console.error('JSON serialization failed:', e);
      return '{}';
    }
  },
  parse: (str) => {
    try {
      return JSON.parse(str);
    } catch (e) {
      console.error('JSON parsing failed:', e);
      return {};
    }
  }
};

// ✅ Named object for default export
const tokenService = {
  getAccessToken: () => safeStorage.get(TOKEN_KEYS.ACCESS) || '',
  getRefreshToken: () => safeStorage.get(TOKEN_KEYS.REFRESH) || '',

  getUser: () => {
    const userData = safeStorage.get(TOKEN_KEYS.USER);
    return userData ? safeJSON.parse(userData) : { role: 'guest' };
  },

  setAuthData: ({ access = '', refresh = '', user = {} }) => {
    const success = [
      safeStorage.set(TOKEN_KEYS.ACCESS, access),
      safeStorage.set(TOKEN_KEYS.REFRESH, refresh),
      safeStorage.set(TOKEN_KEYS.USER, safeJSON.stringify(user))
    ].every(Boolean);

    if (!success) {
      console.error('Failed to persist all auth data');
      tokenService.clearAuthData(); // ✅ Fix 'this' reference
    }
  },

  clearAuthData: () => {
    Object.values(TOKEN_KEYS).forEach(key => safeStorage.remove(key));
  },

  updateUser: (partialUser) => {
    const current = tokenService.getUser(); // ✅ Fix 'this' reference
    tokenService.setAuthData({
      access: tokenService.getAccessToken(),
      refresh: tokenService.getRefreshToken(),
      user: { ...current, ...partialUser }
    });
  }
};

export default tokenService;

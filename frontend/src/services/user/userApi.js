// src/services/user/userApi.js
import axiosInstance from '../axios/axiosConfig';
import { handleApiError } from '../../utils/errorHandler';

const userApi = {
  bulkUserActions: async (userIds, action, value) => {
    try {
      const response = await axiosInstance.patch('/users/bulk_actions/', {
        user_ids: userIds,
        action,
        value,
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
};

export default userApi;

// src/api/userApi.js
import axiosInstance from './axiosConfig';

const userApi = {
  bulkUserActions: async (userIds, action, value) => {
    const response = await axiosInstance.patch('/users/bulk_actions/', {
      user_ids: userIds,
      action,
      value,
    });
    return response.data;
  },
};

export default userApi;

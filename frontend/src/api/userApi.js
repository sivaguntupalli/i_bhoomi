// src/services/userAPI.js
import axios from 'axios';

export default {
  bulkUserActions(userIds, action, value) {
    return axios.patch('/api/users/bulk_actions/', {
      user_ids: userIds,
      action,  // 'role' or 'status'
      value    // role name or boolean
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
  }
}
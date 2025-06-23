import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserListTable = () => {
  // ============== EXISTING STATE (PRESERVED) ==============
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ 
    key: null, 
    direction: 'ascending' 
  });

  // ============== NEW STATE ADDITION ==============
  const [roleFilter, setRoleFilter] = useState('');
  const [availableRoles] = useState([
    'admin', 'operator', 'agent', 'buyer', 'seller' // From your models.py
  ]);

  // ============== MODIFIED FETCH FUNCTION ==============
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('accessToken');
      // Added role filter parameter
      const response = await axios.get('http://localhost:8000/api/users/', {
        headers: { Authorization: `Bearer ${token}` },
        params: roleFilter ? { role: roleFilter } : {} // New filter
      });
      setUsers(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load users');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // ============== EXISTING USE EFFECT (UPDATED DEPENDENCY) ==============
  useEffect(() => {
    fetchUsers();
  }, [roleFilter]); // Now re-fetches when filter changes

  // ============== EXISTING SORT LOGIC (PRESERVED) ==============
  const sortedUsers = React.useMemo(() => {
    if (!sortConfig.key) return users;
    
    return [...users].sort((a, b) => {
      const getValue = (obj, path) => path.split('.').reduce((o, p) => (o || {})[p], obj);

      let aValue = getValue(a, sortConfig.key);
      let bValue = getValue(b, sortConfig.key);

      if (aValue == null) return 1;
      if (bValue == null) return -1;
      
      if (sortConfig.key === 'last_login') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (typeof aValue === 'string') {
        return sortConfig.direction === 'ascending'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return sortConfig.direction === 'ascending'
        ? aValue - bValue
        : bValue - aValue;
    });
  }, [users, sortConfig]);

  // ============== EXISTING SORT HANDLER (PRESERVED) ==============
  const requestSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'ascending' 
        ? 'descending' 
        : 'ascending'
    }));
  };

  // ============== EXISTING RENDER ICON (PRESERVED) ==============
  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return <span className="ml-1">{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>;
  };

  // ============== MODIFIED RENDER (NEW FILTER UI ADDED) ==============
  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* ============== NEW FILTER CONTROLS ============== */}
      <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center">
          <label htmlFor="role-filter" className="mr-2 font-medium text-gray-700">
            Filter by Role:
          </label>
          <select
            id="role-filter"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            disabled={loading}
          >
            <option value="">All Roles</option>
            {availableRoles.map(role => (
              <option key={role} value={role}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </option>
            ))}
          </select>
        </div>
        
        <button
          onClick={fetchUsers}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>

      {/* ============== EXISTING ERROR HANDLER (PRESERVED) ============== */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md border border-red-200">
          {error}
        </div>
      )}

      {/* ============== EXISTING LOADING STATE (PRESERVED) ============== */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-3 text-gray-600">Loading user data...</p>
        </div>
      )}

      {/* ============== EXISTING TABLE (PRESERVED) ============== */}
      {!loading && (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  onClick={() => requestSort('username')}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  Username {renderSortIcon('username')}
                </th>
                <th 
                  onClick={() => requestSort('email')}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  Email {renderSortIcon('email')}
                </th>
                <th 
                  onClick={() => requestSort('profile.role')}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  Role {renderSortIcon('profile.role')}
                </th>
                <th 
                  onClick={() => requestSort('last_login')}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  Last Login {renderSortIcon('last_login')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedUsers.length > 0 ? (
                sortedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.profile?.role || (
                        <span className="text-gray-400">Not assigned</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.last_login ? (
                        new Date(user.last_login).toLocaleString()
                      ) : (
                        <span className="text-gray-400">Never logged in</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                    No users found {roleFilter && `with role "${roleFilter}"`}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserListTable;
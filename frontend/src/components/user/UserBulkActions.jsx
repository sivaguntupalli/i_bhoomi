import { useState } from 'react'; // 1. Add this import at the top
import userAPI from '../../api/userApi';

function BulkActionPanel({ selectedUserIds }) {
  // 2. Add these state hooks right after the component declaration
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');

  const handleRoleChange = async (newRole) => {
    // 3. Add early return if no role selected
    if (!newRole || isLoading) return;

    // 4. Set loading state BEFORE API call
    setIsLoading(true);
    setSelectedRole(newRole);

    try {
      await userAPI.bulkUserActions(selectedUserIds, 'role', newRole);
      alert('Roles updated successfully!');
    } catch (error) {
      alert('Update failed: ' + (error.response?.data?.error || error.message));
    } finally {
      // 5. Reset states in finally block
      setIsLoading(false);
      setSelectedRole('');
    }
  };

  return (
    <div className="bulk-actions">
      {/* 6. Add disabled state and value binding to select */}
      <select 
        value={selectedRole}
        onChange={(e) => handleRoleChange(e.target.value)}
        disabled={isLoading}
      >
        <option value="">Assign Role...</option>
        <option value="admin">Admin</option>
        <option value="operator">Operator</option>
      </select>

      {/* 7. Add loading indicator next to dropdown */}
      {isLoading && (
        <span className="loading-indicator">
          {/* Using inline styles for clarity - move to CSS file later */}
          <span 
            style={{
              display: 'inline-block',
              width: '16px',
              height: '16px',
              border: '2px solid #ccc',
              borderTopColor: '#333',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              marginLeft: '8px'
            }}
          />
          Processing...
        </span>
      )}
    </div>
  );
}
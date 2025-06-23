/**
 * ProtectedRoute Component
 *
 * Purpose: Restrict access to authenticated users only
 *
 * Behavior:
 * - Redirects to login if not authenticated
 * - Maintains intended location in state
 * - Supports role-based access control
 * - Handles loading states
 */

import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loader from '../common/Loader';

const ProtectedRoute = ({ children, roles }) => {
  const { user, isLoading } = useSelector(state => state.auth);
  const location = useLocation();

  if (isLoading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string)
};

export default ProtectedRoute;
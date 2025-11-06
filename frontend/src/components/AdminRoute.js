// frontend/src/components/AdminRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getAuthInfo, isAdmin } from '../services/authService';

const AdminRoute = () => {
  const userInfo = getAuthInfo();
  
  // Check if user is logged in AND is admin
  return userInfo && isAdmin() ? <Outlet /> : <Navigate to='/login' replace />;
  // Optionally, you might navigate to a 403 Forbidden page instead of /login if logged in but not admin
};

export default AdminRoute;
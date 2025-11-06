// frontend/src/components/PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getAuthInfo } from '../services/authService';

const PrivateRoute = () => {
  const userInfo = getAuthInfo();
  
  // Outlet renders the child routes/elements if condition is met
  return userInfo ? <Outlet /> : <Navigate to='/login' replace />;
};

export default PrivateRoute;
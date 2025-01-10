import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getAuthorizationToken } from '../helper/utils';

const ProtectedRoute = () => {
  const token = getAuthorizationToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

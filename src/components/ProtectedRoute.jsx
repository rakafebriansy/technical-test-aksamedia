import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getCookie } from '../helper/cookie';

const ProtectedRoute = () => {
  const token = getCookie('authorized');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const isAuth = localStorage.getItem('auth') === 'true'; // Adjusted for boolean check
  const lastUrl = window.location.pathname;
  console.log(lastUrl);

  if (!isAuth) {
    localStorage.setItem('lastUrl', lastUrl); // Store the last URL
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

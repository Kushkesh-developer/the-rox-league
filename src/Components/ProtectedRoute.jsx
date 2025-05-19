import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ 
  isAuthenticated, 
  redirectPath = '/login' 
}) => {
  const [isLocalAuthenticated, setIsLocalAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if user data exists in local storage
    const userData = localStorage.getItem('user');
    setIsLocalAuthenticated(!!userData);
  }, []);

  // Allow access if authenticated through context OR local storage
  if (isAuthenticated || isLocalAuthenticated) {
    return <Outlet />;
  }

  // Redirect if not authenticated through either method
  return <Navigate to={redirectPath} replace state={{ redirectAfterLogin: location.pathname }} />;
};

export default ProtectedRoute;

import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CircularProgress, Box, Typography } from '@mui/material';

const useLocalStorageAuth = () => {
  // Check if user data exists in localStorage
  const getUserFromStorage = () => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      return null;
    }
  };

  return {
    isAuthenticatedLocally: !!getUserFromStorage(),
    storedUser: getUserFromStorage()
  };
};

const AuthGuard = ({ children }) => {
  const { user, loading } = useAuth();
  const { isAuthenticatedLocally, storedUser } = useLocalStorageAuth();
  const location = useLocation();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    // Short timeout to allow auth context to initialize if possible
    const timer = setTimeout(() => {
      setCheckingAuth(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Show loading state while checking authentication
  if (loading && checkingAuth) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress sx={{ color: '#8B5CF6' }} />
        <Typography variant="body1" sx={{ mt: 2, color: '#6B7280' }}>
          Verifying authentication...
        </Typography>
      </Box>
    );
  }

  // If authenticated through context or localStorage, render children
  if (user || isAuthenticatedLocally) {
    return children;
  }

  // Otherwise redirect to login
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AuthGuard;
export { useLocalStorageAuth };
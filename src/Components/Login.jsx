import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Container, 
  TextField, 
  Typography, 
  Paper,
  Avatar,
  Alert,
  CircularProgress
} from '@mui/material';
import { SelfImprovement as YogaIcon } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import ForgotPasswordModal from './ForgotPasswordModal';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const locationState = location.state || {};
  const redirectPath = locationState.redirectAfterLogin || '/';
  const bookingIntent = locationState.bookingIntent;

  const getRedirectMessage = () => {
    if (bookingIntent) {
      const serviceType = bookingIntent.isPackage ? 'package' : 'session';
      return `Please log in to complete your booking for ${bookingIntent.coachName ? `${bookingIntent.serviceId} with ${bookingIntent.coachName}` : bookingIntent.serviceId}.`;
    }
    if (locationState.redirectAfterLogin === '/my-bookings') {
      return 'Please log in to view your bookings.';
    }
    return '';
  };

  const validateForm = () => {
    setError('');
    
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }
    
    if (!password) {
      setError('Password is required');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const success = await login(email, password);
      
      if (success) {
        if (bookingIntent && bookingIntent.slots?.length > 0) {
          console.log('Continuing with booking after login:', bookingIntent);
          navigate('/my-bookings', { 
            state: { 
              bookingSuccess: true,
              bookingDetails: bookingIntent
            }
          });
        } else {
          navigate(redirectPath);
        }
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #D6BCFA 0%, #F2FCE2 100%)',
        padding: 2
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 4,
            animation: 'fadeIn 0.5s'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar
              sx={{
                bgcolor: '#8B5CF6',
                width: 56,
                height: 56,
                mr: 2
              }}
            >
              <YogaIcon fontSize="large" />
            </Avatar>
            <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', color: '#8B5CF6' }}>
              Yoga Flow
            </Typography>
          </Box>

          {(bookingIntent || locationState.redirectAfterLogin === '/my-bookings') && (
            <Alert severity="info" sx={{ mb: 3, width: '100%' }}>
              {getRedirectMessage()}
            </Alert>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              sx={{ mb: 3 }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              <Button
                onClick={() => setForgotPasswordOpen(true)}
                sx={{ color: '#8B5CF6', textTransform: 'none' }}
              >
                Forgot Password?
              </Button>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                py: 1.5,
                bgcolor: '#8B5CF6',
                '&:hover': {
                  bgcolor: '#7E40E6',
                },
                position: 'relative'
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: 'white' }} />
              ) : (
                'Login'
              )}
            </Button>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <Link to="/signup" style={{ color: '#8B5CF6', textDecoration: 'none' }}>
                  Sign Up
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>

      <ForgotPasswordModal
        open={forgotPasswordOpen}
        onClose={() => setForgotPasswordOpen(false)}
      />
    </Box>
  );
};

export default Login;

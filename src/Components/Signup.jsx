import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Avatar,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  InputAdornment
} from '@mui/material';
import { SelfImprovement as YogaIcon, Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    role: 'athlete',
    profileImage: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setFormData(prev => ({
            ...prev,
            profileImage: e.target.result
          }));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const validateForm = () => {
    setError('');

    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }

    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    if (!formData.phone.trim()) {
      setError('Phone number is required');
      return false;
    }

    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError('Please enter a valid phone number');
      return false;
    }

    if (!formData.password) {
      setError('Password is required');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password should be at least 6 characters');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return false;
    }

    if (!formData.profileImage) {
      setError('Profile image is required');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const code = generateVerificationCode();
      const verificationData = {
        email: formData.email,
        code,
        name: formData.name,
        password: formData.password,
        role: formData.role,
        phone: formData.phone,
        profileImage: formData.profileImage,
        verified: false
      };

      localStorage.setItem(`verification_${formData.email}`, JSON.stringify(verificationData));

      console.log('Verification code:', code);

      setShowVerification(true);

    } catch (err) {
      setError('An error occurred during registration.');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    const storedData = localStorage.getItem(`verification_${formData.email}`);
    if (!storedData) {
      setError('Registration data not found');
      return;
    }

    const verificationData = JSON.parse(storedData);
    if (verificationCode === verificationData.code) {
      verificationData.verified = true;
      localStorage.setItem(`verification_${formData.email}`, JSON.stringify(verificationData));

      try {
        const success = await register(
          verificationData.name,
          verificationData.email,
          verificationData.password,
          verificationData.role
        );

        if (success) {
          navigate('/my-bookings');
        }
      } catch (err) {
        setError('An error occurred during registration completion.');
        console.error('Registration completion error:', err);
      }
    } else {
      setError('Invalid verification code');
    }
  };

  if (showVerification) {
    return (
      <Box sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #F2FCE2 0%, #D6BCFA 100%)',
        padding: 2
      }}>
        <Container maxWidth="xs">
          <Paper elevation={6} sx={{ padding: 4, borderRadius: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 3, textAlign: 'center' }}>
              Verify Your Email
            </Typography>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <Typography sx={{ mb: 2 }}>
              Please enter the verification code sent to your email
            </Typography>
            <TextField
              fullWidth
              label="Verification Code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              sx={{ mb: 3 }}
            />
            <Button
              fullWidth
              variant="contained"
              onClick={handleVerifyCode}
              sx={{
                bgcolor: '#8B5CF6',
                '&:hover': { bgcolor: '#7E40E6' }
              }}
            >
              Verify Code
            </Button>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #F2FCE2 0%, #D6BCFA 100%)',
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
            borderRadius: 4
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

          {error && (
            <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', mt: 1 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Role</InputLabel>
              <Select
                value={formData.role}
                label="Role"
                onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
              >
                <MenuItem value="athlete">Athlete</MenuItem>
                <MenuItem value="coach">Coach</MenuItem>
                <MenuItem value="sponsor">Sponsor</MenuItem>
              </Select>
            </FormControl>

            <TextField
              required
              fullWidth
              label="Full Name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              sx={{ mb: 2 }}
            />

            <TextField
              required
              fullWidth
              type="email"
              label="Email Address"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              sx={{ mb: 2 }}
            />

            <TextField
              required
              fullWidth
              label="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              sx={{ mb: 2 }}
            />

            <TextField
              required
              fullWidth
              type={showPassword ? 'text' : 'password'}
              label="Password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{ mb: 2 }}
            />

            <TextField
              required
              fullWidth
              type="password"
              label="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
              sx={{ mb: 2 }}
            />

            <Button
              component="label"
              variant="outlined"
              fullWidth
              sx={{ mb: 3 }}
            >
              Upload Profile Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>

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
                'Sign Up'
              )}
            </Button>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <Link to="/login" style={{ color: '#8B5CF6', textDecoration: 'none' }}>
                  Login
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Signup;

import React from 'react';
import { Button, Box, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserCircle, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSubscription } from '../hooks/use-subscription';

const ProfileSetupButton = ({
  variant = 'contained',
  color = '#8B5CF6',
  size = 'medium',
  fullWidth = false
}) => {
  const navigate = useNavigate();
  const { isAuthenticated, userSubscription } = useAuth();
  const { checkFeatureAccess } = useSubscription();

  const handleClick = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { redirectAfterLogin: '/profile-setup' } });
      return;
    }

    const hasAccess = checkFeatureAccess('profile-setup');

    if (hasAccess) {
      navigate('/profile-setup');
    }
    // If they don't have access, the premium modal will be shown by checkFeatureAccess
  };

  const hasPremiumAccess =
    isAuthenticated && (userSubscription === 'premium' || userSubscription === 'pro');

  return (
    <Tooltip title={!hasPremiumAccess ? "Premium Feature" : "Set up your profile"}>
      <Box display="inline-block">
        <Button
          variant={variant}
          onClick={handleClick}
          fullWidth={fullWidth}
          size={size}
          sx={{
            bgcolor: variant === 'contained' ? color : 'transparent',
            borderColor: variant === 'outlined' ? color : 'transparent',
            color: variant === 'contained' ? 'white' : color,
            '&:hover': {
              bgcolor: variant === 'contained' ? '#7C3AED' : 'rgba(139, 92, 246, 0.04)',
              borderColor: variant === 'outlined' ? '#7C3AED' : 'transparent',
            },
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          {hasPremiumAccess ? (
            <UserCircle size={20} />
          ) : (
            <Lock size={20} />
          )}
          Profile Setup
        </Button>
      </Box>
    </Tooltip>
  );
};

export default ProfileSetupButton;

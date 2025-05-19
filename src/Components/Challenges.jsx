import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from './Header';
import Footer from './Footer';
import ChallengesList from './challenges/ChallengesList';
import ChallengeFilters from '../Components/challenges/ChallengesFilter';
import PremiumFeatureModal from './subscription/PremiumFeatureModal';

const Challenges = () => {
  const { user, userSubscription } = useAuth();
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    type: '',
    eventType: '',
    difficulty: '',
  });

  useEffect(() => {
    // Check if user is authenticated
    const storedUser = localStorage.getItem('auth_user');
    if (!storedUser) {
      navigate('/login', { state: { redirectAfterLogin: '/challenges' } });
      return;
    }
  }, [navigate]);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleFilterChange = (filterType, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleClearFilters = () => {
    setActiveFilters({
      type: '',
      eventType: '',
      difficulty: '',
    });
  };

  // Show login prompt if not authenticated
  if (!user) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Box component="main" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Sign in to access Challenges
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              You need to be logged in to view and participate in challenges.
            </Typography>
          </Container>
        </Box>
        <Footer />
      </Box>
    );
  }

  // Show premium upgrade prompt if not a premium user
  if (userSubscription !== 'premium' && userSubscription !== 'pro') {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Box component="main" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Premium Feature
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Challenges are available to premium and pro subscribers.
            </Typography>
            <PremiumFeatureModal 
              open={true} 
              onClose={() => {}} 
              featureName="Challenges" 
            />
          </Container>
        </Box>
        <Footer />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" fontWeight="bold" sx={{ color: '#8B5CF6' }}>
              Challenges
            </Typography>
          </Box>
          
          <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
            <ChallengeFilters 
              showFilters={showFilters}
              toggleFilters={toggleFilters}
              activeFilters={activeFilters}
              handleFilterChange={handleFilterChange}
              handleClearFilters={handleClearFilters}
            />
          </Paper>
          
          <ChallengesList 
            filters={activeFilters}
            userId={user?.id || ''}
          />
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default Challenges;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSubscription } from '../hooks/use-subscription';
import { Box, Container, Typography, Tabs, Tab, Button } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import TicketsList from '../Components/roxexchange/TicketList';
import MyTickets from './roxexchange/MyTickets';
import { Ticket as TicketIcon } from 'lucide-react';
import PremiumFeatureModal from './subscription/PremiumFeatureModal';

const RoxExchange = () => {
  const [tabValue, setTabValue] = useState(0);
  const { isAuthenticated, user } = useAuth();
  const { checkFeatureAccess, isPremiumModalOpen, closePremiumModal } = useSubscription();
  const navigate = useNavigate();
  
  const [canAccess, setCanAccess] = useState(false);
  
  // Check access in useEffect to avoid rendering issues
  useEffect(() => {
    setCanAccess(checkFeatureAccess('roxexchange'));
  }, [checkFeatureAccess]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleSellTicket = () => {
    if (canAccess) {
      navigate('/roxexchange/sell');
    }
  };

  if (!isAuthenticated) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Box component="main" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Sign in to access RoxExchange
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              You need to be logged in to buy and sell tickets.
            </Typography>
            <Button variant="contained" href="/login" sx={{ mt: 2 }}>
              Log In
            </Button>
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
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4" component="h1" fontWeight="bold" sx={{ color: '#8B5CF6' }}>
              RoxExchange
            </Typography>
            <Button
              variant="contained"
              startIcon={<TicketIcon />}
              onClick={handleSellTicket}
              sx={{
                bgcolor: '#8B5CF6',
                '&:hover': { bgcolor: '#7C3AED' }
              }}
            >
              Sell a Ticket
            </Button>
          </Box>
          
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{
                '& .MuiTab-root': {
                  fontWeight: 'medium',
                  fontSize: '1rem',
                  textTransform: 'none',
                  minHeight: 48,
                },
                '& .Mui-selected': {
                  color: '#8B5CF6',
                  fontWeight: 'bold',
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#8B5CF6',
                }
              }}
            >
              <Tab label="Browse Tickets" />
              <Tab label="My Tickets" />
            </Tabs>
          </Box>
          
          {tabValue === 0 && <TicketsList />}
          {tabValue === 1 && <MyTickets />}
        </Container>
      </Box>
      
      <Footer />
      
      <PremiumFeatureModal
        open={isPremiumModalOpen}
        onClose={closePremiumModal}
        featureName="RoxExchange"
      />
    </Box>
  );
};

export default RoxExchange;
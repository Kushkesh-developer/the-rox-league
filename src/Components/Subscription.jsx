import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Paper, Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import theme from '../theme/theme';
import SubscriptionPlans from '../Components/subscription/';
import PaymentModal from './subscription/PaymentModal';
import { useAuth } from '../context/AuthContext';

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const { isAuthenticated, user, userSubscription } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { redirectAfterLogin: '/subscription' } });
    }

    const planFromNav = location.state?.plan;
    if (planFromNav) {
      setSelectedPlan(planFromNav);
      setPaymentModalOpen(true);
    }
  }, [isAuthenticated, navigate, location.state]);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setPaymentModalOpen(true);
  };

  const handleClosePaymentModal = () => {
    setPaymentModalOpen(false);
    setSelectedPlan(null);
    window.location.reload();
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <Typography variant="h4" component="h1" sx={{ mb: 2, color: '#8B5CF6', fontWeight: 'bold' }}>
              Subscription Plans
            </Typography>

            <Typography variant="body1" paragraph>
              Choose the plan that works best for you. All plans include a 30-day money-back guarantee.
            </Typography>

            <SubscriptionPlans onSelectPlan={handleSelectPlan} hideFreePlan={userSubscription === 'free'} />

            {userSubscription && userSubscription !== 'free' && (
              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  Manage Your Subscription
                </Typography>
                <Typography variant="body1" paragraph>
                  You are currently subscribed to the {userSubscription} plan.
                </Typography>
                <Button
                  variant="outlined"
                  sx={{
                    color: '#8B5CF6',
                    borderColor: '#8B5CF6',
                    '&:hover': {
                      borderColor: '#7E40E6',
                    }
                  }}
                  onClick={() => {
                    const subscriptionData = localStorage.getItem(`subscription_${user?.id}`);
                    if (subscriptionData) {
                      const subscription = JSON.parse(subscriptionData);
                      subscription.autoRenew = !subscription.autoRenew;
                      localStorage.setItem(`subscription_${user?.id}`, JSON.stringify(subscription));
                      window.location.reload();
                    }
                  }}
                >
                  {userSubscription && localStorage.getItem(`subscription_${user?.id}`) &&
                  JSON.parse(localStorage.getItem(`subscription_${user?.id}`) || '{}').autoRenew === false
                    ? 'Enable Auto-Renewal'
                    : 'Cancel Auto-Renewal'}
                </Button>
              </Box>
            )}
          </Paper>
        </Container>
        <Footer />
      </Box>

      {selectedPlan && (
        <PaymentModal
          open={paymentModalOpen}
          onClose={handleClosePaymentModal}
          planId={selectedPlan.id}
          planName={selectedPlan.name}
          planPrice={selectedPlan.price}
        />
      )}
    </ThemeProvider>
  );
};

export default Subscription;

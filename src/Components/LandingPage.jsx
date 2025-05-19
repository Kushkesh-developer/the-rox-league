import React from 'react';
import Header from './Header';
import HeroSlider from './HeroSlider';
import Features from './Feature';
// import AdSection from './AdSection';
import ContactForm from './ContactForm';
import Footer from './Footer';
import { Box, Container, Typography } from '@mui/material';
import SubscriptionPlans from '../Components/subscription/SubscriptionPlan';

const LandingPage = () => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <Box component="main" sx={{ flexGrow: 1 }}>
        <HeroSlider />
        <Features />

        {/* Subscription Plans Section */}
        <Box sx={{ py: 6, bgcolor: '#F1F0FB' }}>
          <Container>
            <Typography
              variant="h3"
              component="h2"
              align="center"
              fontWeight="bold"
              sx={{ mb: 2 }}
            >
              Choose Your Plan
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: '700px', mx: 'auto' }}
            >
              Get access to premium features and take your training to the next level with our subscription plans.
            </Typography>
            <SubscriptionPlans />
          </Container>
        </Box>

        <ContactForm />
      </Box>

      <Footer />
    </Box>
  );
};

export default LandingPage;

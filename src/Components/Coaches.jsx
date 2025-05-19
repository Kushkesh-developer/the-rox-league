import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import Footer from './Footer';
import CoachDirectory from './coaches/CoachDirectory';
import theme from '../theme/theme'

const Coaches = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Box component="main" sx={{ flexGrow: 1, py: { xs: 4, md: 8 } }}>
          <Container maxWidth="lg">
            <Typography 
              variant="h3" 
              component="h1" 
              sx={{ 
                fontWeight: 'bold',
                mb: 2,
                textAlign: 'center',
                fontSize: { xs: '2rem', md: '2.5rem' }
              }}
            >
              Find Expert Coaches
            </Typography>
            <Typography 
              variant="subtitle1" 
              color="text.secondary"
              sx={{ 
                maxWidth: 700,
                textAlign: 'center',
                mx: 'auto',
                mb: 6,
                fontSize: { xs: '1rem', md: '1.1rem' }
              }}
            >
              Connect with professional fitness coaches who can help you achieve your goals through personalized training plans, race preparation, and expert guidance
            </Typography>
            
            <CoachDirectory />
          </Container>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default Coaches;
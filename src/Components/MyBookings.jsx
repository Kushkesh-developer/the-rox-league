import React, { useEffect, useState } from 'react'; 
import { Box, Container, Typography, Paper, Button, Alert } from '@mui/material'; 
import { ThemeProvider } from '@mui/material/styles'; 
import Header from './Header'; 
import Footer from './Footer'; 
import BookingsList from './bookings/BookingList'; 
import theme from '../theme/theme'; 
import { useAuth } from '../context/AuthContext'; 
import { useNavigate, Link, useLocation } from 'react-router-dom'; 
import { CalendarDays } from 'lucide-react';  

const MyBookings = () => {   
  const { isAuthenticated, user } = useAuth();   
  const navigate = useNavigate();   
  const location = useLocation();
  const [loading, setLoading] = useState(true);
      
  const bookingSuccess = location.state?.bookingSuccess;   
  const bookingDetails = location.state?.bookingDetails;    

  useEffect(() => {
    // Check if user data exists in local storage
    const checkLocalStorage = () => {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    };

    // If not authenticated but user exists in local storage, don't redirect
    const localUser = checkLocalStorage();
    
    if (!isAuthenticated && !localUser) {
      navigate('/login', {
        state: { redirectAfterLogin: '/my-bookings' }
      });
    }
    
    setLoading(false);
  }, [isAuthenticated, navigate]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Header />
          <Container component="main" sx={{ flexGrow: 1, py: 8, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography>Loading your bookings...</Typography>
          </Container>
          <Footer />
        </Box>
      </ThemeProvider>
    );
  }

  // Get user data from context or local storage
  const localUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const currentUser = user || localUser;
  const isUserAuthenticated = isAuthenticated || !!localUser;

  return (      
    <ThemeProvider theme={theme}>       
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>         
        <Header />         
        <Container component="main" sx={{ flexGrow: 1, py: 8 }}>           
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>             
            {isUserAuthenticated && (               
              <>                 
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>                   
                  <Typography variant="h4" component="h1" sx={{ color: '#8B5CF6', fontWeight: 'bold' }}>                     
                    My Bookings                   
                  </Typography>                                      
                  <Button                      
                    component={Link}                     
                    to="/coaches"                     
                    variant="contained"                      
                    color="primary"                     
                    startIcon={<CalendarDays />}                     
                    sx={{                        
                      bgcolor: '#8B5CF6',                        
                      '&:hover': { bgcolor: '#7E40E6' }                     
                    }}                   
                  >                     
                    Book New Session                   
                  </Button>                 
                </Box>                                  
                
                {bookingSuccess && (                   
                  <Alert severity="success" sx={{ mb: 3 }}>                     
                    <Typography variant="body1">                       
                      Booking successful! Your {bookingDetails?.isPackage ? 'package' : 'session'} has been scheduled.                     
                    </Typography>                   
                  </Alert>                 
                )}                                  
                
                {currentUser && (                   
                  <Box sx={{ mb: 4 }}>                     
                    <Alert severity="info" sx={{ mb: 2 }}>                       
                      Welcome back, {currentUser.name}! Here are your bookings.                     
                    </Alert>                   
                  </Box>                 
                )}                                  
                
                <BookingsList />               
              </>             
            )}           
          </Paper>         
        </Container>         
        <Footer />       
      </Box>     
    </ThemeProvider>   
  ); 
};  

export default MyBookings;
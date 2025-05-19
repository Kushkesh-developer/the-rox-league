import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Grid, 
  Button, 
  Chip,
  Divider,
  Card,
  CardMedia,
  CardContent
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import Footer from './Footer';
import { mockSponsors } from '../Components/sponsors/mockData';
import theme from '../theme/theme';
import { ArrowLeft, Globe, Calendar, TrendingUp } from 'lucide-react';

const SponsorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const sponsor = mockSponsors.find(s => s.id === id);
  
  if (!sponsor) {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Header />
          <Box component="main" sx={{ flexGrow: 1, py: 8, mt: 8 }}>
            <Container maxWidth="md">
              <Typography variant="h4" align="center">
                Sponsor not found
              </Typography>
              <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Button 
                  variant="contained" 
                  startIcon={<ArrowLeft />}
                  onClick={() => navigate('/sponsors')}
                >
                  Back to Sponsors
                </Button>
              </Box>
            </Container>
          </Box>
          <Footer />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Box component="main" sx={{ flexGrow: 1, py: 4, mt: 8 }}>
          <Container maxWidth="lg">
            <Button 
              variant="outlined" 
              startIcon={<ArrowLeft size={18} />}
              onClick={() => navigate('/sponsors')}
              sx={{ mb: 3 }}
            >
              Back to Sponsors
            </Button>

            <Paper elevation={0} sx={{ p: 4, mb: 4 }}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                      p: 2,
                      bgcolor: 'background.paper',
                      borderRadius: 1
                    }}
                  >
                    <img 
                      src={sponsor.logoUrl} 
                      alt={sponsor.name} 
                      style={{ 
                        maxWidth: '100%', 
                        maxHeight: 200,
                        objectFit: 'contain'
                      }} 
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Box>
                    <Typography variant="h4" gutterBottom>
                      {sponsor.name}
                    </Typography>
                    
                    <Box sx={{ mb: 2 }}>
                      <Chip 
                        label={sponsor.industryType} 
                        sx={{ 
                          bgcolor: 'primary.main', 
                          color: 'white',
                          fontWeight: 500
                        }} 
                      />
                    </Box>
                    
                    <Typography variant="body1" paragraph>
                      {sponsor.description}
                    </Typography>
                    
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                      <Grid item>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Globe size={18} style={{ marginRight: 8 }} />
                          <Button 
                            variant="text" 
                            href={sponsor.websiteUrl} 
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Visit Website
                          </Button>
                        </Box>
                      </Grid>
                      <Grid item>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Calendar size={18} style={{ marginRight: 8 }} />
                          <Typography variant="body2">
                            Partner since: {new Date(sponsor.joinDate).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <TrendingUp size={18} style={{ marginRight: 8 }} />
                          <Typography variant="body2">
                            Popularity: {sponsor.popularityScore}/100
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Paper>

            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Paper elevation={0} sx={{ p: 3, height: '100%' }}>
                  <Typography variant="h5" gutterBottom>
                    History & Mission
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                    Our History
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {sponsor.history}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                    Our Mission
                  </Typography>
                  <Typography variant="body1">
                    {sponsor.mission}
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card elevation={0}>
                  <CardMedia
                    component="img"
                    height={240}
                    image={sponsor.featuredImageUrl}
                    alt={`${sponsor.name} featured offer`}
                  />
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      Featured Offer
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant="body1" color="text.primary">
                      {sponsor.featuredOffer}
                    </Typography>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      sx={{ mt: 3 }}
                      href={sponsor.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Claim Offer
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default SponsorDetails;
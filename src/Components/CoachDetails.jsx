import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Chip, 
  Avatar, 
  Stack, 
  Button, 
  Divider, 
  List, 
  ListItem, 
  ListItemText,
  Paper,
  Tab,
  Tabs,
  Breadcrumbs
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import Footer from './Footer';
import theme from '../theme/theme';
import { mockCoaches, createBulkPackage } from '../Components/coaches/mockData';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
// import NotFound from './NotFound';
import { NavigateNext } from '@mui/icons-material';
import FeedPost from '../Components/feeds/FeedPost';
import { mockPosts } from '../Components/feeds/mockFeedData';
import { useAuth } from '../context/AuthContext';
import BookingModal from '../Components/bookings/BookingModal';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`coach-tabpanel-${index}`}
      aria-labelledby={`coach-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const CoachDetails = () => {
  const { id } = useParams();
  const [coach, setCoach] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [coachPosts, setCoachPosts] = useState([]);
  const { isAuthenticated, userSubscription } = useAuth();
  const isPaidUser = userSubscription === 'paid';
  
  const [singleBookingOpen, setSingleBookingOpen] = useState(false);
  const [bulkBookingOpen, setBulkBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const foundCoach = mockCoaches.find(c => c.id === id);
    if (foundCoach) {
      setCoach(foundCoach);
    }
    
    if (id) {
      const filteredPosts = mockPosts.filter(post => post.coach.id === id);
      setCoachPosts(filteredPosts);
    }
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleBookSingleSession = (service) => {
    setSelectedService(service);
    setSingleBookingOpen(true);
  };
  
  const handleBookPackage = (service) => {
    setSelectedService(service);
    setBulkBookingOpen(true);
  };

  if (!coach) {
    return (
      <h1> Not Found</h1>
    );
  }
  
  const generatePackages = () => {
    if (!coach.services || coach.services.length === 0) {
      return [];
    }
    
    // Create package options from available services
    return coach.services.map(service => 
      createBulkPackage(service, 4, 15)
    );
  };
  
  const packages = generatePackages();

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Box component="main" sx={{ flexGrow: 1, py: { xs: 4, md: 8 } }}>
          <Container maxWidth="lg">
            <Breadcrumbs separator={<NavigateNext fontSize="small" />} sx={{ mb: 4 }}>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link>
              <Link to="/coaches" style={{ textDecoration: 'none', color: 'inherit' }}>Coaches</Link>
              <Typography color="text.primary">{coach.name}</Typography>
            </Breadcrumbs>

            <Paper elevation={1} sx={{ mb: 4, p: 3, borderRadius: 2 }}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                    <Avatar 
                      src={coach.profilePhoto} 
                      alt={coach.name}
                      sx={{ 
                        width: { xs: 150, md: 180 }, 
                        height: { xs: 150, md: 180 }, 
                        border: '3px solid #9b87f5' 
                      }}
                    />
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 9 }}>
                  <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
                    {coach.name}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocationOnIcon sx={{ color: 'text.secondary', mr: 0.5 }} />
                    <Typography variant="body1">
                      {coach.location.city}, {coach.location.country}
                    </Typography>
                  </Box>
                  
                  <Stack direction="row" spacing={3} divider={<Divider orientation="vertical" flexItem />} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <WorkIcon sx={{ color: 'text.secondary', mr: 0.5 }} />
                      <Typography variant="body1">
                        {coach.yearsOfExperience} {coach.yearsOfExperience === 1 ? 'Year' : 'Years'} Experience
                      </Typography>
                    </Box>
                    {coach.certifications.length > 0 && (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <SchoolIcon sx={{ color: 'text.secondary', mr: 0.5 }} />
                        <Typography variant="body1">
                          {coach.certifications.length} {coach.certifications.length === 1 ? 'Certification' : 'Certifications'}
                        </Typography>
                      </Box>
                    )}
                  </Stack>
                  
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Specialities
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
                    {coach.specialities.map((speciality) => (
                      <Chip 
                        key={speciality} 
                        label={speciality} 
                        sx={{ mb: 1 }}
                      />
                    ))}
                  </Stack>
                  
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Training Styles
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {coach.trainingStyles.map((style) => (
                      <Chip 
                        key={style} 
                        label={style} 
                        variant="outlined"
                        sx={{ mb: 1 }}
                      />
                    ))}
                  </Stack>
                </Grid>
              </Grid>
            </Paper>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab label="Services & Booking" />
                <Tab label="Documents" />
                <Tab label="Feed" />
              </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
              <Box mb={4}>
                <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
                  Single Session Bookings
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph sx={{mb:4}}>
                  Book individual sessions with {coach.name} based on availability.
                </Typography>
                <Grid container spacing={3} sx={{gap:'32px'}}>
                  {coach.services.map((service) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={service.name} >
                      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" component="h3" fontWeight="bold" gutterBottom>
                            {service.name}
                          </Typography>
                          <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
                            ${service.price}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {service.description}
                          </Typography>
                        </CardContent>
                        <Box sx={{ p: 2, pt: 0 }}>
                          <Button 
                            variant="contained" 
                            color="primary"
                            fullWidth
                            onClick={() => handleBookSingleSession(service)}
                            sx={{ borderRadius: 30 }}
                          >
                            Book Session
                          </Button>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
              
              <Box mt={6}>
                <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom >
                  Package Bookings
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph sx={{mb: 4}}>
                  Save by booking multiple sessions in a package. Schedule all sessions at your convenience.
                </Typography>
                <Grid container spacing={3} sx={{gap:'32px'}}>
                  {packages.map((packageOption, index) => (
                    <Grid size={{ xs: 12, md: 6 }} key={index}>
                      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', border: '2px solid', borderColor: 'primary.main' }}>
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                            <Typography variant="h6" component="h3" fontWeight="bold" >
                              {packageOption.name}
                            </Typography>
                            <Chip label="15% Savings" color="primary" size="small" />
                          </Box>
                          <Typography variant="h5" color="primary" sx={{ mb: 1 }}>
                            ${packageOption.price}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                            ${Math.round(packageOption.price / packageOption.sessionCount)} per session
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 2 }}>
                            {packageOption.description}
                          </Typography>
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" gutterBottom>
                              Package Includes:
                            </Typography>
                            <Typography variant="body2">
                              • {packageOption.sessionCount} sessions
                            </Typography>
                            <Typography variant="body2">
                              • Flexible scheduling
                            </Typography>
                            <Typography variant="body2">
                              • Book all sessions at once
                            </Typography>
                          </Box>
                        </CardContent>
                        <Box sx={{ p: 2, pt: 0 }}>
                          <Button 
                            variant="contained" 
                            color="primary"
                            fullWidth
                            onClick={() => handleBookPackage(packageOption)}
                            sx={{ borderRadius: 30 }}
                          >
                            Select Package
                          </Button>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
                Documents
              </Typography>
              {coach.documents && coach.documents.length > 0 ? (
                <List>
                  {coach.documents.map((document) => (
                    <ListItem 
                      key={document.title} 
                      sx={{ 
                        border: '1px solid', 
                        borderColor: 'divider',
                        borderRadius: 1,
                        mb: 2
                      }}
                    >
                      <ListItemText primary={document.title} />
                      <Button 
                        startIcon={<FileDownloadIcon />}
                        variant="outlined"
                        href={document.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download
                      </Button>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography color="text.secondary">
                  No documents available from this coach.
                </Typography>
              )}
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              {coachPosts.length > 0 ? (
                <Box>
                  <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
                    Latest from {coach.name}
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      component={Link} 
                      to={`/feed?coachId=${coach.id}`}
                    >
                      See All Posts from {coach.name}
                    </Button>
                  </Box>
                  {coachPosts.slice(0, 3).map((post) => (
                    <Box key={post.id} sx={{ mb: 4 }}>
                      <FeedPost 
                        post={post} 
                        isAuthenticated={isAuthenticated}
                        isPaidUser={isPaidUser}
                      />
                    </Box>
                  ))}
                  {coachPosts.length > 3 && (
                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                      <Button 
                        variant="outlined"
                        component={Link}
                        to={`/feed?coachId=${coach.id}`}
                      >
                        View More Posts
                      </Button>
                    </Box>
                  )}
                </Box>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No posts yet from this coach
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Check back later for updates, tips, and content from {coach.name}
                  </Typography>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    component={Link} 
                    to="/feed"
                    sx={{ mt: 2 }}
                  >
                    Browse All Coaches' Posts
                  </Button>
                </Box>
              )}
            </TabPanel>
            
            {selectedService && (
              <>
                <BookingModal
                  open={singleBookingOpen}
                  onClose={() => setSingleBookingOpen(false)}
                  service={selectedService}
                  coachName={coach.name}
                />
                
                <BookingModal
                  open={bulkBookingOpen}
                  onClose={() => setBulkBookingOpen(false)}
                  service={selectedService}
                  coachName={coach.name}
                  isPackage={true}
                  sessionCount={selectedService.sessionCount || 4}
                />
              </>
            )}
          </Container>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default CoachDetails;
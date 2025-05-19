import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  TextField, 
  Button, 
  Grid, 
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Divider,
  FormHelperText,
  Radio,
  RadioGroup,
  FormControlLabel,
  Switch,
  IconButton
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useAuth } from '../context/AuthContext';
import { useLocalStorageAuth } from './AuthGuard';
import { 
  User, 
  MapPin, 
  Calendar, 
  Upload, 
  CheckCircle, 
  Clock, 
  Target, 
  Medal, 
  Timer, 
  Users
} from 'lucide-react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Header from './Header';
import Footer from './Footer';
import theme from '../theme/theme';
import AuthGuard from './AuthGuard';
import PremiumFeatureCheck from './PremiumFeatureCheck';

// Existing options arrays (unchanged)
const daysOfWeek = [
  'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
];

const eventTypeOptions = [
  'Marathon', 'Half Marathon', 'OCR', 'Triathlon', '5K', '10K', 'CrossFit Competition'
];

const experienceLevelOptions = [
  'Beginner', 'Intermediate', 'Advanced', 'Elite'
];

const fitnessGoalOptions = [
  'Weight Loss', 'Muscle Gain', 'Endurance', 'Strength', 'Flexibility', 'Overall Fitness'
];

const preferencesOptions = [
  'Outdoor Training', 'Indoor Training', 'Group Sessions', 'One-on-One', 'Virtual Training'
];

const ProfileSetupContent = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { storedUser } = useLocalStorageAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [newGoal, setNewGoal] = useState('');
  const [profileData, setProfileData] = useState({
    bio: '',
    location: {
      city: '',
      country: '',
    },
    gender: '',
    dateOfBirth: null,
    raceStats: {
      fastest5k: '',
      fastest10k: '',
      bestHroxRunTime: '',
      ocrBestTime: '',
      marathonTime: '',
      maxDeadHangTime: '',
      maxWallBallReps: '',
      kettlebellCarryTime: '',
      maxBurpeesIn5Min: '',
      maxPullUps: '',
      maxRowingDistance: '',
    },
    trainingGoals: [],
    media: [],
    roxPartner: {
      eventTypes: [],
      experienceLevel: 'Beginner',
      fitnessGoals: [],
      preferences: [],
      trainingSchedule: {
        monday: { morning: false, morningTime: '06:00', afternoon: false, afternoonTime: '12:00', evening: false, eveningTime: '18:00' },
        tuesday: { morning: false, morningTime: '06:00', afternoon: false, afternoonTime: '12:00', evening: false, eveningTime: '18:00' },
        wednesday: { morning: false, morningTime: '06:00', afternoon: false, afternoonTime: '12:00', evening: false, eveningTime: '18:00' },
        thursday: { morning: false, morningTime: '06:00', afternoon: false, afternoonTime: '12:00', evening: false, eveningTime: '18:00' },
        friday: { morning: false, morningTime: '06:00', afternoon: false, afternoonTime: '12:00', evening: false, eveningTime: '18:00' },
        saturday: { morning: false, morningTime: '06:00', afternoon: false, afternoonTime: '12:00', evening: false, eveningTime: '18:00' },
        sunday: { morning: false, morningTime: '06:00', afternoon: false, afternoonTime: '12:00', evening: false, eveningTime: '18:00' },
      },
      available: true,
    },
  });

  // Initialize profile with data from user context or localStorage
  useEffect(() => {
    const activeUser = user || storedUser;
    if (activeUser) {
      // Pre-fill profile data if available
      if (activeUser.profile) {
        setProfileData(prevData => ({
          ...prevData,
          ...activeUser.profile,
          // Ensure nested objects are properly merged
          location: {
            ...prevData.location,
            ...(activeUser.profile.location || {})
          },
          raceStats: {
            ...prevData.raceStats,
            ...(activeUser.profile.raceStats || {})
          },
          roxPartner: {
            ...prevData.roxPartner,
            ...(activeUser.profile.roxPartner || {}),
            trainingSchedule: {
              ...prevData.roxPartner.trainingSchedule,
              ...(activeUser.profile.roxPartner?.trainingSchedule || {})
            }
          }
        }));
      }
      
      // Set some basic info from user data
      if (activeUser.email && !profileData.bio) {
        setProfileData(prevData => ({
          ...prevData,
          bio: `${activeUser.name || 'Athlete'} - Fitness enthusiast looking to improve performance`
        }));
      }
    }
  }, [user, storedUser]);

  // Add a training goal
  const handleAddGoal = () => {
    if (newGoal.trim() !== '' && !profileData.trainingGoals.includes(newGoal.trim())) {
      setProfileData({
        ...profileData,
        trainingGoals: [...profileData.trainingGoals, newGoal.trim()]
      });
      setNewGoal('');
    }
  };

  // Remove a training goal
  const handleRemoveGoal = (goalToRemove) => {
    setProfileData({
      ...profileData,
      trainingGoals: profileData.trainingGoals.filter(goal => goal !== goalToRemove)
    });
  };

  // Handle file upload for media
  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newMedia = Array.from(files).map(file => ({
        name: file.name,
        type: file.type.startsWith('image/') ? 'photo'  : 'badge' ,
        url: URL.createObjectURL(file)
      }));

      setProfileData({
        ...profileData,
        media: [...profileData.media, ...newMedia]
      });
    }
  };

  // Remove media item
  const handleRemoveMedia = (url) => {
    setProfileData({
      ...profileData,
      media: profileData.media.filter(item => item.url !== url)
    });
  };

  // Handle event type selection
  const handleEventTypeChange = (event) => {
    setProfileData({
      ...profileData,
      roxPartner: {
        ...profileData.roxPartner,
        eventTypes: event.target.value 
      }
    });
  };

  // Handle fitness goals change
  const handleFitnessGoalsChange = (event) => {
    setProfileData({
      ...profileData,
      roxPartner: {
        ...profileData.roxPartner,
        fitnessGoals: event.target.value 
      }
    });
  };

  // Handle preferences change
  const handlePreferencesChange = (event) => {
    setProfileData({
      ...profileData,
      roxPartner: {
        ...profileData.roxPartner,
        preferences: event.target.value 
      }
    });
  };

  // Save profile data with localStorage fallback
  const handleSaveProfile = async () => {
    setIsLoading(true);
    
    try {
      // In a real app, this would make an API call to save the profile data
      console.log('Saving profile data:', profileData);
      
      // Save to localStorage as fallback
      const activeUser = user || storedUser;
      if (activeUser) {
        const updatedUser = {
          ...activeUser,
          profile: profileData
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to dashboard after successful save
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    {
      label: 'Basic Information',
      component: (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <User size={20} /> Basic Information
            </Typography>
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Bio/Description"
              value={profileData.bio}
              onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
              multiline
              rows={4}
              placeholder="Tell us about yourself, your fitness journey, and goals..."
              variant="outlined"
            />
          </Grid>
          
          {/* Rest of Basic Information component remains unchanged */}
          {/* ... */}
          
        </Grid>
      )
    },
    // Rest of steps array remains unchanged
    // ...
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        
        <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <Typography variant="h4" component="h1" sx={{ mb: 2, color: '#8B5CF6', fontWeight: 'bold' }}>
                Profile Setup
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Complete your profile to get the most out of your premium membership.
              </Typography>
            </Box>
            
            {/* Step indicators */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
              {steps.map((step, index) => (
                <Box 
                  key={index}
                  onClick={() => setActiveStep(index)} 
                  sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    cursor: 'pointer',
                    flex: 1
                  }}
                >
                  <Box 
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: activeStep >= index ? '#8B5CF6' : '#F1F0FB',
                      color: activeStep >= index ? 'white' : '#6B7280',
                      mb: 1,
                      transition: 'all 0.3s'
                    }}
                  >
                    {activeStep > index ? <CheckCircle size={20} /> : index + 1}
                  </Box>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: activeStep >= index ? '#8B5CF6' : '#6B7280',
                      textAlign: 'center',
                      display: { xs: 'none', sm: 'block' }
                    }}
                  >
                    {step.label}
                  </Typography>
                </Box>
              ))}
            </Box>
            
            {/* Step content */}
            <Box sx={{ mb: 4 }}>
              {steps[activeStep].component}
            </Box>
            
            {/* Navigation buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 2 }}>
              <Button
                variant="outlined"
                onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                disabled={activeStep === 0 || isLoading}
                sx={{ 
                  borderColor: '#8B5CF6',
                  color: '#8B5CF6',
                  '&:hover': {
                    borderColor: '#7C3AED',
                    backgroundColor: 'rgba(139, 92, 246, 0.04)',
                  }
                }}
              >
                Back
              </Button>
              
              {activeStep < steps.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={() => setActiveStep((prev) => Math.min(steps.length - 1, prev + 1))}
                  sx={{ 
                    bgcolor: '#8B5CF6',
                    '&:hover': { bgcolor: '#7C3AED' }
                  }}
                >
                  Next
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleSaveProfile}
                  disabled={isLoading}
                  sx={{ 
                    bgcolor: '#8B5CF6',
                    '&:hover': { bgcolor: '#7C3AED' }
                  }}
                >
                  {isLoading ? 'Saving...' : 'Save Profile'}
                </Button>
              )}
            </Box>
          </Paper>
        </Container>
        
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

// Main component with auth protection
const ProfileSetup = () => {
  return (
    <AuthGuard>
      <PremiumFeatureCheck featureName="Profile Setup">
        <ProfileSetupContent />
      </PremiumFeatureCheck>
    </AuthGuard>
  );
};

export default ProfileSetup;
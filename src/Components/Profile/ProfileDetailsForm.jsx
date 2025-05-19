import React, { useState, useEffect } from 'react';
import {
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  FormControlLabel,
  Switch,
  FormGroup,
  FormLabel,
  RadioGroup,
  Radio,
  Divider,
  InputAdornment,
  IconButton
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../hooks/use-toast';

// Extended user profile interface
// interface ExtendedUserProfile extends UserProfile {
//   bio?: string;
//   gender?: string;
//   dateOfBirth?: string;
//   raceStats?: {
//     fastest5k?: string;
//     fastest10k?: string;
//     bestHyroxTime?: string;
//     bestOCRTime?: string;
//     marathonTime?: string;
//     halfMarathonTime?: string;
//     maxDeadHangTime?: string;
//     maxWallBallReps?: string;
//     kettlebellCarryTime?: string;
//     maxBurpees?: string;
//     maxPullUps?: string;
//     maxRowingDistance?: string;
//   };
//   trainingGoals?: string[];
//   racePhotos?: string[];
//   badges?: string[];
//   partner?: {
//     eventTypes?: string[];
//     experienceLevel?: string;
//     fitnessGoals?: string[];
//     preferences?: string[];
//     schedule?: {
//       [key: string]: {
//         morning?: boolean;
//         morningTime?: string;
//         afternoon?: boolean;
//         afternoonTime?: string;
//         evening?: boolean;
//         eveningTime?: string;
//       };
//     };
//     isAvailable?: boolean;
//   };
// }

const ProfileDetailsForm = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profileData, setProfileData] = useState(null);
  const [trainingGoal, setTrainingGoal] = useState('');
  const [days] = useState(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']);

  useEffect(() => {
    if (user) {
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const currentUser = storedUsers.find((u) => u.id === user.id);
      
      if (currentUser) {
        setProfileData(currentUser);
      }
    }
  }, [user]);

  const handleAddTrainingGoal = () => {
    if (!trainingGoal.trim() || !profileData) return;
    
    setProfileData({
      ...profileData,
      trainingGoals: [...(profileData.trainingGoals || []), trainingGoal]
    });
    
    setTrainingGoal('');
  };

  const handleRemoveTrainingGoal = (index) => {
    if (!profileData) return;
    
    const newGoals = [...(profileData.trainingGoals || [])];
    newGoals.splice(index, 1);
    
    setProfileData({
      ...profileData,
      trainingGoals: newGoals
    });
  };

  const handleEventTypesChange = (event) => {
    if (!profileData) return;
    
    setProfileData({
      ...profileData,
      partner: {
        ...(profileData.partner || {}),
        eventTypes: event.target.value 
      }
    });
  };

  const handleScheduleChange = (day, period, value) => {
    if (!profileData) return;
    
    const schedule = profileData.partner?.schedule || {};
    const daySchedule = schedule[day] || {};
    
    setProfileData({
      ...profileData,
      partner: {
        ...(profileData.partner || {}),
        schedule: {
          ...schedule,
          [day]: {
            ...daySchedule,
            [period]: value
          }
        }
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (user && profileData) {
      // Update user in localStorage
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = storedUsers.findIndex((u) => u.id === user.id);
      
      if (userIndex !== -1) {
        storedUsers[userIndex] = profileData;
        localStorage.setItem('users', JSON.stringify(storedUsers));
        
        toast({
          title: "Profile updated",
          description: "Your profile details have been updated successfully",
        });
      }
    }
  };

  if (!profileData) {
    return <Typography>Loading profile data...</Typography>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>Profile Details</Typography>
      
      {/* Basic Profile Details */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Bio/Description"
            multiline
            rows={4}
            value={profileData.bio || ''}
            onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="City"
            value={profileData.location?.split(',')[0] || ''}
            onChange={(e) => {
              const country = profileData.location?.split(',')[1]?.trim() || '';
              setProfileData({...profileData, location: `${e.target.value}${country ? `, ${country}` : ''}`});
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Country"
            value={profileData.location?.split(',')[1]?.trim() || ''}
            onChange={(e) => {
              const city = profileData.location?.split(',')[0] || '';
              setProfileData({...profileData, location: `${city}${city ? ', ' : ''}${e.target.value}`});
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select
              value={profileData.gender || ''}
              label="Gender"
              onChange={(e) => setProfileData({...profileData, gender: e.target.value })}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
              <MenuItem value="prefer-not-to-say">Prefer not to say</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Date of Birth"
            type="date"
            value={profileData.dateOfBirth || ''}
            onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
      
      {/* Race Statistics */}
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>Race Statistics</Typography>
      <Divider sx={{ mb: 3 }} />
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Fastest 5K Run Time"
            placeholder="e.g. 22:30"
            value={profileData.raceStats?.fastest5k || ''}
            onChange={(e) => setProfileData({
              ...profileData, 
              raceStats: {...(profileData.raceStats || {}), fastest5k: e.target.value}
            })}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Fastest 10K Run Time"
            placeholder="e.g. 47:15"
            value={profileData.raceStats?.fastest10k || ''}
            onChange={(e) => setProfileData({
              ...profileData, 
              raceStats: {...(profileData.raceStats || {}), fastest10k: e.target.value}
            })}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Best Hyrox Run Time"
            placeholder="e.g. 1:05:30"
            value={profileData.raceStats?.bestHyroxTime || ''}
            onChange={(e) => setProfileData({
              ...profileData, 
              raceStats: {...(profileData.raceStats || {}), bestHyroxTime: e.target.value}
            })}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="OCR Best Time"
            placeholder="e.g. 2:15:00"
            value={profileData.raceStats?.bestOCRTime || ''}
            onChange={(e) => setProfileData({
              ...profileData, 
              raceStats: {...(profileData.raceStats || {}), bestOCRTime: e.target.value}
            })}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Marathon Time"
            placeholder="e.g. 3:45:20"
            value={profileData.raceStats?.marathonTime || ''}
            onChange={(e) => setProfileData({
              ...profileData, 
              raceStats: {...(profileData.raceStats || {}), marathonTime: e.target.value}
            })}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Half-Marathon Time"
            placeholder="e.g. 1:55:10"
            value={profileData.raceStats?.halfMarathonTime || ''}
            onChange={(e) => setProfileData({
              ...profileData, 
              raceStats: {...(profileData.raceStats || {}), halfMarathonTime: e.target.value}
            })}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Max Dead Hang Time"
            placeholder="e.g. 1:30"
            value={profileData.raceStats?.maxDeadHangTime || ''}
            onChange={(e) => setProfileData({
              ...profileData, 
              raceStats: {...(profileData.raceStats || {}), maxDeadHangTime: e.target.value}
            })}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Max Wall Ball Reps (10 Min)"
            type="number"
            value={profileData.raceStats?.maxWallBallReps || ''}
            onChange={(e) => setProfileData({
              ...profileData, 
              raceStats: {...(profileData.raceStats || {}), maxWallBallReps: e.target.value}
            })}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="500m Kettlebell Carry Time"
            placeholder="e.g. 4:15"
            value={profileData.raceStats?.kettlebellCarryTime || ''}
            onChange={(e) => setProfileData({
              ...profileData, 
              raceStats: {...(profileData.raceStats || {}), kettlebellCarryTime: e.target.value}
            })}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Max Burpees in 5 Minutes"
            type="number"
            value={profileData.raceStats?.maxBurpees || ''}
            onChange={(e) => setProfileData({
              ...profileData, 
              raceStats: {...(profileData.raceStats || {}), maxBurpees: e.target.value}
            })}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Max Pull-ups in a Single Attempt"
            type="number"
            value={profileData.raceStats?.maxPullUps || ''}
            onChange={(e) => setProfileData({
              ...profileData, 
              raceStats: {...(profileData.raceStats || {}), maxPullUps: e.target.value}
            })}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Max Rowing Distance in 10 Min (m)"
            type="number"
            value={profileData.raceStats?.maxRowingDistance || ''}
            onChange={(e) => setProfileData({
              ...profileData, 
              raceStats: {...(profileData.raceStats || {}), maxRowingDistance: e.target.value}
            })}
          />
        </Grid>
      </Grid>
      
      {/* Training Goals */}
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>Training Goals</Typography>
      <Divider sx={{ mb: 3 }} />
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Add Training Goal"
            value={trainingGoal}
            onChange={(e) => setTrainingGoal(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button onClick={handleAddTrainingGoal}>Add</Button>
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {profileData.trainingGoals?.map((goal, index) => (
              <Chip
                key={index}
                label={goal}
                onDelete={() => handleRemoveTrainingGoal(index)}
                color="primary"
                variant="outlined"
              />
            ))}
            {(!profileData.trainingGoals || profileData.trainingGoals.length === 0) && (
              <Typography variant="body2" color="text.secondary">
                No training goals added yet.
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
      
      {/* RoxPartner Feature Parameters */}
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>RoxPartner Preferences</Typography>
      <Divider sx={{ mb: 3 }} />
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={profileData.partner?.isAvailable || false}
                onChange={(e) => setProfileData({
                  ...profileData,
                  partner: {...(profileData.partner || {}), isAvailable: e.target.checked}
                })}
                color="primary"
              />
            }
            label="Available for Training Partnerships"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Events Willing to Train For</InputLabel>
            <Select
              multiple
              value={profileData.partner?.eventTypes || []}
              onChange={handleEventTypesChange}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {(selected ).map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              <MenuItem value="HYROX">HYROX</MenuItem>
              <MenuItem value="Marathon">Marathon</MenuItem>
              <MenuItem value="Half-Marathon">Half-Marathon</MenuItem>
              <MenuItem value="5K">5K</MenuItem>
              <MenuItem value="10K">10K</MenuItem>
              <MenuItem value="OCR">Obstacle Course Race</MenuItem>
              <MenuItem value="Triathlon">Triathlon</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Experience Level</FormLabel>
            <RadioGroup
              row
              value={profileData.partner?.experienceLevel || ''}
              onChange={(e) => setProfileData({
                ...profileData,
                partner: {...(profileData.partner || {}), experienceLevel: e.target.value}
              })}
            >
              <FormControlLabel value="beginner" control={<Radio />} label="Beginner" />
              <FormControlLabel value="intermediate" control={<Radio />} label="Intermediate" />
              <FormControlLabel value="advanced" control={<Radio />} label="Advanced" />
              <FormControlLabel value="professional" control={<Radio />} label="Professional" />
            </RadioGroup>
          </FormControl>
        </Grid>
        
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>Training Schedule Availability</Typography>
          
          {days.map((day) => (
            <Box key={day} sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ textTransform: 'capitalize', mb: 1 }}>
                {day}
              </Typography>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Switch
                      checked={profileData.partner?.schedule?.[day]?.morning || false}
                      onChange={(e) => handleScheduleChange(day, 'morning', e.target.checked)}
                    />
                  }
                  label="Morning"
                />
                {profileData.partner?.schedule?.[day]?.morning && (
                  <TextField
                    label="Time"
                    type="time"
                    size="small"
                    value={profileData.partner?.schedule?.[day]?.morningTime || ''}
                    onChange={(e) => setProfileData({
                      ...profileData,
                      partner: {
                        ...(profileData.partner || {}),
                        schedule: {
                          ...(profileData.partner?.schedule || {}),
                          [day]: {
                            ...(profileData.partner?.schedule?.[day] || {}),
                            morningTime: e.target.value
                          }
                        }
                      }
                    })}
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ step: 300 }}
                    sx={{ mx: 2, width: 120 }}
                  />
                )}
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={profileData.partner?.schedule?.[day]?.afternoon || false}
                      onChange={(e) => handleScheduleChange(day, 'afternoon', e.target.checked)}
                    />
                  }
                  label="Afternoon"
                />
                {profileData.partner?.schedule?.[day]?.afternoon && (
                  <TextField
                    label="Time"
                    type="time"
                    size="small"
                    value={profileData.partner?.schedule?.[day]?.afternoonTime || ''}
                    onChange={(e) => setProfileData({
                      ...profileData,
                      partner: {
                        ...(profileData.partner || {}),
                        schedule: {
                          ...(profileData.partner?.schedule || {}),
                          [day]: {
                            ...(profileData.partner?.schedule?.[day] || {}),
                            afternoonTime: e.target.value
                          }
                        }
                      }
                    })}
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ step: 300 }}
                    sx={{ mx: 2, width: 120 }}
                  />
                )}
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={profileData.partner?.schedule?.[day]?.evening || false}
                      onChange={(e) => handleScheduleChange(day, 'evening', e.target.checked)}
                    />
                  }
                  label="Evening"
                />
                {profileData.partner?.schedule?.[day]?.evening && (
                  <TextField
                    label="Time"
                    type="time"
                    size="small"
                    value={profileData.partner?.schedule?.[day]?.eveningTime || ''}
                    onChange={(e) => setProfileData({
                      ...profileData,
                      partner: {
                        ...(profileData.partner || {}),
                        schedule: {
                          ...(profileData.partner?.schedule || {}),
                          [day]: {
                            ...(profileData.partner?.schedule?.[day] || {}),
                            eveningTime: e.target.value
                          }
                        }
                      }
                    })}
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ step: 300 }}
                    sx={{ mx: 2, width: 120 }}
                  />
                )}
              </FormGroup>
            </Box>
          ))}
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 4 }}>
        <Button type="submit" variant="contained" color="primary">
          Save Profile Details
        </Button>
      </Box>
    </form>
  );
};

export default ProfileDetailsForm;

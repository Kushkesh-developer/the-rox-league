import React from 'react';
import { 
  Card, 
  CardContent, 
  CardActions, 
  Typography, 
  Button, 
  Avatar, 
  Box,
  Chip,
  Stack,
  Divider
} from '@mui/material';
import { Link } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import { Coach } from './coaches/CoachDirectory';

// interface CoachCardProps {
//   coach: Coach;
// }

const CoachCard = ({ coach }) => {
  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      borderRadius: 2,
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
      }
    }}>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar 
            src={coach.profilePhoto} 
            alt={coach.name}
            sx={{ 
              width: 80, 
              height: 80, 
              border: '2px solid #9b87f5' 
            }}
          />
          <Box>
            <Typography variant="h5" component="h2" fontWeight="bold">
              {coach.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
              <LocationOnIcon sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
              <Typography variant="body2" color="text.secondary">
                {coach.location.city}, {coach.location.country}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box>
          <Typography variant="subtitle2" fontWeight="bold" color="primary" gutterBottom>
            Specialities
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {coach.specialities.slice(0, 3).map((speciality) => (
              <Chip 
                key={speciality} 
                label={speciality} 
                size="small"
                sx={{ mb: 1 }}
              />
            ))}
            {coach.specialities.length > 3 && (
              <Chip 
                label={`+${coach.specialities.length - 3}`} 
                size="small"
                variant="outlined"
                sx={{ mb: 1 }}
              />
            )}
          </Stack>
        </Box>

        <Box>
          <Typography variant="subtitle2" fontWeight="bold" color="primary" gutterBottom>
            Training Style
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {coach.trainingStyles.slice(0, 2).map((style) => (
              <Chip 
                key={style} 
                label={style} 
                size="small"
                variant="outlined"
                sx={{ mb: 1 }}
              />
            ))}
            {coach.trainingStyles.length > 2 && (
              <Chip 
                label={`+${coach.trainingStyles.length - 2}`} 
                size="small"
                variant="outlined"
                sx={{ mb: 1 }}
              />
            )}
          </Stack>
        </Box>

        <Stack direction="row" spacing={3} divider={<Divider orientation="vertical" flexItem />}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <WorkIcon sx={{ fontSize: 18, color: 'text.secondary', mr: 0.5 }} />
            <Typography variant="body2">
              {coach.yearsOfExperience} {coach.yearsOfExperience === 1 ? 'Year' : 'Years'}
            </Typography>
          </Box>
          {coach.certifications.length > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <SchoolIcon sx={{ fontSize: 18, color: 'text.secondary', mr: 0.5 }} />
              <Typography variant="body2">
                {coach.certifications.length} {coach.certifications.length === 1 ? 'Certification' : 'Certifications'}
              </Typography>
            </Box>
          )}
        </Stack>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button 
          component={Link}
          to={`/coaches/${coach.id}`}
          variant="contained" 
          color="primary" 
          sx={{ 
            borderRadius: 30,
            textTransform: 'none',
          }}
          fullWidth
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default CoachCard;
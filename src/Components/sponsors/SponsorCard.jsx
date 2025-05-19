import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const SponsorCard = ({ sponsor }) => {
  const navigate = useNavigate();
  
  const handleViewDetails = () => {
    navigate(`/sponsors/${sponsor.id}`);
  };

  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: 6
      }
    }}>
      <CardMedia
        component="img"
        height="160"
        image={sponsor.logoUrl}
        alt={sponsor.name}
        sx={{ objectFit: 'contain', p: 2, bgcolor: 'background.paper' }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          {sponsor.name}
        </Typography>
        
        <Box sx={{ mb: 1 }}>
          <Chip 
            label={sponsor.industryType} 
            size="small" 
            sx={{ 
              bgcolor: 'primary.main', 
              color: 'white',
              fontWeight: 500,
              fontSize: '0.75rem'
            }} 
          />
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
          {sponsor.description.length > 120 
            ? `${sponsor.description.substring(0, 120)}...` 
            : sponsor.description}
        </Typography>
        
        <Button 
          variant="outlined" 
          color="primary"
          onClick={handleViewDetails}
          fullWidth
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default SponsorCard;
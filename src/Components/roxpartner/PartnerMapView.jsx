import React, { useState } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { MapPin, MessageSquare } from 'lucide-react';

const PartnerMapView = ({ partners }) => {
  const [selectedPartner, setSelectedPartner] = useState(null);

  const handleMessage = (partner) => {
    console.log('Messaging partner:', partner.name);
    // Implement messaging logic here
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%', bgcolor: '#f0f0f0', borderRadius: 2 }}>
      {/* Placeholder for actual map */}
      <Box sx={{ 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center',
        p: 3,
        textAlign: 'center'
      }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Map View
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          This map would display the {partners.length} partners in your area based on the specified filters.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          In a full implementation, this would integrate with a map service like Google Maps or Mapbox,
          showing partner locations and allowing you to click on markers to view partner details.
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 4, justifyContent: 'center' }}>
          {partners.map((partner) => (
            <Box 
              key={partner.id} 
              onClick={() => setSelectedPartner(partner)}
              sx={{ 
                display: 'inline-flex',
                alignItems: 'center',
                bgcolor: selectedPartner?.id === partner.id ? '#8B5CF6' : 'white',
                color: selectedPartner?.id === partner.id ? 'white' : 'inherit',
                px: 2,
                py: 1,
                borderRadius: 2,
                boxShadow: 1,
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: selectedPartner?.id === partner.id ? '#7C3AED' : '#f5f5f5',
                }
              }}
            >
              <MapPin size={16} style={{ marginRight: 8 }} />
              {partner.name} ({partner.location.split(',')[0]})
            </Box>
          ))}
        </Box>
      </Box>

      {/* Partner info overlay */}
      {selectedPartner && (
        <Paper 
          elevation={3} 
          sx={{ 
            position: 'absolute', 
            bottom: 16, 
            left: 16, 
            p: 2, 
            width: 'calc(100% - 32px)', 
            maxWidth: 400,
            borderRadius: 2
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
            <Box 
              component="img" 
              src={selectedPartner.profileImage} 
              alt={selectedPartner.name}
              sx={{ 
                width: 60, 
                height: 60, 
                borderRadius: '50%',
                mr: 2
              }}
            />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {selectedPartner.name}
              </Typography>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                <MapPin size={14} style={{ marginRight: 4 }} /> {selectedPartner.location}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {selectedPartner.experienceLevel} • {selectedPartner.eventTypes.join(', ')}
              </Typography>
            </Box>
            <Button
              variant="contained"
              size="small"
              startIcon={<MessageSquare size={16} />}
              onClick={() => handleMessage(selectedPartner)}
              sx={{ 
                bgcolor: '#8B5CF6',
                '&:hover': {
                  bgcolor: '#7C3AED',
                }
              }}
            >
              Message
            </Button>
          </Box>

          <Typography variant="body2" sx={{ mt: 1 }}>
            {selectedPartner.bio.length > 100 
              ? `${selectedPartner.bio.substring(0, 100)}...` 
              : selectedPartner.bio}
          </Typography>

          <Button 
            size="small" 
            onClick={() => setSelectedPartner(null)}
            sx={{ mt: 1, color: 'text.secondary' }}
          >
            Close
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default PartnerMapView;

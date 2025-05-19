import React from 'react';
import { Dialog, DialogContent, DialogTitle, Button, Box, Typography, Card, CardContent } from '@mui/material';
import { Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PremiumFeatureModal = ({ open, onClose, featureName }) => {
  const navigate = useNavigate();

  const handleSubscribe = () => {
    onClose();
    navigate('/subscription');
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Lock size={24} color="#8B5CF6" />
          <Typography variant="h5" component="div" fontWeight="bold">
            Premium Feature
          </Typography>
        </Box>
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Box 
            sx={{ 
              width: 80, 
              height: 80, 
              borderRadius: '50%', 
              bgcolor: '#F1F0FB', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto',
              mb: 2
            }}
          >
            <Lock size={40} color="#8B5CF6" />
          </Box>
          
          <Typography variant="h6" gutterBottom>
            {featureName} requires a premium subscription
          </Typography>
          
          <Typography variant="body1" paragraph color="text.secondary">
            Subscribe to our premium plans to access this feature and many more exclusive benefits.
          </Typography>
        </Box>
        
        <Card variant="outlined" sx={{ mb: 3, borderRadius: 2, bgcolor: '#F1F0FB' }}>
          <CardContent>
            <Typography variant="body1" paragraph>
              <strong>Benefits of Premium:</strong>
            </Typography>
            <ul style={{ paddingLeft: '20px' }}>
              <li>Access to premium workouts</li>
              <li>Private coaching sessions</li>
              <li>Analytics dashboard</li>
              <li>Priority support</li>
            </ul>
          </CardContent>
        </Card>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button onClick={onClose}>
            Maybe Later
          </Button>
          
          <Button
            variant="contained"
            onClick={handleSubscribe}
            sx={{
              bgcolor: '#8B5CF6',
              '&:hover': {
                bgcolor: '#7E40E6',
              }
            }}
          >
            View Subscription Plans
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumFeatureModal;

import React from 'react';
import { Box, Typography, Card, CardContent, CardActions, Button, Grid, List, ListItem, ListItemIcon, ListItemText, Chip } from '@mui/material';
import { Check, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const plans = [
  {
    id: 'free',
    name: 'Free Plan',
    price: 0,
    billingPeriod: 'forever',
    description: 'Basic access to the platform with limited features',
    features: [
      { name: 'Access to basic workouts', included: true },
      { name: 'Public coach profiles', included: true },
      { name: 'Community posts', included: true },
      { name: 'Premium workouts', included: false },
      { name: 'Private coaching sessions', included: false },
      { name: 'Analytics dashboard', included: false },
    ]
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    price: 19.99,
    billingPeriod: 'monthly',
    description: 'Full access to all platform features',
    features: [
      { name: 'Access to basic workouts', included: true },
      { name: 'Public coach profiles', included: true },
      { name: 'Community posts', included: true },
      { name: 'Premium workouts', included: true },
      { name: 'Private coaching sessions', included: true },
      { name: 'Analytics dashboard', included: true },
    ],
    recommended: true
  },
  {
    id: 'pro',
    name: 'Pro Plan',
    price: 49.99,
    billingPeriod: 'monthly',
    description: 'Everything in Premium plus priority support',
    features: [
      { name: 'Access to basic workouts', included: true },
      { name: 'Public coach profiles', included: true },
      { name: 'Community posts', included: true },
      { name: 'Premium workouts', included: true },
      { name: 'Private coaching sessions', included: true },
      { name: 'Analytics dashboard', included: true },
      { name: 'Priority support', included: true },
      { name: 'Personalized training plan', included: true },
    ]
  }
];

const SubscriptionPlans = ({ onSelectPlan, hideFreePlan = false }) => {
  const navigate = useNavigate();
  const { isAuthenticated, userSubscription } = useAuth();
  
  const handlePurchase = (plan) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { redirectAfterLogin: '/subscription' } });
      return;
    }

    if (onSelectPlan) {
      onSelectPlan(plan);
    } else {
      navigate('/payment', { state: { plan } });
    }
  };

  const displayedPlans = hideFreePlan ? plans.filter(plan => plan.id !== 'free') : plans;

  return (
    <Box sx={{ py: 6 }}>
      <Typography variant="h4" component="h2" align="center" gutterBottom fontWeight="bold" sx={{ mb: 4 }}>
        Choose Your Plan
      </Typography>
      
      <Grid container spacing={4} justifyContent="center">
        {displayedPlans.map((plan) => (
          <Grid item xs={12} sm={6} md={4} key={plan.id}>
            <Card 
              elevation={plan.recommended ? 6 : 1}
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                position: 'relative',
                borderRadius: 2,
                ...(plan.recommended && {
                  border: '2px solid #8B5CF6',
                  transform: 'scale(1.05)',
                }),
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: plan.recommended ? 'scale(1.08)' : 'scale(1.03)',
                }
              }}
            >
              {plan.recommended && (
                <Chip 
                  label="Recommended"
                  color="primary"
                  icon={<Star size={16} />}
                  sx={{ 
                    position: 'absolute',
                    top: -12,
                    right: 16,
                    bgcolor: '#8B5CF6',
                    fontSize: '0.85rem',
                    fontWeight: 'bold'
                  }}
                />
              )}
              
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography variant="h5" component="h3" gutterBottom fontWeight="bold" color="#8B5CF6">
                  {plan.name}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
                  <Typography variant="h4" component="span" fontWeight="bold">
                    ${plan.price}
                  </Typography>
                  <Typography variant="subtitle1" component="span" sx={{ ml: 1, color: 'text.secondary' }}>
                    /{plan.billingPeriod}
                  </Typography>
                </Box>
                
                <Typography variant="body2" color="text.secondary" paragraph>
                  {plan.description}
                </Typography>
                
                <List dense sx={{ mt: 2 }}>
                  {plan.features.map((feature, index) => (
                    <ListItem key={index} dense disableGutters>
                      <ListItemIcon sx={{ minWidth: 28 }}>
                        <Check size={18} color={feature.included ? '#8B5CF6' : '#C8C8C9'} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={feature.name} 
                        sx={{
                          '& .MuiListItemText-primary': {
                            color: feature.included ? 'text.primary' : 'text.disabled',
                            fontSize: '0.9rem'
                          }
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
              
              <CardActions sx={{ p: 3, pt: 0 }}>
                <Button 
                  fullWidth 
                  variant={plan.recommended ? "contained" : "outlined"}
                  size="large"
                  onClick={() => handlePurchase(plan)}
                  disabled={plan.id === 'free' || userSubscription === plan.id}
                  sx={{
                    py: 1.2,
                    borderRadius: 2,
                    ...(plan.recommended && {
                      bgcolor: '#8B5CF6',
                      '&:hover': {
                        bgcolor: '#7E40E6',
                      }
                    }),
                    ...(plan.id === 'free' ? {
                      display: 'none'
                    } : {}),
                    ...(userSubscription === plan.id ? {
                      bgcolor: 'action.disabledBackground',
                      color: 'text.disabled',
                    } : {})
                  }}
                >
                  {userSubscription === plan.id ? 'Current Plan' : plan.price === 0 ? 'Current Plan' : 'Subscribe'}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SubscriptionPlans;

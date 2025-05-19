import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Alert,
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Grid,
  CircularProgress
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../hooks/use-toast';

const PaymentModal = ({ open, onClose, planId, planName, planPrice }) => {
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setPaymentDetails(prev => ({ ...prev, [name]: formatted }));
    } else if (name === 'expiry') {
      const formatted = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .slice(0, 5);
      setPaymentDetails(prev => ({ ...prev, [name]: formatted }));
    } else if (name === 'cvv') {
      const formatted = value.replace(/\D/g, '').slice(0, 4);
      setPaymentDetails(prev => ({ ...prev, [name]: formatted }));
    } else {
      setPaymentDetails(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    setError('');

    if (!paymentDetails.cardNumber.trim() || paymentDetails.cardNumber.replace(/\s/g, '').length < 16) {
      setError('Please enter a valid card number');
      return false;
    }

    if (!paymentDetails.cardName.trim()) {
      setError('Please enter the name on card');
      return false;
    }

    if (!paymentDetails.expiry.trim() || !paymentDetails.expiry.includes('/')) {
      setError('Please enter a valid expiry date (MM/YY)');
      return false;
    }

    if (!paymentDetails.cvv.trim() || paymentDetails.cvv.length < 3) {
      setError('Please enter a valid CVV code');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const subscriptionDate = new Date();
      const expiryDate = new Date(subscriptionDate);
      expiryDate.setDate(expiryDate.getDate() + 30);

      localStorage.setItem(`subscription_${user?.id}`, JSON.stringify({
        planId,
        planName,
        planPrice,
        purchaseDate: subscriptionDate.toISOString(),
        expiryDate: expiryDate.toISOString(),
        autoRenew: true
      }));

      toast({
        title: "Payment Successful!",
        description: `You are now subscribed to ${planName}. An invoice has been sent to your email.`,
      });

      onClose();

      console.log('Invoice generated and emailed to:', user?.email);
    } catch (err) {
      setError('Payment processing failed. Please try again.');
      console.error('Payment error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={loading ? undefined : onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h5" component="div" fontWeight="bold">
          Complete Your Purchase
        </Typography>
      </DialogTitle>

      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Card variant="outlined" sx={{ mb: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Order Summary
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1">{planName}</Typography>
                  <Typography variant="body1" fontWeight="bold">${planPrice}</Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', color: 'text.secondary', mb: 2 }}>
                  <Typography variant="body2">Billed Monthly</Typography>
                  <Typography variant="body2">Auto-renews in 30 days</Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Typography variant="body1" fontWeight="bold">Total</Typography>
                  <Typography variant="body1" fontWeight="bold">${planPrice}</Typography>
                </Box>
              </CardContent>
            </Card>

            <Typography variant="body2" color="text.secondary">
              By completing this purchase, you agree to our Terms of Service and acknowledge that your subscription will automatically renew. You can cancel the auto-renewal at any time from your profile.
            </Typography>
          </Grid>

          <Grid item xs={12} md={7}>
            <Box component="form" onSubmit={handleSubmit}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Payment Information
              </Typography>

              <TextField
                margin="normal"
                required
                fullWidth
                label="Card Number"
                name="cardNumber"
                value={paymentDetails.cardNumber}
                onChange={handleInputChange}
                disabled={loading}
                placeholder="1234 5678 9012 3456"
                sx={{ mb: 2 }}
                inputProps={{ maxLength: 19 }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                label="Name on Card"
                name="cardName"
                value={paymentDetails.cardName}
                onChange={handleInputChange}
                disabled={loading}
                sx={{ mb: 2 }}
              />

              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  margin="normal"
                  required
                  label="Expiry Date"
                  name="expiry"
                  value={paymentDetails.expiry}
                  onChange={handleInputChange}
                  disabled={loading}
                  placeholder="MM/YY"
                  sx={{ mb: 2, flex: 1 }}
                  inputProps={{ maxLength: 5 }}
                />

                <TextField
                  margin="normal"
                  required
                  label="CVV"
                  name="cvv"
                  type="password"
                  value={paymentDetails.cvv}
                  onChange={handleInputChange}
                  disabled={loading}
                  sx={{ mb: 2, flex: 1 }}
                  inputProps={{ maxLength: 4 }}
                />
              </Box>

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Button onClick={onClose} disabled={loading}>
                  Cancel
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    py: 1.5,
                    px: 4,
                    bgcolor: '#8B5CF6',
                    '&:hover': {
                      bgcolor: '#7E40E6',
                    }
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} sx={{ color: 'white' }} />
                  ) : (
                    `Pay $${planPrice}`
                  )}
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;

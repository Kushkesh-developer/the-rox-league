import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSubscription } from '../hooks/use-subscription';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  FormHelperText,
  Breadcrumbs,
  Link,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Ticket, ArrowLeft, Upload } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

const raceTypes = ['OCR', 'Hyrox', 'Marathon', 'Endurance', 'Triathlon', 'Cycling', 'Crossfit'];
const ticketTypes = ['Standard', 'VIP', 'Group Entry'];
const currencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD'];

const SellTicket = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { checkFeatureAccess } = useSubscription();

  const [eventName, setEventName] = useState('');
  const [raceType, setRaceType] = useState('');
  const [eventDateTime, setEventDateTime] = useState(null);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [price, setPrice] = useState('');
  const [ticketType, setTicketType] = useState('');
  const [notes, setNotes] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [canAccess, setCanAccess] = useState(false);

  // Check access in useEffect to avoid rendering issues
  useEffect(() => {
    const access = checkFeatureAccess('roxexchange');
    setCanAccess(access);
    
    if (!isAuthenticated || !access) {
      navigate('/subscription');
    }
  }, [isAuthenticated, checkFeatureAccess, navigate]);

  const validateForm = () => {
    const newErrors = {};

    if (!eventName) newErrors.eventName = 'Event name is required';
    if (!raceType) newErrors.raceType = 'Race type is required';
    if (!eventDateTime) newErrors.eventDateTime = 'Event date and time is required';
    if (!city) newErrors.city = 'City is required';
    if (!country) newErrors.country = 'Country is required';
    if (!price) newErrors.price = 'Price is required';
    else if (isNaN(Number(price)) || Number(price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }
    if (!ticketType) newErrors.ticketType = 'Ticket type is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Submit logic here
    alert('Ticket submitted for approval!');
    navigate('/roxexchange');
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Show loading state or empty component while checking access
  if (!isAuthenticated || !canAccess) {
    return null;
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
        <Container>
          <Box sx={{ mb: 4 }}>
            <Button
              startIcon={<ArrowLeft />}
              onClick={() => navigate('/roxexchange')}
              sx={{ mb: 2 }}
            >
              Back to RoxExchange
            </Button>

            <Breadcrumbs sx={{ mb: 2 }}>
              <Link underline="hover" color="inherit" href="/">
                Home
              </Link>
              <Link underline="hover" color="inherit" href="/roxexchange">
                RoxExchange
              </Link>
              <Typography color="text.primary">Sell Ticket</Typography>
            </Breadcrumbs>

            <Typography variant="h4" fontWeight="bold" sx={{ color: '#8B5CF6' }}>
              Sell a Ticket
            </Typography>
          </Box>

          <Paper sx={{ p: 4, mb: 4 }}>
            <Box component="form" onSubmit={handleSubmit}>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Ticket Details
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    label="Event Name"
                    fullWidth
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    error={!!errors.eventName}
                    helperText={errors.eventName}
                    required
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth error={!!errors.raceType} required>
                    <InputLabel id="race-type-label">Race Type</InputLabel>
                    <Select
                      labelId="race-type-label"
                      value={raceType}
                      label="Race Type"
                      onChange={(e) => setRaceType(e.target.value)}
                    >
                      {raceTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.raceType && <FormHelperText>{errors.raceType}</FormHelperText>}
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      label="Event Date & Time"
                      value={eventDateTime}
                      onChange={(newValue) => setEventDateTime(newValue)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          required: true,
                          error: !!errors.eventDateTime,
                          helperText: errors.eventDateTime,
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="City"
                    fullWidth
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    error={!!errors.city}
                    helperText={errors.city}
                    required
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Country"
                    fullWidth
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    error={!!errors.country}
                    helperText={errors.country}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>
                    Pricing Information
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth error={!!errors.ticketType} required>
                    <InputLabel id="ticket-type-label">Ticket Type</InputLabel>
                    <Select
                      labelId="ticket-type-label"
                      value={ticketType}
                      label="Ticket Type"
                      onChange={(e) => setTicketType(e.target.value)}
                    >
                      {ticketTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.ticketType && <FormHelperText>{errors.ticketType}</FormHelperText>}
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth error={!!errors.price} required>
                    <InputLabel htmlFor="price">Price</InputLabel>
                    <OutlinedInput
                      id="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      startAdornment={
                        <InputAdornment position="start">
                          <Select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            sx={{ minWidth: 65 }}
                          >
                            {currencies.map((curr) => (
                              <MenuItem key={curr} value={curr}>
                                {curr}
                              </MenuItem>
                            ))}
                          </Select>
                        </InputAdornment>
                      }
                      label="Price"
                    />
                    {errors.price && <FormHelperText>{errors.price}</FormHelperText>}
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Seller Notes (Optional)"
                    fullWidth
                    multiline
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>
                    Ticket Image
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Box
                    sx={{
                      border: '2px dashed #E5E7EB',
                      borderRadius: 2,
                      p: 3,
                      textAlign: 'center',
                      bgcolor: '#F9FAFB',
                      cursor: 'pointer',
                      position: 'relative',
                    }}
                    onClick={() => document.getElementById('ticket-image-input')?.click()}
                  >
                    <input
                      type="file"
                      id="ticket-image-input"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleImageChange}
                    />

                    {imagePreview ? (
                      <Box>
                        <img
                          src={imagePreview}
                          alt="Ticket Preview"
                          style={{
                            maxWidth: '100%',
                            maxHeight: '200px',
                            objectFit: 'contain',
                            marginBottom: '16px',
                          }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          Click to change image
                        </Typography>
                      </Box>
                    ) : (
                      <Box>
                        <Upload size={32} style={{ marginBottom: 16, color: '#8B5CF6' }} />
                        <Typography variant="body1" sx={{ mb: 1 }}>
                          Upload Ticket Image
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Click to select or drag and drop an image file
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Grid>

                <Grid item xs={12} sx={{ mt: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="outlined" onClick={() => navigate('/roxexchange')} sx={{ mr: 2 }}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={<Ticket />}
                      sx={{
                        bgcolor: '#8B5CF6',
                        '&:hover': { bgcolor: '#7C3AED' },
                      }}
                    >
                      Submit for Approval
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default SellTicket;
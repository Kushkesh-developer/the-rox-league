import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Container, Typography, Paper, Grid, Button,
  TextField, FormControl, InputLabel, Select, MenuItem,
  Chip
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Users, MapPin, Filter, X } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import theme from '../theme/theme';
import { useAuth } from '../context/AuthContext';
import { useSubscription } from '../hooks/use-subscription';
import PremiumFeatureModal from '../Components/subscription/PremiumFeatureModal';
import PartnerCard from '../Components/roxpartner/PartnerCard';
import PartnerMapView from '../Components/roxpartner/PartnerMapView';
import { mockPartners } from '../Components/roxpartner/mockData';

const RoxPartner = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userSubscription, isPremiumFeatureEnabled } = useAuth();
  const { checkFeatureAccess, isPremiumModalOpen, closePremiumModal } = useSubscription();
  const [viewMode, setViewMode] = useState('list');
  const [isLoading, setIsLoading] = useState(true);
  const [partners, setPartners] = useState(mockPartners);
  const [filteredPartners, setFilteredPartners] = useState(mockPartners);

  const [filters, setFilters] = useState({
    eventType: '',
    location: '',
    trainingStyle: '',
    experienceLevel: '',
    availability: true
  });

  const eventTypeOptions = ['Marathon', 'Half Marathon', 'OCR', 'Triathlon', '5K', '10K', 'CrossFit Competition'];
  const trainingStyleOptions = ['Outdoor Training', 'Indoor Training', 'Group Sessions', 'One-on-One', 'Virtual Training'];
  const experienceLevelOptions = ['Beginner', 'Intermediate', 'Advanced', 'Elite'];

  useEffect(() => {
    const hasPremiumAccess = checkFeatureAccess('roxpartner');
    if (!hasPremiumAccess) return;

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [checkFeatureAccess]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    if (name) {
      setFilters({ ...filters, [name]: value });
    }
  };

  const applyFilters = () => {
    let filtered = [...partners];

    if (filters.eventType) {
      filtered = filtered.filter(partner => partner.eventTypes.includes(filters.eventType));
    }
    if (filters.location) {
      filtered = filtered.filter(partner => partner.location.toLowerCase().includes(filters.location.toLowerCase()));
    }
    if (filters.trainingStyle) {
      filtered = filtered.filter(partner => partner.preferences.includes(filters.trainingStyle));
    }
    if (filters.experienceLevel) {
      filtered = filtered.filter(partner => partner.experienceLevel === filters.experienceLevel);
    }
    filtered = filtered.filter(partner => partner.available);

    setFilteredPartners(filtered);
  };

  const clearFilters = () => {
    setFilters({
      eventType: '',
      location: '',
      trainingStyle: '',
      experienceLevel: '',
      availability: true
    });
    setFilteredPartners(partners.filter(partner => partner.available));
  };

  useEffect(() => {
    applyFilters();
  }, [filters]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ color: '#8B5CF6', fontWeight: 'bold', mb: 1 }}>
              <Users className="inline-block mr-2" /> Find a Training Partner
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Connect with other athletes for your next training session or event.
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
            <Button
              variant={viewMode === 'list' ? 'contained' : 'outlined'}
              onClick={() => setViewMode('list')}
              sx={{
                mr: 1,
                bgcolor: viewMode === 'list' ? '#8B5CF6' : 'transparent',
                color: viewMode === 'list' ? 'white' : '#8B5CF6'
              }}
            >
              <Users size={18} style={{ marginRight: '4px' }} /> List View
            </Button>
            <Button
              variant={viewMode === 'map' ? 'contained' : 'outlined'}
              onClick={() => setViewMode('map')}
              sx={{
                bgcolor: viewMode === 'map' ? '#8B5CF6' : 'transparent',
                color: viewMode === 'map' ? 'white' : '#8B5CF6'
              }}
            >
              <MapPin size={18} style={{ marginRight: '4px' }} /> Map View
            </Button>
          </Box>

          <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              <Filter size={20} style={{ marginRight: '8px' }} /> Partner Search Filters
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Event Type</InputLabel>
                  <Select name="eventType" value={filters.eventType} onChange={handleFilterChange}>
                    <MenuItem value="">All Event Types</MenuItem>
                    {eventTypeOptions.map(option => <MenuItem key={option} value={option}>{option}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth size="small" label="Location"
                  name="location" value={filters.location} onChange={handleFilterChange}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Training Style</InputLabel>
                  <Select name="trainingStyle" value={filters.trainingStyle} onChange={handleFilterChange}>
                    <MenuItem value="">All Styles</MenuItem>
                    {trainingStyleOptions.map(option => <MenuItem key={option} value={option}>{option}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Experience</InputLabel>
                  <Select name="experienceLevel" value={filters.experienceLevel} onChange={handleFilterChange}>
                    <MenuItem value="">All Levels</MenuItem>
                    {experienceLevelOptions.map(option => <MenuItem key={option} value={option}>{option}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2}>
                <Button fullWidth variant="outlined" onClick={clearFilters} startIcon={<X size={16} />}>
                  Clear
                </Button>
              </Grid>
            </Grid>

            {(filters.eventType || filters.location || filters.trainingStyle || filters.experienceLevel) && (
              <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Typography variant="body2" sx={{ mr: 1, color: 'text.secondary' }}>Active filters:</Typography>
                {filters.eventType && <Chip label={`Event: ${filters.eventType}`} onDelete={() => setFilters({ ...filters, eventType: '' })} size="small" />}
                {filters.location && <Chip label={`Location: ${filters.location}`} onDelete={() => setFilters({ ...filters, location: '' })} size="small" />}
                {filters.trainingStyle && <Chip label={`Style: ${filters.trainingStyle}`} onDelete={() => setFilters({ ...filters, trainingStyle: '' })} size="small" />}
                {filters.experienceLevel && <Chip label={`Level: ${filters.experienceLevel}`} onDelete={() => setFilters({ ...filters, experienceLevel: '' })} size="small" />}
              </Box>
            )}
          </Paper>

          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">Loading partners...</Typography>
            </Box>
          ) : (
            viewMode === 'list' ? (
              filteredPartners.length > 0 ? (
                <Grid container spacing={3}>
                  {filteredPartners.map(partner => (
                    <Grid item xs={12} md={4} key={partner.id}>
                      <PartnerCard partner={partner} />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <Typography variant="h6" color="text.secondary">No partners found</Typography>
                  <Button variant="contained" onClick={clearFilters} sx={{ mt: 2 }}>Clear All Filters</Button>
                </Box>
              )
            ) : (
              <Box sx={{ height: '600px', borderRadius: 2, overflow: 'hidden' }}>
                <PartnerMapView partners={filteredPartners} />
              </Box>
            )
          )}
        </Container>
        <Footer />
      </Box>
      <PremiumFeatureModal open={isPremiumModalOpen} onClose={closePremiumModal} featureName="RoxPartner" />
    </ThemeProvider>
  );
};

export default RoxPartner;

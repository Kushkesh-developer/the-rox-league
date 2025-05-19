import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  TextField, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Select, 
  Chip,
  Avatar,
  Stack,
  Slider,
  InputAdornment,
  IconButton,
  Divider,
  Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import FilterListIcon from '@mui/icons-material/FilterList';
import CoachCard from './CoachCard';
import { mockCoaches } from './mockData';

const CoachDirectory = () => {
  // const [coaches, setCoaches] = useState(mockCoaches); 
  const [filteredCoaches, setFilteredCoaches] = useState(mockCoaches);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [specialityFilter, setSpecialityFilter] = useState([]);
  const [locationFilter, setLocationFilter] = useState('');
  const [priceRange, setPriceRange] = useState([0, 500]);

  // Get unique specialities for filter dropdown
  const allSpecialities = [...new Set(mockCoaches.flatMap(coach => coach.specialities))];
  const allLocations = [...new Set(mockCoaches.map(coach => `${coach.location.city}, ${coach.location.country}`))];

  useEffect(() => {
    // Filter coaches based on search query and filters
    let filtered = [...mockCoaches];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(coach => 
        coach.name.toLowerCase().includes(query) || 
        coach.specialities.some(s => s.toLowerCase().includes(query))
      );
    }

    // Speciality filter
    if (specialityFilter.length > 0) {
      filtered = filtered.filter(coach => 
        coach.specialities.some(spec => specialityFilter.includes(spec))
      );
    }

    // Location filter
    if (locationFilter) {
      filtered = filtered.filter(coach => 
        `${coach.location.city}, ${coach.location.country}` === locationFilter
      );
    }

    // Price range filter
    filtered = filtered.filter(coach => {
      const minCoachPrice = Math.min(...coach.services.map(service => service.price));
      const maxCoachPrice = Math.max(...coach.services.map(service => service.price));
      return maxCoachPrice >= priceRange[0] && minCoachPrice <= priceRange[1];
    });

    // Sort coaches
    if (sortBy === 'popularity') {
      filtered.sort((a, b) => b.popularity - a.popularity);
    } else if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime());
    }

    setFilteredCoaches(filtered);
  }, [searchQuery, sortBy, specialityFilter, locationFilter, priceRange]);

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleSpecialityChange = (event) => {
    const { value } = event.target;
    setSpecialityFilter(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <Box>
      {/* Search and Filters Section */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3} sx={{gap:"32px",mx:2 ,my:2}}>
          {/* Search bar - full width on its own row */}
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              placeholder="Search coaches by name or speciality..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          
          {/* Filter controls row */}
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
                startAdornment={<SortIcon sx={{ mr: 1, ml: -0.5 }} />}
              >
                <MenuItem value="popularity">Most Popular</MenuItem>
                <MenuItem value="newest">Newest Coaches</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth>
              <InputLabel>Filter by Speciality</InputLabel>
              <Select
                multiple
                value={specialityFilter}
                onChange={handleSpecialityChange}
                label="Filter by Speciality"
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} size="small" />
                    ))}
                  </Box>
                )}
                startAdornment={<FilterListIcon sx={{ mr: 1, ml: -0.5 }} />}
              >
                {allSpecialities.map((speciality) => (
                  <MenuItem key={speciality} value={speciality}>
                    {speciality}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl sx={{width:"fullWidth"}}>
              <InputLabel>Location</InputLabel>
              <Select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                label="Location"
              >
                <MenuItem value="">Any Location</MenuItem>
                {allLocations.map((location) => (
                  <MenuItem key={location} value={location}>
                    {location}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          {/* Price range on its own row */}
          <Grid size={{ xs: 12 }}>
            <Typography gutterBottom>Price Range (${priceRange[0]} - ${priceRange[1]})</Typography>
            <Slider
              value={priceRange}
              onChange={handlePriceRangeChange}
              valueLabelDisplay="auto"
              min={0}
              max={500}
              step={10}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Results Count */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1">
          Found {filteredCoaches.length} coaches matching your criteria
        </Typography>
      </Box>

      {/* Coach Cards */}
      <Grid container spacing={3}>
        {filteredCoaches.map((coach) => (
          <Grid item key={coach.id} xs={12} md={6}>
            <CoachCard coach={coach} />
          </Grid>
        ))}
      </Grid>

      {filteredCoaches.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No coaches found matching your criteria
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Try adjusting your filters or search query
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default CoachDirectory;
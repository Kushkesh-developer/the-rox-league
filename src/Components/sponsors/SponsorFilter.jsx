import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  InputAdornment,
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Grid
} from '@mui/material';
import { Search, ArrowDownAZ } from 'lucide-react'; // ✅ valid icons

const SponsorFilters = ({ 
  onSearchChange, 
  onSortChange, 
  onIndustryFilterChange,
  industries
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('popular');
  const [industryFilter, setIndustryFilter] = useState('');

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  };

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortOption(value);
    onSortChange(value);
  };

  const handleIndustryChange = (event) => {
    const value = event.target.value;
    setIndustryFilter(value);
    onIndustryFilterChange(value);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Grid container spacing={2}>
        {/* Search Input */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search sponsors by name..."
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={20} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* Industry Filter */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="industry-select-label">Industry Type</InputLabel>
            <Select
              labelId="industry-select-label"
              value={industryFilter}
              onChange={handleIndustryChange}
              label="Industry Type"
            >
              <MenuItem value="">All Industries</MenuItem>
              {industries.map((industry) => (
                <MenuItem key={industry} value={industry}>{industry}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Sort Options */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="sort-select-label">Sort By</InputLabel>
            <Select
              labelId="sort-select-label"
              value={sortOption}
              onChange={handleSortChange}
              label="Sort By"
              startAdornment={
                <InputAdornment position="start">
                  <ArrowDownAZ size={20} />
                </InputAdornment>
              }
            >
              <MenuItem value="popular">Most Popular</MenuItem>
              <MenuItem value="newest">Newest</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SponsorFilters;

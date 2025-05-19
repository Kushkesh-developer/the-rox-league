import React from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography, Grid, IconButton } from '@mui/material';
import { Filter } from 'lucide-react';

const ChallengeFilters = ({
  showFilters,
  toggleFilters,
  activeFilters,
  handleFilterChange,
  handleClearFilters
}) => {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Find Challenges</Typography>
        <Button 
          onClick={toggleFilters}
          startIcon={<Filter size={20} />}
          sx={{ 
            color: '#8B5CF6',
            '&:hover': {
              backgroundColor: 'rgba(139, 92, 246, 0.08)'
            }
          }}
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </Box>

      {showFilters && (
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Challenge Type</InputLabel>
                <Select
                  value={activeFilters.type}
                  label="Challenge Type"
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                >
                  <MenuItem value="">All Types</MenuItem>
                  <MenuItem value="time-based">Time Based</MenuItem>
                  <MenuItem value="rep-based">Rep Based</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Event Type</InputLabel>
                <Select
                  value={activeFilters.eventType}
                  label="Event Type"
                  onChange={(e) => handleFilterChange('eventType', e.target.value)}
                >
                  <MenuItem value="">All Events</MenuItem>
                  <MenuItem value="endurance">Endurance</MenuItem>
                  <MenuItem value="strength">Strength</MenuItem>
                  <MenuItem value="hybrid">Hybrid</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Difficulty</InputLabel>
                <Select
                  value={activeFilters.difficulty}
                  label="Difficulty"
                  onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                >
                  <MenuItem value="">All Levels</MenuItem>
                  <MenuItem value="beginner">Beginner</MenuItem>
                  <MenuItem value="intermediate">Intermediate</MenuItem>
                  <MenuItem value="advanced">Advanced</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              onClick={handleClearFilters}
              sx={{ 
                mr: 1,
                color: 'text.secondary',
              }}
            >
              Clear Filters
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ChallengeFilters;
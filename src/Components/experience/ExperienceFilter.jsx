import React from 'react';
import {
  TextField,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Box,
} from '@mui/material';

const eventTypes = ['First Race', 'Victory', 'Comeback', 'Personal Best', 'Other'];

export const ExperienceFilters = ({ onSearch, onTypeFilter, onHashtagFilter }) => {
  const [selectedType, setSelectedType] = React.useState('all');

  const handleTypeChange = (event) => {
    const value = event.target.value;
    setSelectedType(value);
    onTypeFilter(value);
  };

  return (
    <Box
      display="flex"
      flexDirection={{ xs: 'column', md: 'row' }}
      gap={2}
      mb={4}
    >
      <TextField
        label="Search events"
        variant="outlined"
        fullWidth
        onChange={(e) => onSearch(e.target.value)}
      />

      <FormControl fullWidth>
        <InputLabel id="event-type-label">Filter by type</InputLabel>
        <Select
          labelId="event-type-label"
          value={selectedType}
          label="Filter by type"
          onChange={handleTypeChange}
        >
          <MenuItem value="all">All Types</MenuItem>
          {eventTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Filter by hashtag"
        variant="outlined"
        fullWidth
        onChange={(e) => onHashtagFilter(e.target.value)}
      />
    </Box>
  );
};

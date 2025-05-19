import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  TextField, 
  MenuItem, 
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  Paper,
  Pagination
} from '@mui/material';
import { Search } from 'lucide-react';
import TicketCard from './TicketCard';
import { mockTickets } from './mockTicketData';

const raceTypes = [
  'All',
  'OCR',
  'Hyrox',
  'Marathon',
  'Endurance',
  'Triathlon',
  'Cycling',
  'Crossfit'
];

const TicketsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [raceType, setRaceType] = useState('All');
  const [location, setLocation] = useState('');
  const [tickets, setTickets] = useState(mockTickets);
  const [page, setPage] = useState(1);
  const [filteredTickets, setFilteredTickets] = useState(mockTickets);
  const ticketsPerPage = 6;

  useEffect(() => {
    let results = mockTickets;

    if (searchTerm) {
      results = results.filter(ticket => 
        ticket.eventName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (raceType && raceType !== 'All') {
      results = results.filter(ticket => ticket.raceType === raceType);
    }

    if (location) {
      results = results.filter(ticket => 
        ticket.location.city.toLowerCase().includes(location.toLowerCase()) ||
        ticket.location.country.toLowerCase().includes(location.toLowerCase())
      );
    }

    setFilteredTickets(results);
    setPage(1);
  }, [searchTerm, raceType, location]);

  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);
  const displayedTickets = filteredTickets.slice(
    (page - 1) * ticketsPerPage,
    page * ticketsPerPage
  );

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search events"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={20} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
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
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Location"
              placeholder="City or Country"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" component="h2">
            {filteredTickets.length} tickets found
          </Typography>
        </Box>

        {filteredTickets.length > 0 ? (
          <>
            <Grid container spacing={3}>
              {displayedTickets.map((ticket) => (
                <Grid item xs={12} sm={6} md={4} key={ticket.id}>
                  <TicketCard ticket={ticket} mode="buy" />
                </Grid>
              ))}
            </Grid>

            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination 
                  count={totalPages} 
                  page={page} 
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                />
              </Box>
            )}
          </>
        ) : (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No tickets found
            </Typography>
            <Typography color="text.secondary">
              Try adjusting your filters
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TicketsList;

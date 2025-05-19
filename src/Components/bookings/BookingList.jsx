import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  Tabs,
  Tab,
  Grid
} from '@mui/material';
import { Search, FilterList } from '@mui/icons-material';
import { format, isAfter, isBefore, parseISO, isToday } from 'date-fns';
import BookingsTable from './BookingTable';
import { mockBookings } from './mockBookingData';
import BookingDetailsModal from './BookingDetailsModel';

// Type for a booking filter state
// interface BookingsFilter {
//   search: string;
//   type: 'all' | 'single' | 'package';
//   status: 'all' | 'upcoming' | 'ongoing' | 'completed' | 'rescheduled' | 'cancelled';
//   dateRange: 'all' | 'today' | 'thisWeek' | 'thisMonth';
// }

const BookingsList = () => {
  const [filter, setFilter] = useState({
    search: '',
    type: 'all',
    status: 'all',
    dateRange: 'all',
  });
  
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  
  const handleTabChange = (_event, newValue) => {
    setTabValue(newValue);
    switch (newValue) {
      case 0: // All
        setFilter({ ...filter, status: 'all' });
        break;
      case 1: // Upcoming
        setFilter({ ...filter, status: 'upcoming' });
        break;
      case 2: // Ongoing
        setFilter({ ...filter, status: 'ongoing' });
        break;
      case 3: // Completed
        setFilter({ ...filter, status: 'completed' });
        break;
      case 4: // Cancelled/Rescheduled
        setFilter({ ...filter, status: 'rescheduled' });
        break;
    }
  };

  const handleFilterChange = (event) => {
    const name = event.target.name 
    setFilter({
      ...filter,
      [name]: event.target.value,
    });
  };

  const handleSearch = (event) => {
    setFilter({
      ...filter,
      search: event.target.value,
    });
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setIsDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedBooking(null);
  };

  // Filter bookings based on current filter state
  const filteredBookings = mockBookings.filter(booking => {
    // Search by booking ID or coach name
    if (filter.search && 
        !booking.id.toLowerCase().includes(filter.search.toLowerCase()) &&
        !booking.coachName.toLowerCase().includes(filter.search.toLowerCase())) {
      return false;
    }
    
    // Filter by type
    if (filter.type !== 'all' && booking.type !== filter.type) {
      return false;
    }
    
    // Filter by status
    if (filter.status !== 'all' && booking.status !== filter.status) {
      return false;
    }
    
    // Filter by date range
    if (filter.dateRange !== 'all') {
      const bookingDate = parseISO(booking.sessionDate);
      const today = new Date();
      
      if (filter.dateRange === 'today' && !isToday(bookingDate)) {
        return false;
      }
      
      // Add more date filtering logic as needed
    }
    
    return true;
  });

  return (
    <Box>
      {/* Tabs for quick filtering */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          aria-label="booking status tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="All Bookings" />
          <Tab label="Upcoming" />
          <Tab label="Ongoing" />
          <Tab label="Completed" />
          <Tab label="Cancelled/Rescheduled" />
        </Tabs>
      </Box>

      {/* Search and Filter Controls */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search by Booking ID or Coach"
            value={filter.search}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Box display="flex" gap={2}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="booking-type-label">Booking Type</InputLabel>
              <Select
                labelId="booking-type-label"
                name="type"
                value={filter.type}
                onChange={handleFilterChange}
                label="Booking Type"
              >
                <MenuItem value="all">All Types</MenuItem>
                <MenuItem value="single">Single Session</MenuItem>
                <MenuItem value="package">Package</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="date-range-label">Date Range</InputLabel>
              <Select
                labelId="date-range-label"
                name="dateRange"
                value={filter.dateRange}
                onChange={handleFilterChange}
                label="Date Range"
              >
                <MenuItem value="all">All Time</MenuItem>
                <MenuItem value="today">Today</MenuItem>
                <MenuItem value="thisWeek">This Week</MenuItem>
                <MenuItem value="thisMonth">This Month</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Grid>

      {/* Bookings Table */}
      {filteredBookings.length > 0 ? (
        <BookingsTable 
          bookings={filteredBookings} 
          onViewDetails={handleViewDetails}
        />
      ) : (
        <Typography variant="body1" align="center" sx={{ py: 5 }}>
          No bookings found matching your criteria.
        </Typography>
      )}

      {/* Booking Details Modal */}
      {selectedBooking && (
        <BookingDetailsModal
          open={isDetailsModalOpen}
          booking={selectedBooking}
          onClose={closeDetailsModal}
        />
      )}
    </Box>
  );
};

export default BookingsList;
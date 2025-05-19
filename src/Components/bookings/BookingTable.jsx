import React from 'react';
import { format, parseISO } from 'date-fns';
import { Visibility, Message } from '@mui/icons-material';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Chip,
  Box,
  TableContainer,
  Paper,
} from '@mui/material';

// Helper function to get status chip color
const getStatusColor = (status) => {
  switch (status) {
    case 'upcoming':
      return 'primary';
    case 'ongoing':
      return 'success';
    case 'completed':
      return 'default';
    case 'rescheduled':
      return 'warning';
    case 'cancelled':
      return 'error';
    default:
      return 'default';
  }
};

// Helper function to format status text
const formatStatus = (status) => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

const BookingsTable = ({ bookings, onViewDetails }) => {
  return (
    <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
      <Table aria-label="bookings table">
        <TableHead sx={{ bgcolor: 'background.default' }}>
          <TableRow>
            <TableCell>Booking ID</TableCell>
            <TableCell>Coach</TableCell>
            <TableCell>Booking Type</TableCell>
            <TableCell>Session Date & Time</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow
              key={booking.id}
              sx={{
                '&:hover': { bgcolor: 'action.hover' },
                bgcolor: booking.status === 'ongoing' ? 'rgba(76, 175, 80, 0.08)' : 'inherit'
              }}
            >
              <TableCell>{booking.id}</TableCell>
              <TableCell>{booking.coachName}</TableCell>
              <TableCell>
                {booking.type === 'package'
                  ? `Package (${booking.sessionCount} sessions)`
                  : 'Single Session'}
              </TableCell>
              <TableCell>
                {format(parseISO(booking.sessionDate), 'PP')}
                <br />
                {format(parseISO(booking.sessionDate), 'p')}
              </TableCell>
              <TableCell>${booking.amount.toFixed(2)}</TableCell>
              <TableCell>
                <Chip
                  label={formatStatus(booking.status)}
                  color={getStatusColor(booking.status)}
                  size="small"
                  variant="outlined"
                />
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Visibility />}
                    onClick={() => onViewDetails(booking)}
                  >
                    Details
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    color="secondary"
                    startIcon={<Message />}
                  >
                    Message
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BookingsTable;

import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Chip
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const BookingHistory = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    if (user) {
      const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      const userBookings = storedBookings.filter((booking) => booking.userId === user.id);

      if (userBookings.length === 0) {
        const sampleBookings = [
          {
            id: '1',
            userId: user.id,
            bookingType: 'Coaching Session',
            amount: 75.0,
            paymentStatus: 'paid',
            paymentDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: '2',
            userId: user.id,
            bookingType: 'Workshop',
            amount: 120.0,
            paymentStatus: 'paid',
            paymentDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: '3',
            userId: user.id,
            bookingType: 'Event Registration',
            amount: 50.0,
            paymentStatus: 'pending',
            paymentDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        localStorage.setItem('bookings', JSON.stringify([...storedBookings, ...sampleBookings]));
        setBookings(sampleBookings);
      } else {
        setBookings(userBookings);
      }
    }
  }, [user]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'error';
      case 'refunded':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Booking History</Typography>

      {bookings.length > 0 ? (
        <>
          <TableContainer component={Paper} sx={{ mb: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'primary.light' }}>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Booking ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Amount</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((booking) => (
                    <TableRow key={booking.id} hover>
                      <TableCell>{booking.id}</TableCell>
                      <TableCell>{booking.bookingType}</TableCell>
                      <TableCell>${booking.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Chip 
                          label={booking.paymentStatus} 
                          color={getStatusColor(booking.paymentStatus)}
                          size="small"
                          sx={{ textTransform: 'capitalize' }}
                        />
                      </TableCell>
                      <TableCell>
                        {new Date(booking.paymentDate).toLocaleDateString()} {new Date(booking.paymentDate).toLocaleTimeString()}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={bookings.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </>
      ) : (
        <Typography variant="body1" sx={{ mt: 2 }}>
          No booking history found.
        </Typography>
      )}
    </Box>
  );
};

export default BookingHistory;

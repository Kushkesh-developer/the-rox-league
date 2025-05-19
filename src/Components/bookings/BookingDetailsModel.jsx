import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  Button,
  IconButton,
  Divider,
  Chip,
  Rating,
  TextField,
  Alert,
  AlertTitle,
  List,
  ListItem,
  ListItemText,
  Paper,
  Grid as MuiGrid
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { format, parseISO, isAfter, isBefore, addMinutes } from 'date-fns';
import { Video, Calendar, Clock, DollarSign, Star, MessageSquare } from 'lucide-react';

const BookingDetailsModal = ({ open, booking, onClose }) => {
  const [feedback, setFeedback] = useState({
    rating: 5,
    comment: '',
  });
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  
  if (!booking) return null;

  const sessionDate = parseISO(booking.sessionDate);
  const sessionEndTime = addMinutes(sessionDate, booking.durationMinutes || 60);
  const now = new Date();
  
  const canJoin = booking.status === 'upcoming' || booking.status === 'ongoing';
  const isSessionLive = isAfter(now, sessionDate) && isBefore(now, sessionEndTime);
  
  const handleFeedbackChange = (event) => {
    setFeedback({
      ...feedback,
      comment: event.target.value,
    });
  };
  
  const handleRatingChange = (_event, newValue) => {
    setFeedback({
      ...feedback,
      rating: newValue || 5,
    });
  };
  
  const handleSubmitFeedback = () => {
    console.log('Submitting feedback:', feedback);
    setFeedbackSubmitted(true);
    setShowFeedbackForm(false);
  };
  
  const handleJoinSession = () => {
    window.open(booking.meetingLink, '_blank');
  };
  
  const handleCancelBooking = () => {
    alert('Booking cancellation initiated. You will receive a refund according to the cancellation policy.');
    onClose();
  };

  const formatSessionDates = () => {
    if (!booking.sessionDates || booking.type !== 'package') return null;
    
    return booking.sessionDates.map((date, index) => {
      const sessionDate = parseISO(date);
      
      return (
        <ListItem key={index} divider={index < booking.sessionDates.length - 1}>
          <ListItemText
            primary={`Session ${index + 1}`}
            secondary={
              <>
                <Typography component="span" variant="body2">
                  {format(sessionDate, 'PPP')} at {format(sessionDate, 'p')}
                </Typography>
                <Chip 
                  size="small" 
                  label={index < (booking.completedSessions || 0) ? "Completed" : "Upcoming"}
                  color={index < (booking.completedSessions || 0) ? "default" : "primary"}
                  variant="outlined"
                  sx={{ ml: 1 }}
                />
              </>
            }
          />
        </ListItem>
      );
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">Booking Details</Typography>
          <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Box mb={3}>
          <MuiGrid container spacing={2}>
            <MuiGrid item xs={12} md={6}>
              <Paper sx={{ p: 2, height: '100%' }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Session Information
                </Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Calendar size={20} />
                    <Typography variant="body1">
                      {format(parseISO(booking.sessionDate), 'PPP')}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Clock size={20} />
                    <Typography variant="body1">
                      {format(parseISO(booking.sessionDate), 'p')} - {format(addMinutes(parseISO(booking.sessionDate), booking.durationMinutes), 'p')}
                      {' '}({booking.durationMinutes} minutes)
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <DollarSign size={20} />
                    <Typography variant="body1">
                      ${booking.amount.toFixed(2)} paid via {booking.paymentMethod}
                    </Typography>
                  </Box>
                  <Divider />
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Booking ID: {booking.id}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                      Type: {booking.type === 'package' ? `Package (${booking.sessionCount} sessions)` : 'Single Session'}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                      Service: {booking.serviceName}
                    </Typography>
                    <Typography variant="subtitle2">
                      Status: <Chip 
                        label={booking.status.charAt(0).toUpperCase() + booking.status.slice(1)} 
                        size="small" 
                        color={
                          booking.status === 'upcoming' ? 'primary' :
                          booking.status === 'ongoing' ? 'success' :
                          booking.status === 'completed' ? 'default' :
                          booking.status === 'rescheduled' ? 'warning' : 'error'
                        }
                      />
                    </Typography>
                  </Box>
                  {booking.status === 'rescheduled' && (
                    <Box mt={1}>
                      <Alert severity="info">
                        <AlertTitle>Rescheduled Session</AlertTitle>
                        This session was rescheduled from {format(parseISO(booking.originalDate), 'PPP')} due to: {booking.rescheduleReason}
                      </Alert>
                    </Box>
                  )}
                  {booking.status === 'cancelled' && booking.refundDetails && (
                    <Box mt={1}>
                      <Alert severity="info">
                        <AlertTitle>Refund Information</AlertTitle>
                        <Typography variant="body2">Amount: ${booking.refundDetails.amount.toFixed(2)}</Typography>
                        <Typography variant="body2">Status: {booking.refundDetails.status}</Typography>
                        <Typography variant="body2">Processed: {format(parseISO(booking.refundDetails.processedAt), 'PPP')}</Typography>
                        <Typography variant="body2">Method: {booking.refundDetails.method}</Typography>
                      </Alert>
                    </Box>
                  )}
                </Box>
              </Paper>
            </MuiGrid>

            <MuiGrid item xs={12} md={6}>
              <Paper sx={{ p: 2, height: '100%' }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Coach Information
                </Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                  <Typography variant="body1" fontWeight="medium">
                    {booking.coachName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {booking.notes}
                  </Typography>
                  <Box mt={1} display="flex" gap={2}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<MessageSquare size={16} />}
                      color="secondary"
                    >
                      Message Coach
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </MuiGrid>
          </MuiGrid>
        </Box>

        {canJoin && (
          <Paper sx={{ p: 2, mb: 3, bgcolor: isSessionLive ? 'success.50' : 'inherit' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  {isSessionLive ? 'Your session is live now!' : 'Join your upcoming session'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {isSessionLive 
                    ? 'Click the button to join the video call with your coach' 
                    : `Your session starts at ${format(parseISO(booking.sessionDate), 'p')} on ${format(parseISO(booking.sessionDate), 'PP')}`}
                </Typography>
              </Box>
              <Button
                variant="contained"
                color={isSessionLive ? "success" : "primary"}
                startIcon={<Video />}
                onClick={handleJoinSession}
                disabled={!isSessionLive && booking.status !== 'upcoming'}
              >
                {isSessionLive ? 'Join Now' : 'Join Session'}
              </Button>
            </Box>
            {isSessionLive && (
              <Alert severity="warning" sx={{ mt: 2 }}>
                If you do not join, the session will be marked as completed after the scheduled time, and no refund will be provided.
              </Alert>
            )}
          </Paper>
        )}

        {booking.type === 'package' && (
          <Box mb={3}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Package Sessions ({booking.completedSessions || 0}/{booking.sessionCount} Completed)
              </Typography>
              {booking.sessionDates && booking.sessionDates.length > 0 ? (
                <List>
                  {formatSessionDates()}
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No sessions have been scheduled yet.
                </Typography>
              )}
            </Paper>
          </Box>
        )}

        {booking.status === 'completed' && (
          <Box mb={3}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Feedback
              </Typography>
              {booking.feedback ? (
                <Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography component="span" variant="body2">Your rating:</Typography>
                    <Rating value={booking.feedback.rating} readOnly size="small" />
                    <Typography component="span" variant="body2">
                      ({booking.feedback.rating}/5)
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    "{booking.feedback.comment}"
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Submitted on {format(parseISO(booking.feedback.submittedAt), 'PPP')}
                  </Typography>
                </Box>
              ) : feedbackSubmitted ? (
                <Alert severity="success">
                  Thank you for your feedback!
                </Alert>
              ) : showFeedbackForm ? (
                <Box>
                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <Typography component="span" variant="body2">Your rating:</Typography>
                    <Rating 
                      value={feedback.rating} 
                      onChange={handleRatingChange}
                      size="large"
                    />
                    <Typography component="span" variant="body2">
                      ({feedback.rating}/5)
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    placeholder="Share your experience with this session..."
                    value={feedback.comment}
                    onChange={handleFeedbackChange}
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />
                  <Box display="flex" justifyContent="flex-end" gap={1}>
                    <Button 
                      variant="outlined"
                      onClick={() => setShowFeedbackForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      variant="contained"
                      onClick={handleSubmitFeedback}
                      disabled={feedback.comment.trim().length === 0}
                    >
                      Submit Feedback
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box display="flex" flexDirection="column" alignItems="center" py={2}>
                  <Typography variant="body1" gutterBottom>
                    How was your session with {booking.coachName}?
                  </Typography>
                  <Button 
                    variant="contained"
                    startIcon={<Star />}
                    onClick={() => setShowFeedbackForm(true)}
                  >
                    Leave Feedback
                  </Button>
                </Box>
              )}
            </Paper>
          </Box>
        )}

        <Box display="flex" justifyContent="space-between" mt={3}>
          <Button variant="outlined" color="inherit" onClick={onClose}>
            Close
          </Button>
          {booking.status === 'upcoming' && (
            <Button variant="outlined" color="error" onClick={handleCancelBooking}>
              Cancel Booking
            </Button>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDetailsModal;

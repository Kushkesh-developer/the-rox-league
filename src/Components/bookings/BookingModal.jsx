import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography, 
  Box, 
  Stepper, 
  Step, 
  StepLabel
} from '@mui/material';
import SessionCalendar from './SessionCalender';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const BookingModal = ({ 
  open, 
  onClose, 
  service, 
  coachName,
  isPackage = false,
  sessionCount = 1
}) => {
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const steps = ['Select Date & Time', 'Confirm Booking', 'Payment'];
  const maxSelections = isPackage ? (sessionCount || 4) : 1;
  const serviceDuration = 60;

  const handleSlotSelect = (slot) => {
    if (selectedSlots.some(s => s.getTime() === slot.getTime())) {
      setSelectedSlots(selectedSlots.filter(s => s.getTime() !== slot.getTime()));
    } else if (selectedSlots.length < maxSelections) {
      setSelectedSlots([...selectedSlots, slot]);
    } else if (maxSelections === 1) {
      setSelectedSlots([slot]);
    } else {
      toast.error(`You can only select ${maxSelections} slots for this package`);
    }
  };

  const handleNext = () => {
    if (activeStep === 0 && !isAuthenticated) {
      sessionStorage.setItem('pendingBooking', JSON.stringify({
        service,
        coachName,
        isPackage,
        sessionCount,
        selectedSlots
      }));
      navigate('/login', { state: { from: window.location.pathname } });
      return;
    }

    if (activeStep === steps.length - 1) {
      toast.success(`Booking confirmed for ${service.name} with ${coachName}!`);
      onClose();
      navigate('/my-bookings');
      return;
    }

    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleCancel = () => {
    setSelectedSlots([]);
    setActiveStep(0);
    onClose();
  };

  const getTotalPrice = () => {
    return isPackage ? service.price : service.price * selectedSlots.length;
  };

  const isNextDisabled = () => {
    if (activeStep === 0) {
      return selectedSlots.length === 0 || (isPackage && selectedSlots.length !== maxSelections);
    }
    return false;
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleCancel}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Typography variant="h5" component="div" fontWeight="bold">
          Book {isPackage ? `${service.name} Package` : service.name} with {coachName}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {isPackage 
            ? `Package of ${maxSelections} sessions` 
            : 'Single session booking'}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Stepper activeStep={activeStep} sx={{ mt: 1, mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && (
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              {isPackage 
                ? `Please select ${maxSelections} time slots for your package` 
                : 'Please select a time slot for your session'
              }
            </Typography>
            <SessionCalendar 
              onSelectSlot={handleSlotSelect}
              selectedSlots={selectedSlots}
              maxSelections={maxSelections}
              serviceDuration={serviceDuration}
            />
          </Box>
        )}

        {activeStep === 1 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Booking Summary
            </Typography>
            <Typography variant="body1" gutterBottom>
              Service: {service.name}{isPackage ? ' Package' : ''}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Coach: {coachName}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Sessions: {selectedSlots.length}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Total Price: ${getTotalPrice()}
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 2 }} gutterBottom>
              Selected Time Slots:
            </Typography>
            {selectedSlots.map((slot, index) => (
              <Typography key={index} variant="body2" color="text.secondary">
                • {slot.toLocaleString('en-US', { 
                    weekday: 'long', 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric', 
                    hour: 'numeric', 
                    minute: 'numeric' 
                  })}
              </Typography>
            ))}
          </Box>
        )}

        {activeStep === 2 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Payment Details
            </Typography>
            <Typography variant="body1" paragraph>
              Total to pay: <strong>${getTotalPrice()}</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This is a demo application. No actual payment will be processed.
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={handleCancel}>Cancel</Button>
        {activeStep > 0 && (
          <Button onClick={handleBack}>
            Back
          </Button>
        )}
        <Button 
          variant="contained" 
          onClick={handleNext}
          disabled={isNextDisabled()}
        >
          {activeStep === steps.length - 1 ? 'Confirm Booking' : 'Next'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookingModal;

import React, { useState } from 'react';
import { Box, Typography, Button, Paper, Grid } from '@mui/material';
import { format, addDays, isSameDay, startOfDay, addWeeks, setHours, setMinutes, isBefore } from 'date-fns';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';

const generateMockAvailableSlots = (from, to) => {
  const availableSlots = [];
  let current = new Date(from);

  while (current <= to) {
    if (isBefore(current, startOfDay(new Date()))) {
      current = addDays(current, 1);
      continue;
    }

    const daySlots = Math.floor(Math.random() * 5) + 1;

    for (let i = 0; i < daySlots; i++) {
      const hour = 9 + Math.floor(Math.random() * 8); // 9AM - 5PM
      const minutes = Math.random() > 0.5 ? 0 : 30;

      const slot = setMinutes(setHours(new Date(current), hour), minutes);
      availableSlots.push(slot);
    }

    current = addDays(current, 1);
  }

  return availableSlots;
};

const SessionCalendar = ({
  onSelectSlot,
  selectedSlots = [],
  maxSelections = 1,
  serviceDuration = 60,
  disabled = false
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeRange] = useState({ start: 9, end: 17 });

  const availableSlots = generateMockAvailableSlots(
    new Date(),
    addWeeks(new Date(), 4)
  );

  const handleDateSelect = (date) => {
    if (date && !disabled) {
      setSelectedDate(date);
    }
  };

  const dailySlots = availableSlots.filter(slot =>
    selectedDate && isSameDay(slot, selectedDate)
  );

  const isSlotSelected = (slot) => {
    return selectedSlots.some(selected =>
      selected.getTime() === slot.getTime()
    );
  };

  const isSlotDisabled = (slot) => {
    return Math.random() > 0.8 || disabled;
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={0} variant="outlined" sx={{ p: 2, height: '100%', width: '100%' }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                value={selectedDate}
                onChange={handleDateSelect}
                disablePast
                shouldDisableDate={(date) => disabled}
              />
            </LocalizationProvider>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={0} variant="outlined" sx={{ p: 2, maxHeight: 350, overflowY: 'auto' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="subtitle1">
                Available Slots: {selectedDate ? format(selectedDate, 'EEEE, MMMM d') : 'Select a date'}
              </Typography>
            </Box>

            {selectedDate && (
              dailySlots.length > 0 ? (
                <Grid container spacing={1}>
                  {dailySlots.map((slot, index) => (
                    <Grid item xs={6} key={index}>
                      <Button
                        variant={isSlotSelected(slot) ? "contained" : "outlined"}
                        fullWidth
                        disabled={isSlotDisabled(slot)}
                        onClick={() => !disabled && onSelectSlot(slot)}
                        sx={{
                          justifyContent: 'flex-start',
                          textTransform: 'none',
                          mb: 1
                        }}
                      >
                        {format(slot, 'h:mm a')}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Box textAlign="center" py={4}>
                  <Typography color="text.secondary">
                    No available slots for this date
                  </Typography>
                </Box>
              )
            )}
          </Paper>
        </Grid>
      </Grid>

      {selectedSlots.length > 0 && (
        <Box mt={3}>
          <Typography variant="subtitle1" gutterBottom>
            Selected {selectedSlots.length === 1 ? 'Slot' : 'Slots'} ({selectedSlots.length}/{maxSelections}):
          </Typography>
          <Grid container spacing={1}>
            {selectedSlots.map((slot, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  elevation={0}
                  variant="outlined"
                  sx={{
                    px: 2,
                    py: 1,
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: 'primary.light',
                    color: 'primary.contrastText'
                  }}
                >
                  <Typography variant="body2">
                    {format(slot, 'EEE, MMM d')} at {format(slot, 'h:mm a')}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default SessionCalendar;

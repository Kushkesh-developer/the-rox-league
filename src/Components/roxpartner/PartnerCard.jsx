import React, { useState } from 'react';
import {
  Box, Card, CardContent, Avatar, Typography, Chip, Button,
  Divider, IconButton, Collapse, Tooltip, Dialog, DialogTitle,
  DialogContent, DialogActions, FormControl, InputLabel, Select,
  MenuItem, TextField
} from '@mui/material';
import { MessageSquare, MapPin, Target, Clock, ChevronDown, ChevronUp, FileWarning, User, Ban } from 'lucide-react';





const PartnerCard = ({ partner }) => {
  const [expanded, setExpanded] = useState(false);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [blockDialogOpen, setBlockDialogOpen] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportDetails, setReportDetails] = useState('');

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleReport = () => {
    console.log('Reporting user:', partner.name, 'Reason:', reportReason, 'Details:', reportDetails);
    setReportDialogOpen(false);
    // In a real app, this would send the report to the backend
  };

  const handleBlock = () => {
    console.log('Blocking user:', partner.name);
    setBlockDialogOpen(false);
    // In a real app, this would block the user in the backend
  };
  
  const handleMessage = () => {
    console.log('Messaging user:', partner.name);
    // In a real app, this would open the messaging interface
  };

  // Get the first available day from schedule
  const getFirstAvailableDay = () => {
    const days = Object.keys(partner.trainingSchedule);
    for (const day of days) {
      const schedule = partner.trainingSchedule[day];
      if (schedule.morning || schedule.afternoon || schedule.evening) {
        return { day, schedule };
      }
    }
    return null;
  };

  const firstAvailableDay = getFirstAvailableDay();

  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      borderRadius: 2,
      boxShadow: 2,
      transition: 'transform 0.3s, box-shadow 0.3s',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: 4
      }
    }}>
      <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar 
            src={partner.profileImage} 
            alt={partner.name}
            sx={{ width: 60, height: 60, mr: 2 }}
          />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {partner.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
              <MapPin size={14} style={{ marginRight: 4 }} /> {partner.location}
            </Typography>
          </Box>
        </Box>

        <Typography variant="body2" sx={{ mb: 2, minHeight: 48 }}>
          {partner.bio.length > 150 
            ? `${partner.bio.substring(0, 150)}...` 
            : partner.bio}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Target size={16} style={{ marginRight: 6 }} /> Event Types:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {partner.eventTypes.slice(0, 3).map((type, index) => (
              <Chip
                key={index}
                label={type}
                size="small"
                sx={{ bgcolor: '#F1F0FB', fontSize: '0.7rem' }}
              />
            ))}
            {partner.eventTypes.length > 3 && (
              <Chip
                label={`+${partner.eventTypes.length - 3}`}
                size="small"
                sx={{ bgcolor: '#E5DEFF', fontSize: '0.7rem' }}
              />
            )}
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <User size={16} style={{ marginRight: 6 }} /> Experience Level:
          </Typography>
          <Chip 
            label={partner.experienceLevel} 
            size="small"
            sx={{ 
              bgcolor: '#E5DEFF', 
              fontSize: '0.7rem',
              color: '#8B5CF6'
            }} 
          />
        </Box>

        {firstAvailableDay && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Clock size={16} style={{ marginRight: 6 }} /> Sample Availability:
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Chip
                label={firstAvailableDay.day.charAt(0).toUpperCase() + firstAvailableDay.day.slice(1)}
                size="small"
                sx={{ mr: 1, bgcolor: '#F1F0FB', fontSize: '0.7rem' }}
              />
              <Box>
                {firstAvailableDay.schedule.morning && (
                  <Typography variant="caption" display="block">
                    Morning: {firstAvailableDay.schedule.morningTime}
                  </Typography>
                )}
                {firstAvailableDay.schedule.afternoon && (
                  <Typography variant="caption" display="block">
                    Afternoon: {firstAvailableDay.schedule.afternoonTime}
                  </Typography>
                )}
                {firstAvailableDay.schedule.evening && (
                  <Typography variant="caption" display="block">
                    Evening: {firstAvailableDay.schedule.eveningTime}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        )}

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Training Preferences:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {partner.preferences.map((pref, index) => (
                <Chip
                  key={index}
                  label={pref}
                  size="small"
                  sx={{ bgcolor: '#F1F0FB', fontSize: '0.7rem' }}
                />
              ))}
            </Box>
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Fitness Goals:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {partner.fitnessGoals.map((goal, index) => (
                <Chip
                  key={index}
                  label={goal}
                  size="small"
                  sx={{ bgcolor: '#F1F0FB', fontSize: '0.7rem' }}
                />
              ))}
            </Box>
          </Box>
          
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Full Training Schedule:
            </Typography>
            {Object.entries(partner.trainingSchedule).map(([day, schedule]) => {
              const hasTime = schedule.morning || schedule.afternoon || schedule.evening;
              if (!hasTime) return null;
              
              return (
                <Box key={day} sx={{ mb: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
                    {day}:
                  </Typography>
                  <Box sx={{ ml: 2 }}>
                    {schedule.morning && (
                      <Typography variant="caption" display="block">
                        Morning: {schedule.morningTime}
                      </Typography>
                    )}
                    {schedule.afternoon && (
                      <Typography variant="caption" display="block">
                        Afternoon: {schedule.afternoonTime}
                      </Typography>
                    )}
                    {schedule.evening && (
                      <Typography variant="caption" display="block">
                        Evening: {schedule.eveningTime}
                      </Typography>
                    )}
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Collapse>
      </CardContent>

      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        p: 1.5, 
        borderTop: '1px solid rgba(0, 0, 0, 0.12)',
        mt: 'auto' 
      }}>
        <Box sx={{ display: 'flex' }}>
          <Tooltip title="Report User">
            <IconButton 
              size="small" 
              color="default"
              onClick={() => setReportDialogOpen(true)}
              sx={{ mr: 1 }}
            >
              <FileWarning size={18} />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Block User">
            <IconButton 
              size="small" 
              color="default"
              onClick={() => setBlockDialogOpen(true)}
            >
              <Ban size={18} />
            </IconButton>
          </Tooltip>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            variant="outlined"
            size="small"
            onClick={toggleExpanded}
            sx={{ 
              minWidth: 0, 
              mr: 1,
              p: 0.5,
              borderColor: '#E5DEFF',
              color: '#8B5CF6',
              '&:hover': {
                borderColor: '#8B5CF6',
                backgroundColor: 'rgba(139, 92, 246, 0.04)',
              }
            }}
          >
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </Button>
          
          <Button
            variant="contained"
            size="small"
            startIcon={<MessageSquare size={16} />}
            onClick={handleMessage}
            sx={{ 
              bgcolor: '#8B5CF6',
              '&:hover': {
                bgcolor: '#7C3AED',
              }
            }}
          >
            Message
          </Button>
        </Box>
      </Box>

      {/* Report Dialog */}
      <Dialog open={reportDialogOpen} onClose={() => setReportDialogOpen(false)}>
        <DialogTitle>Report User: {partner.name}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="report-reason-label">Reason</InputLabel>
            <Select
              labelId="report-reason-label"
              value={reportReason}
              label="Reason"
              onChange={(e) => setReportReason(e.target.value)}
            >
              <MenuItem value="inappropriate">Inappropriate Content</MenuItem>
              <MenuItem value="fake">Fake Profile</MenuItem>
              <MenuItem value="spam">Spam or Solicitation</MenuItem>
              <MenuItem value="harassment">Harassment</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          
          <TextField
            label="Additional Details"
            multiline
            rows={4}
            value={reportDetails}
            onChange={(e) => setReportDetails(e.target.value)}
            fullWidth
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReportDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleReport} 
            variant="contained" 
            color="error"
            disabled={!reportReason}
          >
            Report
          </Button>
        </DialogActions>
      </Dialog>

      {/* Block Dialog */}
      <Dialog open={blockDialogOpen} onClose={() => setBlockDialogOpen(false)}>
        <DialogTitle>Block User: {partner.name}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to block this user? They will no longer appear in your search results, 
            and they won't be able to contact you.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBlockDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleBlock} 
            variant="contained" 
            color="error"
          >
            Block
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default PartnerCard;
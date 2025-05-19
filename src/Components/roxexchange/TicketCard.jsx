import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  Calendar,
  MapPin,
  MessageSquare,
  MoreVertical,
  Edit,
  Trash,
  Check,
  AlertTriangle
} from 'lucide-react';
import { format } from 'date-fns';

const getStatusColor = (status) => {
  switch(status) {
    case 'pending': return { bg: '#FEF3C7', text: '#D97706' };
    case 'live': return { bg: '#D1FAE5', text: '#059669' };
    case 'sold': return { bg: '#E5E7EB', text: '#4B5563' };
    default: return { bg: '#E5E7EB', text: '#4B5563' };
  }
};

const TicketCard = ({ ticket, mode }) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const menuOpen = Boolean(menuAnchorEl);

  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleEdit = () => {
    handleMenuClose();
    window.location.href = `/roxexchange/edit/${ticket.id}`;
  };

  const handleDelete = () => {
    handleMenuClose();
    setDialogOpen(true);
  };

  const handleMarkSold = () => {
    handleMenuClose();
    alert('Ticket marked as sold');
  };

  const handleReportOpen = () => {
    setReportDialogOpen(true);
  };

  const handleReportClose = () => {
    setReportDialogOpen(false);
    setReportReason('');
  };

  const handleReportSubmit = () => {
    alert(`Ticket reported: ${reportReason}`);
    handleReportClose();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'PPP');
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'p');
  };

  const statusColor = getStatusColor(ticket.status);

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2, overflow: 'hidden', transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' } }}>
      <CardMedia
        component="img"
        height="140"
        image={ticket.imageUrl || "/placeholder.svg"}
        alt={ticket.eventName}
      />
      <CardContent sx={{ flexGrow: 1, pt: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography gutterBottom variant="h6" component="h2" sx={{ fontWeight: 'bold', flex: 1 }}>
            {ticket.eventName}
          </Typography>
          {mode === 'sell' && (
            <Chip 
              label={ticket.status.toUpperCase()} 
              size="small"
              sx={{ backgroundColor: statusColor.bg, color: statusColor.text, fontWeight: 'medium', fontSize: '0.7rem' }}
            />
          )}
        </Box>

        <Chip 
          label={ticket.raceType} 
          size="small" 
          sx={{ mb: 2, bgcolor: '#E5DEFF', color: '#8B5CF6' }}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Calendar size={16} style={{ marginRight: 8, color: '#6B7280' }} />
          <Typography variant="body2" color="text.secondary">
            {formatDate(ticket.eventDateTime)} at {formatTime(ticket.eventDateTime)}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <MapPin size={16} style={{ marginRight: 8, color: '#6B7280' }} />
          <Typography variant="body2" color="text.secondary">
            {`${ticket.location.city}, ${ticket.location.country}`}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">Ticket Type</Typography>
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>{ticket.ticketType}</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">Price</Typography>
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#8B5CF6' }}>{ticket.price.currency} {ticket.price.amount}</Typography>
        </Box>

        {ticket.sellerNotes && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Seller Notes:</Typography>
            <Typography variant="body2" paragraph>{ticket.sellerNotes}</Typography>
          </>
        )}
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        {mode === 'buy' ? (
          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
            <Button 
              variant="contained" 
              startIcon={<MessageSquare />} 
              fullWidth
              sx={{ mr: 1, bgcolor: '#8B5CF6', '&:hover': { bgcolor: '#7C3AED' } }}
            >
              Message Seller
            </Button>
            <IconButton onClick={handleReportOpen} sx={{ color: '#EF4444', '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.1)' } }}>
              <AlertTriangle size={20} />
            </IconButton>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
            {ticket.status === 'live' && (
              <Button 
                variant="contained" 
                startIcon={<Check />} 
                sx={{ mr: 1, bgcolor: '#10B981', '&:hover': { bgcolor: '#059669' } }}
                onClick={handleMarkSold}
              >
                Mark as Sold
              </Button>
            )}
            <IconButton onClick={handleMenuClick}>
              <MoreVertical />
            </IconButton>
            <Menu anchorEl={menuAnchorEl} open={menuOpen} onClose={handleMenuClose}>
              {(ticket.status === 'pending' || ticket.status === 'live') && (
                <MenuItem onClick={handleEdit}><Edit size={16} style={{ marginRight: 8 }} />Edit</MenuItem>
              )}
              {(ticket.status === 'pending' || ticket.status === 'live') && (
                <MenuItem onClick={handleDelete}><Trash size={16} style={{ marginRight: 8 }} />Delete</MenuItem>
              )}
              {ticket.status === 'live' && (
                <MenuItem onClick={handleMarkSold}><Check size={16} style={{ marginRight: 8 }} />Mark as Sold</MenuItem>
              )}
            </Menu>
          </Box>
        )}
      </CardActions>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Delete Ticket</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this ticket? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={() => { setDialogOpen(false); alert('Ticket deleted'); }} color="error">Delete</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={reportDialogOpen} onClose={handleReportClose}>
        <DialogTitle>Report Ticket</DialogTitle>
        <DialogContent>
          <Typography paragraph sx={{ mb: 2 }}>Please select a reason for reporting this ticket:</Typography>
          <FormControl fullWidth>
            <InputLabel id="report-reason-label">Reason</InputLabel>
            <Select
              labelId="report-reason-label"
              value={reportReason}
              label="Reason"
              onChange={(e) => setReportReason(e.target.value)}
            >
              <MenuItem value="fraudulent">Fraudulent listing</MenuItem>
              <MenuItem value="inappropriate">Inappropriate content</MenuItem>
              <MenuItem value="duplicate">Duplicate listing</MenuItem>
              <MenuItem value="wrong-price">Incorrect price</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          {reportReason === 'other' && (
            <TextField label="Please specify" fullWidth multiline rows={3} margin="normal" />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReportClose}>Cancel</Button>
          <Button onClick={handleReportSubmit} color="error" disabled={!reportReason}>Report</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default TicketCard;

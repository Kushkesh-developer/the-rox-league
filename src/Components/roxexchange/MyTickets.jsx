import React, { useState } from 'react';
import { 
  Box, 
  Tabs, 
  Tab, 
  Typography, 
  Grid, 
  Button, 
  Paper,
  Badge,
  Divider
} from '@mui/material';
import { Ticket as TicketIcon } from 'lucide-react';
import TicketCard from './TicketCard';
import { mockUserTickets } from './mockTicketData';

const MyTickets = () => {
  const [tabValue, setTabValue] = useState(0);
  const [tickets, setTickets] = useState(mockUserTickets);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const pendingTickets = tickets.filter(ticket => ticket.status === 'pending');
  const liveTickets = tickets.filter(ticket => ticket.status === 'live');
  const soldTickets = tickets.filter(ticket => ticket.status === 'sold');

  const getTabTickets = () => {
    switch(tabValue) {
      case 0: return tickets;
      case 1: return pendingTickets;
      case 2: return liveTickets;
      case 3: return soldTickets;
      default: return tickets;
    }
  };

  const displayedTickets = getTabTickets();

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h2" fontWeight="bold">
          My Tickets
        </Typography>
        <Button
          variant="contained"
          startIcon={<TicketIcon />}
          href="/roxexchange/sell"
          sx={{ 
            bgcolor: '#8B5CF6',
            '&:hover': { bgcolor: '#7C3AED' },
            textTransform: 'none',
            fontWeight: 'medium'
          }}
        >
          Sell a Ticket
        </Button>
      </Box>

      <Paper sx={{ mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            '& .MuiTab-root': {
              minHeight: 60,
              fontWeight: 'medium',
              textTransform: 'none',
            },
            '& .Mui-selected': {
              color: '#8B5CF6',
              fontWeight: 'bold'
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#8B5CF6'
            }
          }}
        >
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography>All</Typography>
                <Badge badgeContent={tickets.length} color="primary" sx={{ ml: 1 }} />
              </Box>
            } 
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography>Pending</Typography>
                <Badge badgeContent={pendingTickets.length} color="warning" sx={{ ml: 1 }} />
              </Box>
            }
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography>Live</Typography>
                <Badge badgeContent={liveTickets.length} color="success" sx={{ ml: 1 }} />
              </Box>
            }
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography>Sold</Typography>
                <Badge badgeContent={soldTickets.length} color="default" sx={{ ml: 1 }} />
              </Box>
            }
          />
        </Tabs>
      </Paper>

      {displayedTickets.length > 0 ? (
        <Grid container spacing={3}>
          {displayedTickets.map((ticket) => (
            <Grid item xs={12} sm={6} md={4} key={ticket.id}>
              <TicketCard ticket={ticket} mode="sell" />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ 
          textAlign: 'center', 
          py: 8, 
          px: 3,
          bgcolor: '#F9FAFB', 
          borderRadius: 2
        }}>
          <TicketIcon size={48} color="#8B5CF6" style={{ marginBottom: 16 }} />
          <Typography variant="h6" sx={{ mb: 1 }}>
            No tickets found
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            You don't have any tickets in this category
          </Typography>
          <Button
            variant="contained"
            href="/roxexchange/sell"
            sx={{ 
              bgcolor: '#8B5CF6',
              '&:hover': { bgcolor: '#7C3AED' }
            }}
          >
            Sell Your First Ticket
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default MyTickets;

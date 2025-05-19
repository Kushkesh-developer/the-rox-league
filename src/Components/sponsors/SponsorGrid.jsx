import React from 'react';
import { Grid, Box, Typography, Container } from '@mui/material';
import SponsorCard from './SponsorCard';


const SponsorsGrid = ({ sponsors }) => {
  if (sponsors.length === 0) {
    return (
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          No sponsors found matching your criteria.
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        {sponsors.map((sponsor) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={sponsor.id}>
            <SponsorCard sponsor={sponsor} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SponsorsGrid;
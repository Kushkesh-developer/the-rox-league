import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Alert } from '@mui/material';
import ChallengeCard from './ChallengeCard';
import { mockChallenges } from './mockData';

const ChallengesList = ({ filters, userId }) => {
  const [challenges, setChallenges] = useState(mockChallenges);
  const [filteredChallenges, setFilteredChallenges] = useState(mockChallenges);
  
  useEffect(() => {
    // Filter challenges based on selected filters
    let filtered = [...challenges];
    
    if (filters.type) {
      filtered = filtered.filter(challenge => challenge.type === filters.type);
    }
    
    if (filters.eventType) {
      filtered = filtered.filter(challenge => challenge.eventType === filters.eventType);
    }
    
    if (filters.difficulty) {
      filtered = filtered.filter(challenge => challenge.difficultyLevel === filters.difficulty);
    }
    
    setFilteredChallenges(filtered);
  }, [challenges, filters]);

  return (
    <Box>
      {filteredChallenges.length > 0 ? (
        <Grid container spacing={3}>
          {filteredChallenges.map(challenge => (
            <Grid item xs={12} md={6} lg={4} key={challenge.id}>
              <ChallengeCard 
                challenge={challenge}
                userId={userId}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Alert severity="info">
            No challenges found matching your filters. Try adjusting your filter criteria.
          </Alert>
        </Box>
      )}
    </Box>
  );
};

export default ChallengesList;
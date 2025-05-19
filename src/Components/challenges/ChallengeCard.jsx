import React from 'react';
import { Card, CardContent, Typography, Button, Chip } from '@mui/material';

const ChallengeCard = ({ challenge, userId }) => {
  const hasJoined = challenge.participants.some(p => p.userId === userId);
  const hasSubmitted = challenge.participants.some(p => p.userId === userId && p.result);
  const isWinner = challenge.winners?.includes(userId);

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {challenge.name}
        </Typography>
        <Chip 
          label={challenge.difficultyLevel}
          color={
            challenge.difficultyLevel === 'beginner' ? 'success' :
            challenge.difficultyLevel === 'intermediate' ? 'warning' : 'error'
          }
          size="small"
          sx={{ mb: 2 }}
        />
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {new Date(challenge.startDate).toLocaleDateString()} - {new Date(challenge.endDate).toLocaleDateString()}
        </Typography>
        <Typography variant="body2" paragraph>
          {challenge.rules}
        </Typography>
        <Button 
          variant="contained" 
          color={hasJoined ? (hasSubmitted ? 'success' : 'primary') : 'primary'}
          fullWidth
        >
          {hasJoined ? (hasSubmitted ? 'View Result' : 'Submit Result') : 'Join Challenge'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ChallengeCard;

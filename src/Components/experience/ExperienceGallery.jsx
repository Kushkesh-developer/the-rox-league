import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CardMedia,
  IconButton,
  Typography,
  Grid,
  Box,
  Chip,
} from '@mui/material';
import { Favorite as HeartIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

export const ExperienceGallery = ({
  experiences,
  onEdit,
  onDelete,
  userEmail,
}) => {
  const filteredExperiences = userEmail
    ? experiences.filter((exp) => exp.userEmail === userEmail)
    : experiences;

  const handleDelete = (postId) => {
    onDelete(postId);
    // You can replace this with your own toast or snackbar
    alert('Experience deleted');
  };

  return (
    <Grid container spacing={3}>
      {filteredExperiences.map((experience) => (
        <Grid item xs={12} md={6} lg={4} key={experience.id}>
          <Card sx={{ transition: '0.3s', '&:hover': { boxShadow: 6 } }}>
            <CardHeader
              title={
                <Typography variant="h6">{experience.title}</Typography>
              }
              subheader={experience.userEmail}
              action={
                userEmail === experience.userEmail && (
                  <Box>
                    <IconButton onClick={() => onEdit(experience)} size="small">
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(experience.id)} size="small" sx={{ color: 'error.main' }}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                )
              }
            />
            {experience.imageUrl && (
              <CardMedia
                component="img"
                height="180"
                image={experience.imageUrl}
                alt={experience.title}
              />
            )}
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {experience.description}
              </Typography>
              <Chip label={experience.achievement} color="secondary" variant="outlined" size="small" />
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
              <Typography variant="caption">
                {new Date(experience.date).toLocaleDateString()}
              </Typography>
              <Box display="flex" alignItems="center" gap={0.5}>
                <HeartIcon fontSize="small" />
                <Typography variant="caption">{experience.likes}</Typography>
              </Box>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
  Stack,
} from '@mui/material';
import { useForm } from 'react-hook-form';


const eventTypes = ['First Race', 'Victory', 'Comeback', 'Personal Best', 'Other'];

export const CreateExperienceModal = ({
  isOpen,
  onClose,
  onSubmit,
  editingPost,
}) => {
  const { register, handleSubmit, reset, setValue } = useForm();

  React.useEffect(() => {
    if (editingPost) {
      setValue('title', editingPost.title);
      setValue('description', editingPost.description);
      setValue('eventType', editingPost.eventType);
      setValue('hashtags', editingPost.hashtags.join(', '));
      setValue('imageUrl', editingPost.imageUrl || '');
      setValue('date', editingPost.date.split('T')[0]);
    } else {
      reset();
    }
  }, [editingPost, setValue, reset]);

  const handleFormSubmit = (data) => {
    const hashtags = data.hashtags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag);

    onSubmit({
      title: data.title,
      description: data.description,
      eventType: data.eventType,
      hashtags,
      date: new Date(data.date).toISOString(),
      imageUrl: data.imageUrl,
    });
    reset();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogTitle>{editingPost ? 'Edit Experience' : 'Share Your Hyrox Experience'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              fullWidth
              label="Event Name"
              {...register('title')}
              variant="outlined"
            />
            <TextField
              fullWidth
              type="date"
              {...register('date')}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              select
              fullWidth
              label="Race Type"
              defaultValue=""
              {...register('eventType')}
              onChange={(e) => setValue('eventType', e.target.value)}
            >
              {eventTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              multiline
              minRows={4}
              label="Race Summary (Max 500 words)"
              {...register('description')}
              variant="outlined"
              inputProps={{ maxLength: 500 }}
            />
            <TextField
              fullWidth
              label="Hashtags (comma-separated)"
              {...register('hashtags')}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Image URL"
              {...register('imageUrl')}
              variant="outlined"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {editingPost ? 'Update' : 'Post Experience'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';
export const CreateThreadModal = ({ open, onClose }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = () => {
    if (!user || !title.trim() || !content.trim() || !category) return;

    const newThread = {
      id: Date.now().toString(),
      title,
      content,
      category,
      authorId: user.id,
      authorName: user.name,
      createdAt: new Date().toISOString(),
      comments: [],
      likes: []
    };

    const existingThreads = JSON.parse(localStorage.getItem('forum_threads') || '[]');
    localStorage.setItem('forum_threads', JSON.stringify([newThread, ...existingThreads]));

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Thread</DialogTitle>
      <DialogContent>
        <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <MenuItem value="training">Training</MenuItem>
            <MenuItem value="nutrition">Nutrition</MenuItem>
            <MenuItem value="events">Events</MenuItem>
            <MenuItem value="gear">Gear</MenuItem>
            <MenuItem value="mindset">Mindset & Recovery</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Thread Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Thread Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          multiline
          rows={5}
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Create Thread
        </Button>
      </DialogActions>
    </Dialog>
  );
};

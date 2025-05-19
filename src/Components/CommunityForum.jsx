import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Container, 
  Typography, 
  Button, 
  TextField, 
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box
} from '@mui/material';
// import { ThreadData } from '../Components/forum/mockData';
import { ThreadCard } from '../Components/forum/ThreadCard';
import { CreateThreadModal } from '../Components/forum/CreateThreadModal';

const CommunityForum = () => {
  const { isAuthenticated, isPremiumFeatureEnabled } = useAuth();
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { redirectAfterLogin: '/community' } });
      return;
    }
    
    if (!isPremiumFeatureEnabled('community-forum')) {
      navigate('/subscription');
      return;
    }

    // Load threads from localStorage
    const storedThreads = localStorage.getItem('forum_threads');
    if (storedThreads) {
      setThreads(JSON.parse(storedThreads));
    }
  }, [isAuthenticated, isPremiumFeatureEnabled, navigate]);

  const filteredThreads = threads.filter(thread => {
    const matchesSearch = thread.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || thread.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Community Forum
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => setShowCreateModal(true)}
        >
          Create New Thread
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Search threads..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ flex: 1 }}
        />
        
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            label="Category"
          >
            <MenuItem value="all">All Categories</MenuItem>
            <MenuItem value="training">Training</MenuItem>
            <MenuItem value="nutrition">Nutrition</MenuItem>
            <MenuItem value="events">Events</MenuItem>
            <MenuItem value="gear">Gear</MenuItem>
            <MenuItem value="mindset">Mindset & Recovery</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {filteredThreads.map((thread) => (
        <ThreadCard key={thread.id} thread={thread} />
      ))}

      {filteredThreads.length === 0 && (
        <Typography align="center" color="text.secondary" sx={{ py: 4 }}>
          No threads found. Be the first to start a discussion!
        </Typography>
      )}

      <CreateThreadModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </Container>
  );
};

export default CommunityForum;

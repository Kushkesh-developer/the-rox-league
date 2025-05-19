import React, { useState, useEffect } from 'react';
import { ThreadCard } from './ThreadCard';
import { Box, Typography } from '@mui/material';

export const ThreadList = ({ searchQuery, category }) => {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const storedThreads = localStorage.getItem('forum_threads');
    if (storedThreads) {
      setThreads(JSON.parse(storedThreads));
    }
  }, []);

  const filteredThreads = threads.filter(thread => {
    const matchesSearch = thread.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === 'all' || thread.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {filteredThreads.map((thread) => (
        <ThreadCard key={thread.id} thread={thread} />
      ))}
      {filteredThreads.length === 0 && (
        <Box textAlign="center" py={8}>
          <Typography color="text.secondary">
            No threads found. Be the first to start a discussion!
          </Typography>
        </Box>
      )}
    </Box>
  );
};

import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Chip,
  Box
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { ThreadDetailsModal } from './ThreadDetailsModal';

export const ThreadCard = ({ thread }) => {
  const { user } = useAuth();
  const [showDetails, setShowDetails] = useState(false);

  const handleLike = () => {
    if (!user) return;

    const threads = JSON.parse(localStorage.getItem('forum_threads') || '[]');
    const threadIndex = threads.findIndex((t) => t.id === thread.id);
    
    if (threadIndex !== -1) {
      const likes = new Set(threads[threadIndex].likes);
      if (likes.has(user.id)) {
        likes.delete(user.id);
      } else {
        likes.add(user.id);
      }
      threads[threadIndex].likes = Array.from(likes);
      localStorage.setItem('forum_threads', JSON.stringify(threads));
    }
  };

  const handleBlock = () => {
    if (!user) return;
    const blockedUsers = JSON.parse(localStorage.getItem(`blocked_users_${user.id}`) || '[]');
    blockedUsers.push(thread.authorId);
    localStorage.setItem(`blocked_users_${user.id}`, JSON.stringify([...new Set(blockedUsers)]));
  };

  return (
    <>
      <Card variant="outlined" style={{ marginBottom: '16px' }}>
        <CardContent>
          <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
            <Box>
              <Typography variant="h6" component="h2" gutterBottom>
                {thread.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {new Date(thread.createdAt).toLocaleDateString()} by {thread.authorName}
              </Typography>
            </Box>
            <Chip label={thread.category} color="primary" size="small" />
          </Box>

          <Box style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
            <Button size="small" onClick={() => setShowDetails(true)}>
              Comments ({thread.comments.length})
            </Button>

            <Button size="small" onClick={handleLike}>
              Likes ({thread.likes.length})
            </Button>

            <Button
              size="small"
              onClick={() => {
                alert('Thread reported');
              }}
              color="warning"
            >
              Report
            </Button>

            <Button
              size="small"
              onClick={handleBlock}
              color="error"
            >
              Block User
            </Button>
          </Box>
        </CardContent>
      </Card>

      <ThreadDetailsModal
        open={showDetails}
        onClose={() => setShowDetails(false)}
        thread={thread}
      />
    </>
  );
};

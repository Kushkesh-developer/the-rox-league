import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
  TextField,
  Box,
  Paper,
  Divider
} from '@mui/material';
// import { useAuth } from '../../context/AuthContexts';

export const ThreadDetailsModal = ({ open, onClose, thread }) => {
  const { user } = useAuth();
  const [newComment, setNewComment] = useState('');
  const [quotedComment, setQuotedComment] = useState(null);

  const handleComment = () => {
    if (!user || !newComment.trim()) return;

    const newCommentData = {
      id: Date.now().toString(),
      content: newComment,
      authorId: user.id,
      authorName: user.name,
      createdAt: new Date().toISOString(),
      quotedCommentId: quotedComment?.id,
      likes: []
    };

    const threads = JSON.parse(localStorage.getItem('forum_threads') || '[]');
    const threadIndex = threads.findIndex((t) => t.id === thread.id);
    
    if (threadIndex !== -1) {
      threads[threadIndex].comments.push(newCommentData);
      localStorage.setItem('forum_threads', JSON.stringify(threads));
    }

    setNewComment('');
    setQuotedComment(null);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6">{thread.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {thread.category} • Posted by {thread.authorName}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Paper elevation={0} style={{ padding: 16, marginBottom: 24, backgroundColor: '#f9f9f9' }}>
          <Typography>{thread.content}</Typography>
        </Paper>

        <Typography variant="h6" gutterBottom>
          Comments
        </Typography>

        {thread.comments.map((comment) => (
          <Paper key={comment.id} style={{ padding: 16, marginBottom: 16 }}>
            {comment.quotedCommentId && (
              <Paper style={{ padding: 8, marginBottom: 8, backgroundColor: '#f0f0f0' }}>
                <Typography variant="body2" color="text.secondary">
                  {thread.comments.find(c => c.id === comment.quotedCommentId)?.content}
                </Typography>
              </Paper>
            )}
            
            <Typography>{comment.content}</Typography>
            
            <Box style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <Button
                size="small"
                onClick={() => {
                  const threads = JSON.parse(localStorage.getItem('forum_threads') || '[]');
                  const threadIndex = threads.findIndex((t) => t.id === thread.id);
                  const commentIndex = threads[threadIndex].comments.findIndex((c) => c.id === comment.id);
                  if (threadIndex !== -1 && commentIndex !== -1 && user) {
                    const likes = new Set(threads[threadIndex].comments[commentIndex].likes);
                    if (likes.has(user.id)) {
                      likes.delete(user.id);
                    } else {
                      likes.add(user.id);
                    }
                    threads[threadIndex].comments[commentIndex].likes = Array.from(likes);
                    localStorage.setItem('forum_threads', JSON.stringify(threads));
                  }
                }}
              >
                Like ({comment.likes.length})
              </Button>
              
              <Button
                size="small"
                onClick={() => setQuotedComment(comment)}
              >
                Quote
              </Button>
            </Box>
          </Paper>
        ))}

        <Divider style={{ marginTop: 24, marginBottom: 24 }} />

        {quotedComment && (
          <Paper style={{ padding: 16, marginBottom: 16, backgroundColor: '#f0f0f0' }}>
            <Typography variant="body2">{quotedComment.content}</Typography>
            <Button
              size="small"
              onClick={() => setQuotedComment(null)}
            >
              Remove Quote
            </Button>
          </Paper>
        )}
        
        <TextField
          fullWidth
          multiline
          rows={3}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment..."
          style={{ marginBottom: 16 }}
        />
        
        <Button
          variant="contained"
          onClick={handleComment}
        >
          Post Comment
        </Button>
      </DialogContent>
    </Dialog>
  );
};

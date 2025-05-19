import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  IconButton,
  Typography,
  Stack,
  Divider,
  Paper,
} from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import FlagIcon from '@mui/icons-material/Flag';
import { useToast } from "../../hooks/use-toast";

export const CommentSection = ({
  comments,
  onAddComment,
  onReply,
  onReport,
}) => {
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const { toast } = useToast();

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  const handleSubmitReply = (commentId) => {
    if (replyContent.trim()) {
      onReply(commentId, replyContent);
      setReplyContent('');
      setReplyingTo(null);
    }
  };

  const handleReport = (commentId) => {
    onReport(commentId);
    toast({
      title: 'Comment Reported',
      description: "Thank you for your report. We'll review it shortly.",
    });
  };

  return (
    <Box sx={{ mt: 4 }}>
      <form onSubmit={handleSubmitComment}>
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <Button type="submit" variant="contained" color="primary" startIcon={<MessageIcon />}>
            Comment
          </Button>
        </Stack>
      </form>

      <Stack spacing={3} mt={3}>
        {comments.map((comment) => (
          <Paper key={comment.id} variant="outlined" sx={{ p: 2 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography variant="subtitle2">{comment.userEmail}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {comment.content}
                </Typography>
              </Box>
              <IconButton size="small" onClick={() => handleReport(comment.id)}>
                <FlagIcon fontSize="small" />
              </IconButton>
            </Stack>

            {replyingTo === comment.id ? (
              <Stack direction="row" spacing={1} mt={2}>
                <TextField
                  fullWidth
                  size="small"
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write a reply..."
                />
                <Button variant="contained" size="small" onClick={() => handleSubmitReply(comment.id)}>
                  Reply
                </Button>
                <Button variant="outlined" size="small" onClick={() => setReplyingTo(null)}>
                  Cancel
                </Button>
              </Stack>
            ) : (
              <Button
                size="small"
                onClick={() => setReplyingTo(comment.id)}
                sx={{ mt: 1 }}
              >
                Reply
              </Button>
            )}

            {comment.replies.length > 0 && (
              <Box sx={{ mt: 2, pl: 2, borderLeft: '2px solid #e0e0e0' }}>
                <Stack spacing={1}>
                  {comment.replies.map((reply) => (
                    <Box key={reply.id}>
                      <Typography variant="subtitle2">{reply.userEmail}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {reply.content}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            )}
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

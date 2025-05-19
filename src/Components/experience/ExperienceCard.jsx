import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CardMedia,
  IconButton,
  Typography,
  Chip,
  Stack,
  Box,
  Divider,
} from '@mui/material';
import { Favorite, ChatBubbleOutline, Flag, Edit, Delete } from '@mui/icons-material';
import { CommentSection } from './CommentSection';

export const ExperienceCard = ({
  post,
  isOwner,
  onLike,
  onComment,
  onReply,
  onReport,
  onEdit,
  onDelete,
}) => {
  const [showComments, setShowComments] = useState(false);

  return (
    <Card elevation={3} sx={{ mb: 4 }}>
      <CardHeader
        title={
          <Typography variant="h6" color="text.primary">
            {post.title}
          </Typography>
        }
        subheader={post.userEmail}
        action={
          isOwner ? (
            <Stack direction="row" spacing={1}>
              <IconButton onClick={onEdit}>
                <Edit fontSize="small" />
              </IconButton>
              <IconButton onClick={onDelete} color="error">
                <Delete fontSize="small" />
              </IconButton>
            </Stack>
          ) : (
            <IconButton onClick={() => onReport('post', post.id)}>
              <Flag fontSize="small" />
            </IconButton>
          )
        }
      />

      {post.imageUrl && (
        <CardMedia
          component="img"
          height="200"
          image={post.imageUrl}
          alt={post.title}
          sx={{ objectFit: 'cover' }}
        />
      )}

      <CardContent>
        <Typography variant="body1" paragraph>
          {post.description}
        </Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 1 }}>
          {post.hashtags.map((tag) => (
            <Chip key={tag} label={`#${tag}`} size="small" color="secondary" />
          ))}
        </Stack>

        <Chip label={post.eventType} size="small" color="primary" />
      </CardContent>

      <Divider />

      <CardActions disableSpacing sx={{ justifyContent: 'space-between', px: 2 }}>
        <Box>
          <IconButton onClick={onLike}>
            <Favorite color={post.likes > 0 ? 'error' : 'inherit'} />
            <Typography variant="body2" sx={{ ml: 0.5 }}>
              {post.likes}
            </Typography>
          </IconButton>

          <IconButton onClick={() => setShowComments(!showComments)}>
            <ChatBubbleOutline />
            <Typography variant="body2" sx={{ ml: 0.5 }}>
              {post.comments.length}
            </Typography>
          </IconButton>
        </Box>

        <Typography variant="caption" color="text.secondary">
          {new Date(post.date).toLocaleDateString()}
        </Typography>
      </CardActions>

      {showComments && (
        <Box px={3} pb={3}>
          <CommentSection
            comments={post.comments}
            onAddComment={onComment}
            onReply={onReply}
            onReport={(commentId) => onReport('comment', commentId)}
          />
        </Box>
      )}
    </Card>
  );
};

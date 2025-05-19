import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Avatar, 
  IconButton, 
  Menu, 
  MenuItem, 
  TextField, 
  Button,
  Divider, 
  Chip,
  Stack,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Link as MuiLink
} from '@mui/material';
import { 
  ThumbUp, 
  Comment, 
  Share, 
  MoreVert,
  Flag,
  Block,
  Send
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

// interface FeedPostProps {
//   post: Post;
//   isAuthenticated: boolean;
//   isPaidUser: boolean;
// }

const FeedPost = ({ post, isAuthenticated, isPaidUser }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(post.comments || []);
  const [replyTo, setReplyTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [blockDialogOpen, setBlockDialogOpen] = useState(false);
  const [reportReason, setReportReason] = useState('inappropriate');
  const [commentMenuAnchor, setCommentMenuAnchor] = useState({});

  // Handle like button click
  const handleLikeClick = () => {
    if (!isAuthenticated || !isPaidUser) {
      alert("You need to be logged in with a paid subscription to interact with posts");
      return;
    }

    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
  };

  // Handle post options menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle comment options menu
  const handleCommentMenuOpen = (commentId, event) => {
    if (!isAuthenticated || !isPaidUser) {
      alert("You need to be logged in with a paid subscription to interact with posts");
      return;
    }
    setCommentMenuAnchor({ ...commentMenuAnchor, [commentId]: event.currentTarget });
  };

  const handleCommentMenuClose = (commentId) => {
    setCommentMenuAnchor({ ...commentMenuAnchor, [commentId]: null });
  };

  // Handle report post dialog
  const handleReportOpen = () => {
    if (!isAuthenticated) {
      alert("You need to be logged in to report posts");
      return;
    }
    setReportDialogOpen(true);
    handleMenuClose();
  };

  const handleReportClose = () => {
    setReportDialogOpen(false);
  };

  const handleReportSubmit = () => {
    console.log(`Post ${post.id} reported for ${reportReason}`);
    setReportDialogOpen(false);
    // In a real app, we'd send this to an API
  };

  // Handle block user dialog
  const handleBlockOpen = () => {
    if (!isAuthenticated) {
      alert("You need to be logged in to block users");
      return;
    }
    setBlockDialogOpen(true);
    handleMenuClose();
  };

  const handleBlockClose = () => {
    setBlockDialogOpen(false);
  };

  const handleBlockSubmit = () => {
    console.log(`User ${post.coach.id} blocked`);
    setBlockDialogOpen(false);
    // In a real app, we'd send this to an API
  };

  // Handle comment submission
  const handleCommentSubmit = () => {
    if (!isAuthenticated || !isPaidUser) {
      alert("You need to be logged in with a paid subscription to comment");
      return;
    }

    if (!newComment.trim()) return;

    const comment = {
      id: `comment-${Date.now()}`,
      text: newComment,
      author: { 
        id: 'current-user', 
        name: 'Current User', 
        profilePhoto: '/placeholder.svg' 
      },
      datePosted: new Date().toISOString(),
      likes: 0,
      replies: []
    };

    setComments([...comments, comment]);
    setNewComment('');
  };

  // Handle reply submission
  const handleReplySubmit = (commentId) => {
    if (!isAuthenticated || !isPaidUser) {
      alert("You need to be logged in with a paid subscription to reply");
      return;
    }

    if (!replyText.trim()) return;

    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [
            ...(comment.replies || []),
            {
              id: `reply-${Date.now()}`,
              text: replyText,
              author: { 
                id: 'current-user', 
                name: 'Current User', 
                profilePhoto: '/placeholder.svg' 
              },
              datePosted: new Date().toISOString(),
              likes: 0
            }
          ]
        };
      }
      return comment;
    });

    setComments(updatedComments);
    setReplyTo(null);
    setReplyText('');
  };

  // Handle comment like
  const handleCommentLike = (commentId) => {
    if (!isAuthenticated || !isPaidUser) {
      alert("You need to be logged in with a paid subscription to like comments");
      return;
    }

    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, likes: comment.likes + 1 };
      }
      return comment;
    });

    setComments(updatedComments);
  };

  // Handle reply like
  const handleReplyLike = (commentId, replyId) => {
    if (!isAuthenticated || !isPaidUser) {
      alert("You need to be logged in with a paid subscription to like replies");
      return;
    }

    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        const updatedReplies = comment.replies?.map(reply => {
          if (reply.id === replyId) {
            return { ...reply, likes: reply.likes + 1 };
          }
          return reply;
        });
        return { ...comment, replies: updatedReplies };
      }
      return comment;
    });

    setComments(updatedComments);
  };

  // Handle report comment
  const handleReportComment = (commentId) => {
    if (!isAuthenticated) {
      alert("You need to be logged in to report comments");
      return;
    }
    console.log(`Comment ${commentId} reported`);
    handleCommentMenuClose(commentId);
    // In a real app, we'd open a dialog similar to report post
  };

  return (
    <Card sx={{ mb: 3 }}>
      {/* Post header with avatar, name, and menu */}
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link to={`/coaches/${post.coach.id}`} style={{ textDecoration: 'none' }}>
              <Avatar 
                src={post.coach.profilePhoto} 
                alt={post.coach.name}
                sx={{ width: 50, height: 50, mr: 2 }}
              />
            </Link>
            <Box>
              <Link to={`/coaches/${post.coach.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {post.coach.name}
                </Typography>
              </Link>
              <Typography variant="body2" color="text.secondary">
                {new Date(post.datePosted).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={handleMenuOpen}>
            <MoreVert />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleReportOpen}>
              <Flag fontSize="small" sx={{ mr: 1 }} />
              Report Post
            </MenuItem>
            <MenuItem onClick={handleBlockOpen}>
              <Block fontSize="small" sx={{ mr: 1 }} />
              Block User
            </MenuItem>
          </Menu>
        </Box>
        
        {/* Post title and content */}
        <Typography variant="h6" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body1" paragraph>
          {post.description}
        </Typography>
        
        {/* Post media - conditionally render if available */}
        {post.mediaUrl && (
          <CardMedia
            component={post.mediaType === 'video' ? 'video' : 'img'}
            controls={post.mediaType === 'video'}
            image={post.mediaUrl}
            alt={post.title}
            sx={{ 
              height: 0,
              paddingTop: '56.25%', // 16:9 ratio
              mb: 2,
              objectFit: 'cover'
            }}
          />
        )}
        
        {/* Tags and booking options */}
        <Box sx={{ mb: 2 }}>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {post.tags?.map(tag => (
              <Chip 
                key={tag} 
                label={tag} 
                size="small" 
                sx={{ mr: 1, mb: 1 }} 
              />
            ))}
          </Stack>
          
          {post.bookingSlot && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Next Available Session:
              </Typography>
              <Button 
                variant="outlined" 
                color="primary"
                component={MuiLink}
                href={post.bookingSlot.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ borderRadius: 30 }}
              >
                Book for {new Date(post.bookingSlot.datetime).toLocaleString()}
              </Button>
            </Box>
          )}
        </Box>
        
        {/* Interaction counts */}
        <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', mb: 2 }}>
          <Typography variant="body2" sx={{ mr: 2 }}>
            {likesCount} like{likesCount !== 1 ? 's' : ''}
          </Typography>
          <Typography variant="body2">
            {comments.length} comment{comments.length !== 1 ? 's' : ''}
          </Typography>
        </Box>
        
        <Divider sx={{ my: 1 }} />
        
        {/* Interaction buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button 
            startIcon={<ThumbUp color={liked ? 'primary' : undefined} />}
            onClick={handleLikeClick}
            color={liked ? 'primary' : 'inherit'}
            disabled={!isAuthenticated || !isPaidUser}
          >
            Like
          </Button>
          <Button 
            startIcon={<Comment />}
            onClick={() => setShowComments(!showComments)}
            color="inherit"
          >
            Comment
          </Button>
          <Button 
            startIcon={<Share />}
            color="inherit"
            disabled={!isAuthenticated || !isPaidUser}
          >
            Share
          </Button>
        </Box>
        
        {/* Comments section */}
        {showComments && (
          <Box sx={{ mt: 2 }}>
            <Divider sx={{ mb: 2 }} />
            
            {/* New comment input */}
            {(isAuthenticated && isPaidUser) && (
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Avatar 
                  src="/placeholder.svg" 
                  alt="Your Avatar"
                  sx={{ width: 32, height: 32, mr: 1 }}
                />
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Write a comment..."
                  variant="outlined"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <IconButton 
                        size="small" 
                        onClick={handleCommentSubmit}
                        disabled={!newComment.trim()}
                      >
                        <Send fontSize="small" />
                      </IconButton>
                    ),
                  }}
                />
              </Box>
            )}
            
            {/* Display existing comments */}
            {comments.length > 0 ? (
              <Box>
                {comments.map((comment) => (
                  <Box key={comment.id} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', mb: 1 }}>
                      <Link to={`/coaches/${comment.author.id}`} style={{ textDecoration: 'none' }}>
                        <Avatar 
                          src={comment.author.profilePhoto} 
                          alt={comment.author.name}
                          sx={{ width: 32, height: 32, mr: 1 }}
                        />
                      </Link>
                      <Box sx={{ flexGrow: 1 }}>
                        <Box sx={{ bgcolor: 'grey.100', p: 1.5, borderRadius: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Link to={`/coaches/${comment.author.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                              <Typography variant="subtitle2" fontWeight="bold">
                                {comment.author.name}
                              </Typography>
                            </Link>
                            <IconButton 
                              size="small" 
                              onClick={(e) => handleCommentMenuOpen(comment.id, e)}
                            >
                              <MoreVert fontSize="small" />
                            </IconButton>
                            <Menu
                              anchorEl={commentMenuAnchor[comment.id]}
                              open={Boolean(commentMenuAnchor[comment.id])}
                              onClose={() => handleCommentMenuClose(comment.id)}
                            >
                              <MenuItem onClick={() => handleReportComment(comment.id)}>
                                <Flag fontSize="small" sx={{ mr: 1 }} />
                                Report Comment
                              </MenuItem>
                            </Menu>
                          </Box>
                          <Typography variant="body2">{comment.text}</Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5, ml: 1 }}>
                          <Button 
                            size="small" 
                            color="inherit"
                            onClick={() => handleCommentLike(comment.id)}
                            disabled={!isAuthenticated || !isPaidUser}
                          >
                            Like {comment.likes > 0 && `(${comment.likes})`}
                          </Button>
                          <Button 
                            size="small" 
                            color="inherit" 
                            onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                            disabled={!isAuthenticated || !isPaidUser}
                          >
                            Reply
                          </Button>
                          <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                            {new Date(comment.datePosted).toLocaleString()}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    
                    {/* Display replies to this comment */}
                    {comment.replies && comment.replies.length > 0 && (
                      <Box sx={{ pl: 6, mt: 1 }}>
                        {comment.replies.map((reply) => (
                          <Box key={reply.id} sx={{ display: 'flex', mb: 1 }}>
                            <Link to={`/coaches/${reply.author.id}`} style={{ textDecoration: 'none' }}>
                              <Avatar 
                                src={reply.author.profilePhoto} 
                                alt={reply.author.name}
                                sx={{ width: 24, height: 24, mr: 1 }}
                              />
                            </Link>
                            <Box>
                              <Box sx={{ bgcolor: 'grey.100', p: 1, borderRadius: 2 }}>
                                <Link to={`/coaches/${reply.author.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                  <Typography variant="subtitle2" fontWeight="bold" fontSize="0.875rem">
                                    {reply.author.name}
                                  </Typography>
                                </Link>
                                <Typography variant="body2" fontSize="0.875rem">
                                  {reply.text}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5, ml: 1 }}>
                                <Button 
                                  size="small" 
                                  color="inherit"
                                  onClick={() => handleReplyLike(comment.id, reply.id)}
                                  disabled={!isAuthenticated || !isPaidUser}
                                >
                                  Like {reply.likes > 0 && `(${reply.likes})`}
                                </Button>
                                <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                                  {new Date(reply.datePosted).toLocaleString()}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    )}
                    
                    {/* Reply input */}
                    {replyTo === comment.id && (
                      <Box sx={{ display: 'flex', pl: 6, mt: 1 }}>
                        <Avatar 
                          src="/placeholder.svg" 
                          alt="Your Avatar"
                          sx={{ width: 24, height: 24, mr: 1 }}
                        />
                        <TextField
                          fullWidth
                          size="small"
                          placeholder="Write a reply..."
                          variant="outlined"
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          InputProps={{
                            endAdornment: (
                              <IconButton 
                                size="small" 
                                onClick={() => handleReplySubmit(comment.id)}
                                disabled={!replyText.trim()}
                              >
                                <Send fontSize="small" />
                              </IconButton>
                            ),
                          }}
                        />
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                No comments yet. Be the first to comment!
              </Typography>
            )}
            
            {/* Show comment restrictions for non-authenticated or free users */}
            {(!isAuthenticated || !isPaidUser) && (
              <Box sx={{ 
                bgcolor: 'background.paper', 
                p: 2, 
                borderRadius: 1, 
                border: '1px solid', 
                borderColor: 'divider',
                textAlign: 'center',
                mt: 2
              }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {isAuthenticated ? 
                    "Upgrade to a paid subscription to interact with posts" : 
                    "Sign in with a paid subscription to interact with posts"}
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  sx={{ mt: 1 }}
                  component={Link}
                  to={isAuthenticated ? "/dashboard" : "/login"}
                >
                  {isAuthenticated ? "Upgrade Now" : "Sign In"}
                </Button>
              </Box>
            )}
          </Box>
        )}
      </CardContent>
      
      {/* Report Post Dialog */}
      <Dialog open={reportDialogOpen} onClose={handleReportClose}>
        <DialogTitle>Report Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please select a reason for reporting this post.
          </DialogContentText>
          <FormControl sx={{ mt: 2 }}>
            <RadioGroup
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
            >
              <FormControlLabel value="inappropriate" control={<Radio />} label="Inappropriate content" />
              <FormControlLabel value="spam" control={<Radio />} label="Spam" />
              <FormControlLabel value="false" control={<Radio />} label="False information" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReportClose}>Cancel</Button>
          <Button onClick={handleReportSubmit} variant="contained" color="primary">
            Submit Report
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Block User Dialog */}
      <Dialog open={blockDialogOpen} onClose={handleBlockClose}>
        <DialogTitle>Block User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to block {post.coach.name}? 
            You won't see their posts, comments, or other content anymore.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBlockClose}>Cancel</Button>
          <Button onClick={handleBlockSubmit} variant="contained" color="error">
            Block User
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default FeedPost;
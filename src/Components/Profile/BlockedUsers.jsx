import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Button,
  Divider,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../hooks/use-toast';

// Mock blocked users data
const mockBlockedUsers = [
  {
    id: 'blocked-user-1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    profileImage: 'https://placehold.co/400',
    bio: 'Fitness enthusiast and marathon runner',
    location: 'New York, USA',
    isBlocked: true,
    isPremium: false,
    joinedDate: new Date().toISOString()
  },
  {
    id: 'blocked-user-2',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    profileImage: 'https://placehold.co/400?text=SJ',
    bio: 'Obstacle course racer and yoga instructor',
    location: 'Los Angeles, USA',
    isBlocked: true,
    isPremium: true,
    joinedDate: new Date().toISOString()
  }
];

const BlockedUsers = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [unblockDialog, setUnblockDialog] = useState({
    open: false,
    userId: null
  });

  useEffect(() => {
    if (user) {
      const blockedIds = JSON.parse(localStorage.getItem('blocked_users') || '[]') || [];
      const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const blocked = allUsers.filter((u) => blockedIds.includes(u.id));

      if (blocked.length === 0) {
        const updatedUsers = [...allUsers];
        const updatedBlockedIds = [...blockedIds];

        mockBlockedUsers.forEach(mockUser => {
          if (!allUsers.some(u => u.id === mockUser.id)) {
            updatedUsers.push(mockUser);
            updatedBlockedIds.push(mockUser.id);
          }
        });

        if (updatedUsers.length > allUsers.length) {
          localStorage.setItem('users', JSON.stringify(updatedUsers));
        }

        if (updatedBlockedIds.length > blockedIds.length) {
          localStorage.setItem('blocked_users', JSON.stringify(updatedBlockedIds));
        }

        setBlockedUsers(mockBlockedUsers);
      } else {
        setBlockedUsers(blocked);
      }
    }
  }, [user]);

  const handleUnblockUser = (userId) => {
    const blockedIds = JSON.parse(localStorage.getItem('blocked_users') || '[]');
    const updatedBlockedIds = blockedIds.filter((id) => id !== userId);
    localStorage.setItem('blocked_users', JSON.stringify(updatedBlockedIds));

    setBlockedUsers(blockedUsers.filter(user => user.id !== userId));
    setUnblockDialog({ open: false, userId: null });

    toast({
      title: "User unblocked",
      description: "You can now see content from this user again",
    });
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Blocked Users</Typography>

      {blockedUsers.length > 0 ? (
        <Paper elevation={0} sx={{ bgcolor: 'background.default' }}>
          <List>
            {blockedUsers.map((blockedUser, index) => (
              <React.Fragment key={blockedUser.id}>
                <ListItem
                  secondaryAction={
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => setUnblockDialog({ open: true, userId: blockedUser.id })}
                    >
                      Unblock
                    </Button>
                  }
                >
                  <ListItemAvatar>
                    <Avatar src={blockedUser.profileImage}>
                      {!blockedUser.profileImage && <User />}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={blockedUser.name}
                    secondary={blockedUser.email}
                  />
                </ListItem>
                {index < blockedUsers.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      ) : (
        <Typography variant="body1" sx={{ mt: 2 }}>
          You haven't blocked any users.
        </Typography>
      )}

      <Dialog
        open={unblockDialog.open}
        onClose={() => setUnblockDialog({ open: false, userId: null })}
      >
        <DialogTitle>Unblock User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to unblock this user? You will start seeing their content again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUnblockDialog({ open: false, userId: null })}>Cancel</Button>
          <Button
            onClick={() => unblockDialog.userId && handleUnblockUser(unblockDialog.userId)}
            color="primary"
            variant="contained"
          >
            Unblock
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BlockedUsers;

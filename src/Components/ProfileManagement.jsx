import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import {
  Container,
  Box,
  Typography,
  Grid,
  Paper,
  Tabs,
  Tab,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  Avatar,
  Divider
} from '@mui/material';
import { User, Ban, Lock, CreditCard, Edit, LogOut, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import theme from '../theme/theme';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../hooks/use-toast';
import PersonalDetailsForm from '../Components/Profile/PersonalDetailsForm';
import ProfileDetailsForm from '../Components/Profile/ProfileDetailsForm';
import PasswordUpdateForm from '../Components/Profile/PasswordUpdateForm';
import BookingHistory from '../Components/Profile/BookingHistory';
import SubscriptionManagement from '../Components/Profile/SubscriptionManagement';
import BlockedUsers from '../Components/Profile/BlockedUsers';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `profile-tab-${index}`,
    'aria-controls': `profile-tabpanel-${index}`,
  };
}

const ProfileManagement = () => {
  const [value, setValue] = useState(0);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const { isAuthenticated, user, logout, userSubscription } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isPremium = userSubscription === 'premium' || userSubscription === 'pro';

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { redirectAfterLogin: '/profile-management' } });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDeleteAccount = () => {
    if (user) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.filter(u => u.id !== user.id);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      localStorage.removeItem(`subscription_${user.id}`);
      logout();
      toast({
        title: "Account deleted",
        description: "Your account has been permanently deleted",
      });
      navigate('/');
    }
    setOpenDeleteDialog(false);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate('/');
    setOpenLogoutDialog(false);
  };

  if (!isAuthenticated || !user) {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
          <Header />
          <Container sx={{ py: 4 }}>
            <Typography variant="h5">Please log in to access your profile</Typography>
          </Container>
          <Footer />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="primary">
            Profile Management
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Paper sx={{ p: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                  <Avatar
                    src={user?.profileImage || undefined}
                    sx={{ width: 100, height: 100, mb: 2 }}
                  >
                    {!user?.profileImage && <User size={40} />}
                  </Avatar>
                  <Typography variant="h6">{user?.name || 'User'}</Typography>
                  <Typography variant="body2" color="text.secondary">{user?.email}</Typography>
                  {isPremium && (
                    <Box
                      sx={{
                        mt: 1,
                        display: 'inline-block',
                        px: 2,
                        py: 0.5,
                        bgcolor: 'primary.main',
                        color: 'white',
                        borderRadius: 1,
                      }}
                    >
                      {userSubscription?.toUpperCase()}
                    </Box>
                  )}
                </Box>

                <Tabs
                  orientation="vertical"
                  variant="scrollable"
                  value={value}
                  onChange={handleChange}
                  sx={{ borderRight: 1, borderColor: 'divider' }}
                >
                  <Tab icon={<User size={18} />} label="Personal Details" {...a11yProps(0)} />
                  {isPremium && <Tab icon={<Edit size={18} />} label="Profile Details" {...a11yProps(1)} />}
                  <Tab icon={<Lock size={18} />} label="Password" {...a11yProps(2)} />
                  <Tab icon={<CreditCard size={18} />} label="Booking History" {...a11yProps(3)} />
                  <Tab icon={<CreditCard size={18} />} label="Subscription" {...a11yProps(4)} />
                  <Tab icon={<Ban size={18} />} label="Blocked Users" {...a11yProps(5)} />
                </Tabs>

                <Divider sx={{ my: 2 }} />

                <List disablePadding>
                  <ListItem disablePadding sx={{ mb: 1 }}>
                    <Button
                      fullWidth
                      variant="outlined"
                      color="error"
                      startIcon={<Trash2 />}
                      onClick={() => setOpenDeleteDialog(true)}
                    >
                      Delete Account
                    </Button>
                  </ListItem>
                  <ListItem disablePadding>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<LogOut />}
                      onClick={() => setOpenLogoutDialog(true)}
                    >
                      Logout
                    </Button>
                  </ListItem>
                </List>
              </Paper>
            </Grid>

            <Grid item xs={12} md={9}>
              <Paper sx={{ p: 3 }}>
                <TabPanel value={value} index={0}>
                  <PersonalDetailsForm />
                </TabPanel>
                {isPremium && (
                  <TabPanel value={value} index={1}>
                    <ProfileDetailsForm />
                  </TabPanel>
                )}
                <TabPanel value={value} index={isPremium ? 2 : 1}>
                  <PasswordUpdateForm />
                </TabPanel>
                <TabPanel value={value} index={isPremium ? 3 : 2}>
                  <BookingHistory />
                </TabPanel>
                <TabPanel value={value} index={isPremium ? 4 : 3}>
                  <SubscriptionManagement />
                </TabPanel>
                <TabPanel value={value} index={isPremium ? 5 : 4}>
                  <BlockedUsers />
                </TabPanel>
              </Paper>
            </Grid>
          </Grid>
        </Container>
        <Footer />
      </Box>

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to permanently delete your account? This action cannot be undone, and any payments made will not be refunded.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDeleteAccount} variant="contained" color="error">
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openLogoutDialog} onClose={() => setOpenLogoutDialog(false)}>
        <DialogTitle>Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to logout from your account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenLogoutDialog(false)}>Cancel</Button>
          <Button onClick={handleLogout} variant="contained" color="primary">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default ProfileManagement;

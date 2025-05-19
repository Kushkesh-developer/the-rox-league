import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSubscription } from '../hooks/use-subscription';
import { useToast } from '../hooks/use-toast';
import { 
  Container, 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  Avatar, 
  Grid,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl,
  Select,
  MenuItem,
  Paper
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Block, Message, Flag, Person } from '@mui/icons-material';
import Header from './Header';
import theme from '../theme/theme';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isPremiumUser } = useAuth();
  const { checkFeatureAccess } = useSubscription();

  const [userProfile, setUserProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [userExperiences, setUserExperiences] = useState([]);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

    if (storedUsers.length === 0 && id) {
      const sampleUser = {
        id: id,
        name: "Sample User",
        email: "sample@example.com",
        profileImage: "https://placehold.co/400",
        bio: "This is a sample user profile for testing",
        location: "New York, USA",
        isBlocked: false,
        isPremium: true,
        joinedDate: new Date().toISOString()
      };

      localStorage.setItem('users', JSON.stringify([sampleUser]));
      setUserProfile(sampleUser);
    } else {
      const user = storedUsers.find((u) => u.id === id);
      if (user) {
        setUserProfile(user);
      }
    }

    const allPosts = JSON.parse(localStorage.getItem('rox_feed_posts') || '[]');
    setUserPosts(allPosts.filter((post) => post.userId === id));

    const allExperiences = JSON.parse(localStorage.getItem('experiences') || '[]');
    setUserExperiences(allExperiences.filter((exp) => exp.userId === id));

    setLoading(false);
  }, [id]);

  const handleBlock = () => {
    const blockedUsers = JSON.parse(localStorage.getItem('blocked_users') || '[]');
    const isAlreadyBlocked = blockedUsers.includes(id);

    if (!isAlreadyBlocked) {
      blockedUsers.push(id);
      localStorage.setItem('blocked_users', JSON.stringify(blockedUsers));
      toast({
        title: "User blocked",
        description: "You will no longer see content from this user",
      });
      navigate(-1);
    }
  };

  const handleReport = () => {
    if (!reportReason) {
      toast({
        title: "Error",
        description: "Please select a reason for reporting",
        variant: "destructive",
      });
      return;
    }

    const reports = JSON.parse(localStorage.getItem('user_reports') || '[]');
    const newReport = {
      id: Date.now().toString(),
      userId: user?.id,
      reportedUserId: id,
      reason: reportReason,
      date: new Date().toISOString(),
      status: 'pending'
    };

    reports.push(newReport);
    localStorage.setItem('user_reports', JSON.stringify(reports));
    setIsReportModalOpen(false);
    setReportReason('');

    toast({
      title: "Report submitted",
      description: "Thank you for helping keep our community safe",
    });
  };

  const handleMessage = () => {
    if (!checkFeatureAccess('messaging')) return;

    toast({
      title: "Coming soon",
      description: "Messaging feature will be available soon!",
    });
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
          <Header />
          <Container sx={{ py: 4 }}>
            <Typography variant="h5">Loading user profile...</Typography>
          </Container>
        </Box>
      </ThemeProvider>
    );
  }

  if (!userProfile) {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
          <Header />
          <Container sx={{ py: 4 }}>
            <Typography variant="h5">User not found</Typography>
            <Button 
              variant="contained" 
              color="primary" 
              sx={{ mt: 2 }}
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
          </Container>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Header />
        <Container sx={{ py: 4 }}>
          <Paper elevation={2} sx={{ mb: 4, p: 3, borderRadius: 2 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item>
                <Avatar 
                  sx={{ width: 80, height: 80 }}
                  src={userProfile.profileImage}
                >
                  {!userProfile.profileImage && <Person fontSize="large" />}
                </Avatar>
              </Grid>
              <Grid item xs>
                <Typography variant="h4" fontWeight="bold">
                  {userProfile.name}
                </Typography>
                {userProfile.isPremium && (
                  <>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      {userProfile.bio}
                    </Typography>
                    <Typography variant="body2">
                      {userProfile.location}
                    </Typography>
                  </>
                )}
              </Grid>
              <Grid item>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {isPremiumUser && (
                    <Button 
                      variant="outlined" 
                      startIcon={<Message />}
                      onClick={handleMessage}
                    >
                      Message
                    </Button>
                  )}
                  <Button 
                    variant="outlined" 
                    color="error"
                    startIcon={<Flag />}
                    onClick={() => setIsReportModalOpen(true)}
                  >
                    Report
                  </Button>
                  <Button 
                    variant="contained" 
                    color="error"
                    startIcon={<Block />}
                    onClick={handleBlock}
                  >
                    Block
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {isPremiumUser && (
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleTabChange}>
                  <Tab label="Posts" />
                  <Tab label="Experiences" />
                </Tabs>
              </Box>
              <TabPanel value={tabValue} index={0}>
                <Grid container spacing={2}>
                  {userPosts.length > 0 ? (
                    userPosts.map((post) => (
                      <Grid item xs={12} key={post.id}>
                        <Card>
                          <CardContent>
                            <Typography variant="body1">{post.content}</Typography>
                            {post.eventName && (
                              <Typography variant="body2" sx={{ mt: 1 }}>
                                Event: {post.eventName}
                              </Typography>
                            )}
                            <Typography variant="caption" sx={{ mt: 1 }}>
                              {new Date(post.date).toLocaleDateString()}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))
                  ) : (
                    <Grid item xs={12}>
                      <Typography textAlign="center">No posts found</Typography>
                    </Grid>
                  )}
                </Grid>
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <Grid container spacing={2}>
                  {userExperiences.length > 0 ? (
                    userExperiences.map((exp) => (
                      <Grid item xs={12} key={exp.id}>
                        <Card>
                          <CardContent>
                            <Typography variant="h6">{exp.title}</Typography>
                            <Typography sx={{ mt: 1 }}>{exp.description}</Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                              {exp.hashtags.map((tag, index) => (
                                <Typography 
                                  key={index}
                                  sx={{
                                    bgcolor: 'primary.light',
                                    color: 'white',
                                    px: 1,
                                    py: 0.5,
                                    borderRadius: 10
                                  }}
                                >
                                  #{tag}
                                </Typography>
                              ))}
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))
                  ) : (
                    <Grid item xs={12}>
                      <Typography textAlign="center">No experiences found</Typography>
                    </Grid>
                  )}
                </Grid>
              </TabPanel>
            </Box>
          )}
        </Container>

        <Dialog open={isReportModalOpen} onClose={() => setIsReportModalOpen(false)}>
          <DialogTitle>Report User</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ mb: 2 }}>
              Please select a reason for reporting this user
            </DialogContentText>
            <FormControl fullWidth>
              <Select
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                displayEmpty
              >
                <MenuItem value="" disabled>Select a reason</MenuItem>
                <MenuItem value="spam">Spam</MenuItem>
                <MenuItem value="harassment">Harassment</MenuItem>
                <MenuItem value="inappropriate">Inappropriate Content</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsReportModalOpen(false)}>Cancel</Button>
            <Button onClick={handleReport} variant="contained" color="primary">
              Submit Report
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}

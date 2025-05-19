import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  TextField, 
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Breadcrumbs,
  Divider,
  Button
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Link, useSearchParams } from 'react-router-dom';
import { NavigateNext, Search, FilterList } from '@mui/icons-material';
import Header from './Header';
import Footer from './Footer';
import FeedPost from '../Components/feeds/FeedPost';
import { mockPosts } from '../Components/feeds/mockFeedData';
import theme from '../theme/theme';
import { useAuth } from '../context/AuthContext';

// Feed page containing all posts from coaches
const Feed = () => {
  const [posts, setPosts] = useState(mockPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('recent');
  const { isAuthenticated, userSubscription } = useAuth();
  const isPaidUser = userSubscription === 'paid';
  const [searchParams] = useSearchParams();
  
  // Get coachId from URL params if available
  const coachIdParam = searchParams.get('coachId');
  
  useEffect(() => {
    // If coachId is provided in URL, filter posts by that coach
    if (coachIdParam) {
      const filteredPosts = mockPosts.filter(post => post.coach.id === coachIdParam);
      setPosts(filteredPosts);
      // If we're filtering by coach, don't apply other filters
      return;
    } else {
      // Otherwise show all posts with default sorting
      handleFilterChange({ target: { value: filterBy } });
    }
  }, [coachIdParam]);

  // Handle searching posts
  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    
    if (!term) {
      if (coachIdParam) {
        // If filtering by coach, only reset to that coach's posts
        const filteredPosts = mockPosts.filter(post => post.coach.id === coachIdParam);
        setPosts(filteredPosts);
      } else {
        // Otherwise reset to all posts
        handleFilterChange({ target: { value: filterBy } });
      }
      return;
    }
    
    // Start with appropriate base posts (all or filtered by coach)
    let basePosts = coachIdParam 
      ? mockPosts.filter(post => post.coach.id === coachIdParam) 
      : mockPosts;
    
    // Filter posts based on search term
    const filteredPosts = basePosts.filter(
      post => post.title.toLowerCase().includes(term.toLowerCase()) || 
             post.coach.name.toLowerCase().includes(term.toLowerCase())
    );
    setPosts(filteredPosts);
  };

  // Handle filtering posts
  const handleFilterChange = (event) => {
    const filter = event.target.value;
    setFilterBy(filter);
    
    // Start with appropriate base posts (all or filtered by coach)
    let filteredPosts = coachIdParam 
      ? mockPosts.filter(post => post.coach.id === coachIdParam) 
      : [...mockPosts];
    
    switch (filter) {
      case 'recent':
        filteredPosts.sort((a, b) => new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime());
        break;
      case 'popular':
        filteredPosts.sort((a, b) => b.likes - a.likes);
        break;
      case 'events':
        filteredPosts = filteredPosts.filter(post => post.isEvent);
        break;
      case 'location':
        // In a real app, we would filter by user's location
        filteredPosts = filteredPosts.filter(post => post.location);
        break;
      default:
        break;
    }
    
    setPosts(filteredPosts);
  };

  // Reset coach filter (if we're viewing a specific coach's posts)
  const handleResetCoachFilter = () => {
    window.location.href = '/feed';
  };

  // Get coach name for display
  const getCoachName = () => {
    if (!coachIdParam || posts.length === 0) return '';
    return posts[0]?.coach.name || 'Coach';
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        bgcolor: 'background.default' 
      }}>
        <Header />
        <Box component="main" sx={{ flexGrow: 1, py: { xs: 4, md: 8 } }}>
          <Container maxWidth="lg">
            {/* Breadcrumbs navigation */}
            <Breadcrumbs separator={<NavigateNext fontSize="small" />} sx={{ mb: 4 }}>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link>
              {coachIdParam && (
                <Link to="/coaches" style={{ textDecoration: 'none', color: 'inherit' }}>Coaches</Link>
              )}
              {coachIdParam && (
                <Link to={`/coaches/${coachIdParam}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {getCoachName()}
                </Link>
              )}
              <Typography color="text.primary">Feed</Typography>
            </Breadcrumbs>
            
            <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
              {coachIdParam ? `Posts from ${getCoachName()}` : 'Coach Feed'}
            </Typography>
            
            {coachIdParam && posts.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Button 
                  variant="outlined" 
                  onClick={handleResetCoachFilter}
                  startIcon={<FilterList />}
                >
                  View All Coaches
                </Button>
              </Box>
            )}
            
            <Typography variant="body1" color="text.secondary" paragraph>
              {coachIdParam ? 
                `Browse the latest posts and events from this coach.` :
                `Stay updated with the latest tips, workout routines, and events from our professional coaches.`
              }
            </Typography>
            
            {/* Search and filter controls */}
            <Paper sx={{ p: 3, mb: 4 }}>
              <Grid container spacing={3}>
                <Grid size={{xs:12,md:8}}>
                  <TextField
                     sx={{mr:2,ml:2,mt:2}}
                    fullWidth
                    variant="outlined"
                    placeholder="Search by post title or coach name"
                    value={searchTerm}
                    onChange={handleSearch}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid size={{xs:12,md:4}}>
                  <FormControl fullWidth variant="outlined" sx={{ml:4,mt:2}}>
                    <InputLabel id="filter-select-label" >Filter By</InputLabel>
                    <Select
                      labelId="filter-select-label"
                      id="filter-select"
                      value={filterBy}
                      onChange={handleFilterChange}
                      label="Filter By"
                    >
                      <MenuItem value="recent">Most Recent</MenuItem>
                      <MenuItem value="popular">Most Popular</MenuItem>
                      <MenuItem value="events">Events</MenuItem>
                      <MenuItem value="location">By Location</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>
            
            {/* Display the posts */}
            {posts.length > 0 ? (
              <Box sx={{ mb: 4 }}>
                {posts.map((post) => (
                  <Box key={post.id} sx={{ mb: 4 }}>
                    <FeedPost 
                      post={post} 
                      isAuthenticated={isAuthenticated}
                      isPaidUser={isPaidUser}
                    />
                  </Box>
                ))}
              </Box>
            ) : (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" color="text.secondary">
                  No posts found matching your search.
                </Typography>
                {coachIdParam && (
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleResetCoachFilter}
                    sx={{ mt: 2 }}
                  >
                    View All Posts
                  </Button>
                )}
              </Box>
            )}
          </Container>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default Feed;

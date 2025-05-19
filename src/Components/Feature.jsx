import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  useMediaQuery,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import ForumIcon from '@mui/icons-material/Forum';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';

const features = [
  {
    title: 'Ticket Exchange',
    description: 'Trade workout tickets with other members to experience new training styles and classes',
    icon: CompareArrowsIcon,
    color: '#5E35B1'
  },
  {
    title: 'Workout Leaderboards',
    description: 'Compete with members globally and see where you rank in various workout categories',
    icon: LeaderboardIcon,
    color: '#2979FF'
  },
  {
    title: 'Community Newsfeed',
    description: 'Stay updated with the latest fitness trends, tips, and success stories from the community',
    icon: DynamicFeedIcon,
    color: '#FF5722'
  },
  {
    title: 'Discussion Forum',
    description: 'Connect with experts and fellow members to discuss workouts, nutrition, and more',
    icon: ForumIcon,
    color: '#7E57C2'
  },
  {
    title: 'Partner Finder',
    description: 'Find the perfect workout partner based on location, fitness level, and training goals',
    icon: ConnectWithoutContactIcon,
    color: '#448AFF'
  }
];

const FeatureIcon = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  transition: 'transform 0.3s ease',
  '& svg': {
    fontSize: 40,
    color: 'white',
  },
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  flex: '1 0 300px',
  margin: theme.spacing(2),
  maxWidth: 350,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  padding: theme.spacing(4, 2),
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 20px 30px rgba(0, 0, 0, 0.1)',
    '& .MuiBox-root': {
      transform: 'scale(1.1)',
    },
  },
}));

const FeaturesContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: theme.spacing(2),
}));

const Features = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 8 } }}>
          <Typography 
            variant="overline" 
            component="div" 
            sx={{ 
              color: 'primary.main', 
              fontWeight: 'bold',
              letterSpacing: 2,
              mb: 1
            }}
          >
            UNIQUE FEATURES
          </Typography>
          <Typography 
            variant="h3" 
            component="h2" 
            sx={{ 
              fontWeight: 'bold',
              mb: 2,
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            What Makes The Rox League Special
          </Typography>
          <Typography 
            variant="subtitle1" 
            color="text.secondary"
            sx={{ 
              maxWidth: 700,
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.1rem' }
            }}
          >
            Our platform brings together fitness enthusiasts with innovative features designed to enhance your workout experience and connect you with the global fitness community.
          </Typography>
        </Box>

        <FeaturesContainer>
          {features.map((feature, index) => (
            <FeatureCard key={index} elevation={4}>
              <FeatureIcon sx={{ bgcolor: feature.color }}>
                <feature.icon />
              </FeatureIcon>
              <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                {feature.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {feature.description}
              </Typography>
            </FeatureCard>
          ))}
        </FeaturesContainer>
      </Container>
    </Box>
  );
};

export default Features;
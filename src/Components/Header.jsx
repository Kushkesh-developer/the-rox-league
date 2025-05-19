import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer,
  List, ListItem, ListItemText, Container, useMediaQuery, useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
const navItems = ['Home', 'Coaches', 'Feed', 'Sponsors', 'Features', 'Pricing', 'Community', 'Contact',];
const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };
  const handleSignClick = () => {
    navigate('/signup')
  }
  const getRouteForNavItem = (item) => {
    switch (item.toLowerCase()) {
      case 'home':
        return '/';
      case 'coaches':
        return '/coaches';
      case 'feed':
        return '/feed';
      case 'sponsors':
        return '/sponsors';
      default:
        // For items without specific routes yet
        return '#';
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
        <FitnessCenterIcon sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          THE ROX LEAGUE
        </Typography>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item} sx={{ justifyContent: 'center' }}>
            <Button
              component={RouterLink}
              to={getRouteForNavItem(item)}
              sx={{ color: 'text.primary' }}
            >
              {item}
            </Button>
          </ListItem>
        ))}
        <ListItem sx={{ justifyContent: 'center', mt: 2 }}>
          <Button variant="contained" color="primary" sx={{ borderRadius: 30 }} onClick={handleSignClick}>
            Sign Up
          </Button>
        </ListItem>
        <ListItem sx={{ justifyContent: 'center' }}>
          <Button
            variant="outlined"
            color="primary"
            sx={{ borderRadius: 30 }}
            onClick={handleLoginClick}
          >
            Login
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" color="default" elevation={0} sx={{ bgcolor: 'background.paper' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <FitnessCenterIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                THE ROX LEAGUE
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            {isMobile ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <>
                <Box sx={{ display: 'flex', mx: 2 }}>
                  {navItems.map((item) => (
                    <Button
                      key={item}
                      component={RouterLink}
                      to={getRouteForNavItem(item)}
                      sx={{ color: 'text.primary', mx: 1 }}
                    >
                      {item}
                    </Button>
                  ))}
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ mr: 1, borderRadius: 30 }}
                    onClick={handleLoginClick}
                  >
                    Login
                  </Button>
                  <Button variant="contained" color="primary" sx={{ borderRadius: 30 }} onClick={handleSignClick}>
                    Sign Up
                  </Button>
                </Box>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Toolbar /> {/* spacing for fixed AppBar */}
    </>
  );
};

export default Header;

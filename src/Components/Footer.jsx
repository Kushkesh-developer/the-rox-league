import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Link, 
  Divider,
  Button,
  TextField,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textDecoration: 'none',
  '&:hover': {
    color: theme.palette.primary.main,
    textDecoration: 'none',
  },
  display: 'block',
  marginBottom: theme.spacing(1),
}));

const SocialIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginRight: theme.spacing(1),
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'background.paper', pt: 8, pb: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
        <Grid size={{xs:12,md:4}}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <FitnessCenterIcon sx={{ mr: 1, color: 'primary.main', fontSize: 32 }} />
              <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                THE ROX LEAGUE
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              The Rox League is a premier fitness platform that connects fitness enthusiasts from around the world, helping them find workout partners, compete in challenges, and improve their fitness journey.
            </Typography>
            <Box sx={{ mb: 3 }}>
              <SocialIconButton aria-label="facebook">
                <FacebookIcon />
              </SocialIconButton>
              <SocialIconButton aria-label="twitter">
                <TwitterIcon />
              </SocialIconButton>
              <SocialIconButton aria-label="instagram">
                <InstagramIcon />
              </SocialIconButton>
              <SocialIconButton aria-label="youtube">
                <YouTubeIcon />
              </SocialIconButton>
            </Box>
          </Grid>
          
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Company
            </Typography>
            <FooterLink href="/about">About Us</FooterLink>
            <FooterLink href="/careers">Careers</FooterLink>
            <FooterLink href="/blog">Blog</FooterLink>
            <FooterLink href="/press">Press</FooterLink>
          </Grid>
          
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Resources
            </Typography>
            <FooterLink href="/help">Help Center</FooterLink>
            <FooterLink href="/faq">FAQs</FooterLink>
            <FooterLink href="/community-guidelines">Community Guidelines</FooterLink>
            <FooterLink href="/videos">Tutorial Videos</FooterLink>
          </Grid>
          
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Legal
            </Typography>
            <FooterLink href="/terms">Terms of Use</FooterLink>
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/cookies">Cookie Policy</FooterLink>
            <FooterLink href="/licenses">Licenses</FooterLink>
          </Grid>
          
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Subscribe
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Get fitness tips and exclusive offers delivered to your inbox.
            </Typography>
            <Box sx={{ display: 'flex' }}>
              <TextField
                placeholder="Your email"
                size="small"
                sx={{ flexGrow: 1 }}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ ml: 1, minWidth: 'auto' }}
              >
                <ArrowForwardIcon />
              </Button>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4 }} />
        
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'center', sm: 'flex-start' } }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} The Rox League. All rights reserved.
          </Typography>
          <Box sx={{ mt: { xs: 2, sm: 0 } }}>
            <FooterLink href="/terms" variant="body2" sx={{ display: 'inline', mr: 2 }}>
              Terms
            </FooterLink>
            <FooterLink href="/privacy" variant="body2" sx={{ display: 'inline', mr: 2 }}>
              Privacy
            </FooterLink>
            <FooterLink href="/cookies" variant="body2" sx={{ display: 'inline' }}>
              Cookies
            </FooterLink>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
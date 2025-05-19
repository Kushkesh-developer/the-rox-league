import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import Footer from './Footer';
import SponsorsGrid from './sponsors/SponsorGrid';
import SponsorFilters from './sponsors/SponsorFilter';
import { mockSponsors, getIndustryTypes, filterSponsors, sortSponsors } from './sponsors/mockData';
import theme from '../theme/theme';

const Sponsors = () => {
  const [filteredSponsors, setFilteredSponsors] = useState(mockSponsors);
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [sortOption, setSortOption] = useState('popular');
  const industries = getIndustryTypes();

  useEffect(() => {
    // Apply filters and sorting
    let filtered = filterSponsors(mockSponsors, searchTerm, industryFilter);
    filtered = sortSponsors(filtered, sortOption);
    setFilteredSponsors(filtered);
  }, [searchTerm, industryFilter, sortOption]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Box component="main" sx={{ flexGrow: 1, py: 4, mt: 8 }}>
          <Container maxWidth="xl">
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" component="h1" sx={{ mb: 1, fontWeight: 'bold' }}>
                Sponsors & Brand Partners
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Discover the companies that support ROX League and exclusive offers for our members
              </Typography>
            </Box>

            <Paper elevation={0} sx={{ p: 3, mb: 4 }}>
              <SponsorFilters 
                onSearchChange={setSearchTerm}
                onIndustryFilterChange={setIndustryFilter}
                onSortChange={setSortOption}
                industries={industries}
              />
            </Paper>

            <SponsorsGrid sponsors={filteredSponsors} />
          </Container>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default Sponsors;
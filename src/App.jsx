import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { Component } from "react";
import { Box, Typography, Button, Container, Paper } from "@mui/material";

import ProtectedRoute from "./Components/ProtectedRoute";
import LandingPage from "./Components/LandingPage";
import Coaches from "./Components/Coaches";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Feed from "./Components/Feed";
import CoachDetails from "./Components/CoachDetails";
import MyBookings from "./Components/MyBookings";
import Sponsors from "./Components/Sponsors";
import SponsorDetails from "./Components/SponsorDetails";
import Subscription from "./Components/Subscription";
import ProfileSetup from "./Components/ProfileSetup";
import RoxExchange from './Components/RoxExchange';
import SellTickets from './Components/SellTickets';
import RoxPartner from './Components/RoxPartner';
import CommunityForum from "./Components/CommunityForum";
import Challenges from "./Components/Challenges";
import ExperienceWall from "./Components/ExperienceWall";
import UserProfile from "./Components/UserProfile";
import ProfileManagement from "./Components/ProfileManagement";

const queryClient = new QueryClient();

// Error Boundary with Material UI
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="sm">
          <Paper elevation={3} sx={{ padding: 4, mt: 6, textAlign: "center", bgcolor: "error.light" }}>
            <Typography variant="h5" color="error.dark" gutterBottom>
              Something went wrong
            </Typography>
            <Typography variant="body1" color="error.main" gutterBottom>
              We apologize for the inconvenience. Please try again later or contact support.
            </Typography>
            <Button 
              variant="contained" 
              color="error" 
              onClick={() => this.setState({ hasError: false })}
              sx={{ mt: 2 }}
            >
              Try Again
            </Button>
          </Paper>
        </Container>
      );
    }

    return this.props.children;
  }
}

// ErrorBoundary Wrappers
const RoxExchangeWithErrorBoundary = () => (
  <ErrorBoundary>
    <RoxExchange />
  </ErrorBoundary>
);

const SellTicketsWithErrorBoundary = () => (
  <ErrorBoundary>
    <SellTickets />
  </ErrorBoundary>
);

// Routes setup
const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/coaches" element={<Coaches />} />
      <Route path="/coaches/:id" element={<CoachDetails />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/sponsors" element={<Sponsors />} />
      <Route path="/sponsors/:id" element={<SponsorDetails />} />
      <Route path="/roxpartner" element={<RoxPartner />} />
      <Route path="/community" element={<CommunityForum />} />
      <Route path="/challenges" element={<Challenges />} />
      <Route path="/experience-wall" element={<ExperienceWall />} />
      <Route path="/user/:id" element={<UserProfile />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} redirectPath="/login" />}>
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/roxexchange" element={<RoxExchangeWithErrorBoundary />} />
        <Route path="/roxexchange/sell" element={<SellTicketsWithErrorBoundary />} />
        <Route path="/profile-management" element={<ProfileManagement />} />
        {/* Add more protected routes here */}
      </Route>

      {/* Fallback Route */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <AppRoutes />
        </ErrorBoundary>
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

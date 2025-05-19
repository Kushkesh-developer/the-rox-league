import React, { useState, useEffect } from 'react';
import {
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Avatar,
  InputAdornment
} from '@mui/material';
import { Image } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../hooks/use-toast';

// Mock user data
const mockUserData = {
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  phone: '+1 (555) 123-4567',
  profileImage: 'https://placehold.co/400?text=AJ'
};

const PersonalDetailsForm = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profileImage, setProfileImage] = useState();
  const [isEmailChanged, setIsEmailChanged] = useState(false);
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);

  useEffect(() => {
    if (user) {
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const currentUser = storedUsers.find((u) => u.id === user.id);
      
      if (currentUser) {
        setFullName(currentUser.name || '');
        setEmail(currentUser.email || '');
        setPhone(currentUser.phone || '');
        setProfileImage(currentUser.profileImage);
      } else {
        setFullName(mockUserData.name);
        setEmail(mockUserData.email);
        setPhone(mockUserData.phone);
        setProfileImage(mockUserData.profileImage);
      }
    } else {
      setFullName(mockUserData.name);
      setEmail(mockUserData.email);
      setPhone(mockUserData.phone);
      setProfileImage(mockUserData.profileImage);
    }
  }, [user]);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsEmailChanged(newEmail !== user?.email);
    setEmailVerificationSent(false);
  };

  const handleSendVerification = () => {
    setEmailVerificationSent(true);
    toast({
      title: "Verification email sent",
      description: "Please check your inbox to verify your email address",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user) {
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = storedUsers.findIndex((u) => u.id === user.id);

      if (userIndex !== -1) {
        storedUsers[userIndex] = {
          ...storedUsers[userIndex],
          name: fullName,
          email: isEmailChanged && emailVerificationSent ? email : storedUsers[userIndex].email,
          phone: phone,
          profileImage: profileImage
        };
        localStorage.setItem('users', JSON.stringify(storedUsers));
      } else {
        const newUser = {
          id: user.id,
          name: fullName,
          email: email,
          phone: phone,
          profileImage: profileImage,
          isBlocked: false,
          isPremium: false,
          joinedDate: new Date().toISOString()
        };
        storedUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(storedUsers));
      }

      toast({
        title: "Profile updated",
        description: "Your personal details have been updated successfully",
      });
    } else {
      toast({
        title: "Demo mode",
        description: "Profile would be updated in a real application",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>Personal Details</Typography>

      <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar
          src={profileImage}
          sx={{ width: 100, height: 100, mb: 2 }}
        />
        <input
          accept="image/*"
          id="profile-image-input"
          type="file"
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
        <label htmlFor="profile-image-input">
          <Button
            variant="outlined"
            component="span"
            startIcon={<Image />}
          >
            Change Profile Image
          </Button>
        </label>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
            InputProps={{
              endAdornment: isEmailChanged && (
                <InputAdornment position="end">
                  <Button
                    variant="text"
                    color="primary"
                    onClick={handleSendVerification}
                    disabled={emailVerificationSent}
                  >
                    {emailVerificationSent ? "Verification Sent" : "Verify"}
                  </Button>
                </InputAdornment>
              )
            }}
          />
          {isEmailChanged && !emailVerificationSent && (
            <Typography variant="caption" color="error">
              You must verify your new email address before it can be updated.
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Phone Number"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Save Changes
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default PersonalDetailsForm;

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, TextField, Button, Alert, Box } from '@mui/material';
import { useToast } from "../hooks/use-toast";

const ForgotPasswordModal = ({ open, onClose }) => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleSendCode = () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    localStorage.setItem(`reset_code_${email}`, code);

    console.log('Reset code:', code); // Simulate email

    toast({
      title: "Verification Code Sent",
      description: "Please check your email for the verification code.",
    });

    setStep(2);
    setError('');
  };

  const handleVerifyCode = () => {
    const storedCode = localStorage.getItem(`reset_code_${email}`);

    if (verificationCode !== storedCode) {
      setError('Invalid verification code');
      return;
    }

    setStep(3);
    setError('');
  };

  const handleResetPassword = () => {
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    toast({
      title: "Password Reset Successful",
      description: "You can now login with your new password.",
    });

    localStorage.removeItem(`reset_code_${email}`);
    onClose();
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogContent>
              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
              <TextField
                fullWidth
                label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mt: 2 }}
              />
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSendCode}>Send Code</Button>
              </Box>
            </DialogContent>
          </>
        );
      case 2:
        return (
          <>
            <DialogTitle>Enter Verification Code</DialogTitle>
            <DialogContent>
              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
              <TextField
                fullWidth
                label="Verification Code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                sx={{ mt: 2 }}
              />
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button onClick={() => setStep(1)}>Back</Button>
                <Button variant="contained" onClick={handleVerifyCode}>Verify Code</Button>
              </Box>
            </DialogContent>
          </>
        );
      case 3:
        return (
          <>
            <DialogTitle>Set New Password</DialogTitle>
            <DialogContent>
              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
              <TextField
                fullWidth
                type="password"
                label="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                sx={{ mt: 2 }}
              />
              <TextField
                fullWidth
                type="password"
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                sx={{ mt: 2 }}
              />
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button onClick={() => setStep(2)}>Back</Button>
                <Button variant="contained" onClick={handleResetPassword}>Reset Password</Button>
              </Box>
            </DialogContent>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      {renderStep()}
    </Dialog>
  );
};

export default ForgotPasswordModal;

import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Card } from '@mui/material';
import GoBackButton from '../../components/common/GoBackButton';
import reset from '../../assets/icon/reset.png';
import { useParams, useNavigate } from 'react-router-dom';
import { useResetPasswordMutation } from '../../services/authApi';

function PasswordResetPage() {
  const { token } = useParams(); // Get reset token from the URL
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const [resetPassword, { isLoading, isSuccess, error }] =
    useResetPasswordMutation();

  const handlePasswordReset = async () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      await resetPassword({ token, newPassword }).unwrap();
      console.log('Password reset successful');
      navigate('/auth/login');
    } catch (err) {
      console.error('Password reset failed', err);
    }
  };

  return (
    <Box sx={screen}>
      <Card sx={content}>
        {/* Back button and img */}
        <Box>
          <GoBackButton />
          <Box sx={img}>
            <img src={reset} style={{ width: '100%' }} alt="Reset Password" />
          </Box>
        </Box>

        {/* Reset Password Title */}
        <Box sx={resetTitle}>
          <Typography
            sx={{ fontSize: { xs: '24px', md: '36px' }, fontWeight: 'bold' }}
          >
            Reset Your Password
          </Typography>
          <Typography sx={{ fontSize: { xs: '14px', md: '16px' } }}>
            Set a new password here!
          </Typography>
        </Box>

        {/* Text input */}
        <Box sx={textInputContainer}>
          <Box sx={textfield}>
            <Typography>New Password</Typography>
            <TextField
              id="newPassword"
              placeholder="new password"
              variant="outlined"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              error={!!error}
              helperText={error ? 'Failed to reset password, try again' : ''}
            />
          </Box>

          <Box sx={textfield}>
            <Typography>Confirm Password</Typography>
            <TextField
              id="confirmPassword"
              placeholder="confirm password"
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Box>
        </Box>

        <Button
          variant="contained"
          onClick={handlePasswordReset}
          disabled={isLoading}
          sx={{ width: '100%', height: { sx: '42px', md: '56px' } }}
        >
          {isLoading ? 'Resetting...' : 'Reset Password'}
        </Button>

        {isSuccess && (
          <Typography sx={{ color: 'green', marginTop: '16px' }}>
            Password reset successfully. Redirecting to login...
          </Typography>
        )}
        {error && (
          <Typography sx={{ color: 'red', marginTop: '16px' }}>
            Failed to reset password: {error?.data?.message || 'Error occurred'}
          </Typography>
        )}
      </Card>
    </Box>
  );
}

export default PasswordResetPage;

const screen = {
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  mx: 'auto',
  bgcolor: '#F9FAFB',
};

const content = {
  bgcolor: '#FFFFFF',
  maxWidth: '550px',
  width: '100%',
  maxHeight: '602px',
  mx: 'auto',
  my: 'auto',
  borderRadius: '16px',
  py: '32px',
  px: {
    xs: '24px',
    md: '32px',
  },
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
};

const textInputContainer = {
  display: 'flex',
  flexDirection: 'column',
  gap: {
    xs: '24px',
    md: '32px',
  },
  width: '100%',
};

const textfield = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  width: '100%',
};

const img = {
  mx: 'auto',
  width: {
    xs: '90px',
    md: '100px',
  },
};

const resetTitle = {
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
};

import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Card } from '@mui/material';
import { Link } from 'react-router-dom';
import GoBackButton from '../../components/common/GoBackButton';
import forgetIcon from '../../assets/icon/forget.png';
import { useForgotPasswordMutation } from '../../services/authApi';
function PasswordForgotPage() {
  const [email, setEmail] = useState('');
  const [forgotPassword, { isLoading, error, isSuccess }] =
    useForgotPasswordMutation();

  const handleForgotPassword = async () => {
    if (!email) {
      alert('Please enter an email');
      return;
    }

    try {
      await forgotPassword({ email }).unwrap();
      console.log('Password reset email sent');
    } catch (err) {
      console.error('Forgot password failed', err);
    }
  };

  return (
    <Box sx={screen}>
      <Card sx={content}>
        <Box>
          <GoBackButton />
          <Box sx={img}>
            <img
              src={forgetIcon}
              style={{ width: '100%' }}
              alt="Forgot password"
            />
          </Box>
        </Box>

        <Box sx={resetTitle}>
          <Typography
            sx={{ fontSize: { xs: '24px', md: '36px' }, fontWeight: 'bold' }}
          >
            Forgot Password?
          </Typography>
          <Typography sx={{ fontSize: { xs: '14px', md: '16px' } }}>
            We will send you an email to reset your password
          </Typography>
        </Box>

        <Box sx={textInputContainer}>
          <Box sx={textfield}>
            <Typography>Email</Typography>
            <TextField
              id="email"
              placeholder="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!error}
              helperText={error ? 'Failed to send email, try again' : ''}
            />
          </Box>
        </Box>

        <Box display={'flex'} flexDirection={'column'} gap={'8px'}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleForgotPassword}
            disabled={isLoading}
            sx={{ padding: { xs: 1.5, md: 2 } }}
          >
            {isLoading ? 'Sending...' : 'Continue'}
          </Button>
          {isSuccess && (
            <Typography sx={{ color: 'green' }}>
              Check your email for password reset instructions.
            </Typography>
          )}
          {error && (
            <Typography sx={{ color: 'red' }}>
              Failed to send reset email: {error.message}
            </Typography>
          )}
          <Box
            sx={{
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="body1">
              Don't have an account?
              <Link to="/auth/signup">
                <Typography variant="body1" component="span" color="primary">
                  {' '}
                  Sign Up
                </Typography>
              </Link>
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

export default PasswordForgotPage;

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
  px: { xs: '24px', md: '32px' },
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
};

const textInputContainer = {
  display: 'flex',
  flexDirection: 'column',
  gap: { xs: '24px', md: '32px' },
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
  width: { xs: '90px', md: '100px' },
};

const resetTitle = {
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
};

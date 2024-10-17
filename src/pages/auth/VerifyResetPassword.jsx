// React and third-party libraries
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Material UI components
import { Box, Typography, Button, Card } from '@mui/material';

// Icons
import email from '../../assets/icon/email.png';
import StyledButton from '../../components/common/StyledMuiButton';

function VerifyResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();

  const handleNavigateToResetPassword = () => {
    if (token) {
      navigate(`/auth/reset-password/${token}`);
    } else {
      console.error('Token is missing');
    }
  };

  return (
    <Box sx={screen}>
      <Card sx={content}>
        <Box sx={head}>
          <Box sx={img}>
            <img src={email} style={{ width: '100%' }} alt="Email Icon" />
          </Box>
          <Box sx={resetTitle}>
            <Typography
              sx={{
                transitionDuration: '0.5s',
                fontSize: { xs: '24px', md: '36px' },
                fontWeight: 'bold',
              }}
            >
              Verify Your Account
            </Typography>
            <Typography sx={{ fontSize: { xs: '14px', md: '16px' } }}>
              We've sent your verify token
            </Typography>
            <Typography sx={{ fontSize: { xs: '14px', md: '16px' } }}>
              Confirm that it is You!
            </Typography>
          </Box>
        </Box>

        <StyledButton
          fullWidth
          variant="contained"
          size="small"
          sx={{ padding: { xs: 1, md: 2 } }}
          onClick={handleNavigateToResetPassword}
        >
          Go Reset Password
        </StyledButton>
      </Card>
    </Box>
  );
}

export default VerifyResetPassword;

const screen = {
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  bgcolor: '#F9FAFB',
};

const content = {
  bgcolor: '#FFFFFF',
  maxWidth: '550px',
  width: '100%',
  maxHeight: '384px',
  borderRadius: '16px',
  py: '32px',
  px: {
    xs: '24px',
    md: '32px',
  },
  display: 'flex',
  flexDirection: 'column',
  gap: {
    xs: '24px',
    md: '32px',
  },
};

const head = {
  display: 'flex',
  flexDirection: 'column',
  gap: {
    xs: '12px',
    md: '24px',
  },
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

import React, { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import { useVerifyTeacherEmailMutation } from '../../services/authApi';

// Material UI components
import { Box, Typography, Button, Card } from '@mui/material';

import verify from '../../assets/icon/verify.png';

function VerifyTeacherEmailPage() {
  const { verificationToken } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Extract 'tempToken' from the query string
  const queryParams = new URLSearchParams(location.search);
  const tempToken = queryParams.get('token');

  // Mutation hook for verifying email
  const [verifyEmail, { isLoading, isSuccess, isError }] =
    useVerifyTeacherEmailMutation();

  // Perform email verification on component mount
  useEffect(() => {
    console.log('verificationToken:', verificationToken);
    console.log('tempToken:', tempToken);

    if (verificationToken && tempToken) {
      verifyEmail({ verificationToken, tempToken })
        .unwrap()
        .then((result) => {
          console.log('Verification successful:', result);
        })
        .catch((error) => {
          console.error('Verification failed:', error.data?.message || error);
        });
    }
  }, [verificationToken, tempToken, verifyEmail]);

  // Redirect to login after successful verification
  const handleLoginRedirect = () => {
    navigate('/auth/signin');
  };

  return (
    <Box sx={screen}>
      <Card sx={content}>
        <Box sx={head}>
          <Box sx={img}>
            <img src={verify} style={{ width: '100%' }} alt="Verification" />
          </Box>

          {isLoading ? (
            <Typography
              sx={{
                fontSize: { xs: '24px', md: '36px' },
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              Verifying...
            </Typography>
          ) : isSuccess ? (
            <Typography
              sx={{
                fontSize: { xs: '24px', md: '36px' },
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              Verified Successfully
            </Typography>
          ) : isError ? (
            <Typography
              sx={{
                fontSize: { xs: '24px', md: '36px' },
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'red',
              }}
            >
              Verification Failed
            </Typography>
          ) : null}
        </Box>

        {isSuccess && (
          <Button
            fullWidth
            variant="contained"
            sx={{ padding: { xs: 1, md: 2 } }}
            onClick={handleLoginRedirect}
          >
            GO TO LOGIN
          </Button>
        )}
      </Card>
    </Box>
  );
}

export default VerifyTeacherEmailPage;

// Styles
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
    xs: '0px',
    md: '12px',
  },
};

const img = {
  mx: 'auto',
  width: {
    xs: '140px',
    md: '160px',
  },
};

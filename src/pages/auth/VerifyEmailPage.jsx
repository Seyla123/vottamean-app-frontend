import React, { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import ShortHeader from '../../components/layout/ShortHeader';
import { useVerifyEmailMutation } from '../../services/authApi';
import { Box, Typography, Button, Card, CircularProgress } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import verifiedImage from '../../assets/images/authenticated-img.png';
import failAuthenticatedImage from '../../assets/images/fail-authenticated-img.png';

function VerifyEmailPage() {
  const { verificationToken } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Extract 'tempToken' from the query string
  const queryParams = new URLSearchParams(location.search);
  const tempToken = queryParams.get('token');

  // Mutation hook for verifying email
  const [verifyEmail, { isLoading, isSuccess, isError }] =
    useVerifyEmailMutation();

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
    <>
      <ShortHeader />
      <Box sx={screen}>
        <Card sx={content}>
          {isLoading ? (
            <LoadingState />
          ) : isSuccess ? (
            <SuccessState handleLoginRedirect={handleLoginRedirect} />
          ) : isError ? (
            <ErrorState />
          ) : null}
        </Card>
      </Box>
    </>
  );
}

const LoadingState = () => (
  <Box sx={centerContent}>
    <CircularProgress size={60} />
    <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold' }} color="success">
      Verifying your email...
    </Typography>
  </Box>
);

const SuccessState = ({ handleLoginRedirect }) => (
  <Box sx={centerContent}>
    <img src={verifiedImage} alt="Verified" style={{ width: '250px' }} />
    <Typography variant="h4" sx={{ mt: 2, fontWeight: 'bold' }}>
      Email Verified!
    </Typography>
    <Typography variant="body1" sx={{ mt: 1, mb: 3, textAlign: 'center' }}>
      Your email has been successfully verified. You can now log in to your
      account.
    </Typography>
    <Button
      variant="contained"
      color="primary"
      size="large"
      onClick={handleLoginRedirect}
    >
      Go to Login
    </Button>
  </Box>
);

const ErrorState = () => (
  <Box sx={centerContent}>
    <img
      src={failAuthenticatedImage}
      alt="Verified"
      style={{ width: '250px' }}
    />
    <Typography variant="h4" sx={{ mt: 2, fontWeight: 'bold' }}>
      Verification Failed
    </Typography>
    <Typography variant="body1" sx={{ mt: 1, mb: 3, textAlign: 'center' }}>
      We couldn't verify your email. The link may have expired or is invalid.
    </Typography>
    <Button variant="outlined" color="primary" size="large" href="/auth/signin">
      Try again
    </Button>
  </Box>
);

// Styles
const screen = {
  width: '100%',
  height: '80vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  bgcolor: '#F9FAFB',
};

const content = {
  bgcolor: '#FFFFFF',
  maxWidth: '600px',
  width: '100%',
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

const centerContent = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  height: '100%',
  padding: 3,
};

export default VerifyEmailPage;

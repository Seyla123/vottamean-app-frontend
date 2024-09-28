// React and third-party libraries
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Material UI components
import { Box, Typography, Button } from '@mui/material';

// Image & Icons
import resetPassIcon from '../../assets/icon/reset-password-icon.svg';

const VerifySuccessfullyPage = () => {
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
    <Box component={'section'} style={styles.container}>
      <Box component={'div'} style={styles.cardContainer}>
        <img src={resetPassIcon} alt="" style={styles.icon} />
        <Typography variant="h4" fontWeight={'bold'}>
          Verification Successful!
        </Typography>
        <Typography variant="body1" mt={1}>
          Click the button below to proceed and set a new password for your
          account.
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={handleNavigateToResetPassword}
          sx={{ mt: 4 }}
        >
          Go to Reset Password
        </Button>
      </Box>
    </Box>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: 2,
    maxWidth: '400px',
    width: '100%',
  },
  icon: {
    width: '80%',
    objectFit: 'contain',
  },
};

export default VerifySuccessfullyPage;

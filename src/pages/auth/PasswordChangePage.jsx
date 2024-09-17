// React and third-party libraries
import React from 'react';

// Material UI components
import { Box, Typography, TextField, Button, Card } from '@mui/material';

// Icons
import GoBackButton from '../../components/common/GoBackButton';
import change from '../../assets/icon/change.png';

function PasswordChangePage() {
  return (
    <Box sx={screen}>
      <Card sx={content}>
        {/* back button and img  */}
        <Box>
          <GoBackButton />
          <Box sx={img}>
            <img src={change} style={{ width: '100%' }}></img>
          </Box>
        </Box>
        {/* Reset Password Title  */}
        <Box sx={resetTitle}>
          <Typography
            sx={{ fontSize: { xs: '24px', md: '36px' }, fontWeight: 'bold' }}
          >
            Change Password
          </Typography>
          <Typography sx={{ fontSize: { xs: '14px', md: '16px' } }}>
            Set a new password here!
          </Typography>
        </Box>
        {/* Text input */}
        <Box sx={textInputContainer}>
          <Box sx={textfield}>
            <Typography>Current Password</Typography>
            <TextField
              id="currentPassword"
              placeholder="current password"
              variant="outlined"
              sx={{ width: '100%' }}
            />
          </Box>

          <Box sx={textfield}>
            <Typography>New Password</Typography>
            <TextField
              id="newPassword"
              placeholder="new password"
              variant="outlined"
              sx={{ width: '100%' }}
            />
          </Box>

          <Box sx={textfield}>
            <Typography>Confirm Password</Typography>
            <TextField
              id="confirmPassword"
              placeholder="confirm password"
              variant="outlined"
              sx={{ width: '100%' }}
            />
          </Box>
        </Box>

        <Button
          variant="contained"
          sx={{ width: '100%', height: { sx: '42px', md: '56px' } }}
        >
          Save changes
        </Button>
      </Card>
    </Box>
  );
}

export default PasswordChangePage;

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
  maxHeight: '716px',
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

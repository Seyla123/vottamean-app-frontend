import React from 'react';
import { Box, Typography, TextField, Button, Link, Card } from '@mui/material';
import email from '../../assets/icon/email.png';

function AccountVerifyPage() {
  return (
    <Box sx={screen}>
      <Card sx={content}>
        {/* Image and tittle   */}
        <Box sx={head}>
          <Box sx={img}>
            <img src={email} style={{ width: '100%' }}></img>
          </Box>

          {/* Verify Account Title  */}
          <Box sx={resetTitle}>
            <Typography
              sx={{
                transitionDuration: '0.5s',
                fontSize: { xs: '24px', md: '36px' },
                fontWeight: 'bold',
              }}
            >
              Verify Your Accound
            </Typography>
            <Typography sx={{ fontSize: { xs: '14px', md: '16px' } }}>
              We've sent your verify token
            </Typography>
            <Typography sx={{ fontSize: { xs: '14px', md: '16px' } }}>
              Confirm that it is You !
            </Typography>
          </Box>
        </Box>

        <Button
          fullWidth
          variant="contained"
          sx={{ padding: { xs: 1, md: 2 } }}
        >
          RESENT TOKEN
        </Button>
      </Card>
    </Box>
  );
}

export default AccountVerifyPage;

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

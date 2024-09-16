import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import notFoundImg from '../assets/images/404.png';

function NotFoundPage() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
      textAlign="center"
      sx={{ padding: 2 }}
    >
      {/* Image Section */}
      <Box
        component="img"
        src={notFoundImg}
        alt="Not Found"
        sx={{ width: '300px', height: 'auto', marginBottom: '20px' }}
      />
      <Typography variant="h5" component="h2" gutterBottom>
        Oops! Page not found.
      </Typography>
      <Typography variant="body1" gutterBottom>
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </Typography>
      <Button
        component={Link}
        to="admin/dashboard"
        variant="contained"
        color="primary"
        sx={{ mt: 4 }}
      >
        Go back to Home
      </Button>
    </Box>
  );
}

export default NotFoundPage;

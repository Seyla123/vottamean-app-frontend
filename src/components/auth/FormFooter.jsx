import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';

const FormFooter = ({ href }) => {
  // Determine the text based on the href prop
  const isSignInPage = href === '/auth/signup';
  const message = isSignInPage
    ? 'Don’t have an account?'
    : 'Already have an account?';
  const linkText = isSignInPage ? 'Sign Up' : 'Sign In';

  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        component="span"
        sx={{ display: 'flex', gap: 1, alignItems: 'center' }}
      >
        <Typography variant="body2">{message}</Typography>
        <Link to={href} aria-label={linkText}>
          <Typography variant="body2" color="primary">
            {linkText}
          </Typography>
        </Link>
      </Box>
    </Box>
  );
};

export default FormFooter;

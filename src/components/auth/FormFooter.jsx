import { Box, Typography } from '@mui/material';
import { Link, Route, useNavigate } from 'react-router-dom';
import React from 'react';
import { useParams } from 'react-router-dom';

const FormFooter = ({ href }) => {
  return (
    <Box
      component={'div'}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        component={'span'}
        sx={{ display: 'flex', gap: 1, alignItems: 'center' }}
      >
        <Typography variant="body2">
          {href === '/auth/signin'
            ? 'Already have an account?'
            : 'Don’t have an account?'}
        </Typography>
        <Link to={href}>
          <Typography variant="body2" color="primary">
            {' '}
            {href === '/auth/signin' ? 'Sign In' : 'Sign Up'}
          </Typography>
        </Link>
      </Box>
    </Box>
  );
};

export default FormFooter;

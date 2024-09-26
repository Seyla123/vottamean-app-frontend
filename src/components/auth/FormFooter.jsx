import { Link, Typography } from '@mui/material';
import React from 'react';

const FormFooter = ({href}) => {
  return (
    <Typography variant="body2" component={'span'}>
      Already have an account?{' '}
      <Link
        href={href}
        sx={{ display: 'inline-block' }}
        underline="hover"
      >
        <Typography variant="body2" color="primary">
          Login
        </Typography>
      </Link>
    </Typography>
  );
};

export default FormFooter;

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const CheckYourEmailPage = () => {
  return (
    <Box component={'section'}>
      <Typography variant="h3">{title}</Typography>
      <Typography variant="subtitle1">{description}</Typography>
    </Box>
  );
};

export default CheckYourEmailPage;

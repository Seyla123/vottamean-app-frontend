// PasswordIndicator.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import { CheckCircle, XCircle } from 'lucide-react';

const PasswordIndicator = ({ isValid, message }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {isValid ? (
        <CheckCircle size={16} color="green" />
      ) : (
        <XCircle size={16} color="red" />
      )}
      <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
        {message}
      </Typography>
    </Box>
  );
};

export default PasswordIndicator;

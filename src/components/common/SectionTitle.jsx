import { Box, Typography } from '@mui/material';
import React from 'react';

const SectionTitle = ({ title, subtitle }) => {
  return (
    <Box sx={{ py: 3 }}>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        {subtitle}
      </Typography>
    </Box>
  );
};

export default SectionTitle;

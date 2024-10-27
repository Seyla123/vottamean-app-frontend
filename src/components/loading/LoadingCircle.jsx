import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function LoadingCircle({customStyle}) {
  return (
    <Box sx={{ display: 'flex',width: '100%', height: '70vh', justifyContent: 'center', alignItems: 'center', ...customStyle }}>
      <CircularProgress />
    </Box>
  );
}
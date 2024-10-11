import { Box, Divider, Typography } from '@mui/material';
import React from 'react';

const SubHeader = ({ title }) => {
  return (
    <Box sx={subHeader}>
      <Typography variant='formTitle' fontWeight={'bold'} gutterBottom>
        {title}
      </Typography>
      <Divider sx={{ borderWidth: 0.3, borderColor: "#d1d1d1" }} />
    </Box>
  );
};

export default SubHeader;
const subHeader = {
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'start',
  width: '100%',
};

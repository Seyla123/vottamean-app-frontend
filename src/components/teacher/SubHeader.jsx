import { Box, Divider, Typography } from '@mui/material';
import React from 'react';

const SubHeader = ({ title }) => {
  return (
    <Box sx={subHeader}>
      <Typography variant='formTitle' fontWeight={'bold'} gutterBottom>
        {title}
      </Typography>
      <Divider sx={{ borderWidth: 1, borderColor: "text.secondary" }} />
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

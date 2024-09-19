import { Box, Divider, Typography } from '@mui/material';
import React from 'react';

const SubHeader = ({ title }) => {
  return (
    <Box sx={subHeader}>
      <Typography fontSize={16} fontWeight={'bold'} marginBottom={2}>
        {title}
      </Typography>
      <Divider
        color="#797979"
        sx={{ width: '100%', borderBottomWidth: 1, color: 'black' }}
      />
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

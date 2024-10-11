import React from 'react';
import { Box, Grid, Avatar, Typography } from '@mui/material';
import theme from '../../styles/theme';
import { shadow } from '../../styles/global';
import { statusDetails } from '../../data/status';

const StatusGrid = ({ statusCounts }) => {

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container sx={gridContainerStyles}>
        {statusDetails.map(({ icon: Icon, label, color }, index) => (
          <Grid key={index} item xs={6} sm={3} sx={gridIconStyles}>
            <Avatar sx={{ bgcolor: color, width: 40, height: 40, mb: 1 }}>
              <Icon color="white" size={20} />
            </Avatar>
            <Typography variant="body2" sx={{ color: theme.palette.secondary.main }}>
              {label}
            </Typography>
            <Typography variant="h5">
              {statusCounts[label]?.toString().padStart(2, '0') || '00'}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StatusGrid;
const gridContainerStyles = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    p: 1,
    width: '100%',
  };

  const gridIconStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%',
    p: 1,
    overflow: 'hidden',
  };
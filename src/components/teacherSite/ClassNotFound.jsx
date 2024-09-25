import { Typography, Box } from '@mui/material';
import React from 'react'
import teacher from '../../assets/icon/teacher.png';
function ClassNotFound() {
  return (
    <Box sx={noClassContainerStyle}>
        <img src={teacher} alt="No classes" style={noClassImageStyle} />
        <Typography variant="h4" sx={noClassTextStyle}>
        No Classes Scheduled
        </Typography>
        <Typography variant="body1" sx={noClassBodyTextStyle}>
        You currently have no scheduled classes. Please check back later or reach out for assistance.
        </Typography>
      </Box>
  )
}

export default ClassNotFound

const noClassContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '70vh',
    gap: 2,
  };

  const noClassImageStyle = {
    width: '150px',
    height: '150px',
  };

  const noClassTextStyle = {
    mt: 2,
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
  };

  const noClassBodyTextStyle = {
    mt: 1,
    mb: 3,
    textAlign: 'center',
    fontSize: '18px',
  };

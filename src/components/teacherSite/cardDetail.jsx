import React from 'react';
import { CardContent, Avatar, Box, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { cardContainer } from '../../styles/global';

const CardDetail = ({ className, day, subject, students, time, classIcon, randomColor }) => {

  
  return (
    <CardContent sx={cardStyle}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* class icon */}
          <Avatar src={classIcon} alt='class list picture' sx={{ width: '40px', height: '40px' }} />
          {/* class */}
          <Typography sx={classSize} fontWeight="medium">
            {className}
          </Typography>
        </Box>
        {/* day */}
        <Typography sx={daySize}>
          {day}
        </Typography>
      </Box>
      {/* subject */}
      <Typography sx={subjectSize}>
        {subject}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* total students */}
        <Typography sx={timeSize}>
          {students} <span style={{ color: theme.palette.secondary.main }}>Students</span>
        </Typography>
        {/* time */}
        <Box sx={boxStyle}>
          <AccessTimeIcon sx={{ padding: '2px', borderRadius: '50%' }} />
          <Typography sx={timeSize}>
            {time}
          </Typography>
        </Box>
      </Box>
    </CardContent>
  );
};

export default CardDetail;

const boxStyle = { 
  backgroundColor: '#387F39', 
  color: 'white',
  padding: '3px 8px', 
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px' }

  // styles for mobile
  const subjectSize = {
    fontSize: { xs: "24px", sm: "32px" },
    fontWeight: "medium",
    letterSpacing: 0.5,
  };

  const daySize = {
    fontSize: { xs: "16px", sm: "18px" },
    fontWeight: "medium"
  };

  const timeSize = {
    fontSize: { xs: "14px", sm: "16px" },
    fontWeight: "medium"
  };

  const classSize = {
    fontSize: { xs: "18px", sm: "20px" },
    fontWeight: "medium"
  };

  const cardStyle = {
    ...cardContainer,
    bgcolor: randomColor,
    borderRadius: '16px',
    height: { xs: '200px', sm: '250px' }, 
    display: 'flex', flexDirection: 'column',
    justifyContent: 'space-between'
  }

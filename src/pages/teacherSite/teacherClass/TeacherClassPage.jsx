import React from 'react';
import FormComponent from '../../../components/common/FormComponent';
import { Card, Typography, CardContent, Avatar, Box } from '@mui/material';
import classIcon from '../../../assets/icon/class.png';
import { cardContainer } from '../../../styles/global';
import { useTheme } from '@emotion/react';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
function TeacherClassPage() {
  const theme = useTheme();
  const mobile = theme.breakpoints;

  const subjectSize = {
    [mobile.down("sm")]: {
      fontSize: "24px",
    },
    [mobile.up("sm")]: {
      fontSize: "32px",
    },
  };

  const daySize = {
    [mobile.down("sm")]: {
      fontSize: "16px",
    },
    [mobile.up("sm")]: {
      fontSize: "20px",
    },
  };

  const classSize = {
    [mobile.down("sm")]: {
      fontSize: "16px",
    },
    [mobile.up("sm")]: {
      fontSize: "18px",
    },
  };

  return (
    <>
      {/* Header */}
      <FormComponent title={'Class Today'} subTitle={'These are 10 classes'}>
        {/* Card */}
        <CardContent 
          sx={{ 
            ...cardContainer, 
            borderRadius: '16px', 
            height: {
              xs: '200px',
              sm: '250px'
            },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between', // Center the content vertically
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Class Name and Teacher Name */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Avatar src={classIcon} alt='class list picture' />
              <Typography sx={classSize} fontWeight="medium">
                E.109
              </Typography>
            </Box>
            {/* Day */}
            <Typography sx={daySize} fontWeight="medium">
              Monday
            </Typography>
          </Box>
          {/* Subject */}
          <Typography sx={subjectSize} fontWeight="bold" >
            Math
          </Typography>
          {/* Total Students and Time */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={daySize}>
              52 Students
            </Typography>
            <Box sx={{backgroundColor: '#fadfc1', padding: '4px 8px', borderRadius: '16px',display: 'flex', alignItems: 'center', gap: '8px'}}>
              <WatchLaterIcon/>
              <Typography sx={daySize}>
                  7:00 - 9:00
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </FormComponent>
    </>
  );
}

export default TeacherClassPage;

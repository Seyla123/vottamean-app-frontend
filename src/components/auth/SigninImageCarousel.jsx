import React, { useState, useEffect } from 'react';
import { Box, Typography, MobileStepper } from '@mui/material';
import image1 from '../../assets/images/attendance-list.svg';
import image2 from '../../assets/images/easy-to-manage.svg';
import image3 from '../../assets/images/parent-notification.svg';
import image4 from '../../assets/images/student-tracking.svg';

const carouselItems = [
  {
    imgSrc: image4,
    title: 'Real-time Tracking',
    description:
      'Track and mark student attendance instantly using any device. With our real-time tracking, teachers and administrators can easily manage and update student attendance records on the go.',
  },
  {
    imgSrc: image2,
    title: 'Automated Reports',
    description:
      ' Simplify your administrative tasks with automated attendance reports. Generate daily, weekly, or monthly reports effortlessly, giving you more time to focus on student engagement.',
  },
  {
    imgSrc: image3,
    title: 'Parent Notifications',
    description:
      'Keep parents informed in real-time. Automatically notify them of their child’s attendance status—whether they’re in class, absent, or tardy—so they always stay connected and informed.',
  },
  {
    imgSrc: image1,
    title: 'Attendance List',
    description:
      'Easily access and manage comprehensive attendance lists. View real-time attendance records for all students, helping you stay organized and up-to-date with classroom attendance at a glance.',
  },
];

const SigninImageCarousel = () => {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = carouselItems.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
    }, 5000);
    return () => clearInterval(timer);
  }, [maxSteps]);

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
        {carouselItems.map((item, index) => (
          <Box
            key={index}
            sx={{
              height: '100%',
              width: '100%',
              position: 'absolute',
              transform: `translateX(${(index - activeStep) * 100}%)`,
              transition:
                'opacity 0.8s ease-in-out, transform 0.8s cubic-bezier(0.83, 0, 0.17, 1)',
            }}
          >
            <img
              src={item.imgSrc}
              alt={item.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          p: 2,
          color: 'white',
          textAlign: 'center',
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',

          width: '100%',
          maxWidth: '800px',
          margin: '0 auto',
          zIndex: 50,
        }}
      >
        <Typography variant="h3" gutterBottom fontWeight={'bold'}>
          {carouselItems[activeStep].title}
        </Typography>
        <Typography variant="body2">
          {carouselItems[activeStep].description}
        </Typography>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          sx={{
            mt: 3,
            flexGrow: 1,
            justifyContent: 'center',
            backgroundColor: 'transparent',
            '& .MuiMobileStepper-dot': {
              backgroundColor: '#ccc',
            },
            '& .MuiMobileStepper-dotActive': {
              backgroundColor: '#fff',
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default SigninImageCarousel;

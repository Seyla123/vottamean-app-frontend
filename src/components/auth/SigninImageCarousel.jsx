import React, { useState, useEffect } from 'react';
import { Box, Typography, MobileStepper } from '@mui/material';
import image1 from '../../assets/images/auth-illustrator-img-1.svg';
import image2 from '../../assets/images/auth-illustrator-img-2.svg';
import image3 from '../../assets/images/auth-illustrator-img-3.png';

const carouselItems = [
  {
    imgSrc: image1,
    title: 'Real-time Tracking',
    description: 'Mark student attendance instantly from any device.',
  },
  {
    imgSrc: image2,
    title: 'Automated Reports',
    description:
      ' Generate and download daily, weekly, or monthly attendance reports.',
  },
  {
    imgSrc: image3,
    title: 'Parent Notifications',
    description:
      "Automatically notify parents about their child's attendance status.",
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
              transition: 'transform 0.5s ease',
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
          position: 'relative',
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

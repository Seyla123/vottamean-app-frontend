import React, { useState, useEffect } from 'react';
import { Box, Typography, MobileStepper } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import image1 from '../../assets/images/auth-illustrator-img-1.svg';
import image2 from '../../assets/images/auth-illustrator-img-2.svg';
import image3 from '../../assets/images/auth-illustrator-img-3.png';

const carouselItems = [
  {
    imgSrc: image1,
    title: 'Image 1 Title',
    description: 'Description for image 1',
  },
  {
    imgSrc: image2,
    title: 'Image 2 Title',
    description: 'Description for image 2',
  },
  {
    imgSrc: image3,
    title: 'Image 3 Title',
    description: 'Description for image 3',
  },
];

const SigninImageCarousel = () => {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = carouselItems.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
    }, 5000); // Change slide every 5 seconds

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
      <Box sx={{ p: 2, backgroundColor: 'background.paper' }}>
        <Typography variant="h6" gutterBottom>
          {carouselItems[activeStep].title}
        </Typography>
        <Typography variant="body2" paragraph>
          {carouselItems[activeStep].description}
        </Typography>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          sx={{ flexGrow: 1, justifyContent: 'center' }}

        />
      </Box>
    </Box>
  );
};

export default SigninImageCarousel;

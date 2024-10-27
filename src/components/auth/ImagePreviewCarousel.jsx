import React, { useState, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from 'lucide-react';
const ImagePreviewCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handlePrevClick = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <Box sx={styles.container}>
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        style={styles.mainImage}
      />

      <Box sx={styles.arrowContainer}>
        <IconButton
          onClick={handlePrevClick}
          sx={styles.arrowButton}
          style={{ left: 10 }}
        >
          <ChevronLeft />
        </IconButton>
        <IconButton
          onClick={handleNextClick}
          sx={styles.arrowButton}
          style={{ right: 10 }}
        >
          <ChevronRight />
        </IconButton>
      </Box>
    </Box>
  );
};

const styles = {
  container: {
    mt: 2,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  mainImage: {
    width: '100%',
    height: '500px',
    objectFit: 'cover',
  },

  arrowContainer: {
    position: 'relative',
    bottom: 32,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrowButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
  },
};

export default ImagePreviewCarousel;

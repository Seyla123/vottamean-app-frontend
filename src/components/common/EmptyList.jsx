import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { styled } from '@mui/system';

const StyledImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const EmptyList = ({ image, title, description }) => {
  return (
    <Container maxWidth={'sm'}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          height: '70vh',
        }}
      >
        <Box sx={{ width: '300px', height: '200px', mb: '2rem' }}>
          {image && <StyledImage src={image} alt={title || 'Empty list'} />}
        </Box>
        {title && (
          <Typography
            variant="h5"
            component="h5"
            fontWeight={'bold'}
            gutterBottom
          >
            {title}
          </Typography>
        )}
        {description && (
          <Typography variant="body1" color="text.secondary">
            {description}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default EmptyList;

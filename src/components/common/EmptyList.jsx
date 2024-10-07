import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { styled } from '@mui/system';

const StyledImage = styled('img')({
  maxWidth: '300px',
  height: 'auto',
  marginBottom: (theme) => theme.spacing(2),
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
        {image && <StyledImage src={image} alt={title || 'Empty list'} />}
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

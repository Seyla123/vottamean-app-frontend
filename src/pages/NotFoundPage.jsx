import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import notFoundImage from '../assets/images/404-page-not-found.svg';

const NotFoundPage = ({
  imageUrl = notFoundImage,
  title = '404: Page Not Found',
  description = "Oops! why you're here? We're sorry, but the page you're looking for doesn't exist.",
  buttonText = 'Go back to Dashboard',
  buttonLink = '/',
}) => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
          minHeight: '100vh',
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '600px',
            height: '300px',
          }}
        >
          <img
            src={imageUrl}
            alt="404 Not Found"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>
        <Box sx={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          <Typography
            variant="h4"
            component="h4"
            fontWeight={'bold'}
            gutterBottom
          >
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {description}
          </Typography>
        </Box>
        <Button
          component={Link}
          to={buttonLink}
          variant="contained"
          color="primary"
          size="large"
        >
          {buttonText}
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import unAuthorzedImage from '../assets/images/unauthorize-1.svg';

const UnauthorizedPage = ({
  imageUrl = unAuthorzedImage,
  title = ' Unauthorized Access',
  description = "Oops! It looks like you don't have permission to access this page. Please sign in or contact an administrator for assistance.",
  buttonText = 'Go to Sign In',
}) => {
  const navigate = useNavigate();

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
            maxWidth: '300px',
            height: '300px',
          }}
        >
          <img
            src={imageUrl}
            alt="Unauthorized"
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
          to={'/auth/signin'}
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

export default UnauthorizedPage;

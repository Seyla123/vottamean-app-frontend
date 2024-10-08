import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import notFoundImage from '../assets/images/404-page-not-found.svg';
import StyledButton from '../components/common/StyledMuiButton';

const NotFoundPage = ({
  imageUrl = notFoundImage,
  title = '404: Page Not Found',
  description = "Oops! Why you're here? We're sorry, but the page you're looking for doesn't exist.",
  buttonText = 'Go to Dashboard',
}) => {
  const { user } = useSelector((state) => state.auth);

  const getDashboardLink = () => {
    if (!user) return '/admin/dashboard';

    switch (user.role) {
      case 'admin':
        return '/admin/dashboard';
      case 'teacher':
        return '/teacher/dashboard';
      default:
        return '/';
    }
  };

  const dashboardLink = getDashboardLink();

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
        <StyledButton
          component={Link}
          to={dashboardLink}
          variant="contained"
          color="primary"
          size="large"
        >
          {buttonText}
        </StyledButton>
      </Box>
    </Container>
  );
};

export default NotFoundPage;


import React from 'react';
import { Box, Typography, Container, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EorrImage from '../../assets/images/500-error.svg';
import StyledButton from './StyledMuiButton';

const SomethingWentWrong = ({
  imageUrl = EorrImage,
  title = 'Oops, Something Went Wrong!',
  description = "We're experiencing some issue. Please try again",
  buttonText = 'Go to home',
  customStyles,
  defaultBtn = true,
  children
}) => {
  const { user } = useSelector((state) => state.auth);

  const getHomeLink = () => {
    switch (user?.role) {
      case 'admin':
        return '/admin/home';
      case 'teacher':
        return '/teacher/home';
      default:
        return '/';
    }
  };

  const homeLink = getHomeLink();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
          minHeight: '80vh',
          textAlign: 'center',
          ...customStyles,
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '600px',
            height: '300px',
          }}
        >
          <Box
            component={'img'}
            src={imageUrl}
            alt="500 Internal Server Error"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </Box>
        <Box sx={{ width: '100%', maxWidth: '500px', textAlign: 'center' }}>
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
        {defaultBtn && (
          <Stack
            flexDirection={{ xs: 'column', sm: 'row' }}
            gap={{ xs: 1, sm: 2 }}
          >
            <StyledButton
              component={Link}
              to={homeLink}
              variant="contained"
              color="primary"
              size="small"
            >
              {buttonText}
            </StyledButton>
            <StyledButton
              onClick={() => window.location.reload()}
              variant="contained"
              color="primary"
              size="small"
            >
              Refresh Page
            </StyledButton>
          </Stack>
        )}
        {children}
      </Box>
    </Container>
  );
};

export default SomethingWentWrong;

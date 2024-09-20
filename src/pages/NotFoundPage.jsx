import React from 'react';
import { Box, Button, Typography, Container, keyframes } from '@mui/material';
import { Link } from 'react-router-dom';
import notFoundImg from '../assets/images/notfound.png';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

function NotFoundPage() {
  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        textAlign="center"
        sx={{
          animation: `${fadeIn} 0.5s ease-out`,
          padding: { xs: 2, md: 4 },
        }}
      >
        {/* Image Section */}
        <Box
          component="img"
          src={notFoundImg}
          alt="Not Found"
          sx={{
            width: '100%',
            maxWidth: '400px',
            height: 'auto',
            marginBottom: '2rem',
            filter: 'drop-shadow(0 10px 8px rgba(0, 0, 0, 0.04))',
          }}
        />
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            marginBottom: '1rem',
          }}
        >
          Oops! Page not found.
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            maxWidth: '600px',
            marginBottom: '2rem',
            color: 'text.secondary',
          }}
        >
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </Typography>
        <Button
          component={Link}
          to="admin/dashboard"
          variant="contained"
          color="primary"
          size="large"
          sx={{
            mt: 2,
            px: 4,
            py: 1.5,
            textTransform: 'none',
            fontSize: '1.1rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
            },
          }}
        >
          Back to Dashboard
        </Button>
      </Box>
    </Container>
  );
}

export default NotFoundPage;

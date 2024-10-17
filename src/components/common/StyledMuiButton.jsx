import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledMuiButton = styled(Button)(({ theme, variant }) => ({
  textTransform: 'capitalize',
  padding: '10px 16px',
  borderRadius: 8,
  boxShadow: 'none',
  transition: 'all ease-in-out 0.3s', // Slightly longer transition for smoother effect

  '&:hover': {
    boxShadow: 'none',
  },
  // Variant-specific styles
  ...(variant === 'contained' && {
    color: '#ffffff', // White text for contrast
    '&:hover': {
      boxShadow: 'none',
    },
  }),
  ...(variant === 'outlined' && {
    '&:hover': {
      boxShadow: 'none',
    },
  }),
  ...(variant === 'text' && {
    '&:hover': {
      boxShadow: 'none',
    },
  }),
}));

const StyledButton = (props) => {
  return <StyledMuiButton {...props} />;
};

export default StyledButton;

import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledMuiButton = styled(Button)(({ theme, variant }) => ({
  textTransform: 'capitalize',
  padding: '10px 20px',
  borderRadius: 4,
  boxShadow: 'none',
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

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
    backgroundColor: '#5b54d9', // Slightly darker shade for hover
  },
  // Variant-specific styles
  ...(variant === 'contained' && {
    backgroundColor: '#6c63ff', // Primary color
    color: '#ffffff', // White text for contrast
    '&:hover': {
      backgroundColor: '#5b54d9', // Darker shade on hover
      boxShadow: 'none',
    },
  }),
  ...(variant === 'outlined' && {
    borderColor: '#6c63ff',
    color: '#6c63ff',
    '&:hover': {
      borderColor: '#5b54d9',
      backgroundColor: 'rgba(108, 99, 255, 0.04)', // Very light tint of primary color
      boxShadow: 'none',
    },
  }),
  ...(variant === 'text' && {
    color: '#6c63ff',
    '&:hover': {
      backgroundColor: 'rgba(108, 99, 255, 0.04)', // Very light tint of primary color
      boxShadow: 'none',
    },
  }),
}));

const StyledButton = (props) => {
  return <StyledMuiButton {...props} />;
};

export default StyledButton;

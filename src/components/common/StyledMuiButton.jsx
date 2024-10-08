import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledMuiButton = styled(Button)(({ theme }) => ({
  textTransform: 'capitalize',
  fontWeight: 600,
  padding: '10px 20px',
  borderRadius: '8px',
  boxShadow: 'none',
  '&:hover': {
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  // Add any other styles you want to enforce globally
}));

const StyledButton = (props) => {
  return <StyledMuiButton {...props} />;
};

export default StyledButton;

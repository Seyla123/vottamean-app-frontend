import React from 'react';
import { Link } from 'react-router-dom';
import unAuthorzedImg from '../assets/images/police-img.svg';
import StyledButton from '../components/common/StyledMuiButton';
import SomthingWentWrong from '../components/common/SomthingWentWrong';
import { Stack } from '@mui/material';
const UnauthorizedPage = () => {
  return (
    <SomthingWentWrong
      imageUrl={unAuthorzedImg}
      title=' Unauthorized Access'
      description="Oops! It looks like you don't have permission to access this page. Please sign in or contact an administrator for assistance."   
      defaultBtn={false}
    >
      <Stack  flexDirection={{ xs: 'column', sm: 'row' }} gap={{ xs: 1, sm: 2 }}>
        <Link to="/">
          <StyledButton variant="contained" color="primary">
            Go Back
          </StyledButton>
        </Link>
        <Link to="/auth/signin">
          <StyledButton variant="contained" color="primary">
            Sign In
          </StyledButton>
        </Link>
      </Stack>
    </SomthingWentWrong>
  )
};

export default UnauthorizedPage;

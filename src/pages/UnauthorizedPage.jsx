import React from 'react';
import { Link } from 'react-router-dom';
import unAuthorzedImg from '../assets/images/police-img.svg';
import StyledButton from '../components/common/StyledMuiButton';
import SomethingWentWrong from '../components/common/SomethingWentWrong';
import { Stack } from '@mui/material';
import ShortHeader from '../components/layout/ShortHeader';
const UnauthorizedPage = () => {
  return (
    <>
    <ShortHeader>

    <SomethingWentWrong
      imageUrl={unAuthorzedImg}
      title=' Unauthorized Access'
      description="Oops! It looks like you don't have permission to access this page. Please sign in or contact an administrator for assistance."
      defaultBtn={false}
    >
      <Stack flexDirection={{ xs: 'column', sm: 'row' }} gap={{ xs: 1, sm: 2 }}>
        <Link to="/">
          <StyledButton variant="contained" color="primary" size="small">
            Go Back
          </StyledButton>
        </Link>
        <Link to="/auth/signin">
          <StyledButton variant="contained" color="primary" size="small">
            Sign In
          </StyledButton>
        </Link>
      </Stack>
    </SomethingWentWrong>
    </ShortHeader>
    </>
  )
};

export default UnauthorizedPage;

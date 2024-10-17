import React from 'react';
import { Link } from 'react-router-dom';
import notFoundImage from '../assets/images/404-page-not-found.svg';
import StyledButton from '../components/common/StyledMuiButton';
import SomethingWentWrong from '../components/common/SomethingWentWrong';
const NotFoundPage = () => {
  return (
    <SomethingWentWrong
      imageUrl={notFoundImage}
      title='404: Page Not Found'
      description="Oops! Why you're here? We're sorry, but the page you're looking for doesn't exist."
      defaultBtn={false}
    >
      <StyledButton
        component={Link}
        to={'/'}
        variant="contained"
        color="primary"
      >
        Go to Home
      </StyledButton>
    </SomethingWentWrong>
  )
};

export default NotFoundPage;

import React from 'react';
import { Link } from 'react-router-dom';
import notFoundImage from '../assets/images/404-page-not-found.svg';
import StyledButton from '../components/common/StyledMuiButton';
import SomthingWentWrong from '../components/common/SomthingWentWrong';
const NotFoundPage = () => {
  return (
    <SomthingWentWrong
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
        size="large"
      >
        Go to Home
      </StyledButton>
    </SomthingWentWrong>
  )
};

export default NotFoundPage;

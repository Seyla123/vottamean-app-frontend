import React, { useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';

import { useVerifyTeacherEmailMutation } from '../../services/authApi';

// Material UI components
import { Box, Typography, Button, Card } from '@mui/material';
import HeaderTitle from '../../components/auth/HeaderTitle';

// Image and icon
import BackgroundImage from '../../assets/images/verified-illustration-img.svg';
import Logo from '../../assets/images/Logo.svg';
import { ShieldCheck, ChevronLeft, Phone, ShieldX } from 'lucide-react';

function VerifyTeacherEmailPage() {
  const { verificationToken } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Extract 'tempToken' from the query string
  const queryParams = new URLSearchParams(location.search);
  const tempToken = queryParams.get('token');

  // Mutation hook for verifying email
  const [verifyEmail, { isLoading, isSuccess, isError }] =
    useVerifyTeacherEmailMutation();

  // Perform email verification on component mount
  useEffect(() => {
    console.log('verificationToken:', verificationToken);
    console.log('tempToken:', tempToken);

    if (verificationToken && tempToken) {
      verifyEmail({ verificationToken, tempToken })
        .unwrap()
        .then((result) => {
          console.log('Verification successful:', result);
        })
        .catch((error) => {
          console.error('Verification failed:', error.data?.message || error);
        });
    }
  }, [verificationToken, tempToken, verifyEmail]);

  // Redirect to login after successful verification
  const handleLoginRedirect = () => {
    navigate('/auth/signin');
  };

  return (
    <>
      <Box component="section" sx={styles.pageContainer}>
        {/* LEFT CONTAINER */}
        <Box component="div" sx={styles.leftContainer}>
          {/* LOGO */}
          <img src={Logo} alt="wavetrack logo" style={styles.logo} />

          {/* FORM MAIN */}
          <Box sx={styles.formContainer}>
            <Box component={'div'} sx={styles.iconContainer}>
              {isSuccess ? <ShieldCheck size={100} /> : <ShieldX size={100} />}
            </Box>
            {/* FORM HEADER */}
            <HeaderTitle
              title={
                isSuccess
                  ? 'Your password has been successfully reset.'
                  : 'Password Reset Failed.'
              }
              subTitle={
                'We were unable to reset your password at this time. Please try again later.'
              }
            />
            <form>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: { xs: 2, md: 3 },
                }}
              >
                {/* BUTTON */}
                {isSuccess ? (
                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                  >
                    <Button
                      variant="contained"
                      onClick={handleLoginRedirect}
                      disabled={isLoading}
                    >
                      Go to sign in
                    </Button>
                  </Box>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleLoginRedirect}
                    disabled={isLoading}
                  >
                    Try again
                  </Button>
                )}
              </Box>
            </form>
            {/* FOOTER */}
          </Box>
        </Box>

        {/* RIGHT CONTAINER */}
        <Box component="div" sx={styles.rightContainer}>
          {/* IMAGE OVERLAY */}
          <Box component="div" sx={styles.imageOverlay} />

          {/* CONTENT */}
          <Box sx={styles.content}>
            <Typography variant="h3" color="white">
              Support Information
            </Typography>
            <Typography variant="subtitle1" color="white">
              If you didn't request this change or notice any suspicious
              activity, please contact our support team immediately.
            </Typography>
            <Typography variant="body1" color="white">
              Reach out to our support team if you're facing any issues.{' '}
            </Typography>
            <Link to={'/'} style={styles.contactSupport}>
              <Phone size={14} />
              <span style={{ marginLeft: 6 }}> HexCode+ Support</span>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default VerifyTeacherEmailPage;

// Styles
const styles = {
  pageContainer: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    p: 2,
    gap: 2,
    bgcolor: 'white',
  },
  leftContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  fieldContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
  logo: {
    width: '150px',
    position: 'absolute',
    top: '10px',
    left: '10px',
    zIndex: 10,
  },
  iconContainer: {
    width: {
      xs: '40px',
      md: '50px',
    },
    height: {
      xs: '40px',
      md: '50px',
    },
    p: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    border: '1px solid #ccc',
  },
  formContainer: {
    width: '100%',
    maxWidth: '400px',
    height: '100%',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    margin: '0 auto',
  },
  rightContainer: {
    display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' },
    position: 'relative',
    zIndex: 10,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(180deg, #F5EFFF 0%, #8B93FF 100%)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    borderRadius: 2,
    p: 2,
    overflow: 'hidden',
  },
  imageOverlay: {
    position: 'absolute',
    backgroundImage: `url(${BackgroundImage})`,
    backgroundRepeat: 'no-repeat',
    top: 0,
    left: 0,
    zIndex: 1,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  },
  content: {
    p: 4,
    bottom: 0,
    left: 0,
    width: '100%',
    maxWidth: '800px',
    position: 'absolute',
    zIndex: 50,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  footer: {
    color: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 1,
  },
  emailContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    alignItems: 'center',
    textAlign: 'center',
  },

  contactSupport: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    width: 'fit-content',
    background: 'white',
    borderRadius: '4px',
    padding: '2px 8px',
  },
};

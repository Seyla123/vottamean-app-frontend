// Material UI components
import { Box } from '@mui/material';

// Icon & IMAGE
import Logo from '../../assets/images/Logo.svg';
import patternImage from '../../assets/images/pattern-1.png';
import patternImage2 from '../../assets/images/pattern-2.png';

// Components
import LoginForm from '../../components/auth/LoginForm';
import FormFooter from '../../components/auth/FormFooter';
import SigninImageCarousel from '../../components/auth/SigninImageCarousel';
import HeaderTitle from '../../components/auth/HeaderTitle';


const SigninPage = () => {
  return (
    <Box component="section" sx={styles.pageContainer}>
      {/* LEFT CONTAINER */}
      <Box component="div" sx={styles.leftContainer}>
        {/* LOGO */}
        <img src={Logo} alt="wavetrack logo" style={styles.logo} />

        {/* FORM CONTAINER */}
        <Box sx={styles.formContainer}>
          {/* FORM HEADER */}
          <HeaderTitle
            title={' Welcome to WaveTrack!'}
            subTitle={`Accurately record and monitor student attendance with WaveTrack's user-friendly platform.`}
          />
          {/* FORM MAIN */}
          <LoginForm />
          {/* FORM FOOTER */}
          <FormFooter href={'/auth/signup'} />
        </Box>
      </Box>

      {/* RIGHT CONTAINER */}
      <Box component="div" sx={styles.rightContainer}>
        <img
          src={patternImage}
          alt="pattern image"
          style={styles.patternImage1}
        />
        <img
          src={patternImage2}
          alt="pattern image"
          style={styles.patternImage2}
        />
        <SigninImageCarousel />
      </Box>
    </Box>
  );
};

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
    width: { xs: '100%', sm: '100%', md: '100%', lg: '100%' },
    height: '100%',
    position: 'relative',
  },
  logo: {
    width: '150px',
    position: 'absolute',
    top: '10px',
    left: '10px',
    zIndex: 10,
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
    zIndex: 1,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(360deg, #6C63FF 0%, #8B93FF 100%)',
    borderRadius: 2,
    p: 2,
    overflow: 'hidden',
  },
  patternImage1: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
  },
  patternImage2: {
    position: 'absolute',
    width: '100px',
    right: -25,
    top: 40,
  },
};

export default SigninPage;

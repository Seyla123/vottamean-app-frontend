// React and third-party libraries
import { useNavigate } from 'react-router-dom';

// Redux hooks and actions
import { useLoginMutation } from '../../services/authApi';

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

import { useDispatch } from 'react-redux';
import { setSnackbar } from '../../store/slices/uiSlice';

const SigninPage = () => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (formData) => {
    try {
      const response = await login(formData).unwrap();
      if (response.data) {
        const { role } = response.data;
        dispatch(
          setSnackbar({
            open: true,
            message: 'Logged in successfully',
            severity: 'success',
          })
        );
        // Navigate based on the user role
        if (role === 'admin') {
          navigate('/admin/dashboard');
        } else if (role === 'teacher') {
          navigate('/teacher/dashboard');
        } else {
          navigate('/something-went-wrong');
        }
      }
    } catch (error) {
      dispatch(
        setSnackbar({
          open: true,
          message: error.data?.message || 'An error occurred during login',
          severity: 'error',
        })
      );
    }
  };

  return (
    <Box
      component={'section'}
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
        gap: 2,
        bgcolor: 'white',
      }}
    >
      {/* LEFT CONTAINER */}
      <Box
        component={'div'}
        sx={{
          width: { xs: '100%', sm: '100%', md: '100%', lg: '100%' },
          height: '100%',
          position: 'relative',
        }}
      >
        {/* LOGO */}
        <img
          src={Logo}
          alt="wavetrack logo"
          style={{
            width: '150px',
            position: 'absolute',
            top: '10px',
            left: '10px',
            zIndex: 10,
          }}
        />

        {/* FORM CONTAINER */}
        <Box
          sx={{
            width: '100%',
            maxWidth: '400px',
            height: '100%',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            margin: '0 auto',
          }}
        >
          {/* FORM HEADER */}
          <HeaderTitle
            title={' Welcome to WaveTrack!'}
            subTitle={`Accurately record and monitor student attendance with WaveTrack's user-friendly platform.`}
          />
          {/* FORM MAIN */}
          <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
          {/* FORM FOOTER */}
          <FormFooter href={'/auth/signup'} />
        </Box>
      </Box>

      {/* RIGHT CONTAINER */}
      <Box
        component={'div'}
        sx={{
          display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' },
          position: 'relative',
          zIndex: 1,
          width: '100%',
          height: '100%',
          background: ' linear-gradient(360deg,#6C63FF 0%,  #8B93FF   100%)',
          borderRadius: 2,
          p: 2,
          overflow: 'hidden',
        }}
      >
        <img
          src={patternImage}
          alt="pattern image"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
          }}
        />

        <img
          src={patternImage2}
          alt="pattern image"
          style={{
            position: 'absolute',
            width: '100px',
            right: -25,
            top: 40,
          }}
        />
        <SigninImageCarousel />
      </Box>
    </Box>
  );
};

export default SigninPage;

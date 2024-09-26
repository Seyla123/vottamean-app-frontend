// React and third-party libraries
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Redux hooks and actions
import { useLoginMutation } from '../../services/authApi';

// Material UI components
import { Container, Box, Stack, Snackbar, Alert } from '@mui/material';

// Icon & IMAGE
import { User, Users, Contact, School } from 'lucide-react';
import Logo from '../../assets/images/Logo.svg';

// Components
import LoginForm from '../../components/auth/LoginForm';
import AuthContainerCard from '../../components/auth/AuthContainerCard';
import FormFooter from '../../components/auth/FormFooter';
import SigninImageCarousel from '../../components/auth/SigninImageCarousel';
import HeaderTitle from '../../components/auth/HeaderTitle';

const SigninPage = () => {
  const [login, { isSuccess, isLoading, error }] = useLoginMutation();
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      const response = await login(formData).unwrap();

      if (response.data) {
        const { role } = response.data;

        // Show success message
        setOpenSuccess(true);

        // Navigate based on the user role
        if (role === 'admin') {
          navigate('/admin/dashboard');
        } else if (role === 'teacher') {
          navigate('/teacher/dashboard');
        } else {
          navigate('/default-dashboard');
        }
      } else {
        navigate('/default-dashboard');
      }
    } catch (err) {
      console.error('Login failed:', err);
      setOpenError(true);
    }
  };

  // Automatically close Snackbars after a duration
  const handleCloseSnackbar = () => {
    setOpenError(false);
    setOpenSuccess(false);
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
            subTitle={`Accurately record and monitor student attendance with WaveTrack's user-friendly platform. Improve efficiency and reduce paperwork, all while ensuring every student is accounted for.`}
          />
          {/* FORM MAIN */}
          <LoginForm onSubmit={handleLogin} />
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
          width: '100%',
          height: '100%',
          background: ' linear-gradient(360deg,#6C63FF 0%,  #8B93FF   100%)',
          borderRadius: 2,
          p: 2,
          overflow: 'hidden',
        }}
      >
        <SigninImageCarousel />
      </Box>
    </Box>
  );
};

// Snackbar for displaying error
const SnackBarAlert = ({ open, setOpen, message }) => {
  return (
    <>
      {error && (
        <Snackbar
          open={openError}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="error"
            sx={{ width: '100%' }}
          >
            {error?.data?.message === 'Invalid credentials'
              ? 'Incorrect email or password. Please try again.'
              : 'Login failed. Please try again later.'}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default SigninPage;

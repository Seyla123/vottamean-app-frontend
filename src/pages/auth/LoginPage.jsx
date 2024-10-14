// React and third-party libraries
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Redux hooks and actions
import { useLoginMutation } from '../../services/authApi';

// Material UI components
import { Container, Stack, Snackbar, Alert } from '@mui/material';

// Components
import LoginForm from '../../components/auth/LoginForm';
import AuthContainerCard from '../../components/auth/AuthContainerCard';
import FormFooter from '../../components/auth/FormFooter';

function LoginPage() {
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
          navigate('/admin/home');
        } else if (role === 'teacher') {
          navigate('/teacher/home');
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
    <Container maxWidth="xl">
      <Stack
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          py: 3,
        }}
      >
        <AuthContainerCard sideCard="left">
          <LoginForm onSubmit={handleLogin} />
        </AuthContainerCard>
      </Stack>

      {isLoading && <p>Logging in...</p>}

      {/* Snackbar for displaying error */}
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

      {/* Snackbar for displaying success */}
      <Snackbar
        open={openSuccess}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: '100%' }}
        >
          Login successful! Redirecting...
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default LoginPage;

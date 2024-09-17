import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../services/authApi';
import AuthContainerCard from '../../components/auth/AuthContainerCard';
import LoginForm from '../../components/auth/LoginForm';
import { Container, Stack, Snackbar, Alert } from '@mui/material';

function LoginPage() {
  const [login, { isSuccess, isLoading, error }] = useLoginMutation();
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      console.log('Submitting form data:', formData);

      const response = await login(formData).unwrap();
      console.log('Login successful:', response);

      if (response.data) {
        const { role } = response.data;
        console.log('User role:', role);

        // Show success message
        setOpenSuccess(true);

        // Wait 2 seconds before navigating
        setTimeout(() => {
          if (role === 'admin') {
            navigate('/admin/dashboard');
          } else if (role === 'teacher') {
            navigate('/teacher/dashboard');
          } else {
            console.warn('Unhandled role:', role);
            navigate('/default-dashboard');
          }
        }, 2000);
      } else {
        console.warn('Response data is missing');
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
    <Container>
      <Stack
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
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

import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../services/authApi';
import AuthContainerCard from '../../components/auth/AuthContainerCard';
import LoginForm from '../../components/auth/LoginForm';
import { Container, Stack } from '@mui/material';

function LoginPage() {
  const [login, { isSuccess, isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      // Log formData for debugging
      console.log('Submitting form data:', formData);

      // Perform login mutation
      const response = await login(formData).unwrap();

      // Log the response for debugging
      console.log('Login successful', response);

      // Check if response includes role and navigate accordingly
      const { role } = response.data;

      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else if (role === 'teacher') {
        navigate('/teacher/dashboard');
      } else {
        console.warn('Unhandled role:', role);
        navigate('/default-dashboard');
      }
    } catch (err) {
      console.error('Login failed', err);
    }
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
      {error && (
        <p style={{ color: 'red' }}>
          Login failed: {error?.data?.message || 'Invalid credentials'}
        </p>
      )}
    </Container>
  );
}

export default LoginPage;

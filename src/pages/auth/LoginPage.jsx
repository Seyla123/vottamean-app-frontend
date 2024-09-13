import AuthContainerCard from '../../components/auth/AuthContainerCard';
import LoginForm from '../../components/auth/LoginForm';
import { Container, Stack } from '@mui/material';
import { useLoginMutation } from '../../services/authApi';

function LoginPage() {
  const [login, { isLoading, error }] = useLoginMutation();

  const handleLogin = async (formData) => {
    try {
      const response = await login(formData).unwrap();
      console.log('Login successful', response);
      // Handle successful login (e.g., redirect to dashboard)
    } catch (err) {
      console.error('Login failed', err);
      // Handle login error
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
      {error && <p style={{ color: 'red' }}>Login failed: {error.message}</p>}
    </Container>
  );
}

export default LoginPage;

// For redirecting the user after successful login
import { useNavigate } from 'react-router-dom';

// Mutation hook for login API
import { useLoginMutation } from '../../services/authApi';

// Import necessary components
import AuthContainerCard from '../../components/auth/AuthContainerCard';
import LoginForm from '../../components/auth/LoginForm';
import { Container, Stack } from '@mui/material';

function LoginPage() {
  // 1. Hook to initiate login API call
  const [login, { isLoading, error }] = useLoginMutation();

  // 2. Hook to programmatically navigate (redirect) the user
  const navigate = useNavigate();

  // 3. Function to handle form submission and login logic
  const handleLogin = async (formData) => {
    try {
      // 3.1 Call the login API with form data (email and password)
      const response = await login(formData).unwrap();
      console.log('Login successful', response);

      // 3.2 Handle successful login:
      // Token is automatically stored in HTTP-only cookies, just navigate to the appropriate dashboard
      if (response.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (response.role === 'teacher') {
        navigate('/teacher/dashboard');
      }
    } catch (err) {
      // 3.3 Handle login error (e.g., invalid credentials)
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
        {/* 4. Auth card to display login form */}
        <AuthContainerCard sideCard="left">
          <LoginForm onSubmit={handleLogin} />
        </AuthContainerCard>
      </Stack>

      {/* 5. Display a loading message while login is processing */}
      {isLoading && <p>Logging in...</p>}

      {/* 6. Display an error message if login fails */}
      {error && (
        <p style={{ color: 'red' }}>
          Login failed: {error?.data?.message || 'Invalid credentials'}
        </p>
      )}
    </Container>
  );
}

export default LoginPage;

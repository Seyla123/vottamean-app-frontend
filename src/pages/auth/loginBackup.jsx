import AuthContainerCard from '../../components/auth/AuthContainerCard';
import LoginForm from '../../components/auth/LoginForm';
import { Container, Box, Stack } from '@mui/material';

function LoginPage() {
  return (
    <>
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
            <LoginForm />
          </AuthContainerCard>
        </Stack>
      </Container>
    </>
  );
}

export default LoginPage;

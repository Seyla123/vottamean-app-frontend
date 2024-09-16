import { Box, Container, Stack } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
function LoadingPage() {
  return (
    <Container>
      <Stack
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '90vh',
        }}
      >
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      </Stack>
    </Container>
  );
}

export default LoadingPage;

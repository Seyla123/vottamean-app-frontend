import { Box, Container, Stack,Button,Typography } from '@mui/material'
import loadingAnimation from '../assets/images/Animation - 1725891705036.gif'
import LinearProgress from '@mui/material/LinearProgress';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from'react';
function LoadingPage() {
  // Set the loading state to true or false based on your application logic
  const [loading, setLoading] = useState(false);
  return (
    <Container >
    <Stack sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "90vh"}}>
    <Box sx={{ width: '100%' }}>
      <LinearProgress />
      <LoadingButton
        loadingIndicator={<CircularProgress color="inherit" size={20} />}
        loading={true}
        variant="outlined"
      >
        Loading
      </LoadingButton>
      <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loading}
                            onClick={() => setLoading(true)}
                            style={{ marginTop: '16px' }}
                        >
                            {loading ? (
                                <Box display="flex" alignItems="center">
                                    <CircularProgress size={24} color="inherit" />
                                    <Typography variant="body2" style={{ marginLeft: '8px' }}>
                                        updating...
                                    </Typography>
                                </Box>
                            ) : (
                                'Add Session'
                            )}
                        </Button>
    </Box>
    </Stack>
  </Container>
  )
}

export default LoadingPage
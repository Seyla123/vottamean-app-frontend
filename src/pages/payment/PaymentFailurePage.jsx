import { Box, Stack, Typography, CircularProgress } from '@mui/material';
import { CircleX } from 'lucide-react';
import Logo from '../../assets/images/Logo.svg';
import ErrorIcon from '../../assets/images/undraw_Weather_notification_re_3pad.png'
import StyledButton from '../../components/common/StyledMuiButton';
import { useNavigate } from 'react-router-dom';
function PaymentSuccessPage() {
  const navigate = useNavigate();
  return (
    <>
      <Box component="section" sx={styles.pageContainer}>
        {/* LEFT CONTAINER */}
        <Box component="div" sx={styles.leftContainer}>
          <img src={Logo} alt="wavetrack logo" style={styles.logo} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            height: '90vh',
            justifyContent: 'center',
            width: '100%',
            maxWidth: '500px',
            textAlign: 'center',
          }}
        >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'error.light',
                }}
              >
                <Box component={'img'} src={ErrorIcon} sx={{ maxWidth: '600px' }} />
              </Box>
              <Typography variant="h4" fontWeight={'bold'}  sx={{color: '#ff3333'}}>
                Payment Failed
              </Typography>
              <Typography variant="body1" color={'text.secondary'}>
               We can not proccess your payment,<br />please try again.
              </Typography>
              <StyledButton variant="contained" type="submit" size="small" onClick={() => navigate('/admin/payment')}>
                Try again
              </StyledButton>
        </Box>
      </Box>
    </>
  );
}

export default PaymentSuccessPage;

const styles = {
  pageContainer: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    p: 2,
    gap: 2,
    bgcolor: 'white',
  },
  leftContainer: {
    width: '100%',
  },
  fieldContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
  logo: {
    width: '150px',
    position: 'absolute',
    top: '10px',
    left: '10px',
    zIndex: 10,
  },
};

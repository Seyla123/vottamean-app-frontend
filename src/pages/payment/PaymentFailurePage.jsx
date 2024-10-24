import { Box, Typography } from '@mui/material';
import Logo from '../../assets/images/Logo.svg';
import ErrorIcon from '../../assets/images/undraw_Weather_notification_re_3pad.png'
import StyledButton from '../../components/common/StyledMuiButton';
import { useNavigate } from 'react-router-dom';
import ShortHeader from '../../components/layout/ShortHeader';
function PaymentSuccessPage() {
  const navigate = useNavigate();
  return (
    <>
      <ShortHeader >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
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
            <Box component={'img'} alt="Verified" src={ErrorIcon} sx={{ width : '100%', maxWidth: '400px' }} />
          </Box>
          <Typography variant="h4" fontWeight={'bold'} >
            Payment Failed
          </Typography>
          <Typography variant="body1" color={'text.secondary'}>
            We can not proccess your payment,<br />please try again.
          </Typography>
          <StyledButton variant="contained" type="submit" size="small" onClick={() => navigate('/admin/payment')}>
            Try again
          </StyledButton>
        </Box>
      </ShortHeader>
    </>
  );
}

export default PaymentSuccessPage;

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Stack, Typography, CircularProgress } from '@mui/material';
import { CircleCheckBig } from 'lucide-react';
import StyledButton from '../../components/common/StyledMuiButton';
import { useGetSessionDetailsQuery } from '../../services/paymentApi';
import { useNavigate } from 'react-router-dom';
import ShortHeader from '../../components/layout/ShortHeader';
function PaymentSuccessPage() {
  const navigate = useNavigate();
  // Function to extract the session_id from the URL query parameter
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const session_id = urlParams.get('session_id');

  const [sessionData, setSessionData] = useState({});
  const { data: getSessionDetails, isLoading, isError, error, isSuccess } = useGetSessionDetailsQuery(session_id);

  useEffect(() => {
    if (isError) {
      navigate('/admin/payment/failure')
    }
    if (getSessionDetails) {
      setSessionData(getSessionDetails.data);
    }
  }, [getSessionDetails, isLoading, isSuccess])

  // Get the session ID
  const data = [
    {
      title: 'Amount Paid',
      value: `$${sessionData?.totalAmount}`,
    },
    {
      title: 'Plan Type',
      value: sessionData?.planType?.plan_type,
    },
    {
      title: 'Duration',
      value: sessionData?.planType?.duration,
    },
    {
      title: 'Payment Status',
      value: sessionData?.paymentStatus
    },
    {
      title: 'Payment Date',
      value: new Date(sessionData?.date).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }),
    },
  ];

  return (
    <>

     <ShortHeader>
     <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',backgroundColor: '#fff', width: '100%'}}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            width: '100%',
            maxWidth: '500px',
            textAlign: 'center',
           
          }}
        >
          {!isLoading ?
            <>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'success.light',
                }}
              >
                <CircleCheckBig size={64} />
              </Box>
              <Typography variant="h4" fontWeight={'bold'}>
                Payment Successful
              </Typography>
              <Typography variant="body1" color={'text.secondary'}>
                Thank you for your purchase!
              </Typography>
              <Box
                sx={{
                  borderColor: 'gray',
                  border: '1px solid #e0e0e0',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 2,
                  padding: 2,
                  borderRadius: 2,
                  fontWeight: 'bold',
                  flexDirection: 'column',
                  width: '100%',
                }}
              >
                {data?.map((item, index) => (
                  <Stack
                    key={index + item}
                    sx={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      width: '100%',
                      textTransform: 'capitalize',
                    }}
                  >
                    <Typography variant="body2">{item.title}:</Typography>
                    <Typography variant="body2" >{item.value}</Typography>
                  </Stack>
                ))}
              </Box>
              <StyledButton variant="contained" type="submit" size="small" onClick={() => navigate('/admin/home')}>
                Return to Homepage
              </StyledButton>
            </>
            :
            <CircularProgress color="success" />
          }
        </Box>
      </Stack>
     </ShortHeader>
    </>
  );
}

export default PaymentSuccessPage;

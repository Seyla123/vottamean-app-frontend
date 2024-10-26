import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  CircularProgress,
  Divider,
  Alert,
  Fade,
  Grid,
  useTheme,
} from '@mui/material';
import { CircleCheckBig, AlertCircle, CreditCard } from 'lucide-react';
import StyledButton from '../../components/common/StyledMuiButton';
import { useGetSessionDetailsQuery } from '../../services/paymentApi';
import ShortHeader from '../../components/layout/ShortHeader';
import UnauthorizedPage from '../UnauthorizedPage';
import { shadow } from '../../styles/global';
import bgImage from '../../assets/images/payment-bg.png';

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const session_id = urlParams.get('session_id');

  const [sessionData, setSessionData] = useState({});
  const {
    data: getSessionDetails,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetSessionDetailsQuery(session_id);

  useEffect(() => {
    if (isError) {
      navigate('/admin/payment/failure');
    }
    if (getSessionDetails) {
      setSessionData(getSessionDetails.data);
    }
  }, [getSessionDetails, isError, navigate]);

  const paymentDetails = [
    {
      title: 'Amount Paid',
      value: `$${sessionData?.totalAmount}`,
      highlight: true,
      icon: <CreditCard size={20} />,
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
      value: sessionData?.paymentStatus,
      status: true,
    },
    {
      title: 'Payment Date',
      value: sessionData?.date
        ? new Date(sessionData.date).toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
          })
        : '-',
    },
  ];

  if (error) return <UnauthorizedPage />;

  return (
    <ShortHeader sx={styles.pageWrapper}>
      {/* Top Background Section */}
      <Box sx={styles.topSection}></Box>

      <Container maxWidth="md" sx={styles.container}>
        <Fade in={!isLoading} timeout={800}>
          <Paper elevation={4} sx={styles.paper}>
            {isLoading ? (
              <Box sx={styles.loaderContainer}>
                <CircularProgress color="primary" size={40} />
                <Typography variant="body1" color="text.secondary">
                  Processing your payment...
                </Typography>
              </Box>
            ) : (
              <Box sx={styles.contentContainer}>
                <Box sx={styles.successIconWrapper}>
                  <CircleCheckBig size={80} color="#6EC207" />
                </Box>
                <Box sx={styles.successHeader}>
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    color="primary"
                    sx={{ mb: 1 }}
                  >
                    Payment Successful
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                  >
                    Thank you for your purchase! Your transaction has been
                    completed.
                  </Typography>
                </Box>

                <Box sx={styles.amountDisplay}>
                  <Typography variant="h3" fontWeight="bold">
                    ${sessionData?.totalAmount}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    Total Amount Paid
                  </Typography>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Grid container spacing={2.5} sx={styles.detailsGrid}>
                  {paymentDetails.slice(1).map((detail, index) => (
                    <Grid item xs={12} key={index}>
                      <Box sx={styles.detailRow}>
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          sx={{
                            textTransform: 'capitalize',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                          }}
                        >
                          {detail.icon}
                          {detail.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: detail.highlight ? 700 : 500,
                            color: detail.status
                              ? 'success.main'
                              : 'text.primary',
                            textTransform: 'capitalize',
                          }}
                        >
                          {detail.value}
                        </Typography>
                      </Box>
                      {index !== paymentDetails.length - 2 && (
                        <Divider sx={{ mt: 1 }} />
                      )}
                    </Grid>
                  ))}
                </Grid>

                {/* <Alert
                  severity="info"
                  icon={<AlertCircle size={24} />}
                  sx={styles.alert}
                >
                  A confirmation email has been sent to your registered email
                  address.
                </Alert> */}

                <StyledButton
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={() => navigate('/admin/home')}
                  sx={styles.button}
                >
                  Return to Homepage
                </StyledButton>
              </Box>
            )}
          </Paper>
        </Fade>
      </Container>
    </ShortHeader>
  );
};

const styles = {
  pageWrapper: {
    minHeight: '100vh',
    position: 'relative',
  },
  topSection: {
    height: '40vh',
    width: '100%',
    bgcolor: 'primary.main',
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  successIconWrapper: {
    borderRadius: '50%',
    bgcolor: 'rgba(255, 255, 255, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    mb: 4,
  },
  container: {
    position: 'relative',
    pt: '15vh',
    pb: 4,
  },
  paper: {
    p: 4,
    width: '100%',
    borderRadius: 3,
    bgcolor: 'background.paper',
    boxShadow: shadow,
  },
  loaderContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    p: 4,
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  successHeader: {
    textAlign: 'center',
  },
  amountDisplay: {
    textAlign: 'center',
    py: 3,
    px: 4,
    borderRadius: 2,
    border: '1px solid #e0e0e0',
    mt: 2,
  },
  detailsGrid: {
    mb: 2,
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alert: {
    mb: 3,
  },
  button: {
    py: 1.5,
    mt: 2,
  },
};

export default PaymentSuccessPage;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/new-logo-name.svg';

// Redux hooks and actions
import { useForgotPasswordMutation } from '../../services/authApi';
import { useDispatch } from 'react-redux';
import { setSnackbar } from '../../store/slices/uiSlice';

// Material UI components
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  CircularProgress,
} from '@mui/material';

// Image and Icon
import BackgroundImage from '../../assets/images/forgot-pass-illustrate.svg';
import HeaderTitle from '../../components/auth/HeaderTitle';
import { ChevronLeft, Fingerprint, Mail } from 'lucide-react';
import EmailSentIcon from '../../assets/icon/email-sent.svg';

// Validator
import { ForgotPasswordValidator } from '../../validators/validationSchemas';
import StyledButton from '../../components/common/StyledMuiButton';
import InputField from '../../components/common/InputField';

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const [isEmailSent, setIsEmailSent] = useState(false);
  // Hook form setup with Yup validation
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ForgotPasswordValidator),
  });

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleForgotPassword = async (formData) => {
    try {
      const result = await forgotPassword({ email: formData.email }).unwrap();
      if (result.status === 'success') {
        setIsEmailSent(true);
        dispatch(
          setSnackbar({
            open: true,
            message: result.message,
            severity: 'success',
          }),
        );
      } else {
        dispatch(
          setSnackbar({
            open: true,
            message: result.message,
            severity: 'error',
          }),
        );
      }
    } catch (err) {
      dispatch(
        setSnackbar({
          open: true,
          message: err?.data?.message,
          severity: 'error',
        }),
      );
    }
  };

  return (
    <Box component="section" sx={styles.pageContainer}>
      {/* LEFT CONTAINER */}
      <Box component="div" sx={styles.leftContainer}>
        {/* LOGO */}
        <img src={Logo} alt="vottamean logo" style={styles.logo} />
        {/* FORM CONTAINER */}
        <Box sx={styles.formContainer}>
          {isEmailSent ? (
            <Box sx={styles.emailContainer}>
              <img
                src={EmailSentIcon}
                alt="email-sent"
                style={{ width: '200px' }}
              />
              <Typography variant="h4">Email Sent</Typography>
              <Typography variant="body1">
                We have sent a password reset link to your email. Please check
                your{' '}
                <Link
                  target="_blank"
                  to={'https://mail.google.com/mail/u/0/#inbox'}
                  style={{ textDecoration: 'underline' }}
                >
                  Email
                </Link>
                .
              </Typography>
            </Box>
          ) : (
            <>
              {' '}
              <Box component={'div'} sx={styles.iconContainer}>
                <Fingerprint size={100} />
              </Box>
              {/* FORM HEADER */}
              <HeaderTitle
                title={'Forgot Password?'}
                subTitle={`Enter your email, and we'll send you instructions to reset your password.`}
              />
              {/* EMAIL INPUT */}
              <InputField
                name="email"
                control={control}
                label="Email"
                placeholder="Enter your email"
                errors={errors}
                icon={Mail}
              />
              {/* <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="body2" fontWeight="bold">
                  Email <span style={{ color: 'red', marginLeft: 1 }}>*</span>
                </Typography>
                <TextField
                  id="email"
                  variant="outlined"
                  fullWidth
                  type="email"
                  {...register('email')}
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ''}
                  placeholder="Enter your email"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Mail size={18} />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Box> */}
              <StyledButton
                variant="contained"
                fullWidth
                size="small"
                disabled={isLoading}
                onClick={handleSubmit(handleForgotPassword)}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Reset Password'
                )}
              </StyledButton>
            </>
          )}

          {/* FOOTER */}
          <Link to={'/auth/signin'} style={styles.footer}>
            <ChevronLeft size={18} />
            <Typography variant="body2">Back to sign in</Typography>
          </Link>
        </Box>
      </Box>

      {/* RIGHT CONTAINER */}
      <Box component="div" sx={styles.rightContainer}>
        {/* IMAGE OVERLAY */}
        <Box component="div" sx={styles.imageOverlay} />

        {/* CONTENT */}
        <Box sx={styles.content}>
          <Typography variant="h3" color="white">
            Don't worry, resetting your password is easy!
          </Typography>
          <Typography variant="body1" color="white">
            Follow the instructions sent to your email to create a new password.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const styles = {
  pageContainer: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    p: 2,
    gap: 2,
    bgcolor: 'white',
  },
  leftContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  logo: {
    width: '150px',
    position: 'absolute',
    top: '10px',
    left: '10px',
    zIndex: 10,
  },
  iconContainer: {
    width: {
      xs: '40px',
      md: '50px',
    },
    height: {
      xs: '40px',
      md: '50px',
    },
    p: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    border: '1px solid #ccc',
  },
  formContainer: {
    width: '100%',
    maxWidth: '400px',
    height: '100%',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    margin: '0 auto',
  },
  rightContainer: {
    display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' },
    position: 'relative',
    zIndex: 1,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(180deg, #64b5f6 0%, #8B93FF 100%)',

    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    borderRadius: 2,
    p: 2,
    overflow: 'hidden',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `url(${BackgroundImage})`,
    pointerEvents: 'none',
  },
  content: {
    p: 4,
    bottom: 0,
    left: 0,
    width: '100%',
    maxWidth: '800px',
    position: 'absolute',
    zIndex: 50,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  footer: {
    color: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 1,
  },
  emailContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    alignItems: 'center',
    textAlign: 'center',
  },
};

export default ForgotPasswordPage;

// React and third-party libraries
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Material UI components
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  Snackbar,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';

// - Lucid Icons
import {
  ChevronLeft,
  EyeIcon,
  EyeOff,
  RectangleEllipsis,
  LockKeyholeOpen,
  Phone,
} from 'lucide-react';

// - Redux hooks and actions
import { useResetPasswordMutation } from '../../services/authApi';
import { setSnackbar } from '../../store/slices/uiSlice';

// Custom Components
import HeaderTitle from '../../components/auth/HeaderTitle';
import PasswordIndicator from '../../components/auth/PasswordIndicator';

// Icons
import BackgroundImage from '../../assets/images/reset-password-illustration.svg';
import Logo from '../../assets/images/Logo.svg';

// Validator
import { ResetPasswordValidator } from '../../validators/validationSchemas';

const ResetNewPasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    number: false,
    letter: false,
    special: false,
  });

  // Hook form setup with Yup validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ResetPasswordValidator),
  });

  // - Redux Reset Password API
  const [resetPassword, { isLoading, isSuccess, isError, error }] =
    useResetPasswordMutation();

  const handlePasswordReset = async (formData) => {
    try {
      await resetPassword({
        token,
        newPassword: formData.password,
      }).unwrap();
      // Navigate after successful reset
      setTimeout(() => {
        navigate('/auth/signin');
      }, 3000); // Navigate after 3 seconds
    } catch (err) {
      console.error('Password reset error:', err);
    }
  };

  // // Validate password whenever it changes
  // useEffect(() => {
  //   validatePassword(formData.password);
  // }, [formData.password]);

  // const validatePassword = (password) => {
  //   if (password) {
  //     setPasswordValidation({
  //       length: password.length >= 8,
  //       number: /[0-9]/.test(password),
  //       letter: /[a-zA-Z]/.test(password),
  //       special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  //     });
  //   } else {
  //     // Reset validation state if password is empty
  //     setPasswordValidation({
  //       length: false,
  //       number: false,
  //       letter: false,
  //       special: false,
  //     });
  //   }
  // };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    if (isError) {
      dispatch(
        setSnackbar({
          open: true,
          severity: 'error',
          message: error.data.message,
        }),
      );
    } else if (isSuccess) {
      dispatch(
        setSnackbar({
          open: true,
          severity: 'success',
          message:
            'Your Password has been successfully changed. Please try to login.',
        }),
      );
      // navigate to login once success
      navigate('/auth/signin');
    }
  }, [isError, isSuccess, dispatch, error]);

  return (
    <Box component="section" sx={styles.pageContainer}>
      {/* LEFT CONTAINER */}
      <Box component="div" sx={styles.leftContainer}>
        {/* LOGO */}
        <img src={Logo} alt="wavetrack logo" style={styles.logo} />

        {/* FORM MAIN */}
        <Box sx={styles.formContainer}>
          <Box component={'div'} sx={styles.iconContainer}>
            <RectangleEllipsis size={100} />
          </Box>
          {/* FORM HEADER */}
          <HeaderTitle
            title={'Reset New Password'}
            subTitle={'Enter your new password to reset your password.'}
          />
          <form onSubmit={handleSubmit(handlePasswordReset)} noValidate>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: 2, md: 3 },
              }}
            >
              {/* NEW PASSWORD INPUT */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="body2" fontWeight="bold">
                  New Password{' '}
                  <span style={{ color: 'red', marginLeft: 1 }}>*</span>
                </Typography>
                <TextField
                  id="password"
                  variant="outlined"
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ''}
                  placeholder="Enter new password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockKeyholeOpen size={20} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={togglePasswordVisibility}
                          size="icon"
                        >
                          {showPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <EyeIcon size={20} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              {/* CONFIRM PASSWORD INPUT */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="body2" fontWeight="bold">
                  Confirm Password{' '}
                  <span style={{ color: 'red', marginLeft: 1 }}>*</span>
                </Typography>
                <TextField
                  id="confirmPassword"
                  variant="outlined"
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  {...register('passwordConfirm')}
                  error={!!errors.passwordConfirm}
                  helperText={
                    errors.passwordConfirm ? errors.passwordConfirm.message : ''
                  }
                  placeholder="Confirm new password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockKeyholeOpen size={20} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={togglePasswordVisibility}
                          size="icon"
                        >
                          {showPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <EyeIcon size={20} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              {/* PASSWORD VALIDITY INDICATORS */}
              <Box
                sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}
              >
                <Typography variant="body2" fontWeight="bold">
                  Register Requirement{' '}
                  <span style={{ color: 'red', marginLeft: 1 }}>*</span>
                </Typography>
                <PasswordIndicator
                  isValid={passwordValidation.length}
                  message="At least 8 characters."
                />
                <PasswordIndicator
                  isValid={passwordValidation.letter}
                  message="Contain at least one letter."
                />
                <PasswordIndicator
                  isValid={passwordValidation.number}
                  message="Contain at least one number."
                />
                <PasswordIndicator
                  isValid={passwordValidation.special}
                  message="Contain at least one special character."
                />
              </Box>

              <Button
                variant="contained"
                onClick={handleSubmit(handlePasswordReset)}
                disabled={isLoading}
                size="large"
              >
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </Button>
            </Box>
          </form>
          {/* FOOTER */}
          <Link to={'/auth/signin'} style={styles.footer}>
            <ChevronLeft size={20} />
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
            Password Security Tips:
          </Typography>
          <Typography variant="subtitle1" color="white">
            - Make sure your new password is strong and unique. Need help?
            <br />- Use a mix of letters, numbers, and symbols for a secure
            password.
          </Typography>
          <Typography variant="body1" color="white">
            Reach out to our support team if you're facing any issues.{' '}
          </Typography>
          <Link to={'/'} style={styles.contactSupport}>
            <Phone size={14} />
            <span style={{ marginLeft: 6 }}> HexCode+ Support</span>
          </Link>
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
    zIndex: 10,
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
    backgroundImage: `url(${BackgroundImage})`,
    backgroundRepeat: 'no-repeat',
    top: 0,
    left: 0,
    zIndex: 1,
    width: '100%',
    height: '100%',
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

  contactSupport: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    width: 'fit-content',
    background: 'white',
    borderRadius: '4px',
    padding: '2px 8px',
  },
};

export default ResetNewPasswordPage;

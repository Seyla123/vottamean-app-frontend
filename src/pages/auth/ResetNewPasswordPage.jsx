// React and third-party libraries
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams, useNavigate } from 'react-router-dom';
import { useResetPasswordMutation } from '../../services/authApi';

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
import HeaderTitle from '../../components/auth/HeaderTitle';

// Icons
import BackgroundImage from '../../assets/images/reset-password-illustration.svg';
import Logo from '../../assets/images/Logo.svg';

// Validator
import { ResetPasswordValidator } from '../../validators/validationSchemas';
import zIndex from '@mui/material/styles/zIndex';
import { EyeIcon, EyeOff, LockKeyhole, Phone } from 'lucide-react';

const ResetNewPasswordPage = () => {
  const { token } = useParams();
  const { showPassword, setShowPassword } = useState(false);
  const navigate = useNavigate();
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  // Hook form setup with Yup validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ResetPasswordValidator),
  });

  const [resetPassword, { isLoading, isSuccess, error }] =
    useResetPasswordMutation();
  const handlePasswordReset = async (formData) => {
    try {
      await resetPassword({
        token,
        newPassword: formData.password,
      }).unwrap();
      setOpenSuccess(true);
    } catch (err) {
      setOpenError(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenError(false);
    setOpenSuccess(false);
  };

  // Automatically navigate to login page after 3 seconds on success
  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        navigate('/auth/signin');
      }, 3000); // 3 seconds

      // Clean up the timer when the component unmounts or when isSuccess changes
      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);

  return (
    <Box component="section" sx={styles.pageContainer}>
      {/* LEFT CONTAINER */}
      <Box component="div" sx={styles.leftContainer}>
        {/* LOGO */}
        <img src={Logo} alt="wavetrack logo" style={styles.logo} />

        {/* FORM CONTAINER */}
        <Box sx={styles.formContainer}>
          {/* FORM MAIN */}
          <form onSubmit={handleSubmit(handlePasswordReset)} noValidate>
            {/* PASSWORD INPUT */}
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
                helperText={errors.password?.message}
                placeholder="Enter new password"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockKeyhole size={20} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        size="icon"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <EyeIcon size={20} />
                        )}
                      </IconButton>
                    ),
                  },
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
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
                placeholder="Confirm new password"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockKeyhole size={20} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        size="icon"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <EyeIcon size={20} />
                        )}
                      </IconButton>
                    ),
                  },
                }}
              />
            </Box>
          </form>
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
          <Typography variant="body1" color="white" sx={styles.contactSupport}>
            <Phone size={14} />
            Reach out to our support team if you're facing any issues.
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
    borderRadius: 2,
  },
};

export default ResetNewPasswordPage;

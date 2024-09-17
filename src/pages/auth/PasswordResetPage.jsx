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
} from '@mui/material';

// Icons
import GoBackButton from '../../components/common/GoBackButton';
import resetIcon from '../../assets/icon/reset.png';

// Validator
import { ResetPasswordValidator } from '../../validators/validationSchemas';

function PasswordResetPage() {
  const { token } = useParams();
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
        navigate('/auth/login');
      }, 3000); // 3 seconds

      // Clean up the timer when the component unmounts or when isSuccess changes
      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);

  return (
    <Box sx={screen}>
      <Card sx={content}>
        <Box>
          <GoBackButton />
          <Box sx={img}>
            <img
              src={resetIcon}
              style={{ width: '100%' }}
              alt="Reset Password"
            />
          </Box>
        </Box>

        <Box sx={resetTitle}>
          <Typography
            sx={{ fontSize: { xs: '24px', md: '36px' }, fontWeight: 'bold' }}
          >
            Reset Your Password
          </Typography>
          <Typography sx={{ fontSize: { xs: '14px', md: '16px' } }}>
            Set a new password here!
          </Typography>
        </Box>

        {/* Form with password inputs */}
        <Box sx={textInputContainer}>
          <Box sx={textfield}>
            <Typography>New Password</Typography>
            <TextField
              id="password"
              placeholder="new password"
              variant="outlined"
              type="password"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ''}
            />
          </Box>

          <Box sx={textfield}>
            <Typography>Confirm Password</Typography>
            <TextField
              id="confirmPassword"
              placeholder="confirm password"
              variant="outlined"
              type="password"
              {...register('passwordConfirm')}
              error={!!errors.passwordConfirm}
              helperText={
                errors.passwordConfirm ? errors.passwordConfirm.message : ''
              }
            />
          </Box>
        </Box>

        <Button
          variant="contained"
          onClick={handleSubmit(handlePasswordReset)}
          disabled={isLoading}
          sx={{ width: '100%', height: { xs: '42px', md: '56px' } }}
        >
          {isLoading ? 'Resetting...' : 'Reset Password'}
        </Button>

        {/* Snackbar for displaying error */}
        {openError && (
          <Snackbar
            open={openError}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity="error"
              sx={{ width: '100%' }}
            >
              {error?.data?.message || 'Failed to reset password. Try again'}
            </Alert>
          </Snackbar>
        )}

        {/* Snackbar for displaying success */}
        {openSuccess && (
          <Snackbar
            open={openSuccess}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity="success"
              sx={{ width: '100%' }}
            >
              Password reset successful! Redirecting to login...
            </Alert>
          </Snackbar>
        )}
      </Card>
    </Box>
  );
}

export default PasswordResetPage;

const screen = {
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  mx: 'auto',
  bgcolor: '#F9FAFB',
};

const content = {
  bgcolor: '#FFFFFF',
  maxWidth: '550px',
  width: '100%',
  maxHeight: '602px',
  mx: 'auto',
  my: 'auto',
  borderRadius: '16px',
  py: '32px',
  px: { xs: '24px', md: '32px' },
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
};

const textInputContainer = {
  display: 'flex',
  flexDirection: 'column',
  gap: { xs: '24px', md: '32px' },
  width: '100%',
};

const textfield = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  width: '100%',
};

const img = {
  mx: 'auto',
  width: { xs: '90px', md: '100px' },
};

const resetTitle = {
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
};

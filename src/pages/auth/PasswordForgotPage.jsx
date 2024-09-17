import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  Snackbar,
  Alert,
} from '@mui/material';
import { Link } from 'react-router-dom';
import GoBackButton from '../../components/common/GoBackButton';
import forgetIcon from '../../assets/icon/forget.png';
import { useForgotPasswordMutation } from '../../services/authApi';
import { ForgotPasswordValidator } from '../../validators/validationSchemas';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

function PasswordForgotPage() {
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  // Hook form setup with Yup validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ForgotPasswordValidator),
  });

  const [forgotPassword, { isLoading, error, isSuccess }] =
    useForgotPasswordMutation();

  const handleForgotPassword = async (formData) => {
    try {
      await forgotPassword({ email: formData.email }).unwrap();
      setOpenSuccess(true);
    } catch (err) {
      setOpenError(true);
    }
  };

  // Automatically close Snackbars after a duration
  const handleCloseSnackbar = () => {
    setOpenError(false);
    setOpenSuccess(false);
  };

  return (
    <Box sx={screen}>
      <Card sx={content}>
        <Box>
          <GoBackButton />
          <Box sx={img}>
            <img
              src={forgetIcon}
              style={{ width: '100%' }}
              alt="Forgot password"
            />
          </Box>
        </Box>

        <Box sx={resetTitle}>
          <Typography
            sx={{ fontSize: { xs: '24px', md: '36px' }, fontWeight: 'bold' }}
          >
            Forgot Password?
          </Typography>
          <Typography sx={{ fontSize: { xs: '14px', md: '16px' } }}>
            We will send you an email to reset your password
          </Typography>
        </Box>

        {/* Form with email input */}
        <Box sx={textInputContainer}>
          <Box sx={textfield}>
            <Typography>Email</Typography>
            <TextField
              id="email"
              placeholder="email"
              variant="outlined"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
            />
          </Box>
        </Box>

        <Box display={'flex'} flexDirection={'column'} gap={'8px'}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleSubmit(handleForgotPassword)}
            disabled={isLoading}
            sx={{ padding: { xs: 1.5, md: 2 } }}
          >
            {isLoading ? 'Sending...' : 'Continue'}
          </Button>
          <Box
            sx={{
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="body1">
              Don't have an account?
              <Link to="/auth/signup">
                <Typography variant="body1" component="span" color="primary">
                  {' '}
                  Sign Up
                </Typography>
              </Link>
            </Typography>
          </Box>
        </Box>

        {/* Snackbar for displaying error */}
        {error && (
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
              {error?.data?.message ||
                'Failed to send reset email. Please try again later.'}
            </Alert>
          </Snackbar>
        )}

        {/* Snackbar for displaying success */}
        {isSuccess && (
          <Snackbar
            open={openSuccess}
            autoHideDuration={2000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity="success"
              sx={{ width: '100%' }}
            >
              Password reset email sent successfully! Check your inbox.
            </Alert>
          </Snackbar>
        )}
      </Card>
    </Box>
  );
}

export default PasswordForgotPage;

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

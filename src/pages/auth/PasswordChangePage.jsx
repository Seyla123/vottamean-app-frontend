// React and third-party libraries
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Redux hooks and actions
import { useChangePasswordMutation } from '../../services/authApi';

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
import change from '../../assets/icon/change.png';

// Validator
import { ChangePasswordValidator } from '../../validators/validationSchemas';
import StyledButton from '../../components/common/StyledMuiButton';

function PasswordChangePage() {
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  // Hook form setup with Yup validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(ChangePasswordValidator),
  });

  const [changePassword, { isLoading, error }] = useChangePasswordMutation();

  const handlePasswordChange = async (formData) => {
    console.log('Form Data:', formData);
    try {
      const response = await changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      }).unwrap();

      console.log('API Response:', response);
      setOpenSuccess(true);
      reset();
    } catch (err) {
      console.error('API Error:', err);
      setOpenError(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenError(false);
    setOpenSuccess(false);
  };

  return (
    <Box sx={screen}>
      <Card sx={content}>
        {/* Back button and image */}
        <Box>
          <GoBackButton />
          <Box sx={img}>
            <img src={change} style={{ width: '100%' }} alt="Change Password" />
          </Box>
        </Box>
        {/* Reset Password Title */}
        <Box sx={resetTitle}>
          <Typography
            sx={{ fontSize: { xs: '24px', md: '36px' }, fontWeight: 'bold' }}
          >
            Change Password
          </Typography>
          <Typography sx={{ fontSize: { xs: '14px', md: '16px' } }}>
            Set a new password here!
          </Typography>
        </Box>

        {/* Form with password inputs */}
        <Box sx={textInputContainer}>
          <Box sx={textfield}>
            <Typography>Current Password</Typography>
            <TextField
              id="currentPassword"
              placeholder="Current password"
              variant="outlined"
              type="password"
              {...register('currentPassword')}
              error={!!errors.currentPassword}
              helperText={
                errors.currentPassword ? errors.currentPassword.message : ''
              }
            />
          </Box>

          <Box sx={textfield}>
            <Typography>New Password</Typography>
            <TextField
              id="newPassword"
              placeholder="New password"
              variant="outlined"
              type="password"
              {...register('newPassword')}
              error={!!errors.newPassword}
              helperText={errors.newPassword ? errors.newPassword.message : ''}
            />
          </Box>

          <Box sx={textfield}>
            <Typography>Confirm Password</Typography>
            <TextField
              id="newPasswordConfirm"
              placeholder="Confirm password"
              variant="outlined"
              type="password"
              {...register('newPasswordConfirm')}
              error={!!errors.newPasswordConfirm}
              helperText={
                errors.newPasswordConfirm
                  ? errors.newPasswordConfirm.message
                  : ''
              }
            />
          </Box>
        </Box>

        <StyledButton
          variant="contained"
          onClick={handleSubmit(handlePasswordChange)}
          disabled={isLoading}
          size="small"
          sx={{ width: '100%', height: { xs: '42px', md: '56px' } }}
        >
          {isLoading ? 'Saving...' : 'Save changes'}
        </StyledButton>

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
              {error?.data?.message ||
                'Failed to update password. Please try again'}
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
              Password updated successfully!
            </Alert>
          </Snackbar>
        )}
      </Card>
    </Box>
  );
}

export default PasswordChangePage;

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
  maxHeight: '716px',
  mx: 'auto',
  my: 'auto',
  borderRadius: '16px',
  py: '32px',
  px: {
    xs: '24px',
    md: '32px',
  },
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
};

const textInputContainer = {
  display: 'flex',
  flexDirection: 'column',
  gap: {
    xs: '24px',
    md: '32px',
  },
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
  width: {
    xs: '90px',
    md: '100px',
  },
};

const resetTitle = {
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
};

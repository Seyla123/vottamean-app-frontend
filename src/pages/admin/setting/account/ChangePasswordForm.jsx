import React, { useState } from 'react';
import {
  Card,
  Typography,
  Box,
  Button,
  InputAdornment,
  TextField,
  IconButton,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { setSnackbar } from '../../../../store/slices/uiSlice';
import { shadow } from '../../../../styles/global';
import { ChangePasswordValidator } from '../../../../validators/validationSchemas';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useChangePasswordMutation } from '../../../../services/authApi';
import { EyeIcon, EyeOff, KeyRound } from 'lucide-react';
import FormComponent from '../../../../components/common/FormComponent';

const ChangePasswordForm = () => {
  const dispatch = useDispatch();

  const [isShowPassword, setIsShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setIsShowPassword((prevShowPassword) => !prevShowPassword);
  };

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
      dispatch(
        setSnackbar({
          open: true,
          message: 'Password changed successfully!',
          severity: 'success',
        }),
      );
      reset();
    } catch (err) {
      console.error('API Error:', err);
      dispatch(
        setSnackbar({
          open: true,
          message: 'Failed to change password. Please try again.',
          severity: 'error',
        }),
      );
    }
  };

  return (
    <FormComponent
      title={'Password Management'}
      subTitle={
        'To ensure the security of your account, we recommend changing your password periodically.'
      }
    >
      <Card sx={shadow}>
        <Box
          component={'section'}
          sx={{
            margin: 'auto',
            p: 5,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* FORM CONTAINTER */}
          <Box
            component={'div'}
            sx={{
              border: '1px solid #e0e0e0',
              borderRadius: 2,
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              alignItems: 'start',
            }}
          >
            <Box component={'div'}>
              <Typography variant="h6">Modify your new password</Typography>
              <Typography variant="body1">
                For security reasons, we recommend changing your password
                regularly.
              </Typography>
            </Box>

            {/* CURRENT PASSWORD INPUT */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                width: '100%',
                maxWidth: '400px',
              }}
            >
              <Typography variant="body1" fontWeight="bold">
                Current Password{' '}
              </Typography>
              <TextField
                id="currentPassword"
                variant="outlined"
                fullWidth
                type={isShowPassword ? 'text' : 'password'}
                placeholder="Enter your current password."
                {...register('currentPassword')}
                error={!!errors.currentPassword}
                helperText={
                  errors.currentPassword ? errors.currentPassword.message : ''
                }
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <KeyRound size={20} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <IconButton
                        onClick={togglePasswordVisibility}
                        size="icon"
                      >
                        {isShowPassword ? (
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

            {/* NEW PASSWORD INPUT */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                width: '100%',
                maxWidth: '400px',
              }}
            >
              <Typography variant="body1" fontWeight="bold">
                New Password{' '}
              </Typography>
              <TextField
                id="newPassword"
                variant="outlined"
                fullWidth
                type={isShowPassword ? 'text' : 'password'}
                placeholder="Enter your new password."
                {...register('newPassword')}
                error={!!errors.newPassword}
                helperText={
                  errors.newPassword ? errors.newPassword.message : ''
                }
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <KeyRound size={20} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <IconButton
                        onClick={togglePasswordVisibility}
                        size="icon"
                      >
                        {isShowPassword ? (
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
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                width: '100%',
                maxWidth: '400px',
              }}
            >
              <Typography variant="body1" fontWeight="bold">
                Confirm Password{' '}
              </Typography>
              <TextField
                id="newPasswordConfirm"
                variant="outlined"
                fullWidth
                type={isShowPassword ? 'text' : 'password'}
                placeholder="Enter your new password."
                {...register('newPasswordConfirm')}
                error={!!errors.newPasswordConfirm}
                helperText={
                  errors.newPasswordConfirm
                    ? errors.newPasswordConfirm.message
                    : ''
                }
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <KeyRound size={20} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <IconButton
                        onClick={togglePasswordVisibility}
                        size="icon"
                      >
                        {isShowPassword ? (
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

            {/* REQUIREMENT */}
            <Box>
              <Typography variant="body1" fontWeight="bold">
                Password Requirements{' '}
                <span style={{ color: 'red', marginLeft: 1 }}>*</span>
              </Typography>
              <Typography variant="body1">
                <Box component={'ul'} sx={{ mt: 1 }}>
                  <Box component={'li'}>At least 8 characters.</Box>
                  <Box component={'li'}>Contain at least one number.</Box>
                  <Box component={'li'}>
                    Contain at least one uppercase letter.
                  </Box>
                  <Box component={'li'}>
                    Contain at least one special character.
                  </Box>
                </Box>
              </Typography>
            </Box>

            {/* SUBMIT BUTTON */}
            <Button
              variant="contained"
              onClick={handleSubmit(handlePasswordChange)}
              disabled={isLoading}
              size="large"
            >
              {isLoading ? 'Saving...' : 'Save changes'}
            </Button>
          </Box>
        </Box>
      </Card>
    </FormComponent>
  );
};

export default ChangePasswordForm;

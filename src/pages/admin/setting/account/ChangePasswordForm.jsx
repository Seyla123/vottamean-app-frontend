// - React and third-party libraries
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// - Material UI Components
import {
  Typography,
  Box,
  Button,
  InputAdornment,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { setSnackbar } from '../../../../store/slices/uiSlice';
import { ChangePasswordValidator } from '../../../../validators/validationSchemas';
import { useChangePasswordMutation } from '../../../../services/authApi';
import { EyeIcon, EyeOff, KeyRound } from 'lucide-react';
import StyledButton from '../../../../components/common/StyledMuiButton';

const ChangePasswordForm = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [isShowPassword, setIsShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setIsShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(ChangePasswordValidator),
  });

  const [changePassword, { isLoading, error, isSuccess, isError }] =
    useChangePasswordMutation();
  useEffect(() => {
    if (isSuccess) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Password changed successfully!',
          severity: 'success',
        }),
      );
      onClose();
    } else if (isError) {
      dispatch(
        setSnackbar({
          open: true,
          message: error.data.message,
          severity: 'error',
        }),
      );
    }
  }, [error, dispatch, isError, isSuccess, onClose]);

  const handlePasswordChange = async (formData) => {
    await changePassword({
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
    }).unwrap();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Change Password
        <Typography variant="body1">
          To ensure the security of your account, we recommend changing your
          password periodically.
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* CURRENT PASSWORD INPUT */}
        <Box>
          <Typography variant="body1" fontWeight="bold" sx={{ mb: 1 }}>
            Current Password
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <KeyRound size={20} />
                </InputAdornment>
              ),
              endAdornment: (
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {isShowPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <EyeIcon size={20} />
                  )}
                </IconButton>
              ),
            }}
          />
        </Box>

        {/* NEW PASSWORD INPUT */}
        <Box>
          <Typography variant="body1" fontWeight="bold" sx={{ mb: 1 }}>
            New Password
          </Typography>
          <TextField
            id="newPassword"
            variant="outlined"
            fullWidth
            type={isShowPassword ? 'text' : 'password'}
            placeholder="Enter your new password."
            {...register('newPassword')}
            error={!!errors.newPassword}
            helperText={errors.newPassword ? errors.newPassword.message : ''}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <KeyRound size={20} />
                </InputAdornment>
              ),
              endAdornment: (
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {isShowPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <EyeIcon size={20} />
                  )}
                </IconButton>
              ),
            }}
          />
        </Box>

        {/* CONFIRM PASSWORD INPUT */}
        <Box>
          <Typography variant="body1" fontWeight="bold" sx={{ mb: 1 }}>
            Confirm Password
          </Typography>
          <TextField
            id="newPasswordConfirm"
            variant="outlined"
            fullWidth
            type={isShowPassword ? 'text' : 'password'}
            placeholder="Confirm your new password."
            {...register('newPasswordConfirm')}
            error={!!errors.newPasswordConfirm}
            helperText={
              errors.newPasswordConfirm ? errors.newPasswordConfirm.message : ''
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <KeyRound size={20} />
                </InputAdornment>
              ),
              endAdornment: (
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {isShowPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <EyeIcon size={20} />
                  )}
                </IconButton>
              ),
            }}
          />
        </Box>

        {/* REQUIREMENT */}
        <Box>
          <Typography variant="body1" fontWeight="bold">
            Password Requirements{' '}
            <span style={{ color: 'red', marginLeft: 1 }}>*</span>
          </Typography>
          <Typography variant="body2" component="ul" sx={{ pl: 2 }}>
            <li>At least 8 characters.</li>
            <li>Contain at least one number.</li>
            <li>Contain at least one uppercase letter.</li>
            <li>Contain at least one special character.</li>
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <StyledButton onClick={onClose}>Cancel</StyledButton>
        <StyledButton
          variant="contained"
          onClick={handleSubmit(handlePasswordChange)}
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save changes'}
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordForm;

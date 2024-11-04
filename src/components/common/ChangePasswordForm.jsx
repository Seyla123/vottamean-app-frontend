// - React and third-party libraries
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// - Material UI Components
import {
  Typography,
  Box,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
} from '@mui/material';

// - Lucid Icons
import { KeyRound, X } from 'lucide-react';

// - Custom Components
import StyledButton from './StyledMuiButton';
import PasswordInput from '../auth/PasswordInput';

// - Redux Hooks and APIs
import { setSnackbar } from '../../store/slices/uiSlice';
import { useChangePasswordMutation } from '../../services/authApi';

// - Validator
import { ChangePasswordValidator } from '../../validators/validationSchemas';
import { BootstrapDialog } from './BootstrapDialog';

const ChangePasswordForm = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ChangePasswordValidator),
  });

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handlePasswordChange = async (formData) => {
    try {
      await changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      }).unwrap();

      dispatch(
        setSnackbar({
          open: true,
          message: 'Password changed successfully!',
          severity: 'success',
        }),
      );
      reset({
        currentPassword: '',
        newPassword: '',
        newPasswordConfirm: '',
      });
      onClose();
    } catch (error) {
      console.error('Password change error:', error);
      dispatch(
        setSnackbar({
          open: true,
          message: error.data?.message || 'Failed to change password',
          severity: 'error',
        }),
      );
    }
  };

  return (
    <BootstrapDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Change Password</DialogTitle>
      <IconButton
        onClick={onClose}
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <X />
      </IconButton>
      <DialogContent dividers>
        <Stack direction="column" gap={2}>
          {/* CURRENT PASSWORD INPUT */}
          <PasswordInput
            name="currentPassword"
            label="Current Password"
            control={control}
            showPassword={showPassword}
            togglePasswordVisibility={() => setShowPassword(!showPassword)}
            error={errors.currentPassword}
            placeholder="Enter your current password."
            icon={KeyRound}
          />
          {/* NEW PASSWORD INPUT */}
          <PasswordInput
            name="newPassword"
            label="New Password"
            control={control}
            showPassword={showPassword}
            togglePasswordVisibility={() => setShowPassword(!showPassword)}
            error={errors.newPassword}
            placeholder="Enter your new password."
            icon={KeyRound}
          />
          {/* CONFIRM PASSWORD INPUT */}
          <PasswordInput
            name="newPasswordConfirm"
            label="New Password"
            control={control}
            showPassword={showPassword}
            togglePasswordVisibility={() => setShowPassword(!showPassword)}
            error={errors.newPasswordConfirm}
            placeholder="Confirm your new password."
            icon={KeyRound}
          />
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
        </Stack>
      </DialogContent>
      <DialogActions>
        <StyledButton size="small" onClick={onClose}>
          Cancel
        </StyledButton>
        <StyledButton
          variant="contained"
          size="small"
          onClick={handleSubmit(handlePasswordChange)}
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save changes'}
        </StyledButton>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default ChangePasswordForm;

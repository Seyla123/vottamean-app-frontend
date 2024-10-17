// - React and third-party libraries
import React, { useEffect, useState } from 'react';
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

// - Lucid Icons
import { EyeIcon, EyeOff, KeyRound, X } from 'lucide-react';

// - Custom Components
import StyledButton from '../../../../components/common/StyledMuiButton';
import PasswordInput from '../../../../components/auth/PasswordInput';

// - Redux Hooks and APIs
import { setSnackbar } from '../../../../store/slices/uiSlice';
import { useChangePasswordMutation } from '../../../../services/authApi';

// - Validator
import { ChangePasswordValidator } from '../../../../validators/validationSchemas';

const ChangePasswordForm = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setIsShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const {
    control,
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
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
    </Dialog>
  );
};

export default ChangePasswordForm;

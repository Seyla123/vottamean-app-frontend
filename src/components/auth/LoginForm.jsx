import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  CircularProgress,
  Checkbox,
} from '@mui/material';
import { updateFormData } from '../../store/slices/formSlice';
import { useLoginMutation } from '../../services/authApi';
import { setSnackbar } from '../../store/slices/uiSlice';
import { LoginValidator } from '../../validators/validationSchemas';

const LoginForm = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(LoginValidator),
  });

  const handleFormSubmit = async (data) => {
    dispatch(updateFormData(data));

    try {
      const response = await login(data).unwrap();
      if (response.data) {
        const { role } = response.data;
        dispatch(
          setSnackbar({
            open: true,
            message: 'Logged in successfully',
            severity: 'success',
          }),
        );

        reset();

        const dashboardRoutes = {
          admin: '/admin/dashboard',
          teacher: '/teacher/dashboard',
        };
        navigate(dashboardRoutes[role] || '/something-went-wrong');
      }
    } catch (error) {
      dispatch(
        setSnackbar({
          open: true,
          message: error.data?.message || 'An error occurred during login',
          severity: 'error',
        }),
      );
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Box sx={styles.formContainer}>
        <FormField
          label="Email"
          type="email"
          register={register('email')}
          error={errors.email}
          icon={<Mail size={20} />}
        />

        <FormField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          register={register('password')}
          error={errors.password}
          icon={<LockKeyhole size={20} />}
          endAdornment={
            <IconButton onClick={togglePasswordVisibility} size="small">
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </IconButton>
          }
        />

        <Box sx={styles.rememberMeContainer}>
          <Checkbox />
          <Box sx={styles.rememberMeText}>
            <Typography variant="body2">Remember me</Typography>
            <Link to="/auth/forgot-password">
              <Typography variant="body2" color="primary">
                Forgot Password?
              </Typography>
            </Link>
          </Box>
        </Box>

        <Button
          variant="contained"
          type="submit"
          fullWidth
          size="large"
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'SIGN IN'
          )}
        </Button>
      </Box>
    </form>
  );
};

const FormField = ({ label, type, register, error, icon, endAdornment }) => (
  <Box sx={styles.fieldContainer}>
    <Typography variant="body2" fontWeight="bold">
      {label} <span style={{ color: 'red', marginLeft: 1 }}>*</span>
    </Typography>
    <TextField
      variant="outlined"
      fullWidth
      type={type}
      {...register}
      error={!!error}
      helperText={error?.message}
      placeholder={`Enter your ${label.toLowerCase()}`}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{icon}</InputAdornment>
        ),
        endAdornment: endAdornment && (
          <InputAdornment position="end">{endAdornment}</InputAdornment>
        ),
      }}
    />
  </Box>
);

const styles = {
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: 2, md: 3 },
  },
  fieldContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
  rememberMeContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  rememberMeText: {
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
    justifyContent: 'space-between',
    width: '100%',
  },
};

export default LoginForm;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// - MUI Components
import { Box, Typography, CircularProgress, Checkbox } from '@mui/material';

// - Custom Components
import StyledMuiButton from '../common/StyledMuiButton';
import PasswordInput from './PasswordInput';
import InputField from '../common/InputField';

// - Redux Hooks and APIs
import { updateFormData } from '../../store/slices/formSlice';
import { useLoginMutation } from '../../services/authApi';
import { setSnackbar } from '../../store/slices/uiSlice';

// - Login Validator
import { LoginValidator } from '../../validators/validationSchemas';

const LoginForm = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(LoginValidator),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data) => {
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={styles.formContainer}>
        {/* EMAIL INPUT */}
        <InputField
          name="email"
          control={control}
          label="Email Name"
          placeholder="Enter your email"
          errors={errors}
          icon={Mail}
        />

        {/* PASSWORD INPUT */}
        <PasswordInput
          name="password"
          label="Password"
          control={control}
          showPassword={showPassword}
          togglePasswordVisibility={togglePasswordVisibility}
          placeholder="Password"
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

        <StyledMuiButton
          variant="contained"
          type="submit"
          fullWidth
          size="large"
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'sign in'
          )}
        </StyledMuiButton>
      </Box>
    </form>
  );
};

export default LoginForm;

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

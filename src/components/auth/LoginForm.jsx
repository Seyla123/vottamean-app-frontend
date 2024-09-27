// React and third-party libraries
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Eye, EyeIcon, EyeOff, LockKeyhole, Mail } from 'lucide-react';

// Material UI components
import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  CircularProgress,
  Checkbox,
} from '@mui/material';

// Custom components
import HeaderTitle from './HeaderTitle';
import { Link } from 'react-router-dom';

// Redux hooks and actions
import { useSelector, useDispatch } from 'react-redux';
import { updateFormData } from '../../store/slices/formSlice';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../services/authApi';
import { setSnackbar } from '../../store/slices/uiSlice';

// Validation schema
import { LoginValidator } from '../../validators/validationSchemas';

const LoginForm = () => {
  // 1. Initialize dispatch for updating Redux store
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 2. Get form data from Redux store
  const formData = useSelector((state) => state.form);

  // 3. Initialize useForm with validation schema and default values from Redux
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(LoginValidator),
    defaultValues: formData,
  });

  // 4. Pre-fill form fields with data from Redux store
  useEffect(() => {
    if (formData) {
      setValue('email', formData.email);
      setValue('password', formData.password);
    }
  }, [formData, setValue]);

  // 5. Handle form submission
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
        // Navigate based on the user role
        if (role === 'admin') {
          navigate('/admin/dashboard');
        } else if (role === 'teacher') {
          navigate('/teacher/dashboard');
        } else {
          navigate('/something-went-wrong');
        }
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

  // 6. Toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 2, md: 3 },
          }}
        >
          {/* EMAIL INPUT */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="body2" fontWeight="bold">
              Email <span style={{ color: 'red', marginLeft: 1 }}>*</span>
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              type="email"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              placeholder="Enter your email"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail size={20} />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>

          {/* PASSWORD INPUT */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="body2" fontWeight="bold">
              Password <span style={{ color: 'red', marginLeft: 1 }}>*</span>
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              placeholder="Enter your password"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockKeyhole size={20} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <IconButton onClick={togglePasswordVisibility} size="icon">
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

          {/* AGREE WITH TERMS */}
          <Box
            component="div"
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Checkbox />
            <Box
              component="div"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Typography variant="body2">Remember me</Typography>
              <Link href="/auth/term">
                <Typography variant="body2" color="primary">
                  Forgot Password?
                </Typography>
              </Link>
            </Box>
          </Box>

          {/* SUBMIT BUTTON */}
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
    </>
  );
};

export default LoginForm;

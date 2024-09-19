// React and third-party libraries
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Material UI components
import { Box, Stack, Typography, TextField, Button } from '@mui/material';

// Custom components
import HeaderTitle from './HeaderTitle';
import { Link } from 'react-router-dom';
import WaveTrackLogo from '../../assets/images/logoWaveTrack.png';

// Redux hooks and actions
import { useSelector, useDispatch } from 'react-redux';
import { updateFormData } from '../../store/slices/formSlice';

// Validation schema
import { LoginValidator } from '../../validators/validationSchemas';

const LoginForm = ({ onSubmit }) => {
  // 1. Initialize dispatch for updating Redux store
  const dispatch = useDispatch();

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
  const handleFormSubmit = (data) => {
    dispatch(updateFormData(data));
    onSubmit(data);
  };

  return (
    <Box sx={containerStyles}>
      {/* Header Title */}
      <HeaderTitle
        title="WaveTrack Welcome!"
        subTitle="Log in to manage attendance efficiently and effectively."
        center
      >
        {/* Image container */}
        <Box
          component="img"
          src={WaveTrackLogo}
          sx={{
            display: { xs: 'flex', md: 'none' },
            alignSelf: 'center',
            maxWidth: '80px',
          }}
        />
      </HeaderTitle>

      {/* Form Container */}
      <Box
        component="form"
        onSubmit={handleSubmit(handleFormSubmit)}
        sx={formContainerStyles}
      >
        {/* Email Input */}
        <Box sx={inputContainerStyles}>
          <Typography variant="body1">Email</Typography>
          <TextField
            placeholder="email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Box>

        {/* Password Input */}
        <Box sx={inputContainerStyles}>
          <Typography variant="body1">Password</Typography>
          <TextField
            placeholder="password"
            type="password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </Box>

        {/* Button Container */}
        <Box sx={buttonContainerStyles}>
          {/* Forgot password */}
          <Stack alignSelf="flex-end">
            <Link to="/auth/forgot-password">
              <Typography variant="body2" component="span" color="primary">
                Forgot Password?
              </Typography>
            </Link>
          </Stack>

          {/* Submit Button */}
          <Button variant="contained" type="submit">
            LOGIN
          </Button>

          {/* Sign Up Link */}
          <Typography variant="body1">
            Don't you have an account?
            <Link to="/auth/signup">
              <Typography variant="body1" component="span" color="primary">
                Sign Up
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;

// Styles for the component
const containerStyles = {
  gap: 3,
  justifyContent: 'center',
  display: 'flex',
  flexDirection: 'column',
};

const formContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: { xs: 3, md: 4 },
};

const inputContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: 0.5,
};

const buttonContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
  textAlign: 'center',
};

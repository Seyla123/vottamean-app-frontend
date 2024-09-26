// React and third-party libraries
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Redux hooks and actions
import { useSelector, useDispatch } from 'react-redux';
import { updateFormData } from '../../store/slices/formSlice';

// Material UI components
import { Box, Typography, TextField, Button, Checkbox } from '@mui/material';

// Custom components
import HeaderTitle from './HeaderTitle';
import { Link } from 'react-router-dom';

// Validator
import { getStartSignupValidator } from '../../validators/validationSchemas';

const GetStartSignUp = ({ nextStep }) => {
  // 1. Initialize dispatch for updating Redux store
  const dispatch = useDispatch();

  // 2. Get form data from Redux store
  const formData = useSelector((state) => state.form);

  // 3. Initialize useForm with validation schema
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(getStartSignupValidator),
    defaultValues: formData,
  });

  // 4. Pre-fill form fields when component mounts
  useEffect(() => {
    if (formData) {
      setValue('email', formData.email);
      setValue('password', formData.password);
      setValue('passwordConfirm', formData.passwordConfirm);
    }
  }, [formData, setValue]);

  // 5. Handle form submission
  const onSubmit = (data) => {
    dispatch(updateFormData(data));
    nextStep();
  };

  return (
    <Box sx={containerStyles}>
      {/* Header Title */}
      <HeaderTitle title="Get started" subTitle="Create an account" />

      {/* Form Container */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box sx={formContainerStyles}>
          {/* Email Input */}
          <Box sx={inputContainerStyles}>
            <Typography variant="body1">Email</Typography>
            <TextField
              placeholder="email"
              type="email"
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

          {/* Confirm Password Input */}
          <Box sx={inputContainerStyles}>
            <Typography variant="body1">Confirm Password</Typography>
            <TextField
              placeholder="confirm password"
              type="password"
              {...register('passwordConfirm')}
              error={!!errors.passwordConfirm}
              helperText={errors.passwordConfirm?.message}
            />
          </Box>
        </Box>

        {/* Button Container */}
        <Box sx={buttonContainerStyles}>
          {/* Terms and Conditions Checkbox */}
          <Box sx={checkboxContainerStyles}>
            <Checkbox
              color="default"
              inputProps={{ 'aria-label': 'agree to terms' }}
            />
            <Typography variant="body2">
              By signing up, I agree with
              <Typography variant="body2" component="span" color="primary">
                {' '}
                terms and conditions
              </Typography>
            </Typography>
          </Box>

          {/* Submit Button */}
          <Button type="submit" variant="contained" color="primary">
            Sign Up
          </Button>

          {/* Login Link */}
          <Typography variant="body1">
            Already have an account?
            <Link to={'/auth/signin'}>
              <Typography variant="body1" component="span" color="primary">
                {' '}
                Login
              </Typography>
            </Link>
          </Typography>
        </Box>
      </form>
    </Box>
  );
};

export default GetStartSignUp;

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

const checkboxContainerStyles = {
  display: 'flex',
  alignItems: 'center',
};

const buttonContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
  textAlign: 'center',
};

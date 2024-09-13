import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Typography, TextField, Button, Checkbox } from '@mui/material';
import HeaderTitle from './HeaderTitle';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateFormData } from '../../store/slices/formSlice';

// Yup validation schema
const schema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const GetStartSignUp = ({ nextStep }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form); // Fetch form data from Redux

  // Initialize useForm with yup validation schema
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Set form values programmatically
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formData, // Set initial form values from Redux
  });

  // Pre-fill form data when component mounts
  // This ensures that when the user navigates back, the form fields remain filled.
  useEffect(() => {
    if (formData) {
      setValue('email', formData.email);
      setValue('password', formData.password);
      setValue('confirmPassword', formData.confirmPassword);
    }
  }, [formData, setValue]);

  // Handle form submission
  const onSubmit = (data) => {
    dispatch(updateFormData(data)); // Update Redux state with the form data
    nextStep(); // Navigate to the next step
  };

  return (
    <Box sx={containerStyles}>
      {/* Header Title */}
      <HeaderTitle title="Get started" subTitle="Create an account" />

      {/* Form Container */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box sx={formContainerStyles}>
          {/* Email Input Container */}
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

          {/* Password Input Container */}
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

          {/* Confirm Password Input Container */}
          <Box sx={inputContainerStyles}>
            <Typography variant="body1">Confirm Password</Typography>
            <TextField
              placeholder="confirm password"
              type="password"
              {...register('confirmPassword')}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />
          </Box>
        </Box>

        {/* Button Container */}
        <Box sx={buttonContainerStyles}>
          {/* Checkbox */}
          <Box sx={checkboxContainerStyles}>
            <Checkbox
              color="default"
              inputProps={{ 'aria-label': 'primary checkbox' }}
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

          <Typography variant="body1">
            Already have an account?
            <Link to={'/auth/login'}>
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

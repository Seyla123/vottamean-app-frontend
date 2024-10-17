// - React and third-party libraries
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// - MUI Components
import { Box, Typography, Button, CircularProgress } from '@mui/material';

// - Custom Components
import PasswordInput from '../../../components/auth/PasswordInput';
import PasswordIndicator from '../../../components/auth/PasswordIndicator';

// - Redux Hooks and APIs
import { useCompleteRegistrationMutation } from '../../../services/teacherApi';
import { setSnackbar } from '../../../store/slices/uiSlice';

// - Validator
import { CompletedRegistrationValidator } from '../../../validators/validationSchemas';
import StyledButton from '../../../components/common/StyledMuiButton';

function TeacherRegistration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    number: false,
    letter: false,
    special: false,
  });

  const [completeRegistration, { isLoading, isSuccess, isError, error }] =
    useCompleteRegistrationMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(CompletedRegistrationValidator),
    defaultValues: {
      password: '',
      passwordConfirm: '',
    },
  });

  const password = watch('password');

  useEffect(() => {
    validatePassword(password);
  }, [password]);

  const validatePassword = (password) => {
    if (password) {
      setPasswordValidation({
        length: password.length >= 8,
        number: /[0-9]/.test(password),
        letter: /[a-zA-Z]/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      });
    } else {
      setPasswordValidation({
        length: false,
        number: false,
        letter: false,
        special: false,
      });
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await completeRegistration(data).unwrap();
      if (response) {
        console.log('Teacher registered successfully', response);
      }
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  useEffect(() => {
    if (isLoading) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Registration in progress',
          severity: 'info',
          autoHideDuration: 6000,
        }),
      );
    } else if (isError) {
      dispatch(
        setSnackbar({
          open: true,
          message:
            error?.data?.message || 'An error occurred during registration',
          severity: 'error',
          autoHideDuration: 6000,
        }),
      );
    } else if (isSuccess) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Registration completed successfully!',
          severity: 'success',
          autoHideDuration: 6000,
        }),
      );
      navigate('/auth/signin');
    }
  }, [dispatch, isLoading, isError, error, isSuccess, navigate]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 2, md: 3 },
        }}
      >
        {/* PASSWORD INPUT */}
        <PasswordInput
          name="password"
          label="Password"
          control={control}
          showPassword={showPassword}
          togglePasswordVisibility={() => setShowPassword(!showPassword)}
          error={errors.password}
          placeholder="Create password"
        />

        {/* CONFIRM PASSWORD INPUT */}
        <PasswordInput
          name="passwordConfirm"
          label="Confirm Password"
          control={control}
          showPassword={showPassword}
          togglePasswordVisibility={() => setShowPassword(!showPassword)}
          error={errors.passwordConfirm}
          placeholder="Confirm password"
        />

        {/* PASSWORD VALIDITY INDICATORS */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
          <Typography variant="body2" fontWeight="bold">
            Register Requirement{' '}
            <span style={{ color: 'red', marginLeft: 1 }}>*</span>
          </Typography>
          <PasswordIndicator
            isValid={passwordValidation.length}
            message="At least 8 characters."
          />
          <PasswordIndicator
            isValid={passwordValidation.letter}
            message="Contain at least one letter."
          />
          <PasswordIndicator
            isValid={passwordValidation.number}
            message="Contain at least one number."
          />
          <PasswordIndicator
            isValid={passwordValidation.special}
            message="Contain at least one special character."
          />
        </Box>

        {/* SUBMIT BUTTON */}
        <StyledButton
          type="submit"
          variant="contained"
          color="primary"
          size="small"
          fullWidth
          disabled={isLoading}
          sx={{ mt: 2 }}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Complete Registration'}
        </StyledButton>
      </Box>
    </form>
  );
}

export default TeacherRegistration;

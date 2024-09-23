// React and third-party libraries
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Eye, EyeOff, Mail } from 'lucide-react';

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
  const handleFormSubmit = async (data) => {
    setIsLoading(true);
    dispatch(updateFormData(data));

    try {
      const result = await onSubmit(data);
      if (result && result.success) {
        // Simulate a delay before redirecting (you can remove this in production)
        setTimeout(() => {
          setIsLoading(false);
          navigate('/dashboard');
        }, 2000);
      } else {
        setIsLoading(false);
        // Handle login failure (e.g., show an error message)
      }
    } catch (error) {
      setIsLoading(false);
      // Handle any errors that occur during login
      console.error('Login error:', error);
    }
  };

  // 6. Toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.formWrapper}>
        <HeaderTitle
          title="Sign In"
          subTitle="Welcome back! Please sign in your account."
        />

        <Box
          component="form"
          onSubmit={handleSubmit(handleFormSubmit)}
          sx={styles.form}
        >
          <Box sx={styles.inputContainer}>
            <Typography variant="body2" sx={styles.inputLabel}>
              Email <span style={styles.requiredStar}>*</span>
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              placeholder="Enter your email"
              InputProps={{ endAdornment: <Mail size={20} /> }}
            />
          </Box>

          <Box sx={styles.inputContainer}>
            <Typography variant="body2" sx={styles.inputLabel}>
              Password <span style={styles.requiredStar}>*</span>
            </Typography>
            <TextField
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              fullWidth
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              placeholder="Password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={togglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box sx={styles.rememberMeContainer}>
            <Box component="span" sx={styles.rememberMe}>
              <Checkbox />
              <Typography variant="body2">Remember me</Typography>
            </Box>
            <Link to="/auth/forgot-password" style={styles.forgotPassword}>
              <Typography variant="body2" color="primary">
                Forgot Password?
              </Typography>
            </Link>
          </Box>

          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'LOGIN'
            )}
          </Button>

          <Typography variant="body2" align="center" sx={styles.signupText}>
            Don't have an account?{' '}
            <Link to="/auth/signup" style={styles.signupLink}>
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;

const styles = {
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  formWrapper: {
    width: '100%',
    maxWidth: '380px',
    borderRadius: 2,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    mt: 3,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
  inputLabel: {
    fontWeight: 'bold',
  },
  requiredStar: {
    color: 'red',
  },
  forgotPassword: {
    textDecoration: 'underline',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  submitButton: {
    height: '48px',
  },
  signupText: {
    mt: 1,
  },
  signupLink: {
    color: 'primary.main',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  rememberMeContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rememberMe: {
    display: 'flex',
    alignItems: 'center',
  },
};

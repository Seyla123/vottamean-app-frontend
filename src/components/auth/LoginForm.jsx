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
      if (result.success) {
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
          title="Welcome Back!"
          subTitle="Please log in your account to manage attendance efficiently."
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

          <Link to="/auth/forgot-password" style={styles.forgotPassword}>
            <Typography variant="body2" color="primary">
              Forgot Password?
            </Typography>
          </Link>

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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  formWrapper: {
    width: '100%',
    maxWidth: '400px',
    padding: 4,
    backgroundColor: 'white',
    borderRadius: 2,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
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
    alignSelf: 'flex-end',
    textDecoration: 'none',
  },
  submitButton: {
    mt: 2,
    py: 1.5,
    height: '48px', // Add a fixed height to prevent layout shift
  },
  signupText: {
    mt: 2,
  },
  signupLink: {
    color: 'primary.main',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  IconButton,
  InputAdornment,
  Link,
} from '@mui/material';
import StyledButton from '../common/StyledMuiButton';
import HeaderTitle from './HeaderTitle';
import FormFooter from './FormFooter';
import PasswordIndicator from './PasswordIndicator';
import { getStartSignupValidator } from '../../validators/validationSchemas';
import { EyeIcon, EyeOff, LockKeyhole, Mail } from 'lucide-react';

const GetStartedNowForm = ({ handleNext, handleFormChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    number: false,
    letter: false,
    special: false,
  });

  const formData = useSelector((state) => state.form);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(getStartSignupValidator),
    defaultValues: formData,
  });

  useEffect(() => {
    if (formData) {
      setValue('email', formData.email);
      setValue('password', formData.password);
      setValue('passwordConfirm', formData.passwordConfirm);
    }
  }, [formData, setValue]);

  // Validate password whenever it changes
  useEffect(() => {
    validatePassword(formData.password);
  }, [formData.password]);

  const validatePassword = (password) => {
    if (password) {
      setPasswordValidation({
        length: password.length >= 8,
        number: /[0-9]/.test(password),
        letter: /[a-zA-Z]/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      });
    } else {
      // Reset validation state if password is empty
      setPasswordValidation({
        length: false,
        number: false,
        letter: false,
        special: false,
      });
    }
  };

  const onSubmit = (data) => {
    handleFormChange(data);
    handleNext();
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '400px',
        height: '100%',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        margin: '0 auto',
      }}
    >
      <HeaderTitle
        title={'Get Started Now'}
        subTitle={'Get started now -- Get 30 days free trial!'}
      />

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  fullWidth
                  type="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  placeholder="Enter your email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Mail size={20} />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Box>

          {/* PASSWORD INPUT */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="body2" fontWeight="bold">
              Password <span style={{ color: 'red', marginLeft: 1 }}>*</span>
            </Typography>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  onChange={(e) => {
                    validatePassword(e.target.value);
                    field.onChange(e);
                  }}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  placeholder="Create password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockKeyhole size={20} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        size="icon"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <EyeIcon size={20} />
                        )}
                      </IconButton>
                    ),
                  }}
                />
              )}
            />
          </Box>

          {/* CONFIRM PASSWORD INPUT */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="body2" fontWeight="bold">
              Confirm Password{' '}
              <span style={{ color: 'red', marginLeft: 1 }}>*</span>
            </Typography>
            <Controller
              name="passwordConfirm"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  error={!!errors.passwordConfirm}
                  helperText={errors.passwordConfirm?.message}
                  placeholder="Confirm password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockKeyhole size={20} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        size="icon"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <EyeIcon size={20} />
                        )}
                      </IconButton>
                    ),
                  }}
                />
              )}
            />
          </Box>

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

          {/* AGREE WITH TERMS */}
          <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox />
            <Typography variant="body2" component={'span'}>
              I agree with the
              <Link
                href="/auth/term"
                sx={{ display: 'inline-block' }}
                underline="hover"
              >
                <Typography variant="body2" color="primary">
                  Terms and Conditions
                </Typography>
              </Link>
            </Typography>
          </Box>

          {/* SUBMIT BUTTON */}
          <StyledButton variant="contained" type="submit" fullWidth size="large">
            Continue
          </StyledButton>

          {/* FORM FOOTER */}
          <FormFooter href={'/auth/login'} />
        </Box>
      </form>
    </Box>
  );
};

export default GetStartedNowForm;

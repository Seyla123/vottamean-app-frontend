// - React and third-party libraries
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

// - Material UI components
import { Box, Typography, Checkbox, Link, Stack } from '@mui/material';

// - Lucid Icons
import { Mail } from 'lucide-react';

// - Custom Components
import StyledButton from '../common/StyledMuiButton';
import HeaderTitle from './HeaderTitle';
import FormFooter from './FormFooter';
import PasswordIndicator from './PasswordIndicator';
import PasswordInput from './PasswordInput';
import InputField from '../common/InputField';

// - Validator
import { getStartSignupValidator } from '../../validators/validationSchemas';
import { setSnackbar } from '../../store/slices/uiSlice';

const GetStartedNowForm = ({ handleNext, handleFormChange }) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);
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
    watch,
  } = useForm({
    resolver: yupResolver(getStartSignupValidator),
    defaultValues: formData,
  });

  const password = watch('password');
  const hanleAgree = () => {
    setAgree(!agree);
  };

  useEffect(() => {
    if (formData) {
      setValue('email', formData.email);
      setValue('password', formData.password);
      setValue('passwordConfirm', formData.passwordConfirm);
    }
  }, [formData, setValue]);

  // Validate password whenever it changes
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
    if (!agree) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Please agree with the terms and conditions',
          severity: 'error',
        }),
      );
    } else {
      handleFormChange(data);
      handleNext();
    }
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
        subTitle={'Register your account today by providing your information in just four simple steps.'}
      />

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack direction={'column'} gap={3}>
          {/* EMAIL INPUT */}
          <InputField
            name="email"
            control={control}
            label="Email"
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

          {/* AGREE WITH TERMS */}
          <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox onClick={hanleAgree} required />
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
          <StyledButton
            variant="contained"
            type={'submit'}
            size="small"
            fullWidth
          >
            Continue
          </StyledButton>

          {/* FORM FOOTER */}
          <FormFooter href={'/auth/signin'} />
        </Stack>
      </form>
    </Box>
  );
};

export default GetStartedNowForm;

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector, useDispatch } from 'react-redux';
import { updateFormData } from '../../store/slices/formSlice';
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
import HeaderTitle from './HeaderTitle';
import FormFooter from './FormFooter';
import { getStartSignupValidator } from '../../validators/validationSchemas';
import { Eye, EyeIcon, EyeOff, LockKeyhole, Mail } from 'lucide-react';

const GetStartedNowForm = ({ handleNext }) => {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form);

  const {
    register,
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

  const onSubmit = (data) => {
    dispatch(updateFormData(data));
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
              placeholder="Create password"
              slotProps={{
                input: {
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
                },
              }}
            />
          </Box>

          {/* CONFIRM PASSWORD INPUT */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="body2" fontWeight="bold">
              Confirm Password{' '}
              <span style={{ color: 'red', marginLeft: 1 }}>*</span>
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              type={showPassword ? 'text' : 'password'}
              {...register('passwordConfirm')}
              error={!!errors.passwordConfirm}
              helperText={errors.passwordConfirm?.message}
              placeholder="Confirm password"
              slotProps={{
                input: {
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
                },
              }}
            />
          </Box>

          {/* AGREE WITH TERMS */}
          <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox />
            <Typography variant="body2" component={'span'}>
              I agree with the{' '}
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
          <Button variant="contained" type="submit" fullWidth size="large">
            Continue
          </Button>

          {/* FORM FOOTER */}
          <FormFooter href={'/auth/signin'} />
        </Box>
      </form>
    </Box>
  );
};

export default GetStartedNowForm;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Material UI components
import {
  Box,
  Button,
  Typography,
  TextField,
  Stack,
  IconButton,
  InputAdornment,
} from '@mui/material';
import StyledButton from '../common/StyledMuiButton';

// Icons from Lucide
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

// Custom components
import SubHeader from './SubHeader';
import { AccountInformationValidator } from '../../validators/validationSchemas';
import InputField from '../common/InputField';
import PasswordInput from '../auth/PasswordInput';
import { useDispatch } from 'react-redux';
import { setSnackbar } from '../../store/slices/uiSlice';
import dayjs from 'dayjs';
const AccountInfo = ({ handleBack, handleAccountSubmit, teacherData }) => {
  const [showPassword, setShowPassword] = useState(false);

  // Form submit function
  const onSubmit = async (data) => {
    const formData = new FormData();
    // Append all the form fields
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('passwordConfirm', data.passwordConfirm);
    formData.append('first_name', teacherData.firstName);
    formData.append('last_name', teacherData.lastName);
    formData.append('dob', dayjs(data.dob).format('YYYY-MM-DD'));
    formData.append('gender', teacherData.gender);
    formData.append('phone_number', teacherData.phoneNumber);
    formData.append('address', teacherData.address || '');
    
    // Append the photo if it exists
    if (teacherData.photo) {
      if (teacherData.photo instanceof File) {
        formData.append('photo', teacherData.photo);
      } else if (
        typeof teacherData.photo === 'string' &&
        teacherData.photo.startsWith('blob:')
      ) {
        try {
          // const response = await fetch(teacherData.photo);
          // const blob = await response.blob();
          // formData.append('photo', blob, 'profile_photo.jpg');
          formData.append('photo', teacherData.photo ?? null);

          console.log('Form data in AccountInfo:', formData);
        } catch (error) {
          console.error('Error fetching blob:', error);
        }
      } else {
        console.warn('Unexpected photo type:', typeof teacherData.photo);
      }
    } else {
      console.warn('No photo data available');
    }


    // Log the FormData contents
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      await handleAccountSubmit(formData);
    } catch (error) {
      console.error('Failed to sign up teacher:', error.message);
    }
  };


  // yup validation from account information schema
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AccountInformationValidator),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
  })

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={profileBox}>
          <Box
            sx={{
              width: '100%',
              marginTop: {
                xs: 1,
                sm: 3,
              },
            }}
          >
            <SubHeader title={'Account Information'} />
          </Box>
          {/* Email */}
          <Box sx={{ ...textFieldGap, width: '100%' }}>
            <InputField
              name="email"
              control={control}
              label="Email Address"
              placeholder="Email"
              errors={errors}
              icon={Mail}
            />
          </Box>
          {/* Password */}
          <Box sx={{ ...textFieldGap, width: '100%' }}>
            <PasswordInput
              name="password"
              label="Password"
              control={control}
              showPassword={showPassword}
              togglePasswordVisibility={() => setShowPassword(!showPassword)}
              placeholder="Create password"
              error={errors.password}
            />
          </Box>
          {/* Confirm Password */}
          <Box sx={{ ...textFieldGap, width: '100%' }}>
            <PasswordInput
              name="passwordConfirm"
              label="Confirm Password"
              control={control}
              showPassword={showPassword}
              togglePasswordVisibility={() => setShowPassword(!showPassword)}
              placeholder="Confirm password"
              error={errors.passwordConfirm}
            />
          </Box>
          {/* Buttons */}
          <Stack
            direction={'row'}
            alignSelf={'flex-end'}
            justifyContent={'flex-end'}
            width={{ xs: '100%', sm: '300px', md: '280px' }}
            gap={2}
            marginTop={{ xs: 2, sm: 0 }}
          >
            <StyledButton
              onClick={handleBack}
              fullWidth
              variant="outlined"
              color="inherit"
            >
              Back
            </StyledButton>
            <StyledButton fullWidth variant="contained" type="submit">
              Add
            </StyledButton>
          </Stack>
        </Box>
      </form>
    </Box>
  );
};

export default AccountInfo;

// Styles
const profileBox = {
  width: '100%',
  bgcolor: '#ffffff',
  // padding: {
  //   xs: 2,
  //   sm: 3,
  // },
  gap: {
    xs: '12px',
    sm: 3,
  },
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  position: 'relative',
};
const textFieldGap = {
  display: 'flex',
  gap: 0.5,
  flexDirection: 'column',
};

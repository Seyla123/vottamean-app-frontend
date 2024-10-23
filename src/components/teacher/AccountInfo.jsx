// React and third-party libraries
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Material UI components
import { Box, Typography, Stack } from '@mui/material';
import StyledButton from '../common/StyledMuiButton';
import dayjs from 'dayjs';

// Icons from Lucide
import { Mail } from 'lucide-react';

// Custom components
import { AccountInformationValidator } from '../../validators/validationSchemas';
import InputField from '../common/InputField';
import PasswordInput from '../auth/PasswordInput';

const AccountInfo = ({
  handleBack,
  handleSubmitForm,
  teacherData,
  isLoading,
}) => {
  const [showPassword, setShowPassword] = useState(false);

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
  });
  // Form submit function
  const onSubmit = async (data) => {
    const formData = new FormData();
    // Create an object with the form data
    const formFields = {
      email: data.email,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
      first_name: teacherData.firstName,
      last_name: teacherData.lastName,
      dob: dayjs(teacherData.dob).format('YYYY-MM-DD'),
      gender: teacherData.gender,
      phone_number: teacherData.phoneNumber,
      address: teacherData.address || '',
    };

    // Append fields to FormData
    Object.entries(formFields).forEach(([key, value]) =>
      formData.append(key, value),
    );

    // Append the photo if it exists
    if (teacherData.photo) {
      formData.append('photo', teacherData.photo);
      // Direct file append
    }
    try {
      await handleSubmitForm(formData);
    } catch (error) {
      console.error('Failed to sign up teacher:', error.message);
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={profileBox}>
          {/* Header */}
          <Typography
            alignSelf={'start'}
            variant="h6"
            component="h2"
            fontWeight={'bold'}
            gutterBottom
          >
            Account Information
          </Typography>
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
              size="small"
            >
              Back
            </StyledButton>
            <StyledButton
              fullWidth
              variant="contained"
              type="submit"
              size="small"
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit'}
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
  gap: {
    xs: 2,
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

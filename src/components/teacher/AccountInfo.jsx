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
const AccountInfo = ({ handleBack, handleAccountSubmit, teacherData }) => {
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

  const onSubmit = (data) => {
    // Combine the account data with the teacher information tab
    const combinedData = {
      ...teacherData,
      ...data,
    };
    handleAccountSubmit(combinedData);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={profileBox}>
          <SubHeader title={'Account Information'} />
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
            {/* <Typography variant="body2" fontWeight="bold">
              Password <span style={{ color: 'red', marginLeft: 1 }}>*</span>
            </Typography>
            <TextField
              placeholder="Create password"
              variant="outlined"
              fullWidth
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            /> */}
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
  padding: {
    xs: 2,
    sm: 3,
  },
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

import React from 'react';
import { Box, Button, Typography, TextField, Stack } from '@mui/material';
import SubHeader from './SubHeader';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AccountInformationValidator } from '../../validators/validationSchemas';

const AccountInfo = ({ handleBack, handleAccountSubmit, teacherData }) => {
  // yup validation from account information schema
  const {
    register,
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
    // Combine the account data with the teacher data
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
            <Typography>Email</Typography>
            <TextField
              id="email"
              placeholder="email"
              variant="outlined"
              fullWidth
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              autoComplete="email"
            />
          </Box>
          {/* Password */}
          <Box sx={{ ...textFieldGap, width: '100%' }}>
            <Typography>Password</Typography>
            <TextField
              id="password"
              placeholder="password"
              variant="outlined"
              fullWidth
              type="password"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              autoComplete="new-password"
            />
          </Box>
          {/* Confirm Password */}
          <Box sx={{ ...textFieldGap, width: '100%' }}>
            <Typography>Confirm Password</Typography>
            <TextField
              id="confirm-password"
              placeholder="confirm password"
              variant="outlined"
              fullWidth
              type="password"
              {...register('passwordConfirm')}
              error={!!errors.passwordConfirm}
              helperText={errors.passwordConfirm?.message}
              autoComplete="new-password"
            />
          </Box>
          {/* Buttons */}
          <Stack
            direction={'row'}
            alignSelf={'flex-end'}
            justifyContent={'flex-end'}
            width={{ xs: '100%', sm: '340px' }}
            gap={{ xs: 1, sm: 2 }}
          >
            <Button
              onClick={handleBack}
              fullWidth
              variant="outlined"
              color="inherit"
            >
              Back
            </Button>
            <Button fullWidth variant="contained" type="submit">
              Add Teacher
            </Button>
          </Stack>
        </Box>
      </form>
    </Box>
  );
};

export default AccountInfo;

const profileBox = {
  border: '1px solid',
  borderColor: '#E0E0E0',
  borderRadius: '8px',
  bgcolor: '#ffffff',
  marginTop: '32px',
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

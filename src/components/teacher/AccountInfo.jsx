
import React from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import SubHeader from './SubHeader';
import { useForm } from 'react-hook-form';
import { useSignUpTeacherMutation } from '../../services/teacherApi';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'; 
import { AccountInformation } from '../../validators/validationSchemas';

const AccountInfo = ({ handleBack }) => {
  const [signUpTeacher, { isLoading, error }] = useSignUpTeacherMutation();


  const { register, handleSubmit, formState: { errors , isValid} } = useForm({
    resolver: yupResolver(AccountInformation)
  });

  const onSubmit = async (data) => {
    try {
      // send the form data to the server
      const response = await signUpTeacher(data).unwrap(); 
      if (response) {
        console.log("Teacher signed up successfully", response);
      }
    } catch (err) {
      console.error('Signup failed:', err);
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={profileBox}>
        <SubHeader title={'Account Information'} />
        
        {/* Email */}
        <Box sx={{...textFieldGap, width:'100%'}}>
          <Typography>Email</Typography>
          <TextField
            id="email"
            placeholder="email"
            variant="outlined"
            fullWidth
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Box>

        {/* Password */}
        <Box sx={{...textFieldGap, width:'100%'}}>
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
          />
        </Box>

        {/* Confirm Password */}
        <Box sx={{...textFieldGap, width:'100%'}}>
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
          />
        </Box>

        {/* Buttons */}
        <Box
          display={'flex'}
          alignSelf={'flex-end'}
          width={'100%'}
          sx={{ maxWidth: { xs: '100%', sm: '340px' } }}
          justifyContent={'flex-end'}
          gap={2}
        >
          <Button
            variant="outlined"
            sx={{ borderColor: 'inherit', color: 'inherit' }}
            onClick={handleBack}
            fullWidth
          >
            Back
          </Button>
          <Button 
            fullWidth 
            variant="contained" 
            type="submit"
            disabled={!isValid || isLoading}
          >
            {isLoading ? 'Submitting...' : 'Add Teacher'}
          </Button>
        </Box>
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

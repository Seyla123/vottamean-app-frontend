import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  Avatar,
  FormHelperText,
} from '@mui/material';
import SubHeader from './SubHeader';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DatePickerComponent from './DatePickerComponent';
import ButtonContainer from '../common/ButtonContainer';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSignUpTeacherMutation } from '../../services/teacherApi';
import { createFormSchema } from '../../validators/validationSchemas';
import StyledButton from '../common/StyledMuiButton';

function TeacherForm(handleNext, handleCancel, mode = 'create') {
  // Form validation
  const schema = createFormSchema([
    'email',
    'password',
    'passwordConfirm',
    'firstName',
    'lastName',
    'phoneNumber',
    'gender',
    'dob',
    'address',
  ]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  });

  const [signUpTeacher, { isLoading, error }] = useSignUpTeacherMutation();

  // Form submission
  const onSubmit = async (data) => {
    try {
      const response = await signUpTeacher(data).unwrap();
      if (response) {
        console.log('Teacher signed up successfully', response);
      }
    } catch (err) {
      console.error('Signup failed:', err);
    }
  };
  // This will only proceed to next if form is valid
  const handleSubmitNext = async (data) => {
    if (isValid) {
      try {
        await signUpTeacher(data);
        handleNext();
      } catch (error) {
        console.error('Teacher info submission failed', error);
      }
    } else {
      console.log('Form contains errors, cannot proceed');
    }
  };

  const [gender, setGender] = useState('');
  const handleChangeGender = (e) => {
    setGender(e.target.value);
  };

  return (
    <>
      <Box sx={profileBox}>
        <Box sx={valueBoxOne}>
          <Avatar sx={imgStyle} alt="profile picture" src="r" />
        </Box>
        {/* subheader */}
        <SubHeader title={'Teacher Information'} />
        {/* teacher information */}
        <Box
          onSubmit={handleSubmit(handleSubmitNext)}
          component="form"
          sx={{
            width: '100%',
            marginTop: '16px',
            gap: {
              xs: '12px',
              sm: 3,
            },
          }}
        >
          <Box display={'flex'} flexDirection={'row'} sx={boxContainer}>
            {/* name */}
            <Box sx={{ flex: 1 }}>
              <Box name="firstName" sx={textFieldGap}>
                <Typography>First Name</Typography>
                <TextField
                  id="first-name"
                  placeholder="first name"
                  variant="outlined"
                  fullWidth
                  {...register('firstName')}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              </Box>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Box sx={textFieldGap}>
                <Typography>Last Name</Typography>
                <TextField
                  id="last-name"
                  placeholder="last name"
                  variant="outlined"
                  fullWidth
                  {...register('lastName')}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              </Box>
            </Box>
          </Box>
          {/* gender */}
          <Box sx={textFieldGap}>
            <Typography>Gender</Typography>
            <Select
              {...register('gender')}
              fullWidth
              value={gender}
              onChange={handleChangeGender}
              displayEmpty
              error={!!errors.gender}
              renderValue={(selected) => {
                if (!selected) {
                  return (
                    <Box
                      component="p"
                      variant="body2"
                      sx={{ color: '#a7a7a7' }}
                    >
                      gender
                    </Box>
                  );
                }
                return selected;
              }}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
            {errors.gender && (
              <FormHelperText color="error">
                {errors.gender.message}
              </FormHelperText>
            )}
          </Box>
          {/* date of birth */}
          <Box sx={textFieldGap}>
          <Typography>Date of Birth</Typography>
          <Controller
            name="dob"
            control={control}
            render={({ field }) => (
              <DatePickerComponent 
                control={control}
                name="dob"
              />
            )}
          />
          {errors.dob && (
            <FormHelperText color="error">{errors.dob.message}</FormHelperText>
          )}
        </Box>
          {/* phone number */}
          <Box sx={textFieldGap}>
            <Typography>Phone Number</Typography>
            <TextField
              id="phone-number"
              placeholder="phone number"
              variant="outlined"
              fullWidth
              {...register('phoneNumber')}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
            />
          </Box>
          {/* address */}
          <Box sx={textFieldGap}>
            <Typography>Address</Typography>
            <TextField
              id="address"
              placeholder="address"
              variant="outlined"
              fullWidth
              {...register('address')}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </Box>
          {/* buttons */}
          <Box
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'flex-end'}
            gap={2}
            mt={2}
          >
            {mode === 'update' && (
              <>
                <ButtonContainer
                  rightBtn={handleNext}
                  leftBtnTitle="Cancel"
                  rightBtnTitle="UPDATE"
                />
              </>
            )}
          </Box>
        </Box>
      </Box>

      {/* Account information */}
      <Box sx={profileBox}>
        <Box
          onSubmit={handleSubmit(onSubmit)}
          component="form"
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: {
              xs: '12px',
              sm: 3,
            },
          }}
        >
          <SubHeader title={'Account Information'} />

          {/* Email */}
          <Box sx={textFieldGap}>
            <Typography>Email</Typography>
            <TextField
              id="email"
              placeholder="email"
              variant="outlined"
              fullWidth
              error={!!errors.email}
              {...register('email')}
              helperText={errors.email?.message}
            />
          </Box>

          {/* Password */}
          <Box sx={textFieldGap}>
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
          <Box sx={textFieldGap}>
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
            <StyledButton
              variant="outlined"
              sx={{ borderColor: 'inherit', color: 'inherit' }}
              fullWidth
            >
              Back
            </StyledButton>
            <StyledButton fullWidth variant="contained" type="submit">
              Add Teacher
            </StyledButton>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default TeacherForm;

// const profileBox = {
//     border: '1px solid',
//     borderColor: '#E0E0E0',
//     borderRadius: '8px',
//     bgcolor: '#ffffff',
//     marginTop: '32px',
//     padding: {
//       xs: 2,
//       sm: 3,
//     },
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'column',
//     position: 'relative',
//   };

//   const textFieldGap = {
//     display: 'flex',
//     gap: 0.5,
//     flexDirection: 'column',
//   };

const boxContainer = {
  width: '100%',
  marginTop: '16px',
  gap: {
    xs: '12px',
    sm: 3,
  },
};
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

const valueBoxOne = {
  width: 100,
  height: 100,
  borderRadius: '50%',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  mb: 2,
  position: 'relative',
};

const textFieldGap = {
  display: 'flex',
  gap: 0.5,
  flexDirection: 'column',
};

const imgStyle = {
  width: {
    xs: 120,
    sm: 160,
  },
  height: {
    xs: 120,
    sm: 160,
  },
};

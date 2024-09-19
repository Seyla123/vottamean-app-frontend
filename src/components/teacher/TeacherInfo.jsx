
// const schema = yup.object().shape({
//   firstName: yup.string().required('First name is required'),
//   lastName: yup.string().required('Last name is required'),
//   phoneNumber: yup.number().min(10).max(10).required('Phone number is required'),
//   gender: yup.string().required('Gender is required'),
//   dob: yup.date().required('Date of birth is required'),
//   address: yup.string().required('Address is required'),
// })
import React from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  Avatar,
} from '@mui/material';
import SubHeader from './SubHeader';
import DatePickerComponent from './DatePickerComponent';
import ButtonContainer from '../common/ButtonContainer';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSignUpTeacherMutation } from '../../services/teacherApi';
import { createFormSchema } from '../../validators/validationSchemas';

const TeacherInfo = ({ handleNext, handleCancel, mode = 'create' }) => {
  const [signUpTeacher] = useSignUpTeacherMutation();

  // Form schema using Yup
  const schema = createFormSchema([
    'firstName',
    'lastName',
    'phoneNumber',
    'gender',
    'dob',
    'address',
  ]);

  // Hook form setup
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  });
  

  // Form submission logic
  const handleSubmitNext = async (data) => {
    try {
      await signUpTeacher(data);
      handleNext();
    } catch (error) {
      console.error('Teacher info submission failed', error);
    }
  };


  return (
    <Box sx={profileBox}>
      <Box sx={valueBoxOne}>
        <Avatar sx={imgStyle} alt="profile picture" src="r" />
      </Box>

      <SubHeader title={'Teacher Information'} />

      <Box
        component="form"
        onSubmit={handleSubmit(handleSubmitNext)}
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
          {/* First Name */}
          <Box sx={{ flex: 1 }}>
            <Box sx={textFieldGap}>
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
          {/* Last Name */}
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

        {/* Gender */}
        <Box sx={textFieldGap}>
          <Typography>Gender</Typography>
          <Controller
            name="gender"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select
                {...field}
                fullWidth
                displayEmpty
                error={!!errors.gender}
                renderValue={(selected) => {
                  if (!selected) {
                    return (
                      <Box component="p" variant="body2" sx={{ color: '#a7a7a7' }}>
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
            )}
          />
          {errors.gender && (
            <Typography color="error">{errors.gender.message}</Typography>
          )}
        </Box>

        {/* Date of Birth */}
        <Box sx={textFieldGap}>
          <Typography>Date of Birth</Typography>
          <Controller
            name="dob"
            control={control}
            render={({ field }) => (
              <DatePickerComponent {...field} error={errors.dob} />
            )}
          />
        </Box>

        {/* Phone Number */}
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

        {/* Address */}
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

        {/* Buttons */}
        <Box
          display={'flex'}
          flexDirection={'row'}
          justifyContent={'flex-end'}
          gap={2}
          mt={2}
        >
          {mode === 'create' && (
            <ButtonContainer
              onClick={handleSubmit(handleSubmitNext)}
              leftBtnTitle="Cancel"
              rightBtnTitle="Next"
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default TeacherInfo;

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

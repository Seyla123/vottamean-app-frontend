import React from 'react';
import {
  TextField,
  MenuItem,
  Button,
  Box,
  Avatar,
  Typography,
  Stack,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SubHeader from './SubHeader';

// add validate schemas
const validationSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  phoneNumber: yup.string().required('Phone number is required'),
  gender: yup.string().required('Gender is required'),
  dob: yup.date().required('Date of birth is required'),
  address: yup.string().required('Address is required'),
});

const TeacherInfo = ({ handleNextClick }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      gender: '',
      dob: null,
      address: '',
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit(handleNextClick)}>
        {/* profile */}
        <Box sx={profileBox}>
          <Box sx={valueBoxOne}>
            <Avatar sx={imgStyle} alt="profile picture" src="r" />
          </Box>
          {/* subheader */}
          <SubHeader title={'Teacher Information'} />
          {/* text fields */}
          <Box display={'flex'} flexDirection={'row'} sx={boxContainer}>
            {/* first name */}
            <Box sx={{ flex: 1, width: '100%' }}>
              <Box sx={textFieldGap}>
                <Typography>First Name</Typography>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      placeholder="First Name"
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                      fullWidth
                    />
                  )}
                />
              </Box>
            </Box>
            {/* last name */}
            <Box sx={{ flex: 1, width: '100%' }}>
              <Box sx={textFieldGap}>
                <Typography>Last Name</Typography>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      placeholder="Last Name"
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                      fullWidth
                    />
                  )}
                />
              </Box>
            </Box>
          </Box>
          {/* phone number */}
          <Box sx={{ ...textFieldGap, width: '100%' }}>
            <Typography>Phone Number</Typography>
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Phone Number"
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber?.message}
                  fullWidth
                />
              )}
            />
          </Box>
          {/* gender */}
          <Box sx={{ ...textFieldGap, width: '100%' }}>
            <Typography>Gender</Typography>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  placeholder="Gender"
                  error={!!errors.gender}
                  helperText={errors.gender?.message}
                  fullWidth
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </TextField>
              )}
            />
          </Box>
          {/* date of birth */}
          <Box sx={{ ...textFieldGap, width: '100%' }}>
            <Typography>Date of Birth</Typography>
            <Controller
              name="dob"
              control={control}
              render={({ field }) => (
                <DesktopDatePicker
                  {...field}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={!!errors.dob}
                      helperText={errors.dob?.message}
                      fullWidth
                    />
                  )}
                  placeholder="Date of Birth"
                  value={field.value || null}
                />
              )}
            />
          </Box>
          {/* address */}
          <Box sx={{ ...textFieldGap, width: '100%' }}>
            <Typography>Address</Typography>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Address"
                  error={!!errors.address}
                  helperText={errors.address?.message}
                  fullWidth
                />
              )}
            />
          </Box>
          {/* Button */}
          <Stack  direction={'row'} alignSelf={'flex-end'} justifyContent={'flex-end'} width={{ xs: '100%', sm: '340px' }} gap={{ xs: 1, sm: 2 }}>
            <Button fullWidth variant="outlined" color="inherit">
              Cancel
            </Button>
            <Button fullWidth type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Stack>
        </Box>
      </form>
    </LocalizationProvider>
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

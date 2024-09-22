import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  MenuItem,
  Button,
  Box,
  Avatar,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SubHeader from './SubHeader';
import dayjs from 'dayjs';

// Define validation schema
const validationSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  phoneNumber: yup.string().required('Phone number is required'),
  gender: yup.string().required('Gender is required'),
  dob: yup
    .date()
    .required('Date of birth is required')
    .max(new Date(), 'Date of birth cannot be in the future')
    .nullable()
    .typeError('Invalid date format'),
  address: yup.string().required('Address is required'),
});

const TeacherInfo = ({ handleNextClick, defaultValues }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
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

  const [dob, setDob] = useState(null);

  const handleCancel = () => {
    navigate('/teacher');
  };
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
      setDob(defaultValues.dob ? dayjs(defaultValues.dob) : null);
    }
  }, [defaultValues, reset]);

  const onSubmit = (data) => {
    handleNextClick(true, { ...data, dob: dob ? dob.toISOString() : null });
    console.log(data);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={profileBox}>
          <Box sx={valueBoxOne}>
            <Avatar sx={imgStyle} alt="profile picture" src="r" />
          </Box>
          <SubHeader title={'Teacher Information'} />
          <Box display={'flex'} flexDirection={'row'} sx={boxContainer}>
            {/* First Name */}
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
            {/* Last Name */}
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
          {/* Phone Number */}
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
          {/* Gender */}
          <Box sx={{ ...textFieldGap, width: '100%' }}>
            <Typography>Gender</Typography>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.gender}>
                  <Select
                    {...field}
                    displayEmpty
                    error={!!errors.gender}
                    renderValue={(selected) => {
                      if (!selected) {
                        return (
                          <Box sx={{ color: '#B5B5B5' }}>Select Gender</Box>
                        );
                      }
                      return selected;
                    }}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                  <Typography variant="caption" color="error">
                    {errors.gender?.message}
                  </Typography>
                </FormControl>
              )}
            />
          </Box>
          {/* Date of Birth */}
          <Box sx={{ ...textFieldGap, width: '100%' }}>
            <Typography>Date of Birth</Typography>
            <Controller
              name="dob"
              control={control}
              rules={{
                required: 'Date of birth is required',
                validate: (value) => {
                  if (!value) {
                    return 'Date of birth is required';
                  }
                  if (dayjs(value).isAfter(dayjs())) {
                    return 'Date of birth cannot be in the future';
                  }
                  return true;
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  inputFormat="MM/DD/YYYY"
                  value={dob}
                  onChange={(newValue) => {
                    setDob(newValue);
                    field.onChange(newValue);
                  }}
                  maxDate={dayjs()}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                     
                      fullWidth
                      slotProps={{
                        textField: {
                          error: !!error,
                          helperText: error ? error.message : '',
                          fullWidth: true,
                        },
                      }}
                    />
                    
                  )}
                />
              )}
            />
          </Box>
          {/* Address */}
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
          {/* Buttons */}
          <Stack
            direction={'row'}
            alignSelf={'flex-end'}
            justifyContent={'flex-end'}
            width={{ xs: '100%', sm: '340px' }}
            gap={{ xs: 1, sm: 2 }}
          >
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

// Styles
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

// React and third-party libraries
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';

// Material UI components
import {
  TextField,
  MenuItem,
  Button,
  Box,
  Avatar,
  Typography,
  Stack,
  FormControl,
  Select,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

// Redux hooks and actions
import { useNavigate } from 'react-router-dom';

// Custom components
import SubHeader from './SubHeader';


const TeacherInfo = ({ handleNextClick, defaultValues }) => {
  const navigate = useNavigate();
  const [dob, setDob] = useState(null);

  // Define form methods validation
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      gender: '',
      dob: '',
      address: '',
    },
  });

  // Set default values and date of birth state when defaultValues change
  useEffect(() => {
    // reset the form with the default values if it was provided
    // and set the date of birth state
    if (defaultValues) {
      reset(defaultValues);
      setDob(defaultValues.dob ? dayjs(defaultValues.dob) : null);
    }
  }, [defaultValues, reset]);

  // Handle form submission
  const onSubmit = (data) => {
    handleNextClick(true, { ...data, dob: dob ? dob.toISOString() : null }); // pass the date of birth to the next page
  };
  // handle back to list page
  const handleCancel = () => {
    navigate('/admin/teachers');
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={profileBox}>
          <Box sx={profilePic}>
            <Avatar sx={imgStyle} alt="profile picture" src="r" />
          </Box>
          <SubHeader title={'Teacher Information'} />
          <Box display={'flex'} flexDirection={'row'} sx={boxContainer}>
            {/* First Name */}
            <Box sx={{ flex: 1, width: '100%' }}>
              <Box sx={textFieldGap}>
                <Typography variant="body2" fontWeight="bold">
                  First Name {''}
                  <span style={{ color: 'red', marginLeft: 1 }}>*</span>
                </Typography>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="text"
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
                <Typography variant="body2" fontWeight="bold">
                  Last Name {''}
                  <span style={{ color: 'red', marginLeft: 1 }}>*</span>
                </Typography>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="text"
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
          {/* Gender */}
          <Box sx={{ ...textFieldGap, width: '100%' }}>
            <Typography variant="body2" fontWeight="bold">
              Gender <span style={{ color: 'red', marginLeft: 1 }}>*</span>
            </Typography>
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
                        return <Box sx={{ color: '#B5B5B5' }}>Gender</Box>;
                      }
                      return selected;
                    }}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                  <Typography
                    variant="caption"
                    color="error"
                    sx={{
                      marginLeft: errors.gender?.message ? '14px' : '0',
                      marginTop: errors.gender?.message ? '3px' : '0',
                    }}
                  >
                    {errors.gender?.message}
                  </Typography>
                </FormControl>
              )}
            />
          </Box>
          {/* Date of Birth */}
          <Box sx={{ ...textFieldGap, width: '100%' }}>
            <Typography variant="body2" fontWeight="bold">
              Date of Birth{' '}
              <span style={{ color: 'red', marginLeft: 1 }}>*</span>
            </Typography>
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
                  slotProps={{
                    textField: {
                      error: !!error,
                      helperText: errors.dob?.message,
                      fullWidth: true,
                    },
                  }}
                />
              )}
            />
          </Box>
          {/* Phone Number */}
          <Box sx={{ ...textFieldGap, width: '100%' }}>
            <Typography variant="body2" fontWeight="bold">
              Contact Number {''}
              <span style={{ color: 'red', marginLeft: 1 }}>*</span>
            </Typography>
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Contact Number"
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber?.message}
                  fullWidth
                />
              )}
            />
          </Box>
          {/* Address */}
          <Box sx={{ ...textFieldGap, width: '100%' }}>
            <Typography variant="body2" fontWeight="bold">
              Street Address{' '}
            </Typography>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Phnom Penh, Street 210, ..."
                  type="text"
                  error={!!errors.address}
                  helperText={errors.address?.message}
                  fullWidth
                  multiline
                  minRows={5}
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
            gap={{ xs: 0.5, sm: 1 }}
            marginTop={{ xs: 2, sm: 0 }}
          >
            <Button
              fullWidth
              variant="outlined"
              color="inherit"
              onClick={handleCancel}
            >
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
  padding: '0px',
  gap: {
    xs: '12px',
    sm: 3,
  },
};
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
const profilePic = {
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

// Define validation schema
export const validationSchema = yup.object({
  firstName: yup
    .string()
    .required('First name is required')
    .matches(
      /^[A-Za-z]+( [A-Za-z]+)*$/,
      'Name must contain only alphabetic characters and single spaces between words',
    )
    .min(2, 'Name must be at least 2 characters long')
    .max(40, 'Name must be less than 40 characters'),
  lastName: yup
    .string()
    .required('Last name is required')
    .matches(
      /^[A-Za-z]+( [A-Za-z]+)*$/,
      'Name must contain only alphabetic characters and single spaces between words',
    )
    .min(2, 'Name must be at least 2 characters long')
    .max(40, 'Name must be less than 40 characters'),
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(
      /^\d{9,15}$/,
      'Phone number must be between 9 and 15 digits and numeric.',
    )
    .test(
      'length',
      'Phone number must be between 9 and 15 digits',
      (value) => value && value.length >= 9 && value.length <= 15,
    ),
  gender: yup.string().required('Gender is required'),
  dob: yup
    .string()
    .required('Date of birth is required')
    .max(new Date(), 'Date of birth cannot be in the future')
    .typeError('Invalid date format'),
  address: yup
    .string()
    .nullable()
    .notRequired()
    .max(200, 'Address must be less than 200 characters'),
});

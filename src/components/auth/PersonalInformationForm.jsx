// React and third-party libraries
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';

// Material UI components
import {
  Box,
  TextField,
  Typography,
  Select,
  MenuItem,
  Button,
} from '@mui/material';

// Redux hooks and actions
import { useSelector, useDispatch } from 'react-redux';
import { updateFormData } from '../../store/slices/formSlice';

// Custom components
import GoBackButton from '../common/GoBackButton';
import HeaderTitle from './HeaderTitle';

// Date picker components from MUI X
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { PersonalInformationValidator } from '../../utils/validationSchemas';

const PersonalInformationForm = ({ nextStep, onClickBack }) => {
  // Initialize dispatch and form data from Redux
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form);

  // Initialize useForm with validation schema and default values
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(PersonalInformationValidator),
    defaultValues: formData,
  });

  // Manage gender and date of birth state
  const [gender, setGender] = useState(formData.gender || '');
  const [dob, setDob] = useState(formData.dob ? dayjs(formData.dob) : null);

  // Pre-fill form fields when component mounts
  useEffect(() => {
    if (formData) {
      setValue('first_name', formData.first_name);
      setValue('last_name', formData.last_name);
      setValue('gender', formData.gender);
      setDob(formData.dob ? dayjs(formData.dob) : null);
    }
  }, [formData, setValue]);

  // Handle form submission
  const onSubmit = (data) => {
    const formattedDob = dob ? dayjs(dob).format('YYYY-MM-DD') : '';

    const updatedData = {
      ...data,
      gender,
      dob: formattedDob,
    };

    dispatch(updateFormData(updatedData)); // Dispatch updated data to Redux
    nextStep(); // Proceed to the next step
  };

  return (
    <Box sx={containerStyles}>
      {/* Go Back Button and Header Title */}
      <GoBackButton handleOnClick={onClickBack} />
      <HeaderTitle
        title="Personal Information"
        subTitle="Input your information"
      />

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box sx={formContainerStyles}>
          {/* Name Inputs */}
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Box sx={inputContainerStyles} flexGrow={1}>
              <Typography variant="body1">First name</Typography>
              <TextField
                placeholder="First name"
                fullWidth
                {...register('first_name')}
                error={!!errors.first_name}
                helperText={errors.first_name?.message}
              />
            </Box>
            <Box sx={inputContainerStyles} flexGrow={1}>
              <Typography variant="body1">Last name</Typography>
              <TextField
                placeholder="Last name"
                fullWidth
                {...register('last_name')}
                error={!!errors.last_name}
                helperText={errors.last_name?.message}
              />
            </Box>
          </Box>

          {/* Gender Select */}
          <Box sx={inputContainerStyles}>
            <Typography variant="body1">Gender</Typography>
            <Select
              fullWidth
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
                setValue('gender', e.target.value);
              }}
              displayEmpty
              renderValue={(selected) => {
                if (!selected) {
                  return <Box sx={{ color: '#B5B5B5' }}>Select gender</Box>;
                }
                return selected;
              }}
              error={!!errors.gender}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
            <Typography variant="body2" color="error">
              {errors.gender?.message}
            </Typography>
          </Box>

          {/* Date of Birth Picker */}
          <Box sx={inputContainerStyles}>
            <Typography variant="body1">Date of Birth</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={dob}
                onChange={(newValue) => {
                  setDob(newValue);
                  setValue(
                    'dob',
                    newValue ? dayjs(newValue).format('YYYY-MM-DD') : '',
                  );
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.dob,
                    placeholder: 'Date of Birth',
                  },
                }}
              />
            </LocalizationProvider>
            <Typography variant="body2" color="error">
              {errors.dob?.message}
            </Typography>
          </Box>

          {/* Submit Button */}
          <Button type="submit" variant="contained" color="primary">
            Continue
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default PersonalInformationForm;

// Styles for the component
const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
};

const formContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: { xs: 3, md: 4 },
};

const inputContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: 0.5,
};

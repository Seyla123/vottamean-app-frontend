import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  TextField,
  Typography,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { updateFormData } from '../../store/slices/formSlice';
import GoBackButton from '../common/GoBackButton';
import HeaderTitle from './HeaderTitle';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

// Yup validation schema
const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  gender: yup.string().required('Gender is required'),
  dob: yup.date().required('Date of birth is required').nullable(),
});

const PersonalInformationForm = ({ nextStep, onClickBack }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form); // Get form data from Redux

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formData, // Set initial form values from Redux
  });

  const [gender, setGender] = useState(formData.gender || '');
  const [dob, setDob] = useState(formData.dob ? dayjs(formData.dob) : null);

  // Pre-fill form data when component mounts
  useEffect(() => {
    if (formData) {
      setValue('firstName', formData.firstName);
      setValue('lastName', formData.lastName);
      setValue('gender', formData.gender);
      setDob(formData.dob ? dayjs(formData.dob) : null);
    }
  }, [formData, setValue]);

  const onSubmit = (data) => {
    const updatedData = {
      ...data,
      gender,
      dob: dob ? dob.toISOString() : null,
    };
    dispatch(updateFormData(updatedData));
    nextStep();
  };

  return (
    <Box sx={containerStyles}>
      {/* Go Back and Header Title */}
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
                {...register('firstName')}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            </Box>
            <Box sx={inputContainerStyles} flexGrow={1}>
              <Typography variant="body1">Last name</Typography>
              <TextField
                placeholder="Last name"
                fullWidth
                {...register('lastName')}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </Box>
          </Box>

          {/* Gender Select */}
          <Box sx={inputContainerStyles}>
            <Typography variant="body1">Gender</Typography>
            <Select
              fullWidth
              value={gender} // Keep this as the state value
              onChange={(e) => {
                setGender(e.target.value); // Update gender state
                setValue('gender', e.target.value); // Set form value for react-hook-form
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
                value={dob} // Use dob state instead of value
                onChange={(newValue) => setDob(newValue)} // Update the dob state
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.dob, // Match the validation field to `dob`
                    helperText: errors.dob?.message,
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

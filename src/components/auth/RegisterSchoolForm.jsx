import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, TextField, Typography, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData } from '../../store/slices/formSlice';
import GoBackButton from '../common/GoBackButton';
import HeaderTitle from './HeaderTitle';
import schoolIcon from '../../assets/icon/schoolIcon.png';

// Yup validation schema
const schema = yup.object().shape({
  schoolName: yup.string().required('School name is required'),
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(/^[0-9]+$/, 'Phone number must be digits only'),
  address: yup.string().required('Address is required'),
});

const RegisterSchoolForm = ({ nextStep, onClickBack }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form); // Fetch form data from Redux

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Set form values programmatically
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formData, // Set initial form values from Redux
  });

  // Pre-fill form data when component mounts
  useEffect(() => {
    if (formData) {
      setValue('schoolName', formData.schoolName);
      setValue('phoneNumber', formData.phoneNumber);
      setValue('address', formData.address);
    }
  }, [formData, setValue]);

  // Handle form submission
  const onSubmit = (data) => {
    dispatch(updateFormData(data)); // Update Redux state with the form data
    nextStep(); // Navigate to the next step
  };

  return (
    <Box sx={containerStyles}>
      {/* Header Title */}
      <GoBackButton handleOnClick={onClickBack} />
      <HeaderTitle
        title="Introduce Your School to WaveTrack"
        subTitle="Provide the information to begin your journey."
        center
      >
        {/* Image Container */}
        <Box
          component="img"
          src={schoolIcon}
          sx={{ display: 'flex', alignSelf: 'center', maxWidth: '100px' }}
        />
      </HeaderTitle>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box sx={formContainerStyles}>
          {/* School Name Input */}
          <Box sx={inputContainerStyles}>
            <Typography variant="body1">School&apos;s Name</Typography>
            <TextField
              placeholder="School's name"
              {...register('schoolName')}
              error={!!errors.schoolName}
              helperText={errors.schoolName?.message}
            />
          </Box>

          {/* Phone Number Input */}
          <Box sx={inputContainerStyles}>
            <Typography variant="body1">Phone Number</Typography>
            <TextField
              placeholder="Phone number"
              {...register('phoneNumber')}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
            />
          </Box>

          {/* Address Input */}
          <Box sx={inputContainerStyles}>
            <Typography variant="body1">Address</Typography>
            <TextField
              multiline
              minRows={5}
              placeholder="Phnom Penh, Street 210, ..."
              {...register('address')}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </Box>

          {/* Submit Button */}
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default RegisterSchoolForm;

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

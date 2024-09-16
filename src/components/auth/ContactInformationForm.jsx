// React and third-party libraries
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Redux hooks and actions
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData } from '../../store/slices/formSlice';

// Material UI components
import { Box, TextField, Typography, Button } from '@mui/material';

// Custom components
import GoBackButton from '../common/GoBackButton';
import HeaderTitle from './HeaderTitle';

// Validator
import { ContactInformationValidator } from '../../validators/validationSchemas';

const ContactInformationForm = ({ nextStep, onClickBack }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form); // Fetch form data from Redux

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Set form values programmatically
  } = useForm({
    resolver: yupResolver(ContactInformationValidator),
    defaultValues: formData, // Set initial form values from Redux
  });

  // Pre-fill form data when component mounts
  useEffect(() => {
    if (formData) {
      setValue('phone', formData.phone_number);
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
      {/* Header and Go Back Button */}
      <GoBackButton handleOnClick={onClickBack} />
      <HeaderTitle
        title="Contact Information"
        subTitle="Input your information"
      />

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box sx={formContainerStyles}>
          {/* Phone Number Input */}
          <Box sx={inputContainerStyles}>
            <Typography variant="body1">Phone Number</Typography>
            <TextField
              placeholder="Phone number"
              {...register('phone_number')}
              error={!!errors.phone_number}
              helperText={errors.phone_number?.message}
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
            Continue
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ContactInformationForm;

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

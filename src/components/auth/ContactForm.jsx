// React and third-party libraries
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { MuiTelInput } from 'mui-tel-input';

// Redux hooks and actions
import { useDispatch, useSelector } from 'react-redux';

// Material UI components
import {
  Box,
  TextField,
  Typography,
  Button,
  InputAdornment,
} from '@mui/material';
import StyledButton from '../common/StyledMuiButton';

// Custom components
import HeaderTitle from './HeaderTitle';

// Validator
import { ContactInformationValidator } from '../../validators/validationSchemas';
import FormFooter from './FormFooter';

const ContactForm = ({ handleNext, handleBack, handleFormChange }) => {
  // Fetch form data from Redux
  const formData = useSelector((state) => state.form);

  // Initialize useForm with validation schema and default values
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(ContactInformationValidator),
    defaultValues: formData,
  });

  // Pre-fill form data when component mounts
  useEffect(() => {
    if (formData) {
      setValue('phone_number', formData.phone_number);
      setValue('address', formData.address);
    }
  }, [formData, setValue]);

  // Handle form submission
  const onSubmit = (data) => {
    handleFormChange(data); // Update the form data in Redux
    handleNext(); // Navigate to the next step
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '400px',
        height: '100%',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        margin: '0 auto',
      }}
    >
      <HeaderTitle
        title="Contact Details"
        subTitle="Enter your contact details. This will help us reach you with important updates."
      />

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 2, md: 3 },
          }}
        >
          {/* CONTACT NUMBER INPUT */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="body2" fontWeight="bold">
              Contact Number{' '}
              <span style={{ color: 'red', marginLeft: 1 }}>*</span>
            </Typography>
            <Controller
              name="phone_number"
              control={control}
              render={({ field }) => (
                <MuiTelInput
                  defaultCountry="KH"
                  value={field.value || ''}
                  onChange={(phone) => {
                    console.log('Phone input changed:', phone);
                    field.onChange(phone);
                  }}
                  error={!!errors.phone_number}
                  fullWidth
                />
              )}
            />
            {errors.phone_number && (
              <Typography variant="caption" color="error">
                {errors.phone_number.message}
              </Typography>
            )}
          </Box>

          {/* ADDRESS INPUT */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="body2" fontWeight="bold">
              Street Address{' '}
            </Typography>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextField
                  multiline
                  minRows={5}
                  variant="outlined"
                  fullWidth
                  type="text"
                  placeholder="Phnom Penh, Street 210, ..."
                  {...field} // Spread the field properties
                  error={!!errors.address}
                  helperText={errors.address?.message}
                />
              )}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
            <StyledButton
              variant="outlined"
              color="primary"
              size="large"
              fullWidth
              onClick={handleBack}
            >
              Back
            </StyledButton>
            {/* Submit Button */}
            <StyledButton
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
            >
              Continue
            </StyledButton>
          </Box>

          {/* FORM FOOTER */}
          <FormFooter href={'/auth/signin'} />
        </Box>
      </form>
    </Box>
  );
};

export default ContactForm;

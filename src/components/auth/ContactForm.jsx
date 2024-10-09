// React and third-party libraries
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Redux hooks and actions
import { useDispatch, useSelector } from 'react-redux';

// Material UI components
import { Box } from '@mui/material';
import StyledButton from '../common/StyledMuiButton';

// Custom components
import HeaderTitle from './HeaderTitle';
import PhoneInputField from './PhoneInputField';
import InputField from '../common/InputField';

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
          {/* CONTACT NUMBER INPUT WITH COUNTRY CODE */}
          <PhoneInputField
            name="phone_number"
            control={control}
            label="Contact Number"
            errors={errors}
          />

          {/* ADDRESS INPUT */}
          <InputField
            name="school_address"
            control={control}
            label="Street Address"
            placeholder="Phnom Penh, Street 210, ..."
            errors={errors}
            multiline
            minRows={5}
          />

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

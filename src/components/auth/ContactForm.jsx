// React and third-party libraries
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Redux hooks and actions
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData } from '../../store/slices/formSlice';

// Material UI components
import {
  Box,
  TextField,
  Typography,
  Button,
  InputAdornment,
  Link,
} from '@mui/material';

// Custom components
import GoBackButton from '../common/GoBackButton';
import HeaderTitle from './HeaderTitle';

// Validator
import { ContactInformationValidator } from '../../validators/validationSchemas';
import { Phone } from 'lucide-react';

const ContactForm = ({ handleNext, handleBack }) => {
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
            <TextField
              variant="outlined"
              fullWidth
              type="text"
              placeholder="Contact number"
              {...register('phone_number')}
              error={!!errors.phone_number}
              helperText={errors.phone_number?.message}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone size={20} />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>

          {/* ADDRESS INPUT */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="body2" fontWeight="bold">
              Street Address{' '}
            </Typography>
            <TextField
              multiline
              minRows={5}
              variant="outlined"
              fullWidth
              type="text"
              placeholder="Phnom Penh, Street 210, ..."
              {...register('address')}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              fullWidth
              onClick={handleBack}
            >
              Back
            </Button>
            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
            >
              Continue
            </Button>
          </Box>

          {/* GO TO SIGN IN */}
          <Box
            component={'span'}
            sx={{
              display: 'flex',
              alignItems: 'start',
              justifyContent: 'center',
            }}
          >
            <Typography variant="body2" component={'span'}>
              Already have an account?{' '}
              <Link
                href="/auth/login"
                sx={{ display: 'inline-block' }}
                underline="hover"
              >
                <Typography variant="body2" color="primary">
                  Login
                </Typography>
              </Link>
            </Typography>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default ContactForm;

// React and third-party libraries
import React, { useEffect, useState } from 'react';
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
  CircularProgress,
  Link,
} from '@mui/material';

// Custom components
import GoBackButton from '../common/GoBackButton';
import HeaderTitle from './HeaderTitle';
import schoolIcon from '../../assets/icon/schoolIcon.png';

// Validator
import { RegisterSchoolValidator } from '../../validators/validationSchemas';
import { Contact2, Phone, PhoneOutgoing, School } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreateSchoolForm = ({ onSubmit, onFormChange, handleBack }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form);

  // New state to track submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(RegisterSchoolValidator),
    defaultValues: formData,
  });

  useEffect(() => {
    if (formData) {
      setValue('name', formData.school_name);
      setValue('phone_number', formData.school_phone_number);
      setValue('address', formData.school_address);
    }
  }, [formData, setValue]);

  const handleFormSubmit = async (data) => {
    const formattedData = {
      ...formData,
      school_name: data.school_name,
      school_phone_number: data.school_phone_number,
      school_address: data.school_address,
    };

    dispatch(updateFormData(formattedData)); // Update Redux with form data

    if (onFormChange) {
      onFormChange(formattedData);
    }

    if (onSubmit) {
      setIsSubmitting(true); // Set to true when submission starts
      await onSubmit(); // Wait for the API call
      setIsSubmitting(false); // Set back to false when done
    }
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
        title={'Create Your Own School'}
        subTitle={
          'Choose a unique name that reflects the identity of your institution.'
        }
      />

      <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 2, md: 3 },
          }}
        >
          {/* SCHOOL NAME INPUT */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="body2" fontWeight="bold">
              School Name <span style={{ color: 'red', marginLeft: 1 }}>*</span>
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              type="text"
              placeholder="Enter your school name"
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <School size={20} />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>

          {/* SCHOOL CONTACT NUMBER INPUT */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="body2" fontWeight="bold">
              School Contact{' '}
              <span style={{ color: 'red', marginLeft: 1 }}>*</span>
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              type="text"
              placeholder="Enter School contact"
              {...register('phone_number')}
              error={!!errors.phone_number}
              helperText={errors.phone_number?.message}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneOutgoing size={20} />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>

          {/* SCHOOL ADDRESS INPUT */}
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
              variant="contained"
              type="submit"
              fullWidth
              size="large"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Register'
              )}
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

export default CreateSchoolForm;

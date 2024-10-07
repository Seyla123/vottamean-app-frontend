// React and third-party libraries
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Redux hooks and actions
import { useDispatch, useSelector } from 'react-redux';
import { setSnackbar } from '../../store/slices/uiSlice';

// Material UI components
import {
  Box,
  TextField,
  Typography,
  Button,
  InputAdornment,
  CircularProgress,
} from '@mui/material';

// Custom components
import HeaderTitle from './HeaderTitle';

// Validator
import { RegisterSchoolValidator } from '../../validators/validationSchemas';
import { PhoneOutgoing, School } from 'lucide-react';
import FormFooter from './FormFooter';

import { useSignupMutation } from '../../services/authApi';

const CreateSchoolForm = ({ handleBack ,handleFormChange}) => {
  // Get the form data from the Redux store
  const formData = useSelector((state) => state.form);
  const dispatch = useDispatch();

  // useSignupMutation : Use the signup mutation to send the form data to the server
  const [signup, { isLoading, isError, isSuccess, error }] = useSignupMutation();

  // Initialize useForm with validation schema and default values
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(RegisterSchoolValidator),
    defaultValues: formData,
  });

  // Pre-fill form data when component mounts
  useEffect(() => {
    if (formData) {
      setValue('school_name', formData.school_name);
      setValue('school_phone_number', formData.school_phone_number);
      setValue('school_address', formData.school_address);
    }
  }, [formData, setValue]);

  // Handle the error and success messages from the signup api call
  useEffect(() => {
    if (isError) {
      // If there is an error, show a snackbar with the error message
      dispatch(
        setSnackbar({
          open: true,
          severity: 'error',
          message: error.data.message,
        })
      );
    } else if (isSuccess) {
      // If the signup is successful, show a snackbar with a success message
      dispatch(
        setSnackbar({
          open: true,
          severity: 'success',
          message: 'Your account has been successfully created. Please verify your email.',
        })
      );
    }
  });
  
  /**
   * Handle the form submission.
   * 1. Create the formatted form data by combining the form data from the Redux store
   *    with the school data from the current form.
   * 2. Call the handleFormChange prop to update the form data in the Redux store.
   * 3. Call the signup mutation with the formatted form data.
   * 4. Wait for the mutation to complete and unwrap the response.
   * @param {Object} data The school form data.
   */
  const handleFormSubmit = async (data) => {
    const formattedData = {
      email: formData.email,
      password: formData.password,
      passwordConfirm: formData.passwordConfirm,
      address: formData.address,
      dob: formData.dob,
      first_name: formData.first_name,
      last_name: formData.last_name,
      gender: formData.gender,
      phone_number: formData.phone_number,
      school_name: data.school_name,
      school_phone_number: data.school_phone_number,
      school_address: data.school_address,
    };
    handleFormChange(formattedData);
    await signup(formattedData).unwrap();
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
              {...register('school_name')}
              error={!!errors.school_name}
              helperText={errors.school_name?.message}
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
              {...register('school_phone_number')}
              error={!!errors.school_phone_number}
              helperText={errors.school_phone_number?.message}
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
              {...register('school_address')}
              error={!!errors.school_address}
              helperText={errors.school_address?.message}
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
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Register'
              )}
            </Button>
          </Box>

          {/* FORM FOOTER */}
          <FormFooter href={'/auth/signin'} />
        </Box>
      </form>
    </Box>
  );
};

export default CreateSchoolForm;

// React and third-party libraries
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { MuiTelInput } from 'mui-tel-input';

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
import { PhoneOutgoing, School } from 'lucide-react';
import FormFooter from './FormFooter';

import { useSignupMutation } from '../../services/authApi';
import { RegisterSchoolValidator } from '../../validators/validationSchemas';

const CreateSchoolForm = ({ handleBack, handleFormChange }) => {
  const formData = useSelector((state) => state.form);
  const dispatch = useDispatch();
  const [signup, { isLoading, isError, isSuccess, error }] =
    useSignupMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(RegisterSchoolValidator),
    defaultValues: formData,
  });

  useEffect(() => {
    if (formData) {
      setValue('school_name', formData.school_name);
      setValue('school_phone_number', formData.school_phone_number);
      setValue('school_address', formData.school_address);
    }
  }, [formData, setValue]);

  useEffect(() => {
    if (isError) {
      dispatch(
        setSnackbar({
          open: true,
          severity: 'error',
          message: error.data.message,
        }),
      );
    } else if (isSuccess) {
      dispatch(
        setSnackbar({
          open: true,
          severity: 'success',
          message:
            'Your account has been successfully created. Please verify your email.',
        }),
      );
    }
  }, [isError, isSuccess, dispatch, error]);

  const handleFormSubmit = async (data) => {
    const formattedData = {
      ...formData,
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
            <Controller
              name="school_name"
              control={control}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  type="text"
                  placeholder="Enter your school name"
                  {...field}
                  error={!!errors.school_name}
                  helperText={errors.school_name?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <School size={20} />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Box>

          {/* SCHOOL CONTACT NUMBER INPUT WITH COUNTRY CODE */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="body2" fontWeight="bold">
              School Contact{' '}
              <span style={{ color: 'red', marginLeft: 1 }}>*</span>
            </Typography>
            <Controller
              name="school_phone_number"
              control={control}
              render={({ field }) => (
                <MuiTelInput
                  defaultCountry="KH"
                  value={field.value}
                  onChange={(phone) => {
                    console.log('Phone input changed:', phone);
                    field.onChange(phone);
                  }}
                  helperText={errors.school_phone_number?.message}
                  error={!!errors.school_phone_number}
                  fullWidth
                />
              )}
            />
          </Box>

          {/* SCHOOL ADDRESS INPUT */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="body2" fontWeight="bold">
              Street Address
            </Typography>
            <Controller
              name="school_address"
              control={control}
              render={({ field }) => (
                <TextField
                  multiline
                  minRows={5}
                  variant="outlined"
                  fullWidth
                  type="text"
                  placeholder="Phnom Penh, Street 210, ..."
                  {...field}
                  error={!!errors.school_address}
                  helperText={errors.school_address?.message}
                />
              )}
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

          <FormFooter href={'/auth/signin'} />
        </Box>
      </form>
    </Box>
  );
};

export default CreateSchoolForm;

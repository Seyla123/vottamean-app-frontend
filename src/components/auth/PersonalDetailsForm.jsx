// React and third-party libraries
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Material UI components
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  InputAdornment,
  Link,
  MenuItem,
} from '@mui/material';

// Redux hooks and actions
import { useSelector, useDispatch } from 'react-redux';
import { updateFormData } from '../../store/slices/formSlice';
import { UserRoundPlus } from 'lucide-react';

// Custom components
import HeaderTitle from './HeaderTitle';
import FormFooter from './FormFooter';

// Date picker components from MUI X
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

// Validator
import { PersonalInformationValidator } from '../../validators/validationSchemas';

const PersonalDetailsForm = ({ handleNext, handleBack, handleFormChange }) => {
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

    handleFormChange(updatedData);
    handleNext(); // Proceed to the next step
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '500px',
        height: '100%',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        margin: '0 auto',
      }}
    >
      <HeaderTitle
        title={'Personal Details'}
        subTitle={
          'Please provide your personal information. This information will help us personalize your experience.'
        }
      />

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 2, md: 3 },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'start',
              gap: 2,
            }}
          >
            {/* FIRST NAME INPUT */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                width: '100%',
              }}
            >
              <Typography variant="body2" fontWeight="bold">
                First Name{' '}
                <span style={{ color: 'red', marginLeft: 1 }}>*</span>
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                type="text"
                {...register('first_name')}
                error={!!errors.first_name}
                helperText={errors.first_name?.message}
                placeholder="First Name"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <UserRoundPlus size={20} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>

            {/* LAST NAME INPUT */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                width: '100%',
              }}
            >
              <Typography variant="body2" fontWeight="bold">
                Last Name <span style={{ color: 'red', marginLeft: 1 }}>*</span>
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                type="text"
                {...register('last_name')}
                error={!!errors.last_name}
                helperText={errors.last_name?.message}
                placeholder="Last Name"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <UserRoundPlus size={20} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* GENDER SELECT */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                width: '100%',
              }}
            >
              <Typography variant="body2" fontWeight="bold">
                Gender <span style={{ color: 'red', marginLeft: 1 }}>*</span>
              </Typography>
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
                    return <Box sx={{ color: '#B5B5B5' }}>Gender</Box>;
                  }
                  return selected;
                }}
                error={!!errors.gender}
                variant="outlined"
              >
                <MenuItem value="" disabled>
                  Select gender
                </MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </Box>
            {/* DOB INPUT */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                width: '100%',
              }}
            >
              <Typography variant="body2" fontWeight="bold">
                Date Of Birth{' '}
                <span style={{ color: 'red', marginLeft: 1 }}>*</span>
              </Typography>{' '}
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
                      placeholder: 'YYYY-MM-DD',
                    },
                  }}
                />
              </LocalizationProvider>
            </Box>
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

          {/* FORM FOOTER */}
          <FormFooter href={'/auth/signin'} />
        </Box>
      </form>
    </Box>
  );
};

export default PersonalDetailsForm;

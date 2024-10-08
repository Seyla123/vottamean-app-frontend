import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  InputAdornment,
  MenuItem,
} from '@mui/material';

import { useSelector } from 'react-redux';
import { UserRoundPlus } from 'lucide-react';

import HeaderTitle from './HeaderTitle';
import FormFooter from './FormFooter';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import { PersonalInformationValidator } from '../../validators/validationSchemas';

const PersonalDetailsForm = ({ handleNext, handleBack, handleFormChange }) => {
  const formData = useSelector((state) => state.form);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(PersonalInformationValidator),
    defaultValues: formData,
  });

  const [gender, setGender] = useState(formData.gender || '');
  const [dob, setDob] = useState(formData.dob ? dayjs(formData.dob) : null);

  useEffect(() => {
    if (formData) {
      setValue('first_name', formData.first_name);
      setValue('last_name', formData.last_name);
      setValue('gender', formData.gender);
      setDob(formData.dob ? dayjs(formData.dob) : null);
    }
  }, [formData, setValue]);

  const onSubmit = (data) => {
    const formattedDob = dob ? dayjs(dob).format('YYYY-MM-DD') : '';
    const updatedData = {
      ...data,
      gender,
      dob: formattedDob,
    };
    handleFormChange(updatedData);
    handleNext();
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
              <Controller
                name="first_name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    fullWidth
                    error={!!errors.first_name}
                    helperText={errors.first_name?.message}
                    placeholder="First Name"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <UserRoundPlus size={20} />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Box>

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
              <Controller
                name="last_name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    fullWidth
                    error={!!errors.last_name}
                    helperText={errors.last_name?.message}
                    placeholder="Last Name"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <UserRoundPlus size={20} />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    fullWidth
                    value={gender}
                    onChange={(e) => {
                      setGender(e.target.value);
                      field.onChange(e);
                    }}
                    displayEmpty
                    renderValue={(selected) => {
                      if (!selected) {
                        return <Box sx={{ color: '#B5B5B5' }}>Gender</Box>;
                      }
                      return selected;
                    }}
                    error={!!errors.gender}
                  >
                    <MenuItem value="" disabled>
                      Select gender
                    </MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                )}
              />
            </Box>

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
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name="dob"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      value={dob}
                      onChange={(newValue) => {
                        setDob(newValue);
                        field.onChange(
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
                  )}
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

          <FormFooter href={'/auth/signin'} />
        </Box>
      </form>
    </Box>
  );
};

export default PersonalDetailsForm;

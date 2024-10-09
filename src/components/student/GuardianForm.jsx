import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Material UI components
import {
  Box,
  Button,
  Typography,
  TextField,
  Stack,
  IconButton,
  InputAdornment,
} from '@mui/material';

// Icons from Lucide
import { Eye, EyeOff } from 'lucide-react';

// Custom components
import SubHeader from '../teacher/SubHeader';
import { GuardianValidator } from '../../validators/validationSchemas';

const GuardianForm = ({ handleBack, handleStudentSubmit, studentData }) => {
  // yup validation from account information schema
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(GuardianValidator),
    defaultValues: {
      guardian_first_name: '',
      guardian_last_name: '',
      guardian_email: '',
      guardian_relationship: '',
      guardian_phone_number: '',
    },
  });

  const onSubmit = (data) => {
    // Combine the account data with the teacher information tab
    const combinedData = {
      ...studentData,
      ...data,
    };
    console.log(combinedData);
    handleStudentSubmit(combinedData);

  };
  console.log(studentData);

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={profileBox}>
          <SubHeader title={'Guardian Information'} />
          {/* Email */}
          <Box display={'flex'} flexDirection={'row'} sx={boxContainer}>
            {/* First Name */}
            <Box sx={{ flex: 1, width: '100%' }}>
              <Box sx={textFieldGap}>
                <Typography variant="body2" fontWeight="bold">
                  First Name {''}
                  <span style={{ color: 'red', marginLeft: 1 }}>*</span>
                </Typography>
                <Controller
                  name="guardian_first_name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="text"
                      placeholder="First Name"
                      error={!!errors.guardian_first_name}
                      helperText={errors.guardian_first_name?.message}
                      fullWidth
                    />
                  )}
                />
              </Box>
            </Box>
            {/* Last Name */}
            <Box sx={{ flex: 1, width: '100%' }}>
              <Box sx={textFieldGap}>
                <Typography variant="body2" fontWeight="bold">
                  Last Name {''}
                  <span style={{ color: 'red', marginLeft: 1 }}>*</span>
                </Typography>
                <Controller
                  name="guardian_last_name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="text"
                      placeholder="Last Name"
                      error={!!errors.guardian_last_name}
                      helperText={errors.guardian_last_name?.message}
                      fullWidth
                    />
                  )}
                />
              </Box>
            </Box>
          </Box>
          {/* Relationship */}
          <Box sx={{ ...textFieldGap, width: '100%' }}>
            <Typography variant="body2" fontWeight="bold">
              Relationship{''}
              <span style={{ color: 'red', marginLeft: 1 }}>*</span>
            </Typography>
            <Controller
              name="guardian_relationship"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Relationship"
                  error={!!errors.guardian_relationship}
                  helperText={errors.guardian_relationship?.message}
                />
              )}
            />
          </Box>

          {/* Relationship */}
          <Box sx={{ ...textFieldGap, width: '100%' }}>
            <Typography variant="body2" fontWeight="bold">
              Email{''}
              <span style={{ color: 'red', marginLeft: 1 }}>*</span>
            </Typography>
            <Controller
              name="guardian_email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="email"
                  error={!!errors.guardian_email}
                  helperText={errors.guardian_email?.message}
                  fullWidth
                />
              )}
            />
          </Box>
          {/* Address */}
          <Box sx={{ ...textFieldGap, width: '100%' }}>
            <Typography variant="body2" fontWeight="bold">
              Contact Number{' '}
            </Typography>
            <Controller
              name="guardian_phone_number"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Phone Number..."
                  type="text"
                  error={!!errors.guardian_phone_number}
                  helperText={errors.guardian_phone_number?.message}
                />
              )}
            />
          </Box>

          {/* Buttons */}
          <Stack
            direction={'row'}
            alignSelf={'flex-end'}
            justifyContent={'flex-end'}
            width={{ xs: '100%', sm: '340px' }}
            gap={{ xs: 1, sm: 2 }}
            marginTop={{ xs: 2, sm: 0 }}
          >
            <Button
              onClick={handleBack}
              fullWidth
              variant="outlined"
              color="inherit"
            >
              Back
            </Button>
            <Button fullWidth variant="contained" type="submit">
              Add Student
            </Button>
          </Stack>
        </Box>
      </form>
    </Box>
  );
};

export default GuardianForm;

// Styles
const profileBox = {
  width: '100%',
  bgcolor: '#ffffff',
  padding: {
    xs: 2,
    sm: 3,
  },
  gap: {
    xs: '12px',
    sm: 3,
  },
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  position: 'relative',
};
const textFieldGap = {
  display: 'flex',
  gap: 0.5,
  flexDirection: 'column',
};
// Styles
const boxContainer = {
  width: '100%',
  marginTop: '16px',
  padding: '0px',
  gap: {
    xs: '12px',
    sm: 3,
  },
};

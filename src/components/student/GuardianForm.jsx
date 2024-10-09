import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Material UI components
import { Box, Button, Typography, TextField, Stack } from '@mui/material';

// Custom components
import SubHeader from '../teacher/SubHeader';
import PhoneInputField from '../common/PhoneInputField';
import { GuardianValidator } from '../../validators/validationSchemas';

// - Redux Slices
import { updateFormData } from '../../store/slices/studentSlice';

const GuardianForm = ({ handleBack, handleStudentSubmit }) => {
  // - Dispatch actions
  const dispatch = useDispatch();
  const studentData = useSelector((state) => state.studentForm);

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

  useEffect(() => {
    if (studentData) {
      setValue('guardian_first_name', studentData.guardian_first_name || '');
      setValue('guardian_last_name', studentData.guardian_last_name || '');
      setValue('guardian_email', studentData.guardian_email || '');
      setValue(
        'guardian_relationship',
        studentData.guardian_relationship || '',
      );
      setValue(
        'guardian_phone_number',
        studentData.guardian_phone_number || '',
      );
    }
  }, [studentData, setValue]);

  const onSubmit = (data) => {
    const combinedData = { ...studentData, ...data };
    // Dispatch the combined data
    dispatch(updateFormData(combinedData));
    handleStudentSubmit(combinedData);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={profileBox}>
          <SubHeader title={'Guardian Information'} />

          {/* NAME INPUT */}
          <Box display={'flex'} flexDirection={'row'} sx={boxContainer}>
            <InputField
              name="guardian_first_name"
              control={control}
              label="Gaurdian First Name"
              placeholder="Gaurdian First Name"
              errors={errors}
            />

            <InputField
              name="guardian_last_name"
              control={control}
              label="Gaurdian Last Name"
              placeholder="Gaurdian Last Name"
              errors={errors}
            />
          </Box>

          {/* Relationship */}
          <InputField
            name="guardian_relationship"
            control={control}
            label="Relationship"
            placeholder="Relationship"
            errors={errors}
          />

          {/* EMAIL INPUT */}
          <InputField
            name="guardian_email"
            control={control}
            label="Email"
            placeholder="Enter guardian email"
            errors={errors}
            icon={Mail}
          />

          {/* Address */}
          <PhoneInputField
            name="guardian_phone_number"
            control={control}
            label="Contact Number"
            errors={errors}
          />

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

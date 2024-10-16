// - React and third-party libraries
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

// - Material UI components
import { Box, Button, Grid, Stack } from '@mui/material';

// - Material UI and Lucid Icons
import { Mail, UserRoundPen } from 'lucide-react';
import Diversity1Icon from '@mui/icons-material/Diversity1';

// - Custom components
import SubHeader from '../teacher/SubHeader';
import InputField from '../common/InputField';
import PhoneInputField from '../common/PhoneInputField';
import LoadingCircle from '../../components/loading/LoadingCircle';
import { GuardianValidator } from '../../validators/validationSchemas';

// - Redux Slices
import { setSnackbar } from '../../store/slices/uiSlice';
import { resetFormData } from '../../store/slices/studentSlice';

// - Student API
import { useCreateStudentMutation } from '../../services/studentApi';
import StyledButton from '../common/StyledMuiButton';

const GuardianForm = ({ handleBack, handleFormChange }) => {
  // - Dispatch actions
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const studentData = useSelector((state) => state.student);

  // - Create Student API
  const [createStudent, { isLoading, isError, error, isSuccess }] =
    useCreateStudentMutation();

  // - Form control using react-hook-form and yup validation
  const {
    control,
    handleSubmit,
    setValue,
    reset,
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

  // - Load existing student data if available
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

  // - Form submission handler
  const onSubmit = async (data) => {
    const combinedData = { ...studentData, ...data };
    handleFormChange(combinedData);

    try {
      await createStudent(combinedData).unwrap();

      // - Reset the form and Redux form data after successful submission
      reset();
      dispatch(resetFormData());
    } catch (err) {
      console.error('Failed to create student:', err);
    }
  };

  // - Snackbar notifications based on API status
  useEffect(() => {
    if (isLoading) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Creating new student....',
          severity: 'info',
          autoHideDuration: 6000,
        }),
      );
    } else if (isError) {
      dispatch(
        setSnackbar({
          open: true,
          message: error?.data?.message || 'An error occurred during signup',
          severity: 'error',
          autoHideDuration: 6000,
        }),
      );
    } else if (isSuccess) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Created Successfully',
          severity: 'success',
          autoHideDuration: 6000,
        }),
      );
      navigate('/admin/students');
    }
  }, [dispatch, isLoading, isError, error, isSuccess, navigate]);

  // - Display loading state
  if (isLoading) return <LoadingCircle />;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Guardian Name Inputs */}
        <Stack direction={'column'} gap={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <InputField
                name="guardian_first_name"
                control={control}
                label="Guardian First Name"
                placeholder="Guardian First Name"
                errors={errors}
                icon={UserRoundPen}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputField
                name="guardian_last_name"
                control={control}
                label="Guardian Last Name"
                placeholder="Guardian Last Name"
                errors={errors}
                icon={UserRoundPen}
              />
            </Grid>
          </Grid>
          {/* GUARDIAN CONTACT INFORMATION */}
          {/* Guardian Phone Number */}
          <PhoneInputField
            name="guardian_phone_number"
            control={control}
            label="Contact Number"
            errors={errors}
          />
          {/* Guardian Email */}
          <InputField
            name="guardian_email"
            control={control}
            label="Email"
            placeholder="Enter guardian email"
            errors={errors}
            icon={Mail}
          />
          {/* Guardian Relationship */}
          <InputField
            name="guardian_relationship"
            control={control}
            label="Relationship"
            placeholder="Relationship"
            errors={errors}
            icon={Diversity1Icon}
            required={false}
          />

          {/* Action Buttons */}
          <Stack direction="row" justifyContent="flex-end" gap={1}>
            <StyledButton onClick={handleBack} variant="outlined">
              Back
            </StyledButton>
            <StyledButton variant="contained" type="submit">
              Add Student
            </StyledButton>
          </Stack>
        </Stack>
      </form>
    </>
  );
};

export default GuardianForm;

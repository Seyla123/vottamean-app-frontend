// - React and third-party libraries
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

// - Material UI components
import { Box, Button, Stack } from '@mui/material';

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
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={profileBox}>
          <SubHeader title="Guardian Information" />

          {/* Guardian Name Inputs */}
          <Box display="flex" flexDirection="row" sx={boxContainer}>
            <InputField
              name="guardian_first_name"
              control={control}
              label="Guardian First Name"
              placeholder="Guardian First Name"
              errors={errors}
              icon={UserRoundPen}
            />

            <InputField
              name="guardian_last_name"
              control={control}
              label="Guardian Last Name"
              placeholder="Guardian Last Name"
              errors={errors}
              icon={UserRoundPen}
            />
          </Box>

          {/* GUARDIAN CONTACT INFORMATION */}
          <Box display="flex" flexDirection="row" sx={boxContainer}>
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
          </Box>

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
          <Stack
            direction="row"
            justifyContent="flex-end"
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
  padding: { xs: 2, sm: 3 },
  gap: { xs: '12px', sm: 3 },
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  position: 'relative',
};

const boxContainer = {
  width: '100%',
  marginTop: '16px',
  gap: { xs: '12px', sm: 3 },
};

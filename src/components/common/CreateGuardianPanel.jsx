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

import PhoneInputField from './PhoneInputField';
import LoadingCircle from '../loading/LoadingCircle';
import { GuardianValidator } from '../../validators/validationSchemas';

// - Redux Slices
import { setSnackbar } from '../../store/slices/uiSlice';
import { resetFormData } from '../../store/slices/studentSlice';

// - Student API
import { useCreateStudentMutation } from '../../services/studentApi';
import InputField from './InputField';

const CreateGuardianPanel = ({ handleFormChange, onSubmit }) => {
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

  // // - Form submission handler
  // const onSubmit = async (data) => {
  //   const combinedData = { ...studentData, ...data };
  //   handleFormChange(combinedData);

  //   try {
  //     await createStudent(combinedData).unwrap();

  //     // - Reset the form and Redux form data after successful submission
  //     reset();
  //     dispatch(resetFormData());
  //   } catch (err) {
  //     console.error('Failed to create student:', err);
  //   }
  // };

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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction={'row'} gap={2}>
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
        </Stack>
        <Stack>
          {/* Guardian Email */}
          <InputField
            name="guardian_email"
            control={control}
            label="Email"
            placeholder="Enter guardian email"
            errors={errors}
            icon={Mail}
          />
          {/* Guardian Phone Number */}
          <PhoneInputField
            name="guardian_phone_number"
            control={control}
            label="Contact Number"
            errors={errors}
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
        </Stack>
      </form>
    </div>
  );
};

export default CreateGuardianPanel;

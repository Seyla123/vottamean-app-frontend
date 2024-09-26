// React and third-party libraries
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Material UI components
import {
  Stack,
  Button,
  TextField,
  CircularProgress,
  Typography,
} from '@mui/material';

// Component
import FormComponent from '../../../../components/common/FormComponent';

// Redux Hooks and APIs
import {
  useUpdateUserProfileMutation,
  useGetUserProfileQuery,
} from '../../../../services/userApi';
import { useDispatch } from 'react-redux';

// - School formatted Data and Validator
import { getSchoolData } from '../../../../utils/formatData';
import { SchoolValidator } from '../../../../validators/validationSchemas';

// - Ui Slice for snackbar
import { setSnackbar } from '../../../../store/slices/uiSlice';

function SchoolUpdatePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // - State to store original form values
  const [originalData, setOriginalData] = useState(null);

  // - Fetch user profile data
  const { data: userProfile, isLoading, isSuccess } = useGetUserProfileQuery();

  // - Mutation hook for updating the profile
  const [
    updateUserProfile,
    {
      isLoading: isUpdateLoading,
      isError: isUpdateError,
      isSuccess: isUpdateSuccess,
      error: updateError,
    },
  ] = useUpdateUserProfileMutation();

  // - Form state
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(SchoolValidator),
    defaultValues: {
      school_name: '',
      school_address: '',
      school_phone_number: '',
    },
  });

  // - useEffect hook to fetch user profile data and set default values
  useEffect(() => {
    if (isSuccess && userProfile) {
      const formattedData = getSchoolData(userProfile);

      // Debugging to check what data is being set
      console.log('Setting default values with: ', formattedData);

      // Dynamically set the form default values
      reset(formattedData);

      // Store the original data for comparison
      setOriginalData(formattedData);
    }
  }, [isSuccess, userProfile, reset]);

  // - Handle form submission
  const onSubmit = async (data) => {
    const currentData = getValues();

    // Compare current data with the original data
    if (JSON.stringify(currentData) === JSON.stringify(originalData)) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'No changes detected',
          severity: 'info',
        }),
      );
      return;
    }

    console.log('Submitted data:', data);

    try {
      await updateUserProfile(data).unwrap();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  // Handle UI feedback
  useEffect(() => {
    if (isUpdateLoading) {
      dispatch(
        setSnackbar({ open: true, message: 'Updating...', severity: 'info' }),
      );
    } else if (isUpdateError) {
      dispatch(
        setSnackbar({
          open: true,
          message: updateError.data.message,
          severity: 'error',
        }),
      );
    } else if (isUpdateSuccess) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Updated successfully',
          severity: 'success',
        }),
      );
      navigate('/admin/settings/account');
    }
  }, [
    isUpdateLoading,
    isUpdateError,
    isUpdateSuccess,
    updateError,
    dispatch,
    navigate,
  ]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!isSuccess || !userProfile) {
    return <Typography variant="h6">No user data found</Typography>;
  }

  return (
    <FormComponent
      title="Update School Information"
      subTitle="Update your school details"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {/* School Name */}
          <TextField
            label="School Name"
            {...register('school_name')}
            error={!!errors.school_name}
            helperText={errors.school_name?.message}
            fullWidth
          />

          {/* School Phone Number */}
          <TextField
            label="School Phone Number"
            {...register('school_phone_number')}
            error={!!errors.school_phone_number}
            helperText={errors.school_phone_number?.message}
            fullWidth
          />

          {/* School Address */}
          <TextField
            label="School Address"
            {...register('school_address')}
            error={!!errors.school_address}
            helperText={errors.school_address?.message}
            fullWidth
          />

          {/* Submit button */}
          <Button type="submit" variant="contained" fullWidth>
            Update School Info
          </Button>

          {/* Cancel button */}
          <Button
            type="button"
            variant="outlined"
            fullWidth
            onClick={() => navigate('/admin/settings/account')}
          >
            Cancel
          </Button>
        </Stack>
      </form>
    </FormComponent>
  );
}

export default SchoolUpdatePage;

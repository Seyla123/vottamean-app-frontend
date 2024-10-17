// React and third-party libraries
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
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
import StyledButton from '../../../../components/common/StyledMuiButton';

/**
 * SchoolUpdatePage component allows users to update their school information,
 * including school name, address, and phone number.
 *
 * It performs the following:
 * - Fetches the current user profile data using {@link useGetUserProfileQuery}.
 * - Manages form state and validation with {@link useForm} and {@link yupResolver}.
 * - Updates the school information via {@link useUpdateUserProfileMutation}.
 * - Displays snackbar notifications for status updates and handles user feedback.
 *
 * Dependencies: React, Redux, Material UI, react-hook-form, yup.
 *
 * @returns {JSX.Element} The rendered SchoolUpdatePage component.
 */

function SchoolUpdatePage() {
  // - State to store user data for the school
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  // - State to store original form values
  const [originalData, setOriginalData] = useState(null);

  // - Form state management
  const {
    control,
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
          <Controller
            name="school_name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="School Name"
                error={!!errors.school_name}
                helperText={errors.school_name?.message}
                fullWidth
              />
            )}
          />

          {/* School Phone Number */}
          <Controller
            name="school_phone_number"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="School Phone Number"
                error={!!errors.school_phone_number}
                helperText={errors.school_phone_number?.message}
                fullWidth
              />
            )}
          />

          {/* School Address */}
          <Controller
            name="school_address"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="School Address"
                error={!!errors.school_address}
                helperText={errors.school_address?.message}
                fullWidth
              />
            )}
          />

          {/* Submit button */}
          <StyledButton type="submit" variant="contained" fullWidth>
            Update School Info
          </StyledButton>

          {/* Cancel button */}
          <StyledButton
            type="button"
            variant="outlined"
            fullWidth
            onClick={() => navigate('/admin/settings/account')}
          >
            Cancel
          </StyledButton>
        </Stack>
      </form>
    </FormComponent>
  );
}

export default SchoolUpdatePage;

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField, Stack } from '@mui/material';
import {
  useUpdateUserProfileMutation,
  useGetUserProfileQuery,
} from '../../../../services/userApi';
import { useDispatch } from 'react-redux';
import { setSnackbar } from '../../../../store/slices/uiSlice';
import { transformSchoolData } from '../../../../utils/formatData';
import { SchoolValidator } from '../../../../validators/validationSchemas';

function SchoolUpdatePage() {
  const navigate = useNavigate();

  // Fetch user profile data
  const { data: userProfile, isLoading, error } = useGetUserProfileQuery();
  console.log('userProfile', userProfile);

  // Mutation for updating user profile
  const [updateUserProfile, { isLoading: isUpdating, error: updateError }] =
    useUpdateUserProfileMutation();

  // Transform user profile data
  const transformedData = transformSchoolData(userProfile);
  console.log('transformedData', transformedData);

  // onClickBack
  const onClickBack = () => {
    console.log('cancel');

    navigate('/admin/settings/account');
  };

  // Form setup with react-hook-form
  const {
    control,
    handleSubmit,
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

  useEffect(() => {
    if (userProfile) {
      const formattedData = transformSchoolData(userProfile);

      // Debugging to check what data is being set
      console.log('Setting default values with: ', formattedData);

      // Dynamically set the form default values
      reset(formattedData);
    }
  }, [userProfile, reset]);

  // Submit handler
  const onSubmit = async (data) => {
    try {
      // Access info_id correctly
      const infoId = userProfile.data.adminProfile?.info_id;

      // Confirm info_id in console
      console.log('Extracted info_id:', infoId);

      const updatedData = {
        ...data,
        info_id: infoId,
      };

      // Log the updated data
      console.log('Updated Data:', updatedData);

      await updateUserProfile(updatedData).unwrap(); // This should be your API call
      // Dispatch success message
    } catch (err) {
      console.error('Failed to update profile:', err);
      // Dispatch error message
    }
  };

  // Handle loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user profile!</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
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

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isUpdating}
        >
          {isUpdating ? 'Updating...' : 'Update School Info'}
        </Button>

        {/* Cancel button */}
        <Button
          type="button"
          variant="outlined"
          fullWidth
          onClick={onClickBack}
        >
          Cancel
        </Button>
      </Stack>
    </form>
  );
}

export default SchoolUpdatePage;

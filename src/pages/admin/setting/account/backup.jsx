// React
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Material UI components
import {
  Box,
  Stack,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
  Typography,
} from '@mui/material';

// Custom components
import FormComponent from '../../../../components/common/FormComponent';
import profile from '../../../../assets/images/default-profile.png';

// Redux Hooks and APIs
import {
  useUpdateUserProfileMutation,
  useGetUserProfileQuery,
} from '../../../../services/userApi';

// Formatted Data
import { getUserProfileUpdateData } from '../../../../utils/formatData';

// Validator
import { UserProfileValidator } from '../../../../validators/validationSchemas';

// Snackbar
import { setSnackbar } from '../../../../store/slices/uiSlice';

function UserUpdatePersonalInfoPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [
    updateUserProfile,
    {
      isLoading: isUpdateLoading,
      isError: isUpdateError,
      isSuccess: isUpdateSuccess,
      error: updateError,
    },
  ] = useUpdateUserProfileMutation();

  // - Fetch user profile data
  const { data: userProfile, isLoading, isSuccess } = useGetUserProfileQuery();
  console.log('User Profile Data : ', userProfile);

  // Store original data for comparison
  const [originalData, setOriginalData] = useState(null);

  // Manage gender and date of birth state
  const [gender, setGender] = useState(userProfile.gender || '');
  const [dob, setDob] = useState(
    userProfile.dob ? dayjs(userProfile.dob) : null,
  );

  // - Form state using react-hook-form
  const {
    register,
    controller,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(UserProfileValidator),
    defaultValues: {
      photo: '',
      first_name: '',
      last_name: '',
      gender: '',
      dob: '',
      phone_number: '',
    },
  });

  // - useEffect hook to fetch user profile data and set default values
  useEffect(() => {
    if (isSuccess && userProfile) {
      const formattedData = getUserProfileUpdateData(userProfile);

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

  useEffect(() => {
    if (isUpdateLoading) {
      dispatch(
        setSnackbar({ open: true, message: 'Updating...', severity: 'info' }),
      );
    } else if (isUpdateError) {
      dispatch(
        setSnackbar({
          open: true,
          message: updateError?.data?.message || 'Update failed',
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
      title="Update Personal Information"
      subTitle="Update your personal details"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <img
              src={profile}
              alt="Profile"
              style={{ width: '120px', borderRadius: '50%' }}
            />
          </Box>

          {/* First Name */}
          <TextField
            label="First Name"
            {...register('first_name')}
            error={!!errors.first_name}
            helperText={errors.first_name?.message}
            fullWidth
          />

          {/* Last Name */}
          <TextField
            label="Last Name"
            {...register('last_name')}
            error={!!errors.last_name}
            helperText={errors.last_name?.message}
            fullWidth
          />

          {/* Phone Number */}
          <TextField
            label="Phone Number"
            {...register('phone_number')}
            error={!!errors.phone_number}
            helperText={errors.phone_number?.message}
            fullWidth
          />

          {/* Address */}
          <TextField
            label="Address"
            {...register('address')}
            error={!!errors.address}
            helperText={errors.address?.message}
            fullWidth
          />

          {/* Date of Birth */}
          <TextField
            label="Date of Birth"
            name="dob"
            type="date"
            value={formData?.dob || ''}
            fullWidth
            InputLabelProps={{ shrink: true }}
            error={!!errors.dob}
            helperText={errors.dob?.message}
          />

          {/* Gender */}
          <TextField
            select
            label="Gender"
            name="gender"
            fullWidth
            error={!!errors.gender}
            helperText={errors.gender?.message}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>

          {/* Submit button */}
          <Button type="submit" variant="contained" fullWidth>
            Update Personal Info
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

export default UserUpdatePersonalInfoPage;

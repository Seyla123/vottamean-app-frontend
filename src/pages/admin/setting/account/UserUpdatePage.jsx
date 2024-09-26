// React
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
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

function UserUpdatePage() {
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

  // Fetch user profile data
  const { data: userProfile, isLoading, isSuccess } = useGetUserProfileQuery();
  console.log('User Profile Data : ', userProfile);

  const [originalData, setOriginalData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null); // State for the selected file

  const {
    control,
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
      address: '',
    },
  });

  useEffect(() => {
    if (isSuccess && userProfile) {
      const formattedData = getUserProfileUpdateData(userProfile);
      console.log('Setting default values with: ', formattedData);
      reset(formattedData);
      setOriginalData(formattedData);
    }
  }, [isSuccess, userProfile, reset]);

  const onSubmit = async (data) => {
    const currentData = getValues();
    console.log('Current Data:', currentData);
    console.log('Original Data:', originalData);

    // Check if the image is uploaded or data has changed
    const isDataChanged =
      JSON.stringify(currentData) !== JSON.stringify(originalData);
    const isImageUploaded = selectedFile !== null;

    // If no changes detected and no image uploaded, show snackbar
    if (!isDataChanged && !isImageUploaded) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'No changes detected',
          severity: 'info',
        }),
      );
      return;
    }

    // Prepare form data for submission
    const formData = new FormData();
    if (selectedFile) {
      formData.append('photo', selectedFile); // Append the image file
    }
    Object.keys(data).forEach((key) => formData.append(key, data[key])); // Append the rest of the data

    console.log('Submitted data:', formData);

    try {
      await updateUserProfile(formData).unwrap();
      console.log('Profile updated successfully');
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
          {/* Photo Upload */}
          <input
            accept="image/*"
            type="file"
            id="photo-upload"
            style={{ display: 'none' }}
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
          <label htmlFor="photo-upload">
            <Button variant="contained" component="span" fullWidth>
              Upload Photo
            </Button>
          </label>

          {/* Preview the selected image */}
          {selectedFile && (
            <Box mt={2}>
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Selected Preview"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </Box>
          )}

          {/* First Name */}
          <Controller
            name="first_name"
            control={control}
            render={({ field }) => (
              <TextField
                label="First Name"
                {...field}
                error={!!errors.first_name}
                helperText={errors.first_name?.message}
                fullWidth
              />
            )}
          />

          {/* Last Name */}
          <Controller
            name="last_name"
            control={control}
            render={({ field }) => (
              <TextField
                label="Last Name"
                {...field}
                error={!!errors.last_name}
                helperText={errors.last_name?.message}
                fullWidth
              />
            )}
          />

          {/* Phone Number */}
          <Controller
            name="phone_number"
            control={control}
            render={({ field }) => (
              <TextField
                label="Phone Number"
                {...field}
                error={!!errors.phone_number}
                helperText={errors.phone_number?.message}
                fullWidth
              />
            )}
          />

          {/* Address */}
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <TextField
                label="Address"
                {...field}
                error={!!errors.address}
                helperText={errors.address?.message}
                fullWidth
              />
            )}
          />

          {/* Date of Birth */}
          <Controller
            name="dob"
            control={control}
            render={({ field }) => (
              <TextField
                label="Date of Birth"
                type="date"
                {...field}
                InputLabelProps={{ shrink: true }}
                error={!!errors.dob}
                helperText={errors.dob?.message}
                fullWidth
              />
            )}
          />

          {/* Gender */}
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <TextField
                select
                label="Gender"
                {...field}
                fullWidth
                error={!!errors.gender}
                helperText={errors.gender?.message}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            )}
          />

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

export default UserUpdatePage;

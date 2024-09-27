// React
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// - Material UI components
import {
  Box,
  Stack,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
  Typography,
} from '@mui/material';

// - Custom components
import FormComponent from '../../../../components/common/FormComponent';
import profile from '../../../../assets/images/default-profile.png';

// - Redux Hooks and APIs
import {
  useUpdateUserProfileMutation,
  useGetUserProfileQuery,
} from '../../../../services/userApi';

// - Formatted Data
import { getUserProfileUpdateData } from '../../../../utils/formatData';

// - User Profile Validator
import { UserProfileValidator } from '../../../../validators/validationSchemas';

// - UI Slice for Snackbar
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

  const { data: userProfile, isLoading, isSuccess } = useGetUserProfileQuery();

  const [originalData, setOriginalData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

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

  // Fetching and setting up the original user profile data
  useEffect(() => {
    if (isSuccess && userProfile) {
      const formattedData = getUserProfileUpdateData(userProfile);
      reset(formattedData);
      setOriginalData(formattedData);
    }
  }, [isSuccess, userProfile, reset]);

  // - Handle image file selection and preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      file.type.startsWith('image/') &&
      file.size <= 5 * 1024 * 1024
    ) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Invalid image file',
          severity: 'error',
        }),
      );
    }
  };

  // - Handle form submission
  const onSubmit = async (data) => {
    const currentData = getValues();
    console.log('Current Data:', currentData);

    const isDataChanged =
      JSON.stringify(currentData) !== JSON.stringify(originalData);
    const isImageUploaded = selectedFile !== null;

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

    const formData = new FormData();
    // Append the selected image file if it exists
    if (selectedFile) {
      formData.append('photo', selectedFile);
    }
    // Append the other fields, excluding the old photo URL if it's part of the `data`
    Object.keys(data).forEach((key) => {
      if (key !== 'photo') {
        // Exclude old photo URL
        formData.append(key, data[key]);
      }
    });

    try {
      await updateUserProfile(formData).unwrap();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  // - Snackbar notifications based on update status
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
          {/* Profile picture */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <img
              src={
                previewUrl ||
                userProfile?.data?.adminProfile?.Info.photo ||
                profile
              }
              alt="Profile"
              style={{ width: '120px', borderRadius: '50%' }}
            />
          </Box>

          {/* Photo Upload */}
          <input
            accept="image/*"
            type="file"
            id="photo-upload"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <label htmlFor="photo-upload">
            <Button variant="contained" component="span" fullWidth>
              Upload Photo
            </Button>
          </label>

          {/* Clear Image Button */}
          {selectedFile && (
            <Button
              variant="outlined"
              fullWidth
              onClick={() => {
                setSelectedFile(null);
                setPreviewUrl(null);
              }}
            >
              Clear Image
            </Button>
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
            Update
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

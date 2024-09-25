import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Stack,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
  Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateFormData } from '../../../../store/slices/formSlice';
import FormComponent from '../../../../components/common/FormComponent';
import profile from '../../../../assets/images/default-profile.png';

import {
  useUpdateUserProfileMutation,
  useGetUserProfileQuery,
} from '../../../../services/userApi';

// User Profile Data formatting
import { UserProfileUpdateData } from '../../../../utils/formatData';

// Ui Slice for snackbar
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

  const { data: userProfile, isLoading, isSuccess } = useGetUserProfileQuery();

  // Use formSlice data to store form state
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    address: '',
    dob: '',
    gender: '',
  });

  useEffect(() => {
    if (isSuccess && userProfile) {
      const transformedData = UserProfileUpdateData(userProfile);
      setFormData({
        ...transformedData.userProfile,
      });
    }
  }, [isSuccess, userProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateUserProfile(formData).unwrap();
    } catch (error) {
      console.error('Error updating profile: ', error);
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
    dispatch,
    isUpdateError,
    isUpdateLoading,
    isUpdateSuccess,
    navigate,
    updateError,
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
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {/* Profile picture */}
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
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            fullWidth
            required
          />
          {/* Last Name */}
          <TextField
            label="Last Name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            fullWidth
            required
          />
          {/* Phone */}
          <TextField
            label="Phone"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            fullWidth
          />
          {/* Address */}
          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            fullWidth
          />
          {/* Date of Birth */}
          <TextField
            label="Date of Birth"
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
          {/* Gender */}
          <TextField
            select
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            fullWidth
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

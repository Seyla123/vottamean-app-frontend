import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Box,
  Stack,
  Button,
  TextField,
  CircularProgress,
  Typography,
} from '@mui/material';

import FormComponent from '../../../../components/common/FormComponent';

import {
  useUpdateUserProfileMutation,
  useGetUserProfileQuery,
} from '../../../../services/userApi';

import { useDispatch } from 'react-redux';
import { updateFormData } from '../../../../store/slices/formSlice';

// User Profile Data formatting
import { UserProfileUpdateData } from '../../../../utils/formatData';

// Validator for form validation
import { SchoolValidator } from '../../../../validators/validationSchemas';

import { setSnackbar } from '../../../../store/slices/uiSlice';

function SchoolUpdatePage() {
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

  // Initialize formData with empty strings to avoid uncontrolled warning
  const [formData, setFormData] = useState({
    school_name: '',
    school_address: '',
    school_phone_number: '',
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
          {/* School Name */}
          <TextField
            label="School Name"
            name="school_name"
            value={formData.school_name}
            onChange={handleChange}
            fullWidth
          />

          {/* School Phone Number */}
          <TextField
            label="School Phone Number"
            name="school_phone_number"
            value={formData.school_phone_number}
            onChange={handleChange}
            fullWidth
          />

          {/* School Address */}
          <TextField
            label="School Address"
            name="school_address"
            value={formData.school_address}
            onChange={handleChange}
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

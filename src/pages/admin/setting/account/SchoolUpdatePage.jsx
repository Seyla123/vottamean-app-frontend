// React and third-party libraries
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Button, TextField, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData } from '../../../../store/slices/formSlice';

// Components
import FormComponent from '../../../../components/common/FormComponent';

// Redux hooks and API
import { useUpdateUserProfileMutation } from '../../../../services/userApi';

function UserUpdateSchoolInfoPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updateUserProfile] = useUpdateUserProfileMutation();

  // Get the initial school info from the Redux store
  const { school_name, school_address, school_phone_number } = useSelector(
    (state) => state.form,
  );

  // Local state for school form data
  const [formData, setFormData] = useState({
    school_name: school_name || '',
    school_address: school_address || '',
    school_phone_number: school_phone_number || '',
  });

  // Local state for error handling and loading
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Reset error message when user changes input
    setError('');
  };

  // Handle school info update
  // Handle school info update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    // Input validation
    if (
      !formData.school_name ||
      !formData.school_address ||
      !formData.school_phone_number
    ) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }

    try {
      // Call API to update user school information
      const updatedProfile = await updateUserProfile(formData).unwrap();

      // If the API call succeeds, update the Redux store
      if (updatedProfile) {
        dispatch(updateFormData(updatedProfile));

        // Show success message
        setSuccess(true);

        // Navigate back to the account profile page after a short delay
        setTimeout(() => {
          navigate('/admin/settings/account');
        }, 2000);

        console.log('School information updated successfully');
      }
    } catch (error) {
      // This should only catch API errors, not the successful response
      const errorMessage =
        error.data?.message ||
        'Failed to update school information. Please try again later.';
      setError(errorMessage);
      console.error('Error updating school information:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormComponent
      title={'Update School Information'}
      subTitle={'Update your school details'}
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {/* Error Message */}
          {error && <Alert severity="error">{error}</Alert>}
          {success && (
            <Alert severity="success">
              School information updated successfully!
            </Alert>
          )}

          {/* School Name */}
          <TextField
            label="School Name"
            name="school_name"
            value={formData.school_name}
            onChange={handleChange}
            fullWidth
            required
          />

          {/* School Address */}
          <TextField
            label="School Address"
            name="school_address"
            value={formData.school_address}
            onChange={handleChange}
            fullWidth
            required
          />

          {/* School Phone Number */}
          <TextField
            label="School Phone Number"
            name="school_phone_number"
            value={formData.school_phone_number}
            onChange={handleChange}
            fullWidth
            required
          />

          {/* Submit button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update School Info'}
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

export default UserUpdateSchoolInfoPage;

// React and third-party libraries
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Stack,
  Typography,
  Button,
  TextField,
  MenuItem,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData } from '../../../../store/slices/formSlice';

// Components
import FormComponent from '../../../../components/common/FormComponent';
import profile from '../../../../assets/images/default-profile.png';

// Redux hooks and API
import { useUpdateUserProfileMutation } from '../../../../services/userApi';

function UserUpdatePersonalInfoPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updateUserProfile] = useUpdateUserProfileMutation();

  // Get the initial personal info from the Redux store
  const { first_name, last_name, dob, gender, phone_number, address, photo } =
    useSelector((state) => state.form);

  // Local state for form data
  const [formData, setFormData] = useState({
    first_name: first_name || '',
    last_name: last_name || '',
    phone_number: phone_number || '',
    address: address || '',
    dob: dob || '',
    gender: gender || '',
    photo: photo || '',
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle profile update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call API to update user personal information
      const updatedProfile = await updateUserProfile(formData).unwrap();

      // Update the Redux store
      dispatch(updateFormData(updatedProfile));

      // Navigate back to the account profile page
      navigate('/admin/settings/account');
      console.log('Personal information updated successfully');
    } catch (error) {
      console.error('Failed to update personal information:', error);
    }
  };

  return (
    <FormComponent
      title={'Update Personal Information'}
      subTitle={'Update your personal details'}
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {/* Profile picture */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <img
              src={formData.photo || profile}
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

          {/* Phone Number */}
          <TextField
            label="Phone Number"
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

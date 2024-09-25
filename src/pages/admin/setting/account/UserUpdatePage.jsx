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

function UserUpdatePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updateUserProfile] = useUpdateUserProfileMutation();

  // Get the initial user profile data from the Redux store
  const {
    first_name,
    last_name,
    dob,
    gender,
    phone_number,
    address,
    photo,
    school_name,
    school_address,
    school_phone_number,
  } = useSelector((state) => state.form);

  // Local state for form data
  const [formData, setFormData] = useState({
    first_name: first_name || '',
    last_name: last_name || '',
    phone_number: phone_number || '',
    address: address || '',
    dob: dob || '',
    gender: gender || '',
    photo: photo || '',
    school_name: school_name || '',
    school_address: school_address || '',
    school_phone_number: school_phone_number || '',
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
      // Call API to update user profile
      const updatedProfile = await updateUserProfile(formData).unwrap();

      // Update the Redux store
      dispatch(updateFormData(updatedProfile));

      // Navigate back to the account profile page
      navigate('/admin/settings/account');
      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <FormComponent
      title={'Update Profile'}
      subTitle={'Update your personal information'}
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

          {/* School Name */}
          <TextField
            label="School Name"
            name="school_name"
            value={formData.school_name}
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

          {/* School Phone Number */}
          <TextField
            label="School Phone Number"
            name="school_phone_number"
            value={formData.school_phone_number}
            onChange={handleChange}
            fullWidth
          />

          {/* Submit button */}
          <Button type="submit" variant="contained" fullWidth>
            Update Profile
          </Button>

          {/* Cancel button */}
          <Button
            type="button"
            variant="outlined"
            fullWidth
            onClick={() => navigate('/admin/settings/account/profile')}
          >
            Cancel
          </Button>
        </Stack>
      </form>
    </FormComponent>
  );
}

export default UserUpdatePage;

import CardComponent from '../../../../components/common/CardComponent';
import { Typography, Stack, Avatar, Box } from '@mui/material';
import TextFieldComponent from '../../../../components/common/TextFieldComponent';
import FormComponent from '../../../../components/common/FormComponent';
import SelectField from '../../../../components/common/SelectField';
import ButtonContainer from '../../../../components/common/ButtonContainer';
import userProfile from '../../../../assets/images/default-profile.png';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// Redux hooks and actions
import { useSelector, useDispatch } from 'react-redux';
import { updateFormData } from '../../../../store/slices/formSlice';

// Redux API
import {
  useGetUserProfileByIdQuery,
  useUpdateUserProfileByIdMutation,
} from '../../../../services/userApi';

function UserUpdatePage() {
  const dispatch = useDispatch();

  // Fetch user profile data from Redux
  const formData = useSelector((state) => state.form);

  // Fetch user profile data using API
  const { data: user, isLoading } = useGetUserProfileByIdQuery(formData.id);
  const [updateUserProfileById] = useUpdateUserProfileByIdMutation();

  // Update form data in Redux
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ [name]: value }));
  };

  // Handle DatePicker changes
  const handleDateChange = (date) => {
    dispatch(updateFormData({ dob: date }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      await updateUserProfileById(formData).unwrap();
      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Failed to update profile', error);
    }
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
      <FormComponent title="Update User" subTitle="Update user information">
        <CardComponent title="User Information">
          {/* Profile Avatar */}
          <Stack component={'div'} alignSelf={'center'}>
            <Avatar sx={imgStyle} alt="user profile" src={userProfile} />
          </Stack>
          <Stack direction="row" gap={1}>
            {/* First Name */}
            <TextFieldComponent
              customStyle={{ flexGrow: 1 }}
              label="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              placeholder="First Name"
            />
            {/* Last Name */}
            <TextFieldComponent
              customStyle={{ flexGrow: 1 }}
              label="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              placeholder="Last Name"
            />
          </Stack>
          {/* Gender */}
          <SelectField
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            options={genderOptions}
            placeholder="Select Gender"
          />
          {/* Date of Birth */}
          <Box display="flex" flexDirection="column" gap="4px">
            <Typography sx={{ fontSize: '16px' }}>Date of Birth</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                inputFormat="MM/DD/YYYY"
                value={formData.dob}
                onChange={handleDateChange}
                renderInput={(params) => <TextFieldComponent {...params} />}
              />
            </LocalizationProvider>
          </Box>
          {/* Phone Number */}
          <TextFieldComponent
            label="Phone Number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
            placeholder="Phone Number"
          />
          {/* Address */}
          <TextFieldComponent
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Address"
          />
          {/* Button Container */}
          <ButtonContainer
            leftBtnTitle="Cancel"
            rightBtnTitle="Update"
            rightBtn={handleSubmit}
          />
        </CardComponent>
      </FormComponent>
    </>
  );
}

export default UserUpdatePage;

const imgStyle = {
  width: {
    xs: 120,
    sm: 160,
  },
  height: {
    xs: 120,
    sm: 160,
  },
  display: 'flex',
};

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'Prefer not to say', label: 'Prefer not to say' },
];

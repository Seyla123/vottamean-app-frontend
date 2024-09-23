// React and third-party libraries
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';

// Material UI
import {
  Typography,
  Stack,
  Avatar,
  Box,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// Components
import CardComponent from '../../../../components/common/CardComponent';
import TextFieldComponent from '../../../../components/common/TextFieldComponent';
import FormComponent from '../../../../components/common/FormComponent';
import ButtonContainer from '../../../../components/common/ButtonContainer';
import userProfile from '../../../../assets/images/default-profile.png';
import { useSelector, useDispatch } from 'react-redux';
import { updateFormData } from '../../../../store/slices/formSlice';

// Redux hooks and API
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from '../../../../services/userApi';

// User Profile Data validation
import { UserProfileValidator } from '../../../../validators/validationSchemas';

// User Profile Data formatting
import { UserProfileData } from '../../../../utils/formatData';

function UserUpdatePage() {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form);

  const { data: user, isLoading } = useGetUserProfileQuery(formData.id);
  const [updateUserProfile, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();

  const [gender, setGender] = useState(formData.gender || '');
  const [dob, setDob] = useState(formData.dob ? dayjs(formData.dob) : null);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(UserProfileValidator),
    defaultValues: formData,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ [name]: value }));
  };

  const handleDateChange = (date) => {
    setDob(date);
    dispatch(updateFormData({ dob: date?.toISOString() }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(updateFormData({ image: file }));
    }
  };

  const onSubmit = async (data) => {
    try {
      const formDataToSend = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key !== 'image' && value) {
          formDataToSend.append(key, value);
        }
      });
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      await updateUserProfile(formDataToSend).unwrap();
      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Failed to update profile', error);
    }
  };

  // Use the formatted user data on mount
  useEffect(() => {
    if (user && user.data.adminProfile?.Info) {
      const { userProfile } = UserProfileData(user); // Get formatted data

      // Update the form data with formatted values
      dispatch(
        updateFormData({
          first_name: userProfile['Full Name'].split(' ')[0],
          last_name: userProfile['Full Name'].split(' ')[1],
          gender: userProfile.Gender,
          dob: userProfile['Date of Birth'],
          phone_number: userProfile.Phone,
          address: userProfile.Address,
          email: userProfile.Email,
        }),
      );

      // Set additional local state for form controls
      setDob(dayjs(userProfile['Date of Birth']));
      setGender(userProfile.Gender);
    }
  }, [user, dispatch]);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <FormComponent title="Update User" subTitle="Update user information">
      <CardComponent title="User Information">
        <Stack component={'div'} alignSelf={'center'}>
          <Avatar
            sx={imgStyle}
            alt="user profile"
            src={
              formData.image
                ? URL.createObjectURL(formData.image)
                : user?.image || userProfile
            }
          />
          <input
            accept="image/*"
            type="file"
            onChange={handleImageUpload}
            style={{ marginTop: '10px' }}
          />
        </Stack>

        <Stack direction="row" gap={2}>
          <Box flexGrow={1}>
            <Typography variant="body1">First Name</Typography>
            <TextFieldComponent
              customStyle={{ flexGrow: 1 }}
              name="first_name"
              {...register('first_name')}
              value={formData.first_name}
              onChange={handleInputChange}
              placeholder="First Name"
              error={Boolean(errors.first_name)}
              helperText={errors.first_name?.message}
            />
          </Box>

          <Box flexGrow={1}>
            <Typography variant="body1">Last Name</Typography>
            <TextFieldComponent
              customStyle={{ flexGrow: 1 }}
              name="last_name"
              {...register('last_name')}
              value={formData.last_name}
              onChange={handleInputChange}
              placeholder="Last Name"
              error={Boolean(errors.last_name)}
              helperText={errors.last_name?.message}
            />
          </Box>
        </Stack>

        <Box>
          <Typography variant="body1">Gender</Typography>
          <Select
            fullWidth
            value={gender}
            onChange={(e) => {
              setGender(e.target.value);
              dispatch(updateFormData({ gender: e.target.value }));
            }}
            displayEmpty
            renderValue={(selected) => {
              if (!selected) {
                return <Box sx={{ color: '#B5B5B5' }}>Select gender</Box>;
              }
              return selected;
            }}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </Box>

        <Box>
          <Typography variant="body1">Date of Birth</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="dob"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  value={dob}
                  onChange={handleDateChange}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      placeholder: 'Date of Birth',
                      error: Boolean(errors.dob),
                      helperText: errors.dob?.message,
                    },
                  }}
                />
              )}
            />
          </LocalizationProvider>
        </Box>

        <Box>
          <Typography variant="body1">Phone Number</Typography>
          <TextFieldComponent
            name="phone_number"
            {...register('phone_number')}
            value={formData.phone_number}
            onChange={handleInputChange}
            placeholder="Phone Number"
            error={Boolean(errors.phone_number)}
            helperText={errors.phone_number?.message}
          />
        </Box>

        <Box>
          <Typography variant="body1">Address</Typography>
          <TextFieldComponent
            name="address"
            {...register('address')}
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Address"
            error={Boolean(errors.address)}
            helperText={errors.address?.message}
          />
        </Box>

        <ButtonContainer
          leftBtnTitle="Cancel"
          rightBtnTitle={isUpdating ? 'Updating...' : 'Update'}
          rightBtn={handleSubmit(onSubmit)}
        />
      </CardComponent>
    </FormComponent>
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

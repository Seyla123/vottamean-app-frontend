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
import Profile from '../../../../assets/images/default-profile.png';
import { useDispatch } from 'react-redux';
import { updateFormData } from '../../../../store/slices/formSlice';

// Redux hooks and API
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from '../../../../services/userApi';

// User Profile Data validation
import { UserProfileValidator } from '../../../../validators/validationSchemas';

// User Profile Data formatting
import { UserProfileUpdateData } from '../../../../utils/formatData';

function UserUpdatePage() {
  const dispatch = useDispatch();

  // Redux API calls to get user profile
  const { data: user, isLoading } = useGetUserProfileQuery();

  const [updateUserProfile, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();

  // Local state for transformed data
  const [userData, setUserData] = useState({
    userProfile: {},
    img: '',
  });
  console.log('User Data Formatted : ', userData);

  // Manage gender and date of birth state
  const [gender, setGender] = useState(userData.gender || '');
  const [dob, setDob] = useState(userData.dob ? dayjs(userData.dob) : null);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(UserProfileValidator),
    defaultValues: userData,
  });

  useEffect(() => {
    if (user) {
      const transformedData = UserProfileUpdateData(user);
      console.log('Transformed Data:', transformedData);
      setUserData(transformedData);
      reset(transformedData.userProfile);
      setDob(dayjs(transformedData.userProfile.dob));
      setGender(transformedData.userProfile.gender || '');
    }
  }, [user, dispatch, reset]);

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
      const reader = new FileReader();

      reader.onloadend = () => {
        setUserData((prev) => ({ ...prev, img: reader.result }));
        dispatch(updateFormData({ image: reader.result }));
      };

      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formDataToSend = new userData();
      Object.entries(data).forEach(([key, value]) => {
        if (key !== 'image' && value) {
          formDataToSend.append(key, value);
        }
      });
      if (userData.img) {
        formDataToSend.append('image', userData.img);
      }

      await updateUserProfile(formDataToSend).unwrap();
      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Failed to update profile', error);
    }
  };

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
            src={userData.img || Profile}
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
              name="first_name"
              {...register('first_name')}
              onChange={handleInputChange}
              placeholder="First Name"
              error={Boolean(errors.first_name)}
              helperText={errors.first_name?.message}
            />
          </Box>

          <Box flexGrow={1}>
            <Typography variant="body1">Last Name</Typography>
            <TextFieldComponent
              name="last_name"
              {...register('last_name')}
              onChange={handleInputChange}
              placeholder="First Name"
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
            onChange={handleInputChange}
            placeholder=" Number"
            error={Boolean(errors.phone_number)}
            helperText={errors.phone_number?.message}
            defaultValue={userData.userProfile.phone_number}
          />
        </Box>

        <Box>
          <Typography variant="body1">Address</Typography>
          <TextFieldComponent
            name="address"
            {...register('address')}
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

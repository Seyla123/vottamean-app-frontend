import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import dayjs from 'dayjs';

// MUI Components
import {
  TextField,
  MenuItem,
  Box,
  Avatar,
  Button,
  Typography,
  Stack,
  FormControl,
  Select,
  InputLabel,
  FormHelperText,
  capitalize,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// Redux Slice
import { setSnackbar } from '../../store/slices/uiSlice';

// Custom Components
import RandomAvatar from '../common/RandomAvatar';
import StyledButton from '../common/StyledMuiButton';
import SubHeader from './SubHeader';
import PhoneInputField from '../common/PhoneInputField';
import InputField from '../common/InputField';
import GenderSelect from '../common/GenderSelect';
import { ImagePlus, Trash2, User, UserRoundPen } from 'lucide-react';

const TeacherInfo = ({ handleNextClick, defaultValues }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const inputFileRef = useRef(null);
  const [dob, setDob] = useState(null);
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    // set properties to default values
    defaultValues: {
      first_name: defaultValues.first_name || '',
      last_name: defaultValues.last_name || '',
      phone_number: defaultValues.phone_number || '',
      gender: defaultValues.gender || '',
      dob: defaultValues.dob ? dayjs(defaultValues.dob) : null,
      address: defaultValues.address || '',
      email: defaultValues.email || '',
      password: defaultValues.password || '',
      passwordConfirm: defaultValues.passwordConfirm || '',
      photo: defaultValues.photo || '',
    },
  });

  useEffect(() => {
    if (defaultValues) {
      reset({
        ...defaultValues,
        dob: defaultValues.dob ? dayjs(defaultValues.dob) : null,
        // format daate can not in the future
      });
      setDob(defaultValues.dob ? dayjs(defaultValues.dob) : null);
      // Check if a photo URL or file is present
      if (defaultValues.photo) {
        setPhotoPreview(defaultValues.photo);
      }
    }
  }, [defaultValues, reset]);

  // useEffect(() => {
  //   console.log('Default Values:', defaultValues);
  //   console.log('Photo Preview:', photoPreview);
  //   console.log('DOB:', getValues('dob'));
  // }, [defaultValues, photoPreview]);

  // Handle form submission
  const onSubmit = (data) => {
    console.log('Form Data:', data);
    handleNextClick(true, {
      ...data,
      gender: data.gender || '',
      dob: data.dob ? dob.toISOString() : null,
      photo: photoFile || photoPreview || null,
    });
  };

  //  Handle photo upload
  const handlePhotoUpload = (event) => {
    console.log('handle photo upload:', handlePhotoUpload);
    const file = event.target.files[0];
    if (
      file &&
      file.type.startsWith('image/') &&
      file.size <= 5 * 1024 * 1024
    ) {
      setPhotoFile(file);
      const newPreviewUrl = URL.createObjectURL(file);
      setPhotoPreview(newPreviewUrl);
      setValue('photo', newPreviewUrl);
    } else {
      dispatch(
        setSnackbar({
          open: true,
          message:
            'Invalid file type or size. Please upload a JPEG, PNG, or GIF under 5MB.',
          severity: 'error',
          autoHideDuration: 6000,
        }),
      );
    }
  };

  // handle remove photo
  const handleRemovePhoto = () => {
    if (photoPreview) {
      URL.revokeObjectURL(photoPreview);
    }
    setPhotoFile(null);
    setPhotoPreview(null);
    setValue('photo', '');
    if (inputFileRef.current) {
      inputFileRef.current.value = '';
    }
  };

  // handle cancel
  const handleCancel = () => {
    navigate('/admin/teachers');
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={profileBox}>
          {/* Profile Photo */}
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              gap: 2,
              pb: {
                xs: 2,
                sm: 4,
              },
              pt: {
                xs: 0,
                sm: 4,
              },
            }}
          >
            {/* profile */}
            {photoPreview ? (
              <Avatar
                src={photoPreview}
                alt="Profile"
                sx={{ width: 140, height: 140, bgcolor: '#eee' }}
              />
            ) : (
              <RandomAvatar
                username={`${getValues('firstName')} ${getValues('lastName')}`}
                gender={getValues('gender')}
                size={140}
              />
            )}
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              ref={inputFileRef}
              hidden
              onChange={handlePhotoUpload}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                gap: 2,
              }}
            >
              <label htmlFor="photo-upload">
                <StyledButton
                  variant="contained"
                  size="small"
                  component="span"
                  startIcon={<ImagePlus size={18} />}
                >
                  Upload
                </StyledButton>
              </label>
              <StyledButton
                variant="outlined"
                size="small"
                color="error"
                startIcon={<Trash2 size={18} />}
                onClick={handleRemovePhoto}
              >
                Remove
              </StyledButton>
            </Box>
          </Box>
          {/* Sub Header */}
          <SubHeader title={'Teacher Information'} />
          {/* Name */}
          <Box display={'flex'} flexDirection={'row'} sx={boxContainer}>
            <Box sx={{ flex: 1, width: '100%' }}>
              <InputField
                name="firstName"
                control={control}
                label="First Name"
                icon={UserRoundPen}
                placeholder="First Name"
                errors={errors}
              />
            </Box>
            <Box sx={{ flex: 1, width: '100%' }}>
              <InputField
                name="lastName"
                control={control}
                label="Last Name"
                placeholder="Last Name"
                icon={UserRoundPen}
                errors={errors}
              />
            </Box>
          </Box>
          {/* Gender */}
          <Box sx={{ ...textFieldGap, width: '100%' }}>
            <Controller
              name="gender"
              control={control}
              defaultValue="" // Make sure to set an appropriate default value
              rules={{ required: 'Gender is required' }} // Validation rule
              render={({ field }) => (
                <GenderSelect
                  control={control}
                  errors={errors}
                  name={field.name}
                  label="Gender"
                  defaultValue={field.value} // Use the field value
                  disabled={false}
                />
              )}
            />
          </Box>
          {/* Date of Birth */}
          <Box sx={{ ...textFieldGap, width: '100%' }}>
            <Typography variant="body2" fontWeight="bold">
              Date of Birth{' '}
              <span style={{ color: 'red', marginLeft: 1 }}>*</span>
            </Typography>
            <Controller
              name="dob"
              control={control}
              rules={{
                required: 'Date of birth is required',
                validate: (value) => {
                  if (!value) {
                    return 'Date of birth is required';
                  }
                  if (dayjs(value).isAfter(dayjs())) {
                    return 'Date of birth cannot be in the future';
                  }
                  return true;
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  inputFormat="MM/DD/YYYY"
                  value={dob}
                  onChange={(newValue) => {
                    setDob(newValue);
                    field.onChange(newValue);
                  }}
                  maxDate={dayjs()}
                  slotProps={{
                    textField: {
                      error: !!error,
                      helperText: errors.dob?.message,
                      fullWidth: true,
                    },
                  }}
                />
              )}
            />
          </Box>
          {/* Contact Number */}
          <Box sx={{ ...textFieldGap, width: '100%' }}>
            <PhoneInputField
              name="phoneNumber"
              control={control}
              label="Contact Number"
              errors={errors}
            />
          </Box>
          {/* Address */}
          <Box sx={{ ...textFieldGap, width: '100%' }}>
            <InputField
              name="address"
              required={false}
              control={control}
              label="Street Address"
              placeholder="Phnom Penh, Street 210,..."
              errors={errors}
              multiline={true}
              minRows={5}
            />
          </Box>
          <Stack
            direction={'row'}
            alignSelf={'flex-end'}
            justifyContent={'flex-end'}
            width={{ xs: '100%', sm: '300px', md: '280px' }}
            gap={2}
            marginTop={{ xs: 2, sm: 0 }}
          >
            <StyledButton
              fullWidth
              variant="outlined"
              color="inherit"
              onClick={handleCancel}
            >
              Cancel
            </StyledButton>
            <StyledButton fullWidth variant="contained" type="submit">
              Submit
            </StyledButton>
          </Stack>
        </Box>
      </form>
    </LocalizationProvider>
  );
};

export default TeacherInfo;

// Styles
const boxContainer = {
  width: '100%',
  marginTop: '16px',
  padding: '0px',
  gap: { xs: '12px', sm: 3 },
};
const profileBox = {
  width: '100%',
  margin: 'auto',
  bgcolor: '#ffffff',
  // padding: { xs: 2, sm: 3 },
  gap: { xs: '12px', sm: 3 },
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  position: 'relative',
};
const textFieldGap = {
  display: 'flex',
  gap: 0.5,
  flexDirection: 'column',
};
// Define validation schema
export const validationSchema = yup.object({
  firstName: yup
    .string().trim()
    .required('First name is required')
    .matches(
      /^[A-Za-z]+( [A-Za-z]+)*$/,
      'Name must contain only alphabetic characters and single spaces between words',
    )
    .min(2, 'Name must be at least 2 characters long')
    .max(40, 'Name must be less than 40 characters'),
  lastName: yup
    .string().trim()
    .required('Last name is required')
    .matches(
      /^[A-Za-z]+( [A-Za-z]+)*$/,
      'Name must contain only alphabetic characters and single spaces between words',
    )
    .min(2, 'Name must be at least 2 characters long')
    .max(40, 'Name must be less than 40 characters'),
  phoneNumber: yup
    .string().trim()
    .required('Phone number is required')
    .test(
      'length',
      'Phone number must be between 9 and 15 digits (excluding country code)',
      (value) => {
        // Extract the number part (after the country code)
        const numberPart = value && value.replace(/[^0-9]/g, '');
        return numberPart && numberPart.length >= 9 && numberPart.length <= 15;
      },
    )
    .matches(
      /^\+\d{1,3}\s\d{1,3}.*$/,
      'Phone number must start with a country code and area code (e.g., +855 23 ...)',
    ),
  photo: yup.mixed().nullable(),
  gender: yup
    .string().trim()
    .transform((value) => capitalize(value))
    // Transform the value before validation
    .oneOf(
      ['Male', 'Female', 'Other'],
      'Gender must be either Male, Female, or Other',
    )
    .required('Gender is required'),
  dob: yup
    .string().trim()
    .required('Date of birth is required')
    .max(new Date(), 'Date of birth cannot be in the future')
    .typeError('Invalid date format'),
  address: yup
    .string().trim()
    .nullable()
    .notRequired()
    .max(200, 'Address must be less than 200 characters'),
});

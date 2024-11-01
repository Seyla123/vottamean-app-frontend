// React and third-party libraries
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// React Hook Form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import dayjs from 'dayjs';

// MUI Components
import { Box, Avatar, Typography, Stack, capitalize } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// Custom Components
import RandomAvatar from '../common/RandomAvatar';
import StyledButton from '../common/StyledMuiButton';
import PhoneInputField from '../common/PhoneInputField';
import InputField from '../common/InputField';
import GenderSelect from '../common/GenderSelect';
import DOBPicker from '../common/DOBPicker';

// icons from luicide react
import { ImagePlus, Trash2, UserRoundPen } from 'lucide-react';

const TeacherInfo = ({
  handleNextClick,
  defaultValues,
  handlePhotoChange,
  photoFile,
  setPhotoFile,
  photoPreview,
  setPhotoPreview,
  photoPreviewRef,
}) => {
  const navigate = useNavigate();
  const [dob, setDob] = useState(null);

  // React hook form
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: defaultValues.first_name || '',
      lastName: defaultValues.last_name || '',
      phoneNumber: defaultValues.phone_number || '',
      gender: defaultValues.gender || '',
      dob: defaultValues.dob ? dayjs(defaultValues.dob) : null,
      address: defaultValues.address || '',
      email: defaultValues.email || '',
      password: defaultValues.password || '',
      passwordConfirm: defaultValues.passwordConfirm || '',
      photo: defaultValues.photo || '',
    },
  });

  // Update form when defaultValues change
  useEffect(() => {
    if (defaultValues) {
      reset({
        ...defaultValues,
        dob: defaultValues.dob ? dayjs(defaultValues.dob) : null,
      });
      setDob(defaultValues.dob ? dayjs(defaultValues.dob) : null);

      // Clear old photo URL if it exists
      if (photoPreview) {
        URL.revokeObjectURL(photoPreview);
      }

      // Set new photo preview if exists
      if (defaultValues.photo) {
        const photoUrl =
          typeof defaultValues.photo === 'string'
            ? defaultValues.photo
            : URL.createObjectURL(defaultValues.photo);
        setPhotoPreview(photoUrl);
        setPhotoFile(defaultValues.photo);
      }
    }
    // Cleanup function to revoke the old photo URL
    return () => {
      if (photoPreview && typeof photoPreview !== 'string') {
        URL.revokeObjectURL(photoPreview);
      }
    };
  }, [defaultValues]);

  // Handle form submission
  const onSubmit = (data) => {
    handleNextClick(true, {
      ...data,
      gender: data.gender || '',
      dob: data.dob ? dob.toISOString() : null,
      photo: photoFile || photoPreview || null,
    });
  };

  // Handle remove photo
  const handleRemovePhoto = () => {
    if (photoPreview) {
      URL.revokeObjectURL(photoPreview);
    }
    setPhotoFile(null);
    setPhotoPreview(null);
    setValue('photo', null);

    // Reset file input
    if (photoPreviewRef.current) {
      photoPreviewRef.current.value = '';
    }
  };

  // Handle cancel back home
  const handleCancel = () => {
    navigate('/admin/teachers');
  };

  // Photo preview
  const photoSrc =
    photoPreview || (photoFile ? URL.createObjectURL(photoFile) : null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={profileBox}>
          {/* Header */}
          <Box alignSelf={'start'} width={'100%'}>
            <Typography
              alignSelf={'start'}
              variant="h6"
              component="h2"
              fontWeight={'bold'}
              gutterBottom
            >
              Teacher Information
            </Typography>
          </Box>
          <Box sx={profileContainer}>
            {/* Profile */}
            {photoPreview || photoFile ? (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1,
                  position: 'relative',
                  boxShadow: 'rgba(17, 12, 46, 0.15) 0px 28px 100px 0px',
                  p: 0.5,
                  borderRadius: 50,
                }}
              >
                <Avatar
                  src={photoSrc}
                  alt="Profile"
                  sx={{ width: 140, height: 140, bgcolor: '#eee' }}
                />
              </Box>
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
              ref={photoPreviewRef}
              hidden
              onChange={handlePhotoChange}
            />
            {/* Profile Buttons */}
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
                component="span"
                startIcon={<Trash2 size={18} />}
                onClick={handleRemovePhoto}
              >
                Remove
              </StyledButton>
            </Box>
          </Box>
          {/* Name */}
          <Stack direction={'column'} spacing={2} width="100%">
            <Stack
              direction={{
                xs: 'column',
                sm: 'row',
              }}
              spacing={2}
            >
              <InputField
                name="firstName"
                control={control}
                label="First Name"
                icon={UserRoundPen}
                placeholder="First Name"
                errors={errors}
              />
              <InputField
                name="lastName"
                control={control}
                label="Last Name"
                placeholder="Last Name"
                icon={UserRoundPen}
                errors={errors}
              />
            </Stack>
            {/* Gender */}
            <Controller
              name="gender"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <GenderSelect
                  control={control}
                  name={field.name}
                  label="Gender"
                  defaultValue={field.value}
                  disabled={false}
                  errors={errors}
                />
              )}
            />
            {/* Date of Birth */}
            <DOBPicker
              control={control}
              errors={errors}
              name="dob"
              dob={dob}
              setDob={setDob}
              fullWidth
            />
            {/* Contact Number */}
            <PhoneInputField
              name="phoneNumber"
              control={control}
              label="Contact Number"
              errors={errors}
            />
            {/* Address */}
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
          </Stack>
          {/* Buttons */}
          <Stack
            direction={'row'}
            alignSelf={'flex-end'}
            justifyContent={'flex-end'}
            width={{ xs: '100%', sm: '300px', md: '260px' }}
            gap={2}
            marginTop={{ xs: 2, sm: 0 }}
          >
            <StyledButton
              fullWidth
              variant="outlined"
              color="inherit"
              onClick={handleCancel}
              size="small"
            >
              Cancel
            </StyledButton>
            <StyledButton
              fullWidth
              variant="contained"
              type="submit"
              size="small"
            >
              Continue
            </StyledButton>
          </Stack>
        </Box>
      </form>
    </LocalizationProvider>
  );
};

export default TeacherInfo;

// Styles
const profileContainer = {
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: 2,
  pb: { xs: 2, sm: 4 },
  pt: { xs: 0, sm: 4 },
};
const profileBox = {
  width: '100%',
  margin: 'auto',
  bgcolor: '#ffffff',
  gap: { xs: 2, sm: 3 },
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
};
// Define validation schema
export const validationSchema = yup.object({
  firstName: yup
    .string()
    .trim()
    .label('First Name')
    .required('First name is required')
    .matches(
      /^[A-Za-z]+( [A-Za-z]+)*$/,
      'Name must contain only alphabetic characters and single spaces between words',
    )
    .min(2, 'Name must be at least 2 characters long')
    .max(40, 'Name must be less than 40 characters'),
  lastName: yup
    .string()
    .trim()
    .label('Last Name')
    .required('Last name is required')
    .matches(
      /^[A-Za-z]+( [A-Za-z]+)*$/,
      'Name must contain only alphabetic characters and single spaces between words',
    )
    .min(2, 'Name must be at least 2 characters long')
    .max(40, 'Name must be less than 40 characters'),
  phoneNumber: yup
    .string()
    .trim()
    .required('Phone number is required')
    .matches(
      /^\+\d{1,3}\s\d{1,3}.*$/,
      'Phone number must start with a country code and area code (e.g., +855 23 ...)',
    )
    .matches(
      /^\+\d{1,3}\s(?!0)/,
      'Phone number should not start with a zero after the country code',
    )
    .test(
      'length',
      'Phone number must be between 8 and 15 digits (excluding country code)',
      (value) => {
        const numberPart = value && value.split(' ').slice(1).join('').replace(/[^0-9]/g, '');
        return numberPart && numberPart.length >= 8 && numberPart.length <= 15;
      },
    ),
  photo: yup.mixed().nullable(),
  gender: yup
    .string()
    .trim()
    .transform((value) => capitalize(value))
    // Transform the value before validation
    .required('Gender is required')
    .oneOf(
      ['Male', 'Female', 'Other'],
      'Gender must be either Male, Female, or Other',
    ),
  dob: yup
    .date()
    .required('Date of birth is required')
    .max(new Date(), 'Date of birth cannot be in the future')
    .typeError('Invalid date format'),
  address: yup
    .string()
    .trim()
    .nullable()
    .notRequired()
    .max(200, 'Address must be less than 200 characters'),
});

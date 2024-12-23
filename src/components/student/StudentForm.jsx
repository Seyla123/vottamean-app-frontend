// - React and third-party libraries
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import * as yup from 'yup';
import { useTheme } from '@emotion/react';

// - Material UI Components and luicide icons
import {
  MenuItem,
  Typography,
  Grid,
  Avatar,
  Stack,
  capitalize,
  InputAdornment,
  Box,
} from '@mui/material';
import { UserRoundPen, Trash2, ImagePlus, School } from 'lucide-react';

// - Custom Components
import DOBPicker from '../common/DOBPicker';
import PhoneInputField from '../common/PhoneInputField';
import InputField from '../common/InputField';
import GenderSelect from '../common/GenderSelect';
import StyledButton from '../common/StyledMuiButton';
import { StyledTextField } from '../common/GenderSelect';
import RandomAvatar from '../common/RandomAvatar';
// - Redux Slices and APIs
import { useGetClassesDataQuery } from '../../services/classApi';

// Redux Slice
import { setSnackbar } from '../../store/slices/uiSlice';

const StudentForm = ({
  handleNext,
  defaultValues = {},
  handlePhotoChange,
  photoFile,
  setPhotoFile,
  photoPreview,
  setPhotoPreview,
  photoPreviewRef,
}) => {
  const navigate = useNavigate();
  const [dob, setDob] = useState(null);
  const theme = useTheme();

  // useGetClassesDataQuery : a hook return function for class data api
  const {
    data: classesData,
    isLoading,
    error,
    isError,
  } = useGetClassesDataQuery({ active: 1 });

  // React Hook Form
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    resolver: yupResolver(studentValidationSchema),
    defaultValues: {
      firstName: defaultValues.first_name || '',
      lastName: defaultValues.last_name || '',
      phoneNumber: defaultValues.phone_number || '',
      gender: defaultValues.gender || '',
      dob: defaultValues.dob ? dayjs(defaultValues.dob) : null,
      address: defaultValues.address || '',
      class_id: defaultValues.class_id ? String(defaultValues.class_id) : null,
      photo: defaultValues.photo || '',
      guardianFirstName: defaultValues.guardian_first_name || '',
      guardianLastName: defaultValues.guardian_last_name || '',
      guardianEmail: defaultValues.guardian_email || '',
      guardianPhoneNumber: defaultValues.guardian_phone_number || '',
      guardianRelationship: defaultValues.guardian_relationship || '',
    },
  });

  // Dispatch the action for error fetching classes data
  useEffect(() => {
    if (isError) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Error fetching classes data',
          severity: 'error',
        }),
      );
    }
  }, [classesData, error]);

  // Reset form and photo states when defaultValues change
  useEffect(() => {
    if (defaultValues) {
      reset({
        ...defaultValues,
        class_id: defaultValues.class_id
          ? String(defaultValues.class_id)
          : null,
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

  // form submission
  const onSubmit = (data) => {
    handleNext(true, {
      ...data,
      class_id: data.class_id ? Number(data.class_id) : null, // Converting to number
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

  // Photo preview
  const photoSrc =
    photoPreview || (photoFile ? URL.createObjectURL(photoFile) : '');

  // Handle cancel back home
  const handleCancel = () => {
    navigate('/admin/students');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Header */}
      <Typography
        alignSelf={'start'}
        variant="h6"
        component="h2"
        fontWeight={'bold'}
        gutterBottom
      >
        Student Information
      </Typography>
      <Stack direction="column" gap={2}>
        {/* Profile */}
        <Stack direction="row" gap={2} alignItems="center" py={3}>
          <Stack spacing={1} alignItems={'center'}>
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
            <Typography
              variant="subtitle2"
              color="text.secondary"
              fontWeight={'regular'}
            >
              Max size: 1MB
            </Typography>
          </Stack>
          <Stack direction="column" gap={2}>
            <input
              accept="image/*"
              type="file"
              id="photo-upload"
              ref={photoPreviewRef}
              hidden
              onChange={handlePhotoChange}
            />
            {/* Upload button */}
            <label htmlFor="photo-upload">
              <StyledButton
                component="span"
                startIcon={<ImagePlus size={18} />}
                variant="contained"
                size="small"
              >
                Upload
              </StyledButton>
            </label>
            {/* Remove button */}
            <StyledButton
              color="error"
              variant="outlined"
              size="small"
              startIcon={<Trash2 size={18} />}
              onClick={handleRemovePhoto}
            >
              Remove
            </StyledButton>
          </Stack>
        </Stack>
        {/* Input fields */}
        <Stack direction={'column'} spacing={2}>
          {/* Name */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <InputField
              name="firstName"
              control={control}
              label="First Name"
              placeholder="First Name"
              errors={errors}
              icon={UserRoundPen}
              required
              fullWidth
            />
            <InputField
              name="lastName"
              control={control}
              label="Last Name"
              placeholder="Last Name"
              errors={errors}
              icon={UserRoundPen}
              required
              fullWidth
            />
          </Stack>
          {/* Gender */}
          <GenderSelect
            control={control}
            errors={errors}
            name="gender"
            label="Gender"
            defaultValue=""
            fullWidth
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
          {/* Class */}
          <Stack>
            <Typography variant="body2" fontWeight="bold" mb={1}>
              Class <span style={{ color: 'red' }}>*</span>
            </Typography>
            <Controller
              name="class_id"
              control={control}
              defaultValue={defaultValues.class_id || ''}
              render={({ field, fieldState }) => (
                <>
                  <StyledTextField
                    {...field}
                    value={field.value || ''}
                    onChange={(e) => field.onChange(e.target.value)}
                    select
                    fullWidth
                    disabled={isLoading}
                    error={errors?.class_id}
                    helperText={
                      fieldState?.error ? fieldState.error.message : ''
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <School size={20} />
                        </InputAdornment>
                      ),
                    }}
                    SelectProps={{
                      displayEmpty: true,
                      renderValue: (selected) => {
                        if (!selected) {
                          return (
                            <span style={{ color: theme.palette.grey[400] }}>
                              Class
                            </span>
                          );
                        }
                        // Find the class name from the classesData based on selected class_id
                        const selectedClass = classesData?.data?.find(
                          (classItem) =>
                            classItem.class_id === Number(selected),
                        );
                        return selectedClass ? selectedClass.class_name : '';
                      },
                    }}
                  >
                    <MenuItem value="" disabled>
                      {isLoading ? 'Loading classes...' : 'Select a class'}
                    </MenuItem>
                    {classesData?.data?.length ? (
                      classesData.data.map((classItem) => (
                        <MenuItem
                          key={classItem.class_id}
                          value={classItem.class_id}
                        >
                          {classItem.class_name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>No classes available</MenuItem>
                    )}
                  </StyledTextField>
                </>
              )}
            />
          </Stack>
          {/* Phone number */}
          <PhoneInputField
            name="phoneNumber"
            control={control}
            label="Contact Number"
            errors={errors}
            fullWidth
          />
          {/* Address */}
          <InputField
            name="address"
            control={control}
            label="Street Address"
            placeholder="Phnom Penh, Street 210, ..."
            errors={errors}
            required={false}
            multiline
            minRows={5}
            fullWidth
          />
        </Stack>
        {/* Buttons */}
        <Stack
          direction="row"
          alignSelf="flex-end"
          justifyContent="flex-end"
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
      </Stack>
    </form>
  );
};

export default StudentForm;
// Define validation schema
export const studentValidationSchema = yup.object({
  firstName: yup
    .string()
    .trim()
    .label('First Name')
    .required('First name is required')
    .matches(
      /^[a-zA-Z]+( [a-zA-Z]+)?$/,
      'First name must contain only alphabetic characters and may contain a single space',
    )
    .min(2, 'Name must be at least 2 characters long')
    .max(20, 'Name must be less than 20 characters'),
  lastName: yup
    .string()
    .trim()
    .label('Last Name')
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters long')
    .max(20, 'Last name must be less than 20 characters')
    .matches(
      /^[a-zA-Z]+( [a-zA-Z]+)?$/,
      'Last name must contain only alphabetic characters and may contain a single space',
    ),
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
        // Extract the number part (after the country code)
        const numberPart =
          value &&
          value
            .split(' ')
            .slice(1)
            .join('')
            .replace(/[^0-9]/g, '');
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
      ['Male', 'Female'],
      'Gender must be either Male or Female',
    ),
  class_id: yup.number().required('Class is required'),
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
    .max(255, 'Address must be less than 255 characters'),
});

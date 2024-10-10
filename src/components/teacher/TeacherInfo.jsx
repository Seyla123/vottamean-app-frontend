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
import { ImagePlus, Trash2 } from 'lucide-react';

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
    defaultValues: {
      photo: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      gender: '',
      dob: null,
      address: '',
    },
  });

  // set the default values for the properties
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
      // set the photo preview if it exists in default values
      if (defaultValues.photo) {
        setPhotoPreview(defaultValues.photo);
      }
    }
  }, [defaultValues, reset]);

  // Handle form submission
  const onSubmit = (data) => {
    const updatedData = {
      ...data,
      photo: photoPreview,
    };
    handleNextClick(true, updatedData);
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhotoFile(file);
      const newPreviewUrl = URL.createObjectURL(file);
      setPhotoPreview(newPreviewUrl);
      setValue('photo', newPreviewUrl);
    }
  };

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
              textAlign: 'start',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
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
              accept="image/*"
              id="photo-upload"
              type="file"
              hidden
              ref={inputFileRef}
              onChange={handlePhotoUpload}
            />
            <label htmlFor="photo-upload">
              <StyledButton
                variant="contained"
                size="small"
                component="span"
                startIcon={<ImagePlus size={20} />}
              >
                Upload
              </StyledButton>
            </label>
            <StyledButton
              variant="outlined"
              size="small"
              color="error"
              startIcon={<Trash2 size={20} />}
              onClick={handleRemovePhoto}
            >
              Remove
            </StyledButton>
          </Box>

          <SubHeader title={'Teacher Information'} />

          <Box display={'flex'} flexDirection={'row'} sx={boxContainer}>
            <Box sx={{ flex: 1, width: '100%' }}>
              <InputField
                name="firstName"
                control={control}
                label="First Name"
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
                errors={errors}
              />
            </Box>
          </Box>

          <Box sx={{ ...textFieldGap, width: '100%' }}>
            <GenderSelect
              name="gender"
              control={control}
              errors={errors}
              label="Gender"
              defaultValue={defaultValues?.gender}
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

          <Box sx={{ ...textFieldGap, width: '100%' }}>
            <PhoneInputField
              name="phoneNumber"
              control={control}
              label="Contact Number"
              errors={errors}
            />
          </Box>

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
  bgcolor: '#ffffff',
  padding: { xs: 2, sm: 3 },
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
    .string()
    .required('First name is required')
    .matches(
      /^[A-Za-z]+( [A-Za-z]+)*$/,
      'Name must contain only alphabetic characters and single spaces between words',
    )
    .min(2, 'Name must be at least 2 characters long')
    .max(40, 'Name must be less than 40 characters'),
  lastName: yup
    .string()
    .required('Last name is required')
    .matches(
      /^[A-Za-z]+( [A-Za-z]+)*$/,
      'Name must contain only alphabetic characters and single spaces between words',
    )
    .min(2, 'Name must be at least 2 characters long')
    .max(40, 'Name must be less than 40 characters'),
  phoneNumber: yup
    .string()
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
  gender: yup
    .string()
    .required('Gender is required')
    .oneOf(['Male', 'Female', 'Other'], 'Please select a valid gender'),
  dob: yup
    .string()
    .required('Date of birth is required')
    .max(new Date(), 'Date of birth cannot be in the future')
    .typeError('Invalid date format'),
  address: yup
    .string()
    .nullable()
    .notRequired()
    .max(200, 'Address must be less than 200 characters'),
});

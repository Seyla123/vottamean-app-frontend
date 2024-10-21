// - React and third-party libraries
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import SomethingWentWrong from '../common/SomethingWentWrong';
import LoadingCircle from '../loading/LoadingCircle';
import * as yup from 'yup';

// - Material UI Components
import {
  MenuItem,
  Box,
  Typography,
  Select,
  Button,
  Paper,
  Grid,
  Avatar,
  IconButton,
  Stack,
  capitalize,
} from '@mui/material';
import { UserRoundPen, Upload, Trash2 } from 'lucide-react';

// - Custom Components
import DOBPicker from '../common/DOBPicker';
import PhoneInputField from '../common/PhoneInputField';
import InputField from '../common/InputField';
import GenderSelect from '../common/GenderSelect';
import StyledButton from '../common/StyledMuiButton';
import SubHeader from '../teacher/SubHeader';
import { StyledTextField } from '../common/GenderSelect';
// - Redux Slices and APIs
import { useGetClassesDataQuery } from '../../services/classApi';
// import { updateFormData } from '../../store/slices/studentSlice';
import { validationSchema } from '../teacher/TeacherInfo';
import { useNavigate } from 'react-router-dom';
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
  const {
    data: classesData,
    isLoading,
    error,
    isError,
  } = useGetClassesDataQuery();

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

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(studentValidationSchema),
    defaultValues: {
      firstName: defaultValues.first_name || '',
      lastName: defaultValues.last_name || '',
      phoneNumber: defaultValues.phone_number || '',
      gender: defaultValues.gender || '',
      dob: defaultValues.dob ? dayjs(defaultValues.dob) : null,
      address: defaultValues.address || '',
      class_id: defaultValues.class_id || '',
      photo: defaultValues.photo || '',
      guardian_first_name: defaultValues.guardian_first_name || '',
      guardian_last_name: defaultValues.guardian_last_name || '',
      guardian_email: defaultValues.guardian_email || '',
      guardian_phone_number: defaultValues.guardian_phone_number || '',
      guardian_relationship: defaultValues.guardian_relationship || '',
    },
  });

  useEffect(() => {
    if (defaultValues) {
      reset({
        ...defaultValues,
        dob: defaultValues.dob ? dayjs(defaultValues.dob) : null,
      });
      setDob(defaultValues.dob ? dayjs(defaultValues.dob) : null);

      if (defaultValues.photo) {
        const photoUrl =
          typeof defaultValues.photo === 'string'
            ? defaultValues.photo
            : URL.createObjectURL(defaultValues.photo);
        setPhotoPreview(photoUrl);
      }
    }

    return () => {
      if (photoPreview && typeof photoPreview !== 'string') {
        URL.revokeObjectURL(photoPreview);
      }
    };
  }, [defaultValues, reset, photoPreview, setPhotoPreview]);

  const onSubmit = (data) => {
    handleNext(true, {
      ...data,
      gender: data.gender || '',
      dob: data.dob ? dob.toISOString() : null,
      photo: photoFile || photoPreview || null,
    });
  };

  const handleRemovePhoto = () => {
    if (photoPreview) {
      URL.revokeObjectURL(photoPreview);
    }
    setPhotoFile(null);
    setPhotoPreview(null);
    setValue('photo', '');
  };

  const handleCancel = () => {
    navigate('/admin/students');
  };

  const photoSrc =
    photoPreview || (photoFile ? URL.createObjectURL(photoFile) : '');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" gap={2}>
        <Stack direction="row" gap={2} alignItems="center">
          <Avatar
            src={photoSrc}
            alt="Profile"
            ref={photoPreviewRef}
            sx={{ width: '120px', height: '120px' }}
          />
          <Stack direction="column" gap={2}>
            <input
              accept="image/*"
              type="file"
              id="photo-upload"
              hidden
              onChange={handlePhotoChange}
            />
            <label htmlFor="photo-upload">
              <StyledButton
                component="span"
                startIcon={<Upload size={18} />}
                variant="contained"
                size="small"
              >
                Upload Photo
              </StyledButton>
            </label>
            <StyledButton
              color="error"
              variant="outlined"
              size="small"
              startIcon={<Trash2 size={18} />}
              onClick={handleRemovePhoto}
            >
              Delete
            </StyledButton>
          </Stack>
        </Stack>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <InputField
              name="firstName"
              control={control}
              label="First Name"
              placeholder="First Name"
              errors={errors}
              icon={UserRoundPen}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField
              name="lastName"
              control={control}
              label="Last Name"
              placeholder="Last Name"
              errors={errors}
              icon={UserRoundPen}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <GenderSelect
              control={control}
              errors={errors}
              name="gender"
              label="Gender"
              defaultValue=""
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DOBPicker
              control={control}
              errors={errors}
              name="dob"
              dob={dob}
              setDob={setDob}
              fullWidth
            />
          </Grid>

          {/* STUDENT CLASS */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" fontWeight="bold" gutterBottom>
              Class <span style={{ color: 'red' }}>*</span>
            </Typography>
            <Controller
              name="class_id"
              control={control}
              defaultValue={defaultValues.class_id || ''}
              render={({ field }) => (
                <>
                  <StyledTextField
                    {...field}
                    value={field.value || ''}
                    onChange={(e) => field.onChange(e.target.value)}
                    select
                    fullWidth
                    placeholder="Select Class"
                    disabled={isLoading}
                    >
                    <MenuItem value="" disabled>
                      {isLoading ? 'Loading classes...' : 'Select a class'}
                    </MenuItem>
                    {/* Check if classesData is an array before mapping */}

                    {classesData?.data?.map((classItem) => (
                      <MenuItem
                        key={classItem.class_id}
                        value={classItem.class_id}
                      >
                        {classItem.class_name}
                      </MenuItem>
                    ))}
                  </StyledTextField>
                  {errors.class_id && (
                    <Typography variant="caption" color="error">
                      {errors.class_id.message}
                    </Typography>
                  )}
                  {error && (
                    <Typography variant="caption" color="error">
                      Failed to load classes
                    </Typography>
                  )}
                </>
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <PhoneInputField
              name="phoneNumber"
              control={control}
              label="Contact Number"
              errors={errors}
              fullWidth
            />
          </Grid>
        </Grid>

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
            Submit
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
    .string()
    .trim()
    .transform((value) => capitalize(value))
    // Transform the value before validation
    .required('Gender is required')
    .oneOf(
      ['Male', 'Female', 'Other'],
      'Gender must be either Male, Female, or Other',
    ),
  class_id: yup
    .string()
    .required('Class is required'),
  dob: yup
    .string()
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

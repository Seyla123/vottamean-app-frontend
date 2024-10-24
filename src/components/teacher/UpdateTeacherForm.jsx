// React and third-party libraries
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// MUI components
import {
  Box,
  Avatar,
  Typography,
  Button,
  Grid,
  Divider,
  Modal,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

// Redux API
import {
  useGetTeacherQuery,
  useUpdateTeacherMutation,
} from '../../services/teacherApi';

// yup validation from teacher info
import { validationSchema } from './TeacherInfo';
import { yupResolver } from '@hookform/resolvers/yup';

// react hook form
import { useForm, Controller } from 'react-hook-form';

// formated data
import { formatTeacherFormData } from '../../utils/formatData';

// icons from luicide react
import { ImagePlus, Trash2, UserRoundPen } from 'lucide-react';

// Custom components
import { setSnackbar } from '../../store/slices/uiSlice';
import InputField from '../common/InputField';
import GenderSelect from '../common/GenderSelect';
import PhoneInputField from '../common/PhoneInputField';
import RandomAvatar from '../common/RandomAvatar';
import StyledButton from '../common/StyledMuiButton';
import DOBPicker from '../common/DOBPicker';
import SomethingWentWrong from '../common/SomethingWentWrong';

const UpdateTeacherForm = ({ isOpen, onClose, teacherId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // States
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImg, setProfileImg] = useState('');
  const [dob, setDob] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [hasFormChanges, setHasFormChanges] = useState(false);
  const [hasPhotoChanges, setHasPhotoChanges] = useState(false);
  const [photoState, setPhotoState] = useState({
    profileImg: '',
    isRemoved: false,
    hasChanges: false,
  });

  // useGetTeacherQuery : a hook return function for fetching all teacher data
  const {
    data: teacherData,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetTeacherQuery(teacherId, { skip: !isOpen || !teacherId });

  // useUpdateTeacherMutation : a hook return function for Update teacher api
  const [
    updateTeacher,
    {
      isLoading: isUpdateLoading,
      isError: isUpdateError,
      error: updateError,
      isSuccess: isUpdateSuccess,
    },
  ] = useUpdateTeacherMutation();

  // React hook form
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(validationSchema),
    // Set default values for the form
    defaultValues: {
      first_name: '',
      last_name: '',
      phone_number: '',
      gender: '',
      dob: '',
      address: '',
      photo: '',
    },
  });

  // get values and set values
  useEffect(() => {
    // If teacherData is available (not null or undefined), set the form values
    if (teacherData && teacherData.data) {
      const formattedData = formatTeacherFormData(teacherData);
      if (formattedData) {
        // Format the date of birth
        const teacherInfo = {
          ...formattedData,
          dob: formattedData.dob ? dayjs(formattedData.dob) : null,
        };
        // Reset the form values
        reset(teacherInfo);
        setDob(teacherInfo.dob);
        setProfileImg(formattedData.photo);
        // Save the original data to compare with later
        setOriginalData(teacherInfo);
        // Set the photo state
        setPhotoState({
          profileImg: teacherInfo.photo,
          isRemoved: false,
          hasChanges: false,
        });
      }
    }
  }, [teacherData, reset, isSuccess]);

  // Check if the update was successful and if so, close the modal and navigate to teachers page
  // If the update was not successful, show an error message
  useEffect(() => {
    if (isUpdateSuccess) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Teacher information updated successfully!',
          severity: 'success',
        }),
      );
      onClose();
      navigate('/admin/teachers');
    } else if (isUpdateError) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Update failed: ' + (updateError.message || 'Unknown error'),
          severity: 'error',
        }),
      );
    }
  }, [isUpdateError, isUpdateSuccess, dispatch, updateError]);

  // Handle form submission
  const onSubmit = async (data) => {
    // Data that submitted
    const submittedData = {
      first_name: data.firstName,
      last_name: data.lastName,
      phone_number: data.phoneNumber,
      gender: data.gender,
      dob: data.dob ? dayjs(data.dob).format('YYYY-MM-DD') : null,
      address: data.address,
    };

    // Data that is original
    const dataOriginal = {
      first_name: originalData.firstName,
      last_name: originalData.lastName,
      phone_number: originalData.phoneNumber,
      gender: originalData.gender,
      dob: originalData.dob
        ? dayjs(originalData.dob).format('YYYY-MM-DD')
        : null,
      address: originalData.address,
    };

    const hasChanges = Object.keys(submittedData).some((key) => {
      const originalValue = dataOriginal[key];
      const newValue = submittedData[key];

      // Handle null/undefined cases
      if (!originalValue && !newValue) return false;
      if (!originalValue || !newValue) return true;

      // Compare values
      return String(originalValue).trim() !== String(newValue).trim();
    });

    // Check for photo changes using photoState
    // If the photo has been changed or removed, the hasPhotoChange state will be set to true
    const hasPhotoChange = photoState.hasChanges || photoState.isRemoved;

    // If there are no changes and no photo changes, show a message and exit
    if (!hasChanges && !hasPhotoChange) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'No changes made.',
          severity: 'info',
        }),
      );
      onClose();
      return;
    }
    // Create a new FormData object
    const formData = new FormData();

    // Append the data properties to the FormData object
    Object.entries(submittedData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });
    // Handle photo changes
    if (selectedFile) {
      // New photo being uploaded
      formData.append('photo', selectedFile);
    } else if (photoState.isRemoved) {
      // Explicitly removing photo
      formData.append('remove_photo', 'true');
      formData.append('photo', '');  
    } else if (photoState.profileImg) {
      // Keeping existing photo
      formData.append('existing_photo', photoState.profileImg);
    }
  
    console.log('Photo state:', {
      selectedFile: selectedFile ? 'exists' : 'null',
      photoState,
      profileImg
    });
    // Update the teacher data with new data
    await updateTeacher({ id: teacherId, updates: formData }).unwrap();
  };

  // Update the photo change handler
  // This will be called when the user selects a new profile photo
  // If the file is valid, it will be set as the new value for the "photo" field
  // and the preview will be updated
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    // Check if the file is an image and is under 5MB
    if (
      file &&
      file.type.startsWith('image/') &&
      file.size <= 5 * 1024 * 1024
    ) {
      setSelectedFile(file);
      // Set the preview to the new image
      setPreviewUrl(URL.createObjectURL(file));
      // Set the new value for the "photo" field
      setValue('photo', file);
      // Update the hasChanges state to true
      setPhotoState((prev) => ({
        ...prev,
        isRemoved: false,
        hasChanges: true,
      }));
    } else {
      // If the file is invalid, show an error message
      dispatch(
        setSnackbar({
          open: true,
          message: file
            ? 'File must be an image under 5MB'
            : 'Please select a file',
          severity: 'error',
        }),
      );
    }
  };
  const handleRemovePhoto = () => {
    setSelectedFile(null);
    setProfileImg(null);  // Make sure this is null, not an empty string
    setPreviewUrl(null);
    setValue('photo', null);
    setPhotoState((prev) => ({
      profileImg: null,  // Change this to null instead of empty string
      isRemoved: true,
      hasChanges: true,
    }));
  };

  

  // Fetch data error message
  if (isError) {
    return <SomethingWentWrong description={error?.data?.message} />;
  }

  return (
    <Modal
      aria-labelledby="update-teacher"
      aria-describedby="update-teacher-info"
      key={isOpen ? 'open' : 'closed'}
      open={isOpen}
      onClose={onClose}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box
        sx={{
          width: '800px',
          bgcolor: '#ffffff',
          borderRadius: '8px',
          p: 4,
        }}
      >
        {/* Title */}
        <Typography
          variant="h5"
          component="h2"
          fontWeight={'bold'}
          gutterBottom
        >
          Edit Teacher Information
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <form onSubmit={handleSubmit(onSubmit)}>
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
              {/* Profile */}
              {previewUrl || profileImg ? (
                <Avatar
                  src={previewUrl || profileImg}
                  alt="Profile"
                  sx={{ width: 140, height: 140 }}
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
                hidden
                onChange={handlePhotoChange}
              />
              <Box
                display="flex"
                flexDirection="column"
                alignItems="start"
                gap={2}
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
            <Divider />
            {/* Form */}
            <Box display={'flex'} flexDirection={'row'} sx={boxContainer}>
              {/* First Name */}
              <Box sx={{ flex: 1, width: '100%' }}>
                <Controller
                  name="firstName"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <InputField
                      control={control}
                      label="First Name"
                      name={field.name}
                      defaultValue={field.value}
                      placeholder="First Name"
                      errors={errors}
                    />
                  )}
                />
              </Box>
              {/* Last Name */}
              <Box sx={{ flex: 1, width: '100%' }}>
                <Controller
                  name="lastName"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <InputField
                      control={control}
                      label="Last Name"
                      placeholder="Last Name"
                      name={field.name}
                      defaultValue={field.value}
                      errors={errors}
                    />
                  )}
                />
              </Box>
            </Box>
            {/* Gender */}
            <Box sx={{ ...textFieldGap, width: '100%' }}>
              <Controller
                name="gender"
                control={control}
                defaultValue=""
                rules={{ required: 'Gender is required' }}
                render={({ field }) => (
                  <GenderSelect
                    control={control}
                    errors={errors}
                    name={field.name}
                    label="Gender"
                    defaultValue={field.value}
                    disabled={false}
                  />
                )}
              />
            </Box>
            {/* Date of Birth */}
            <Box
              sx={{
                ...textFieldGap,
                width: '100%',
                gap: {
                  xs: '12px',
                  sm: 3,
                },
              }}
            >
              <Controller
                name="dob"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <DOBPicker
                    control={control}
                    name={field.name}
                    label="Date of Birth"
                    defaultValue={field.value}
                    value={dob || null} // Ensure dob is defined
                    errors={errors}
                    setDob={setDob}
                  />
                )}
              />
            </Box>
            {/* Phone Number */}
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
            {/* Buttons */}
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: 2,
                  mt: 2,
                  width: '100%',
                }}
              >
                {/* CANCEL BUTTON */}
                <StyledButton variant="text" size="small" onClick={onClose}>
                  Cancel
                </StyledButton>
                {/* SAVE CHANGES BUTTON */}
                <StyledButton
                  type="submit"
                  size="small"
                  variant="contained"
                  disabled={isUpdateLoading}
                >
                  {isUpdateLoading ? 'Saving...' : 'Save Changes'}
                </StyledButton>
              </Box>
            </Grid>
          </form>
        </LocalizationProvider>
      </Box>
    </Modal>
  );
};

export default UpdateTeacherForm;

// STYLES
const textFieldGap = {
  display: 'flex',
  gap: 0.5,
  flexDirection: 'column',
  marginBottom: { xs: '12px', sm: 3 },
};
const boxContainer = {
  width: '100%',
  marginTop: '16px',
  display: 'flex',
  flexDirection: 'row',
  gap: {
    xs: '12px',
    sm: 3,
  },
};

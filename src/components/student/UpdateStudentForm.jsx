// React and third-party libraries
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CombinedStudentGuardianValidator } from '../../validators/validationSchemas';
import * as yup from 'yup';

// MUI components
import {
  Box,
  Avatar,
  Typography,
  Button,
  Grid,
  Select,
  Divider,
  Modal,
  InputAdornment,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

// Redux API
import {
  useGetStudentsByIdQuery,
  useUpdateStudentMutation,
} from '../../services/studentApi';

import { useGetClassesDataQuery } from '../../services/classApi';

// yup validation from teacher info

import { yupResolver } from '@hookform/resolvers/yup';

// react hook form
import { useForm, Controller } from 'react-hook-form';

// formated data
import { formatStudentFormData } from '../../utils/formatData';

// icons from luicide react
import { ImagePlus, Mail, School, Trash2, UserRoundPen } from 'lucide-react';

// Custom components
import { setSnackbar } from '../../store/slices/uiSlice';
import InputField from '../common/InputField';
import GenderSelect from '../common/GenderSelect';
import PhoneInputField from '../common/PhoneInputField';
import RandomAvatar from '../common/RandomAvatar';
import StyledButton from '../common/StyledMuiButton';
import DOBPicker from '../common/DOBPicker';
import { Diversity3 } from '@mui/icons-material';
import { ensureOptionInList } from '../../utils/formatHelper';
import LoadingCircle from '../loading/LoadingCircle';
import { StyledTextField } from '../common/InputField';
const UpdateStudentForm = ({ isOpen, onClose, studentId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [previewUrl, setPreviewUrl] = useState(null);
  const [profileImg, setProfileImg] = useState('');
  const [dob, setDob] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [classes, setClasses] = useState([]);
  const [hasPhotoChanges, setHasPhotoChanges] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [photoState, setPhotoState] = useState({
    profileImg: '',
    isRemoved: false,
    hasChanges: false
  });
  const {
    data: studentData,
    isLoading,
    isError,
    error,
  } = useGetStudentsByIdQuery(studentId, { skip: !isOpen || !studentId });

  const { data: classData, isSuccess: isClassSuccess } = useGetClassesDataQuery(
    { active: 1 },
  );

  const [
    updateStudent,
    {
      isLoading: isUpdateLoading,
      isError: isUpdateError,
      error: updateError,
      isSuccess: isUpdateSuccess,
    },
  ] = useUpdateStudentMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(CombinedStudentGuardianValidator),
    defaultValues: {
      first_name: '',
      last_name: '',
      phone_number: '',
      gender: '',
      dob: null,
      class_id: '',
      address: '',
      photo: '',
      guardianFirstName: '',
      guardianLastName: '',
      guardianEmail: '',
      guardianPhoneNumber: '',
      guardianRelationship: '',
    },
  });
// Update the useEffect that sets initial data
  useEffect(() => {
    if (studentData?.data && classData?.data && isClassSuccess) {
      const formattedClassData = ensureOptionInList(
        classData?.data,
        studentData?.data?.Class,
        'class_id',
        'class_name',
      );

      const classId = studentData.data.class_id?.toString() || '';

      const studentInfo = {
        first_name: studentData.data.Info.first_name || '',
        last_name: studentData.data.Info.last_name || '',
        phone_number: studentData.data.Info.phone_number || '',
        gender: studentData.data.Info.gender || '',
        dob: studentData.data.Info.dob
          ? dayjs(studentData.data.Info.dob).format('YYYY-MM-DD')
          : null,
        class_id: classId,
        address: studentData.data.Info.address || '',
        photo: studentData.data.Info.photo || '',
        guardianFirstName: studentData.data.guardian_first_name || '',
        guardianLastName: studentData.data.guardian_last_name || '',
        guardianEmail: studentData.data.guardian_email || '',
        guardianPhoneNumber: studentData.data.guardian_phone_number || '',
        guardianRelationship: studentData.data.guardian_relationship || '',
      };

      reset(studentInfo);
      setClasses(formattedClassData);
      setDob(studentInfo.dob);
      setOriginalData(studentInfo);
      setPhotoState({
        profileImg: studentInfo.photo,
        isRemoved: false,
        hasChanges: false
      });
    }
  }, [studentData, reset, classData, isClassSuccess]);

  // Update the photo change handler
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      file.type.startsWith('image/') &&
      file.size <= 5 * 1024 * 1024
    ) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setValue('photo', file);
      setPhotoState(prev => ({
        ...prev,
        isRemoved: false,
        hasChanges: true
      }));
    } else {
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

  // Update the remove photo handler
  const handleRemovePhoto = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setValue('photo', null);
    setPhotoState(prev => ({
      profileImg: '',
      isRemoved: true,
      hasChanges: true
    }));
  };

  // Update the submit function
  const onSubmit = async (data) => {
    try {
      const classId = data.class_id ? Number(data.class_id) : null;
  
      if (classId === null) {
        dispatch(
          setSnackbar({
            open: true,
            message: 'Please select a class',
            severity: 'error',
          }),
        );
        return;
      }
  
      const submittedData = {
        first_name: data.first_name,
        last_name: data.last_name,
        phone_number: data.phone_number,
        gender: data.gender,
        dob: data.dob && dayjs(data.dob).isValid()
          ? dayjs(data.dob).format('YYYY-MM-DD')
          : null,
        class_id: classId,
        address: data.address,
        guardian_first_name: data.guardianFirstName,
        guardian_last_name: data.guardianLastName,
        guardian_email: data.guardianEmail,
        guardian_phone_number: data.guardianPhoneNumber,
        guardian_relationship: data.guardianRelationship,
      };
  
      // Format original data in the same way as submitted data for comparison
      const formattedOriginalData = {
        first_name: originalData.first_name,
        last_name: originalData.last_name,
        phone_number: originalData.phone_number,
        gender: originalData.gender,
        dob: originalData.dob,
        class_id: Number(originalData.class_id),
        address: originalData.address,
        guardian_first_name: originalData.guardianFirstName,
        guardian_last_name: originalData.guardianLastName,
        guardian_email: originalData.guardianEmail,
        guardian_phone_number: originalData.guardianPhoneNumber,
        guardian_relationship: originalData.guardianRelationship,
      };
  
      // Check for changes by comparing each field
      const hasChanges = Object.keys(submittedData).some((key) => {
        const originalValue = formattedOriginalData[key];
        const newValue = submittedData[key];
  
        // Handle null/undefined cases
        if (!originalValue && !newValue) return false;
        if (!originalValue || !newValue) return true;
  
        // Compare values
        return String(originalValue).trim() !== String(newValue).trim();
      });
  
      // Check for photo changes using photoState
      const hasPhotoChange = photoState.hasChanges || photoState.isRemoved;
  
      if (!hasChanges && !hasPhotoChange) {
        dispatch(
          setSnackbar({
            open: true,
            message: 'No changes made.',
            severity: 'info',
          }),
        );
        return;
      }
  
      const formData = new FormData();
  
      // Append all non-null fields to FormData
      Object.entries(submittedData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });
  
      // Append the photo if it exists
      if (selectedFile) {
        formData.append('photo', selectedFile);
      } else if (photoState.isRemoved) {
        formData.append('remove_photo', 'true');
      } else if (profileImg) {
        formData.append('existing_photo', profileImg);
      }
  
      await updateStudent({
        id: studentId,
        updates: formData,
      }).unwrap();
    } catch (error) {
      console.error('Update Error:', error);
      dispatch(
        setSnackbar({
          open: true,
          message:
            error.data?.message || 'Failed to update student information',
          severity: 'error',
        }),
      );
    }
  };
  
  useEffect(() => {
    if (isUpdateSuccess) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Student information updated successfully',
          severity: 'success',
        }),
      );
      navigate('/admin/students');
    }
  }, [isUpdateSuccess, dispatch, navigate]);
  
  //   setSelectedFile(null);
  //   setProfileImg(null);
  //   setPreviewUrl(null);
  //   setValue('photo', null);
  //   setHasPhotoChanges(true);
  // };

  if (isLoading) return <LoadingCircle />;
  if (isError)
    dispatch(
      setSnackbar({
        open: true,
        message: `Error fetching student and guardian data, ${error.data?.message}`,
        severity: 'error',
      }),
    );
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
          height: '100%',
          overflow: 'scroll',
        }}
      >
        {/* Title */}
        <Typography
          variant="h5"
          component="h2"
          fontWeight={'bold'}
          gutterBottom
        >
          Edit Student Information
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
                  username={`${getValues('first_name')} ${getValues('last_name')}`}
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
                  name="first_name"
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
                  name="last_name"
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
                    value={dob || null}
                    errors={errors}
                    setDob={setDob}
                  />
                )}
              />
            </Box>
            <Typography variant="body2" fontWeight="bold" mb={1}>
              Class <span style={{ color: 'red' }}>*</span>
            </Typography>
            <Controller
              name="class_id"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <FormControl fullWidth error={!!errors?.class_id}>
                  <Select
                    {...field}
                    value={field.value || ''}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    displayEmpty
                    renderValue={(selected) => {
                      if (!selected) {
                        return (
                          <span style={{ color: theme.palette.grey[400] }}>
                            Class
                          </span>
                        );
                      }
                      const selectedClass = classData?.data?.find(
                        (classItem) => classItem.class_id === Number(selected),
                      );
                      return selectedClass ? selectedClass.class_name : '';
                    }}
                  >
                    <MenuItem value="" disabled>
                      {isLoading ? 'Loading classes...' : 'Select a class'}
                    </MenuItem>
                    {classData?.data?.length ? (
                      classData.data.map((classItem) => (
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
                  </Select>
                  <FormHelperText>
                    {fieldState.error ? fieldState.error.message : ''}
                  </FormHelperText>
                </FormControl>
              )}
            />

            {/* Phone Number */}
            <Box sx={{ ...textFieldGap, width: '100%' }}>
              <PhoneInputField
                name="phone_number"
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
            <Grid container spacing={2} alignItems={'center'}>
              <Grid container spacing={2} alignItems={'center'}>
                <Grid item xs={12} sm={6}>
                  <InputField
                    name="guardianFirstName"
                    control={control}
                    label="Guardian First Name"
                    placeholder="First Name"
                    errors={errors}
                    icon={UserRoundPen}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputField
                    name="guardianLastName"
                    control={control}
                    label="Guardian Last Name"
                    placeholder="Last Name"
                    errors={errors}
                    icon={UserRoundPen}
                  />
                </Grid>
              </Grid>
            </Grid>
            {/* GUARDIAN CONTACT INFORMATION */}
            {/* Guardian Phone Number */}
            <Grid item xs={12} sm={6}>
              <PhoneInputField
                name="guardianPhoneNumber"
                control={control}
                label="Contact Number"
                errors={errors}
              />
            </Grid>
            {/* Guardian Email */}
            <Grid item xs={12} sm={6}>
              <InputField
                name="guardianEmail"
                control={control}
                label="Email"
                placeholder="Enter guardian email"
                errors={errors}
                icon={Mail}
              />
            </Grid>
            {/* Guardian Relationship */}
            <Grid item xs={12} sm={6}>
              <InputField
                name="guardianRelationship"
                control={control}
                label="Relationship"
                placeholder="Relationship"
                errors={errors}
                icon={Diversity3}
              />
            </Grid>
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

export default UpdateStudentForm;

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

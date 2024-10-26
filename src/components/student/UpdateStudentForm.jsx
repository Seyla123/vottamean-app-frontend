// React and third-party libraries
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CombinedStudentGuardianValidator } from '../../validators/validationSchemas';

// MUI components
import {
  Box,
  Avatar,
  Typography,
  Divider,
  InputAdornment,
  MenuItem,
  Stack,
  IconButton,
  CircularProgress
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import Diversity1Icon from '@mui/icons-material/Diversity1';

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

// icons from luicide react
import { ImagePlus, Mail, School, Trash2, UserRoundPen, X } from 'lucide-react';

// Custom components
import { setSnackbar } from '../../store/slices/uiSlice';
import InputField from '../common/InputField';
import GenderSelect from '../common/GenderSelect';
import PhoneInputField from '../common/PhoneInputField';
import RandomAvatar from '../common/RandomAvatar';
import StyledButton from '../common/StyledMuiButton';
import DOBPicker from '../common/DOBPicker';
import { ensureOptionInList } from '../../utils/formatHelper';
import { StyledTextField } from '../common/InputField';
import { BootstrapDialog } from '../common/BootstrapDialog';

const UpdateStudentForm = ({ isOpen, onClose, studentId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [previewUrl, setPreviewUrl] = useState(null);
  const [profileImg, setProfileImg] = useState('');
  const [dob, setDob] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [classes, setClasses] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [photoState, setPhotoState] = useState({
    profileImg: '',
    isRemoved: false,
    hasChanges: false,
  });

  // useGetStudentsByIdQuery: a hook return function for get student by id
  const {
    data: studentData,
    isLoading,
    isError,
    error,
  } = useGetStudentsByIdQuery(studentId, { skip: !isOpen || !studentId });

  // useGetClassesDataQuery: a hook return function for get classes data
  const { data: classData, isSuccess: isClassSuccess } = useGetClassesDataQuery(
    { active: 1 },
  );

  // useUpdateStudentMutation: a hook return function for update student
  const [
    updateStudent,
    {
      isLoading: isUpdateLoading,
      isError: isUpdateError,
      error: updateError,
      isSuccess: isUpdateSuccess,
    },
  ] = useUpdateStudentMutation();

  // React hook form
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(CombinedStudentGuardianValidator),
    // Set default values for the form
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

  // useEffect for setting initial data
  useEffect(() => {
    // If student data and classes data are available, set the initial values
    if (studentData?.data && classData?.data && isClassSuccess) {
      const formattedClassData = ensureOptionInList(
        classData?.data,
        studentData?.data?.Class,
        'class_id',
        'class_name',
      );

      // Set the class id to the selected class after ensuring it is a string
      const classId = studentData.data.class_id?.toString() || '';

      // Set the student information
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
      // Set the photo state
      setPhotoState({
        profileImg: studentInfo.photo,
        isRemoved: false,
        hasChanges: false,
      });
    }
    if(isError) {
      dispatch(
        setSnackbar({
          open: true,
          message: `${error?.data?.message || 'Failed to fetch student data'}`,
          severity: 'error',
        }),
      );
      onClose();
    }
  }, [studentData, reset, classData, isClassSuccess, isError]);

  // useEffect for handling update success and error
  // when update is successful, show a snackbar with a success message and close the modal
  // when update is failed, show a snackbar with an error message and close the modal
  useEffect(() => {
    if (isUpdateSuccess) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Student information updated successfully',
          severity: 'success',
        }),
      );
      // close the modal and navigate to the list of students
      onClose();
      navigate('/admin/students');
    } else if (isUpdateError) {
      dispatch(
        setSnackbar({
          open: true,
          message: `${updateError?.data?.message || 'Failed to update student'}`,
          severity: 'error',
        }),
      );
      onClose();
    }
  }, [isUpdateSuccess, dispatch, isUpdateError, navigate]);

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

  // Update the remove photo handler
  const handleRemovePhoto = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setValue('photo', null);
    setPhotoState((prev) => ({
      profileImg: '',
      isRemoved: true,
      hasChanges: true,
    }));
  };

  // Update data submit function
  // It will compare the submitted data to the original data and check for changes
  // If there are changes, it will create a FormData object and attach the changed fields to it
  // It will then call the updateStudent function to update the student information
  const onSubmit = async (data) => {
    const classId = data.class_id ? Number(data.class_id) : null;

    // Check if the class id is valid
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

    // Format the submitted data in the same way as the original data
    const submittedData = {
      first_name: data.first_name,
      last_name: data.last_name,
      phone_number: data.phone_number,
      gender: data.gender,
      dob:
        data.dob && dayjs(data.dob).isValid()
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

    // Format the original data in the same way as the submitted data for comparison
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
    // If any field has changed, the hasChanges state will be set to true
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

    // Create a FormData object
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

    // Update the student
    await updateStudent({
      id: studentId,
      updates: formData,
    }).unwrap();
  };
  return (
    <BootstrapDialog
      aria-labelledby="update-student"
      aria-describedby="update-student-info"
      key={isOpen ? 'open' : 'closed'}
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      sx={{
        '& .MuiDialog-paper': {
          width: {
            xs: '100%',
            sm: '800px',
          },
          overflowY: 'auto',
        },
      }}
    >
      <Box
        sx={{
          width: '100%',
          bgcolor: '#ffffff',
          p: 4,
          boxSizing: 'border-box',
        }}
      >
        {isLoading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="700px"
          >
            <CircularProgress />
          </Box>
        ) :
          <>
            {/* Title and close button */}
            <Stack direction="row" justifyContent="space-between">
              <Typography
                fontSize={{ xs: '1.25rem', sm: '1.5rem' }}
                component="h2"
                fontWeight={'bold'}
              >
                Edit Student Information
              </Typography>
              <IconButton
                onClick={onClose}
                sx={(theme) => ({
                  alignSelf: 'start',
                  bottom: 8,
                  left: 2,
                  color: theme.palette.grey[500],
                })}
              >
                <X />
              </IconButton>
            </Stack>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: 2,
                    pb: 2,
                    pt: 3,
                  }}
                >
                  {/* Profile */}
                  {previewUrl || profileImg ? (
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
                        src={previewUrl || profileImg}
                        alt="Profile"
                        sx={{ width: 140, height: 140 }}
                      />
                    </Box>
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
                    flexDirection={{ xs: 'row', sm: 'column' }}
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
                {/* INPUT FIELDS */}
                <Stack direction="column" spacing={2} mt={2}>
                  {/* Name */}
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    {/* First Name */}
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
                    {/* Last Name */}
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
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    {/* Gender */}
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
                    {/* Date of Birth */}
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
                  </Stack>
                  {/* Class */}
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="body2" fontWeight="bold" mb={1}>
                        Class <span style={{ color: 'red' }}>*</span>
                      </Typography>
                      <Controller
                        name="class_id"
                        control={control}
                        defaultValue=""
                        render={({ field, fieldState }) => (
                          <StyledTextField
                            select
                            fullWidth
                            disabled={isLoading}
                            error={!!errors?.class_id}
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
                              value: field.value || '',
                              onChange: field.onChange,
                              renderValue: (selected) => {
                                if (!selected) {
                                  return (
                                    <span
                                      style={{ color: theme.palette.grey[400] }}
                                    >
                                      Class
                                    </span>
                                  );
                                }
                                const selectedClass = classData?.data?.find(
                                  (classItem) =>
                                    classItem.class_id === Number(selected),
                                );
                                return selectedClass
                                  ? selectedClass.class_name
                                  : '';
                              },
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
                          </StyledTextField>
                        )}
                      />
                    </Box>
                    {/* Phone Number */}
                    <PhoneInputField
                      name="phone_number"
                      control={control}
                      label="Contact Number"
                      errors={errors}
                    />
                  </Stack>
                  {/* Address */}
                  <InputField
                    name="address"
                    required={false}
                    control={control}
                    label="Street Address"
                    placeholder="Phnom Penh, Street 210,..."
                    errors={errors}
                    multiline={true}
                  />
                  {/* GUARDIAN INFORMATION */}
                  {/* Guardian Name */}
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <InputField
                      name="guardianFirstName"
                      control={control}
                      label="Guardian First Name"
                      placeholder="First Name"
                      errors={errors}
                      icon={UserRoundPen}
                    />
                    <InputField
                      name="guardianLastName"
                      control={control}
                      label="Guardian Last Name"
                      placeholder="Last Name"
                      errors={errors}
                      icon={UserRoundPen}
                    />
                  </Stack>
                  {/* GUARDIAN CONTACT INFORMATION */}
                  {/* Guardian Phone Number */}
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <PhoneInputField
                      name="guardianPhoneNumber"
                      control={control}
                      label="Contact Number"
                      errors={errors}
                    />
                    {/* Guardian Email */}
                    <InputField
                      name="guardianEmail"
                      control={control}
                      label="Email"
                      placeholder="Enter guardian email"
                      errors={errors}
                      icon={Mail}
                    />
                  </Stack>
                  {/* Guardian Relationship */}
                  <InputField
                    name="guardianRelationship"
                    control={control}
                    label="Relationship"
                    placeholder="Relationship"
                    errors={errors}
                    icon={Diversity1Icon}
                  />
                </Stack>

                {/* Buttons */}
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
                    {isUpdateLoading ? 'Saving...' : 'Save Change'}
                  </StyledButton>
                </Box>
              </form>
            </LocalizationProvider>
          </>
        }
      </Box>
    </BootstrapDialog>
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

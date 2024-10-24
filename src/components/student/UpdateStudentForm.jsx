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
  Divider,
  Modal,
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
import { ImagePlus, Mail, Trash2, UserRoundPen } from 'lucide-react';

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

const UpdateStudentForm = ({ isOpen, onClose, studentId }) => {
  const dispatch = useDispatch();

  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImg, setProfileImg] = useState('');
  const [dob, setDob] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [classes, setClasses] = useState([]);
  const [hasPhotoChanges, setHasPhotoChanges] = useState(false);

  const {
    data: studentData,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetStudentsByIdQuery(studentId, { skip: !isOpen || !studentId });

  const { data: classData, isSuccess: isClassSuccess } = useGetClassesDataQuery(
    { active: 1 },
  );

  console.log('this student data : ', studentData);

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

  useEffect(() => {
    if (studentData && classData && isClassSuccess) {
      console.log('studentData:', studentData);

      const formattedClassData = ensureOptionInList(
        classData?.data,
        studentData?.data?.Class,
        'class_id',
        'class_name',
      );
      const formattedData = formatStudentFormData(studentData);
      console.log('formattedData:', formattedData);
      console.log('formattedClassData:', formattedClassData);
      const studentInfo = {
        ...formattedData,
        dob: formattedData.dob
          ? dayjs(formattedData.dob).format('YYYY-MM-DD')
          : null,
      };
      reset({
        first_name: studentInfo.first_name,
        last_name: studentInfo.last_name,
        phone_number: studentInfo.phone_number,
        gender: studentInfo.gender,
        dob: studentInfo.dob,
        class_id: studentInfo.class_id,
        address: studentInfo.address,
        photo: studentInfo.photo,
        guardianFirstName: studentInfo.guardian_first_name,
        guardianLastName: studentInfo.guardian_last_name,
        guardianEmail: studentInfo.guardian_email,
        guardianPhoneNumber: studentInfo.guardian_phone_number,
        guardianRelationship: studentInfo.guardian_relationship,
      });
      setClasses(formattedClassData);
      setDob(studentInfo.dob);
      setOriginalData(studentInfo);
      setProfileImg(studentInfo.photo);
    }
  }, [studentData, reset, classData, isClassSuccess]);



  if (isError) {
    dispatch(
      setSnackbar({
        open: true,
        message: `Error fetching student data: ${error.data?.message || 'Unknown error'}`,
        severity: 'error',
      }),
    );
    return null;
  }
  useEffect(() => {
    if (isUpdateSuccess) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Student information updated successfully!',
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

  const onSubmit = async (data) => {
    const submittedData = {
      first_name: data.first_name,
      last_name: data.last_name,
      phone_number: data.phone_number,
      gender: data.gender,
      dob:
        data.dob && dayjs(data.dob).isValid()
          ? dayjs(data.dob).format('YYYY-MM-DD')
          : null,
      address: data.address,
      class_id: data.class_id,
      photo: data.photo,
      guardian_first_name: data.guardianFirstName,
      guardian_last_name: data.guardianLastName,
      guardian_email: data.guardianEmail,
      guardian_phone_number: data.guardianPhoneNumber,
      guardian_relationship: data.guardianRelationship,
    };

    const hasChanges = Object.keys(submittedData).some(
      (key) => submittedData[key] !== originalData[key],
    );

    if (!hasChanges && !hasPhotoChanges) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'No changes made.',
          severity: 'info',
          autoHideDuration: 6000,
        }),
      );
      handleNext();
      return;
    }

    try {
      const formData = new FormData();
      Object.keys(submittedData).forEach((key) =>
        formData.append(key, submittedData[key]),
      );

      if (selectedFile) {
        formData.append('photo', selectedFile);
      }

      const result = await updateStudent({
        id: studentId,
        updates: formData,
      }).unwrap();

      console.log('Update Result:', result); // Log the result

      if (result.status === 'success') {
        dispatch(
          setSnackbar({
            open: true,
            message: 'Student information updated successfully!',
            severity: 'success',
          }),
        );
        handleNext();
      } else {
        throw new Error('Update failed');
      }
    } catch (error) {
      console.error('Update Error:', error); // Log the full error
      dispatch(
        setSnackbar({
          open: true,
          message: `Update failed: ${error.message}`,
          severity: 'error',
        }),
      );
    }
  };

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
      setHasPhotoChanges(true);
    } else {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Invalid image file',
          severity: 'error',
        }),
      );
    }
  };

  console.log('--------------prodfile : ', profileImg);

  const handleRemovePhoto = () => {
    setSelectedFile(null);
    setProfileImg(null);
    setPreviewUrl(null);
    setValue('photo', null);
    setHasPhotoChanges(true);
  };

  if (isLoading) return <LoadingCircle />;
  if (isError)
    return <Typography color="error">Error loading student data</Typography>;

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
                <RandomAvatar size={140} />
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
                    name="guardianFirstName" // Update here
                    control={control}
                    label="Guardian First Name"
                    placeholder="First Name"
                    errors={errors}
                    icon={UserRoundPen}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputField
                    name="guardianLastName" // This is correct
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

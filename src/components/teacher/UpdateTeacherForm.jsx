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
import LoadingCircle from '../../components/loading/LoadingCircle';
import { setSnackbar } from '../../store/slices/uiSlice';
import InputField from '../common/InputField';
import GenderSelect from '../common/GenderSelect';
import PhoneInputField from '../common/PhoneInputField';
import RandomAvatar from '../common/RandomAvatar';
import StyledButton from '../common/StyledMuiButton';

const UpdateTeacherForm = ({ isOpen, onClose, teacherId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // States
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImg, setProfileImg] = useState('');
  const [dob, setDob] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  
  // Get teacher data
  const {
    data: teacherData,
    isLoading,
    isError,
  } = useGetTeacherQuery(teacherId, { skip: !isOpen || !teacherId });
  // Update teacher api
  const [
    updateTeacher,
    { isLoading: isUpdateLoading, isError: isUpdateError, error: updateError },
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
      dob: null,
      address: '',
    },
  });

  // get values and set values
  useEffect(() => {
    // If teacherData is available (not null or undefined), set the form values
    if (teacherData && teacherData.data) {
      const formattedData = formatTeacherFormData(teacherData);
      if (formattedData) {
        // Create a new object with the formattedData but with dob as a dayjs object
        const teacherInfo = {
          ...formattedData,
          dob: formattedData.dob ? dayjs(formattedData.dob) : null,
        };
        reset(teacherInfo);
        setDob(teacherInfo.dob);
        setProfileImg(formattedData.photo);
        // Save the original data to compare with later
        setOriginalData(teacherInfo);
      }
    }
  }, [teacherData, reset]);

  // Handle submit
  const onSubmit = async (data) => {
    const formData = new FormData();
    const formFields = {
      first_name: data.firstName,
      last_name: data.lastName,
      phone_number: data.phoneNumber,
      gender: data.gender,
      dob: data.dob ? dayjs(data.dob).format('YYYY-MM-DD') : null,
      address: data.address,
    };

    // Append fields to FormData
    Object.entries(formFields).forEach(([key, value]) =>
      formData.append(key, value),
    );

    // Append the photo if it exists
    if (selectedFile) {
      formData.append('photo', selectedFile);
    } else {
      formData.append('photo', profileImg);
    }

    // Update teacher with new data
    try {
      const result = await updateTeacher({
        id: teacherId,
        updates: formData,
      }).unwrap();
      if (result.status === 'success') {
        dispatch(
          setSnackbar({
            open: true,
            message: 'Teacher information updated successfully!',
            severity: 'success',
            autoHideDuration: 6000,
          }),
        );
        onClose();
        navigate('/admin/teachers');
      } else {
        throw new Error('Update failed');
      }
    } catch (error) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Update failed: ' + (updateError.message || 'Unknown error'),
          severity: 'error',
          autoHideDuration: 6000,
        }),
      );
    }
  };

  // handle change photo
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

  // Handle remove photo
  const handleRemovePhoto = () => {
    setSelectedFile(null);
    setProfileImg(null);
    setPreviewUrl(null);
    setValue('photo', null);
  };

  if (isLoading) return <LoadingCircle />;
  if (isError)
    return <Typography color="error">Error loading teacher data</Typography>;
  if (isUpdateError)
    return <Typography color="error">Error updating teacher data</Typography>;

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
                <InputField
                  name="firstName"
                  icon={UserRoundPen}
                  control={control}
                  label="First Name"
                  placeholder="First Name"
                  errors={errors}
                />
              </Box>
              {/* Last Name */}
              <Box sx={{ flex: 1, width: '100%' }}>
                <InputField
                  name="lastName"
                  control={control}
                  icon={UserRoundPen}
                  label="Last Name "
                  placeholder="Last Name "
                  errors={errors}
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
                render={({ field }) => (
                  <DatePicker
                    inputFormat="MM/DD/YYYY"
                    value={dob || null} // Ensure dob is defined
                    onChange={(newValue) => {
                      setDob(newValue);
                      field.onChange(newValue);
                    }}
                    maxDate={dayjs()}
                    slotProps={{
                      textField: {
                        error: !!errors.dob,
                        helperText: errors.dob?.message,
                        fullWidth: true,
                      },
                    }}
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
                <Button
                  variant="outlined"
                  onClick={onClose}
                  sx={{ width: { xs: '100%', sm: '160px' } }}
                >
                  Cancel
                </Button>
                {/* SAVE CHANGES BUTTON */}
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ width: { xs: '100%', sm: '160px' } }}
                >
                  {isUpdateLoading ? 'Saving...' : 'Save Changes'}
                </Button>
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

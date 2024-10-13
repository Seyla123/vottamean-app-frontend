// React and third-party libraries
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// MUI components
import {
  TextField,
  Box,
  Avatar,
  Typography,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
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

// Custom components
import LoadingCircle from '../../components/loading/LoadingCircle';
import { setSnackbar } from '../../store/slices/uiSlice';

// Yup validation and schema validation
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { validationSchema } from './TeacherInfo';

// Format data
import { formatTeacherFormData } from '../../utils/formatData';
import InputField from '../common/InputField';
import GenderSelect from '../common/GenderSelect';
import PhoneInputField from '../common/PhoneInputField';
import { ImagePlus, Trash2, UserRoundPen } from 'lucide-react';
import RandomAvatar from '../common/RandomAvatar';
import StyledButton from '../common/StyledMuiButton';

const UpdateTeacherForm = ({ isOpen, onClose, teacherId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get teacher information when the modal is open and teacherId is available
  const {
    data: teacherData,
    isLoading,
    isError,
  } = useGetTeacherQuery(teacherId, { skip: !isOpen || !teacherId }); // skip if teacherId is not available

  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImg, setProfileImg] = useState('');
  const [dob, setDob] = useState(null);
  const [originalData, setOriginalData] = useState(null);


  // Update teacher information
  const [updateTeacher] = useUpdateTeacherMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      phone_number: '',
      gender: '',
      dob: null,
      address: '',
    },
  });

  // Effect to load teacher data
  useEffect(() => {
    if (teacherData && teacherData.data) {
      const formattedData = formatTeacherFormData(teacherData);
      if (formattedData) {
        const teacherInfo = {
          ...formattedData,
          dob: formattedData.dob ? dayjs(formattedData.dob) : null,
        };
        reset(teacherInfo);
        setDob(teacherInfo.dob);
        setOriginalData(teacherInfo);
        setProfileImg(formattedData.photo);
      }
    }
  }, [teacherData, reset]);

  // Submit form
  const onSubmit = async (data) => {
    // Get the current state of the form and the original data that was loaded for checking changes purposes
    const submittedData = {
      first_name: data.firstName,
      last_name: data.lastName,
      phone_number: data.phoneNumber,
      gender: data.gender,
      dob: data.dob ? dayjs(data.dob).format('YYYY-MM-DD') : null,
      address: data.address,
      photo: selectedFile ? selectedFile : profileImg,
    };
    const dataOriginal = {
      first_name: originalData.firstName,
      last_name: originalData.lastName,
      phone_number: originalData.phoneNumber,
      gender: originalData.gender,
      dob: originalData.dob
        ? dayjs(originalData.dob).format('YYYY-MM-DD')
        : null,
      address: originalData.address,
      photo: originalData.photo,
    };

    if (profileImg instanceof File ){
      
    }
    console.log('photo:', selectedFile ? selectedFile : profileImg);

    // Check if any of the fields have changed
    const hasChanges = Object.keys(dataOriginal).some(
      (key) => dataOriginal[key] !== submittedData[key],
    );


    // If no changes were made, close the modal
    if (!hasChanges) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'No changes made.',
          severity: 'info',
          autoHideDuration: 6000,
        }),
      );
      onClose();
      navigate('/admin/teachers');
      return;
    }
    // Log submitted data
    console.log('Submitted Data photo:', submittedData.photo)

    console.log("UpdateTeacherForm says: submitting photo");

  //   submittedData = {
  //     "first_name" : "Dolphinss",
  //     "last_name" : "Dolly",
  //     "phone_number" : "+855 56 565 656",
  //     "address" : "Phnom penh",
  //     "dob" : "2002-05-30",
  //     "gender" : "Male",
  //     "photo":"basic101.png"
  // }

    // Update the teacher information with the new data
    try {
      const result = await updateTeacher({
        id: teacherId,
        updates: submittedData,
      }).unwrap();

      console.log("UpdateTeacherForm says: result is ", result);

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
      console.error('Update failed', error);
      dispatch(
        setSnackbar({
          open: true,
          message: 'Update failed: ' + (error.message || 'Unknown error'),
          severity: 'error',
          autoHideDuration: 6000,
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
      setValue('photo', file); //// Update the form value
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

  const handleRemovePhoto = () => {
    setSelectedFile(null);
    setProfileImg(null);
    setPreviewUrl(null);
    setValue('photo', null); // Update the form value
  };

  // Loading and error handling
  if (isLoading) return <LoadingCircle />;
  if (isError)
    return <Typography color="error">Error loading teacher data</Typography>;

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
          mb={4}
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
              {/* profile */}
              {/* Avatar Preview */}
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
                render={({ field }) => (
                  <DatePicker
                    inputFormat="MM/DD/YYYY"
                    value={dob || null} // Ensure dob is defined, default to null if undefined
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
                  Save Changes
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
const imgStyle = {
  width: {
    xs: 140,
    sm: 160,
  },
  height: {
    xs: 140,
    sm: 160,
  },
};
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
const profilePic = {
  width: 100,
  height: 100,
  borderRadius: '50%',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  mb: 2,
  position: 'relative',
};

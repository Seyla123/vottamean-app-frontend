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

const UpdateTeacherForm = ({ isOpen, onClose, teacherId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get teacher information when the modal is open and teacherId is available
  const {
    data: teacherData,
    isLoading,
    isError,
  } = useGetTeacherQuery(teacherId, { skip: !isOpen || !teacherId }); // skip if teacherId is not available


  const [profileImg, setProfileImg] = useState('');
  const [dob, setDob] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [form, setForm] = useState(false); 

  // Update teacher information
  const [updateTeacher] = useUpdateTeacherMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
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

  // Format teacher form data and check dob validation
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
    };

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

    // Update the teacher information with the new data 
    try {
      const result = await updateTeacher({
        id: teacherId,
        updates: submittedData,
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
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
                alignItems: 'center',
                marginBottom: 2,
              }}
            >
              {/* Profile */}
              <Box sx={profilePic}>
                <Avatar sx={imgStyle} alt="profile picture" src="r" />
              </Box>
              {/* Button for photo */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button variant="contained">Change Photo</Button>
                <Button variant="outlined" color="error">
                  Remove
                </Button>
              </Box>
            </Box>
            <Divider />
            {/* Form */}
            <Box display={'flex'} flexDirection={'row'} sx={boxContainer}>
              {/* First Name */}
              <Box sx={{ flex: 1, width: '100%' }}>
                <Box sx={textFieldGap}>
                  <Typography variant="body2" fontWeight="bold">
                    First Name {''}
                    <span style={{ color: 'red', marginLeft: 1 }}>*</span>
                  </Typography>
                  <Controller
                    name="firstName"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="text"
                        placeholder="First Name"
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                        fullWidth
                      />
                    )}
                  />
                </Box>
              </Box>
              {/* Last Name */}
              <Box sx={{ flex: 1, width: '100%' }}>
                <Box sx={textFieldGap}>
                  <Typography variant="body2" fontWeight="bold">
                    Last Name {''}
                    <span style={{ color: 'red', marginLeft: 1 }}>*</span>
                  </Typography>
                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="text"
                        placeholder="Last Name"
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                        fullWidth
                      />
                    )}
                  />
                </Box>
              </Box>
            </Box>
            {/* Gender */}
            <Box sx={{ ...textFieldGap, width: '100%' }}>
              <Typography variant="body2" fontWeight="bold">
                Gender <span style={{ color: 'red', marginLeft: 1 }}>*</span>
              </Typography>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.gender}>
                    <Select
                      {...field}
                      displayEmpty
                      error={!!errors.gender}
                      renderValue={(selected) => {
                        if (!selected) {
                          return <Box sx={{ color: '#B5B5B5' }}>Gender</Box>;
                        }
                        return selected;
                      }}
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                    <Typography
                      variant="caption"
                      color="error"
                      sx={{
                        marginLeft: errors.gender?.message ? '14px' : '0',
                        marginTop: errors.gender?.message ? '3px' : '0',
                      }}
                    >
                      {errors.gender?.message}
                    </Typography>
                  </FormControl>
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
              <Typography variant="body2" fontWeight="bold">
                Contact Number {''}
                <span style={{ color: 'red', marginLeft: 1 }}>*</span>
              </Typography>
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Contact Number"
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber?.message}
                    fullWidth
                  />
                )}
              />
            </Box>
            {/* Address */}
            <Box sx={{ ...textFieldGap, width: '100%' }}>
              <Typography variant="body2" fontWeight="bold">
                Street Address{' '}
              </Typography>
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Phnom Penh, Street 210, ..."
                    type="text"
                    error={!!errors.address}
                    helperText={errors.address?.message}
                    fullWidth
                    multiline
                    minRows={5}
                  />
                )}
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

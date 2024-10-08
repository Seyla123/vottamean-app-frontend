import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useGetTeacherQuery,
  useUpdateTeacherMutation,
} from '../../services/teacherApi';
import {
  TextField,
  Box,
  Avatar,
  Typography,
  Stack,
  Button,
  Select,
  MenuItem,
  FormControl,
  Divider,
  Modal,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import LoadingCircle from '../../components/loading/LoadingCircle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { setSnackbar } from '../../store/slices/uiSlice';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './TeacherInfo';

const UpdateTeacherForm = ({ isOpen, onClose, teacherId }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    data: teacherData,
    isLoading,
    isError,
  } = useGetTeacherQuery(teacherId || id || '');
  const [profileImg, setProfileImg] = useState('');
  const [dob, setDob] = useState(null);
  const [originalData, setOriginalData] = useState(null);

  const [updateTeacher, { isLoading: isUpdating }] = useUpdateTeacherMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      gender: '',
      dob: null,
      address: '',
    },
  });

  useEffect(() => {
    if (teacherData && teacherData.data && teacherData.data.length > 0) {
      const { Info } = teacherData.data[0];
      const teacherInfo = {
        firstName: Info.first_name || '',
        lastName: Info.last_name || '',
        phoneNumber: Info.phone_number || '',
        gender: Info.gender || '',
        dob: Info.dob ? dayjs(Info.dob) : null,
        address: Info.address || '',
      };
      reset(teacherInfo);
      setDob(teacherInfo.dob);
      setProfileImg(Info.photo);
      setOriginalData(teacherInfo);
    }
  }, [teacherData, reset]);
  const onSubmit = async (data) => {
    const submittedData = {
      first_name: data.firstName,
      last_name: data.lastName,
      phone_number: data.phoneNumber,
      gender: data.gender,
      dob: data.dob ? dayjs(data.dob).format('YYYY-MM-DD') : null,
      address: data.address,
    };

    const hasChanges = Object.keys(originalData).some(
      (key) => originalData[key] !== submittedData[key],
    );

    if (!hasChanges) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'No changes made.',
          severity: 'info',
          autoHideDuration: 6000,
        }),
      );
      return;
    }

    try {
      const result = await updateTeacher({
        id: teacherId,
        updates: submittedData,
      }).unwrap();

      if (result.status === 'success') {
        dispatch(
          setSnackbar({
            open: true,
            message: 'Teacher info updated successfully!',
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

  if (isLoading) return <LoadingCircle />;
  if (isError)
    return <Typography color="error">Error loading teacher data</Typography>;

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
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
              <Box sx={profilePic}>
                <Avatar sx={imgStyle} alt="profile picture" src="r" />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button variant="contained">Change Photo</Button>
                <Button variant="outlined" color="error">
                  Remove
                </Button>
              </Box>
            </Box>
            <Divider />
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
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },

                justifyContent: 'flex-end',
                alignSelf: 'flex-end',
                gap: 2,
                marginTop: 2,
                width: { xs: '100%', sm: '340px' },
              }}
            >
              <Button
                fullWidth
                variant="outlined"
                color="inherit"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Save Changes
              </Button>
            </Box>
          </form>
        </LocalizationProvider>
      </Box>
    </Modal>
  );
};

export default UpdateTeacherForm;
const profileBox = {
  // border: '1px solid',
  // borderColor: '#E0E0E0',
  // borderRadius: '8px',
  // bgcolor: '#ffffff',
  // marginTop: '32px',
  // padding: 3,
  // display: 'flex',
  // flexDirection: 'column',
  // alignItems: 'start',
};
const valueBoxOne = {
  width: 100,
  height: 100,
  borderRadius: '50%',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  mb: 2,
};
const imgStyle = {
  width: {
    xs: 120,
    sm: 160,
  },
  height: {
    xs: 120,
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
const buttons = {
  display: 'flex',
  flexDirection: 'row',
  alignSelf: 'flex-end',
  gap: 2,
  marginTop: 2,
  width: { xs: '100%', sm: '340px' },
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

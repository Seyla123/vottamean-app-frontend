import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { MuiTelInput } from 'mui-tel-input';

import {
  Box,
  TextField,
  Typography,
  Tab,
  Tabs,
  InputAdornment,
  MenuItem,
  Select,
  Avatar,
} from '@mui/material';
import { UserRoundPlus } from 'lucide-react';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import userProfile from '../../../assets/images/default-profile.png';
import SelectField from '../../../components/common/SelectField';
import LoadingCircle from '../../../components/loading/LoadingCircle';
import FormComponent from '../../../components/common/FormComponent';
import CardComponent from '../../../components/common/CardComponent';
import ButtonContainer from '../../../components/common/ButtonContainer';

// Redux Hooks and APIs
import { useGetClassesDataQuery } from '../../../services/classApi';
import { useCreateStudentMutation } from '../../../services/studentApi';

// UI Reducer Slice
import { setSnackbar } from '../../../store/slices/uiSlice';

// Student Validations and data formatting
import { StudentValidator } from '../../../validators/validationSchemas';

function StudentCreatePage() {
  // Initialize hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State for tab control
  const [activeTab, setActiveTab] = useState(0);

  // Local state for class, gender, and dob
  const [className, setClassName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState(null);
  const [rows, setRows] = useState([]);

  const classOptions = rows.length
    ? rows
    : [{ value: '', label: 'No classes available' }];

  // Redux Class API
  const { data: classData } = useGetClassesDataQuery();

  useEffect(() => {
    if (classData && Array.isArray(classData.data)) {
      const classes = classData.data.map((classItem) => ({
        value: classItem.class_id,
        label: classItem.class_name,
      }));
      setRows(classes);
    }
  }, [classData]);

  // Redux Create Student API
  const [createStudent, { isLoading, isError, isSuccess, error }] =
    useCreateStudentMutation();

  // Form state and validation
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(StudentValidator),
  });

  // Submit form data
  const onSubmit = async (data) => {
    const formattedDob = dob ? dayjs(dob).format('YYYY-MM-DD') : '';
    const studentData = {
      ...data,
      gender,
      dob: formattedDob,
    };
    try {
      await createStudent(studentData).unwrap();
    } catch (e) {
      console.error(e);
    }
  };

  // Snackbar messages
  useEffect(() => {
    if (isLoading) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Creating Student data...',
          severity: 'info',
        }),
      );
    } else if (isError) {
      dispatch(
        setSnackbar({
          open: true,
          message: error?.data?.message || 'An error occurred during signup',
          severity: 'error',
        }),
      );
    } else if (isSuccess) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Student creation successful!',
          severity: 'success',
        }),
      );
      navigate('/admin/students');
    }
  }, [dispatch, isLoading, isError, error, isSuccess, navigate]);

  return (
    <FormComponent
      title="Create Student"
      subTitle="Please fill Student Information"
    >
      <Tabs
        value={activeTab}
        onChange={(event, newValue) => setActiveTab(newValue)}
      >
        <Tab label="STUDENT INFORMATION" />
        <Tab label="GUARDIAN INFORMATION" />
      </Tabs>

      {activeTab === 0 && (
        <CardComponent title="Student Information">
          <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
            {/* Student First Name */}
            <Box sx={{ width: '100%' }}>
              <Typography variant="body2" fontWeight="bold">
                First Name <span style={{ color: 'red' }}>*</span>
              </Typography>
              <Controller
                name="first_name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    placeholder="First Name"
                    error={!!errors.first_name}
                    helperText={errors.first_name?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <UserRoundPlus size={20} />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Box>
            {/* Student Last Name */}
            <Box sx={{ width: '100%' }}>
              <Typography variant="body2" fontWeight="bold">
                Last Name <span style={{ color: 'red' }}>*</span>
              </Typography>
              <Controller
                name="last_name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    placeholder="Last Name"
                    error={!!errors.last_name}
                    helperText={errors.last_name?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <UserRoundPlus size={20} />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Box>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" fontWeight="bold">
              Class <span style={{ color: 'red' }}>*</span>
            </Typography>
            <SelectField
              name="className"
              options={classOptions}
              placeholder="Select Class"
              error={!!errors.className}
              helperText={errors.className?.message}
              value={className || ''}
              onChange={(e) => setClassName(e.target.value)}
            />
          </Box>

          {/* Gender */}
          <Box sx={{ width: '100%' }}>
            <Typography variant="body2" fontWeight="bold">
              Gender <span style={{ color: 'red' }}>*</span>
            </Typography>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  value={gender || ''}
                  onChange={(e) => {
                    setGender(e.target.value);
                    field.onChange(e);
                  }}
                  fullWidth
                  displayEmpty
                  error={!!errors.gender}
                >
                  <MenuItem value="" disabled>
                    Select gender
                  </MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              )}
            />
          </Box>

          {/* Date of birth */}
          <Box sx={{ width: '100%' }}>
            <Typography variant="body2" fontWeight="bold">
              Date Of Birth <span style={{ color: 'red' }}>*</span>
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="dob"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    value={dob}
                    onChange={(newValue) => {
                      setDob(newValue);
                      field.onChange(
                        newValue ? dayjs(newValue).format('YYYY-MM-DD') : '',
                      );
                    }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.dob,
                        placeholder: 'YYYY-MM-DD',
                      },
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </Box>

          {/* Contact Number */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" fontWeight="bold">
              Contact Number <span style={{ color: 'red' }}>*</span>
            </Typography>
            <Controller
              name="phone_number"
              control={control}
              render={({ field }) => (
                <MuiTelInput
                  defaultCountry="KH"
                  {...field}
                  error={!!errors.phone_number}
                  helperText={errors.phone_number?.message}
                  fullWidth
                />
              )}
            />
          </Box>

          {/* Student Address */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" fontWeight="bold">
              Address
            </Typography>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  multiline
                  minRows={3}
                  fullWidth
                  placeholder="Enter your address"
                  error={!!errors.address}
                  helperText={errors.address?.message}
                />
              )}
            />
          </Box>
        </CardComponent>
      )}

      {/* Guardian Information */}
      {activeTab === 1 && (
        <CardComponent title="Guardian Information">
          {/* Similar structure for Guardian information as for Student */}
          {/* Add fields for Guardian First Name, Last Name, Relationship, etc. */}
        </CardComponent>
      )}

      <ButtonContainer onSave={handleSubmit(onSubmit)} />
    </FormComponent>
  );
}

export default StudentCreatePage;

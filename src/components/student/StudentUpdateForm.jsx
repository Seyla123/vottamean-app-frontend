// StudentUpdateForm.js
import React, { useEffect, useState } from 'react';
import {  useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { Box, MenuItem, Stack, TextField, Typography, Modal } from '@mui/material';
import { UserRoundPen } from 'lucide-react';
import dayjs from 'dayjs';


import StyledButton from '../common/StyledMuiButton';
import { setSnackbar } from '../../store/slices/uiSlice';
import PhoneInputField from '../common/PhoneInputField';
import InputField from '../common/InputField';
import GenderSelect from '../common/GenderSelect';
import DOBPicker from '../common/DOBPicker';


import { useGetClassesDataQuery } from '../../services/classApi';
import {
  useGetStudentsByIdQuery,
  useUpdateStudentMutation,
} from '../../services/studentApi';

import { StudentValidator } from '../../validators/validationSchemas';
import SubHeader from '../teacher/SubHeader';
import {formatStudentFormData} from'../../utils/formatData'
import { DatePicker } from '@mui/x-date-pickers';

const StudentUpdateForm = ({  onClose ,handleNext}) => {
  const {id} =useParams();
  const dispatch = useDispatch();

  // Fetch student data when the modal is open an is available
  const {
    data: studentData,
    isLoading,
    isError,
  } = useGetStudentsByIdQuery(id);


  // Fetch classes data
  const { data: classData } = useGetClassesDataQuery();

  // Local State
  const [dob, setDob] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [rows, setRows] = useState([]);

  // Update Student Mutation
  const [updateStudent] = useUpdateStudentMutation();

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(StudentValidator),
    defaultValues: {
      photo:'',
      first_name: '',
      last_name: '',
      phone_number: '',
      gender: '',
      dob: null,
      address: '',
      class_id: '',
    },
  });

  // Load class options
  useEffect(() => {
    if (classData && Array.isArray(classData.data)) {
      setRows(
        classData.data.map((classItem) => ({
          value: String(classItem.class_id),
          label: classItem.class_name,
        })),
      );
    }
  }, [classData]);

  // Populate form with fetched student data
  useEffect(() => {
    if (studentData && studentData.data) {
      const formattedData = formatStudentFormData(studentData);
      if (formattedData) {
        const studentInfo = {
          ...formattedData,
          dob: formattedData.dob ? dayjs(formattedData.dob) : null,  
        };
        reset(studentInfo);
        setDob(studentInfo.dob);
        setOriginalData(studentInfo);
      }
    }
  }, [studentData, reset]);
  
  // Handle form submission
  const onSubmit = async (data) => {
    const submittedData = {
      first_name: data.first_name,
      last_name: data.last_name,
      phone_number: data.phone_number,
      gender: data.gender,
      dob: data.dob ? dayjs(data.dob).format('YYYY-MM-DD') : null,
      address: data.address,
      class_id: data.class_id,
    };

    // Check if any of the fields have changed
    const hasChanges = Object.keys(submittedData).some(
      (key) => submittedData[key] !== originalData[key],
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
      handleNext();
 
      return;
    }
    // Update the student information with the new data
    try {
      const result = await updateStudent({
        id,
        updates: submittedData,
      }).unwrap();

      if (result.status === 'success') {
        dispatch(
          setSnackbar({
            open: true,
            message: 'Student information updated successfully!',
            severity: 'success',
            autoHideDuration: 6000,
          }),
        );
        handleNext();
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
  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError)
    return <Typography color="error">Error loading student data</Typography>;


  return (
    <
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
          Edit Student Information
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            {/* Profile picture upload */}
            <SubHeader title="Student Information" />
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                mb: 2,
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {/* Image upload logic (if any) */}
              {/* ... */}
            </Box>

            {/* STUDENT NAME */}
            <Box display="flex" flexDirection="row" sx={boxContainer}>
              <InputField
                name="first_name"
                control={control}
                label="First Name"
                placeholder="First Name"
                errors={errors}
                icon={UserRoundPen}
              />
              <InputField
                name="last_name"
                control={control}
                label="Last Name"
                placeholder="Last Name"
                errors={errors}
                icon={UserRoundPen}
              />
            </Box>

            {/* STUDENT GENDER AND DATE OF BIRTH */}
            <Box display="flex" flexDirection="row" sx={boxContainer}>
              <GenderSelect
                control={control}
                errors={errors}
                name="gender"
                defaultValue={studentData.gender || ''}
                label="Gender"
              />
              {/* Date of Birth */}
              <DOBPicker
                control={control}
                errors={errors}
                name="dob"
                dob={dob}
                setDob={setDob}
              />
            </Box>

            {/* Class Selection */}
            <Controller
              name="class_id"
              control={control}
              render={({ field }) => (
                <TextField
                  select
                  label="Class"
                  {...field}
                  fullWidth
                  error={!!errors.class_id}
                  helperText={errors.class_id?.message}
                >
                  {rows.map((row) => (
                    <MenuItem key={row.value} value={row.value}>
                      {row.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            {/* Phone Number */}
            <PhoneInputField
              name="phone_number"
              control={control}
              label="Contact Number"
              errors={errors}
            />

            {/* Address */}
            <InputField
              name="address"
              control={control}
              label="Street Address"
              placeholder="Phnom Penh, Street 210, ..."
              errors={errors}
              required={false}
              multiline
              minRows={5}
            />

            <Box
              sx={{
                display: 'flex',
                gap: 2,
                width: '100%',
                justifyContent: 'flex-end',
              }}
            >
              <StyledButton
                variant="outlined"
                color="inherit"
                size="large"
                onClick={onClose}
              >
                Cancel
              </StyledButton>
              <StyledButton
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Save Changes
              </StyledButton>
            </Box>
          </Stack>
        </form>
      </Box>
    </>
  );
};

export default StudentUpdateForm;

const boxContainer = {
  width: '100%',
  marginTop: '14px',
  padding: '0px',
  gap: {
    xs: '12px',
    sm: 3,
  },
};

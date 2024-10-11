import React, { useEffect, useState } from 'react';
import { Box, Stack, TextField, Typography, Modal } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import PhoneInputField from '../common/PhoneInputField';
import InputField from '../common/InputField';
import { Mail,UserRoundPen } from 'lucide-react';
import StyledButton from '../common/StyledMuiButton';
import { yupResolver } from '@hookform/resolvers/yup';
import { GuardianValidator } from '../../validators/validationSchemas';
import { setSnackbar } from '../../store/slices/uiSlice';
import { useDispatch } from 'react-redux';
import {
  useGetStudentsByIdQuery,
  useUpdateStudentMutation,
} from '../../services/studentApi';
import { useParams } from 'react-router-dom';

import Diversity1Icon from '@mui/icons-material/Diversity1';

const GuardianUpdateForm = ({ onClose, handleNext }) => {
  const {id} =useParams();
  const dispatch = useDispatch();
  const [originalData, setOriginalData] = useState(null);
  // Fetch guardian data
  const {
    data: studentData,
    isLoading,
    isError,
  } = useGetStudentsByIdQuery(id);
  // Update Guardian Mutation
  const [updateStudent] = useUpdateStudentMutation();

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(GuardianValidator),
    defaultValues: {
     guardian_first_name: '',
     guardian_last_name: '',
     guardian_email: '',
     guardian_phone_number: '',
    },
  });

  // Populate form with fetched guardian data
  useEffect(() => {
    if (studentData && studentData.data) {
      const formattedData = {
        guardian_first_name: studentData.data.guardian_first_name || '',
        guardian_last_name: studentData.data.guardian_last_name || '',
        guardian_email: studentData.data.guardian_email || '',
        guardian_phone_number: studentData.data.guardian_phone_number || '',
        guardian_relationship: studentData.data.guardian_relationship || '',
      };
      setOriginalData(formattedData);
      reset(formattedData);
      console.log('Formatted Data:', formattedData); // Log formatted data
    }
  }, [studentData, reset]);
  


  // Handle form submission
  const onSubmit = async (data) => {
    const submittedData = {
      guardian_phone_number: data.guardian_phone_number,
      guardian_first_name: data.guardian_first_name,
      guardian_last_name: data.guardian_last_name,
      guardian_email: data.guardian_email,
      guardian_relationship: data.guardian_relationship,
    };
    console.log(submittedData);
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
      navigate('/admin/students');
 
      return;
    }
    try {
      const result = await updateStudent({
        id,
        updates: submittedData,
      }).unwrap();

      if (result.status === 'success') {
        dispatch(
          setSnackbar({
            open: true,
            message: 'Guardian information updated successfully!',
            severity: 'success',
            autoHideDuration: 6000,
          }),
        );
        navigate('/admin/students');
      } else {
        throw new Error('Update failed');
      }
    } catch (error) {
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
  if (isError) return <Typography color="error">Error loading guardian data</Typography>;

  return (
    <Box>
    <form onSubmit={handleSubmit(onSubmit)}
    >
      <Box
        sx={{
          width: '600px',
          bgcolor: '#ffffff',
          borderRadius: '8px',
          p: 4,
        }}
      >
        <Typography variant="h5" component="h2" fontWeight={'bold'} gutterBottom mb={4}>
          Edit Guardian Information
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            {/* Guardian Name */}
            <Box display="flex" flexDirection="row" sx={boxContainer}>
              <InputField
                name="guardian_first_name"
                control={control}
                label="First Name"
                placeholder="First Name"
                errors={errors}
                icon={UserRoundPen}
              />
              <InputField
                name="guardian_last_name"
                control={control}
                label="Last Name"
                placeholder="Last Name"
                errors={errors}
                icon={UserRoundPen}
              />
            </Box>

            {/* Guardian Email */}
            <InputField
              name="guardian_email"
              control={control}
              label="Email"
              placeholder="Enter guardian email"
              errors={errors}
              icon={Mail}
            />

            {/* Guardian Phone Number */}
            <PhoneInputField
              name="guardian_phone_number"
              control={control}
              label="Contact Number"
              errors={errors}
            />

            {/* Guardian Relationship */}
          <InputField
            name="guardian_relationship"
            control={control}
            label="Relationship"
            placeholder="Relationship"
            errors={errors}
            icon={Diversity1Icon}
            required={false}
          />

            {/* Form Buttons */}
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                width: '100%',
                justifyContent: 'flex-end',
              }}
            >
              <StyledButton variant="outlined" color="inherit" size="large" onClick={onClose}>
                Cancel
              </StyledButton>
              <StyledButton type="submit" variant="contained" color="primary" size="large">
                Save Changes
              </StyledButton>
            </Box>
          </Stack>
        </form>
      </Box>
    </form>
    </Box>
  );
};

export default GuardianUpdateForm;

const boxContainer = {
  width: '100%',
  marginTop: '14px',
  padding: '0px',
  gap: {
    xs: '12px',
    sm: 3,
  },
};

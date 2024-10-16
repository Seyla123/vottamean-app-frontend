import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';

import { updateFormData, resetFormData } from '../../store/slices/studentSlice';
import { setSnackbar } from '../../store/slices/uiSlice';
import { useCreateStudentMutation } from '../../services/studentApi';

import StudentForm from '../student/StudentForm';
import GuardianForm from '../student/GuardianForm';

const CreateStudentModal = ({ open, handleClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const studentData = useSelector((state) => state.student);

  const [createStudent, { isLoading }] = useCreateStudentMutation();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFormChange = (data) => {
    dispatch(updateFormData(data));
  };

  const handleSubmit = async (guardianData) => {
    const combinedData = { ...studentData, ...guardianData };
    try {
      await createStudent(combinedData).unwrap();
      dispatch(resetFormData());
      handleClose();
      dispatch(setSnackbar({
        open: true,
        message: 'Student created successfully',
        severity: 'success',
      }));
    } catch (err) {
      console.error('Failed to create student:', err);
      dispatch(setSnackbar({
        open: true,
        message: err.data?.message || 'Failed to create student',
        severity: 'error',
      }));
    }
  };

  const steps = [
    { label: 'Student Information', description: 'Enter student details' },
    { label: 'Guardian Information', description: 'Enter guardian details' },
  ];

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          height: '90vh',
          maxHeight: 700,
        },
      }}
    >
      <DialogTitle>Create New Student</DialogTitle>
      <DialogContent dividers>
        <Box sx={{ width: '100%', height: '100%' }}>
          <Stepper activeStep={activeStep} orientation={isMobile ? "horizontal" : "vertical"} sx={{ mb: 4 }}>
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  optional={
                    <Typography variant="caption">{step.description}</Typography>
                  }
                >
                  {step.label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box sx={{ mt: 2, height: 'calc(100% - 100px)', overflowY: 'auto' }}>
            {activeStep === 0 ? (
              <StudentForm handleNext={handleNext} handleFormChange={handleFormChange} />
            ) : (
              <GuardianForm handleBack={handleBack} handleFormChange={handleSubmit} />
            )}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CreateStudentModal;

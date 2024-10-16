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
import { ColorlibConnector, ColorlibStepIcon } from './StepperComponent';

const CreateStudentModal = ({ open, handleClose }) => {
  const theme = useTheme();
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
      dispatch(
        setSnackbar({
          open: true,
          message: 'Student created successfully',
          severity: 'success',
        }),
      );
    } catch (err) {
      console.error('Failed to create student:', err);
      dispatch(
        setSnackbar({
          open: true,
          message: err.data?.message || 'Failed to create student',
          severity: 'error',
        }),
      );
    }
  };

  const steps = [
    { label: 'Student Information', description: 'Enter student details' },
    { label: 'Guardian Information', description: 'Enter guardian details' },
  ];

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Create New Student</DialogTitle>
      <DialogContent dividers sx={{ height: '700px' }}>
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<ColorlibConnector />}
          sx={{ py: 4 }}
        >
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                {label.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 ? (
          <StudentForm
            handleNext={handleNext}
            handleFormChange={handleFormChange}
            handleClose={handleClose}
          />
        ) : (
          <GuardianForm
            handleBack={handleBack}
            handleFormChange={handleSubmit}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateStudentModal;

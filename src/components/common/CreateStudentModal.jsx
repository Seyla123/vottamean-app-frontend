import React, { useState } from 'react';
import {
  Box,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Step,
  StepLabel,
  Stepper,
  styled,
  IconButton,
  Stack,
} from '@mui/material';
import StyledButton from './StyledMuiButton';
import CreateStudentPanel from './CreateStudentPannel';
import CreateGuardianPanel from './CreateGuardianPanel';
import { ColorlibConnector, ColorlibStepIcon } from './StepperComponent';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
// - Redux Hooks and APIs
import { updateFormData } from '../../store/slices/studentSlice';

// - Custom Form Component
import GuardianForm from '../student/GuardianForm';
import StudentForm from '../student/StudentForm';
import { useDispatch } from 'react-redux';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const steps = ['Student Information', 'Guardian Information'];

const CreateStudentModal = ({ open, handleCreateModalClose }) => {
  const dispatch = useDispatch();

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [studentData, setStudentData] = useState({});
  const [guardianData, setGuardianData] = useState({});

  // Function to handle the form data change
  const handleFormChange = (stepData) => {
    dispatch(updateFormData(stepData));
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const resetModal = () => {
    setActiveStep(0);
    setSkipped(new Set());
    setStudentData({});
    setGuardianData({});
  };

  const handleCreateModalCloseWithReset = () => {
    resetModal();
    handleCreateModalClose();
  };

  const onSubmit = () => {
    console.log('Student Data:', studentData);
    console.log('Guardian Data:', guardianData);

    alert('Created successfully');
    resetModal();
    handleCreateModalClose();
  };

  return (
    <BootstrapDialog
      fullWidth
      maxWidth={'sm'}
      open={open}
      onClose={handleCreateModalCloseWithReset}
    >
      <DialogTitle>
        {activeStep === 0 ? 'Create Student' : 'Create Guardian'}
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<ColorlibConnector />}
          sx={{ mt: 4 }}
        >
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleCreateModalClose}
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <X />
      </IconButton>
      <DialogContent>
        {activeStep === 0 ? (
          <CreateStudentPanel
            handleFormChange={handleFormChange}
            setStudentData={setStudentData}
          />
        ) : (
          <CreateGuardianPanel
            setGuardianData={setGuardianData}
            handleFormChange={handleFormChange}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Stack
          width={'100%'}
          direction={'row'}
          gap={2}
          justifyContent={'space-between'}
        >
          <StyledButton
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="contained"
            startIcon={<ChevronLeft size={18} />}
          >
            Back
          </StyledButton>
          <>
            {activeStep === steps.length - 1 ? (
              <StyledButton variant="contained" onClick={onSubmit}>
                Create
              </StyledButton>
            ) : (
              <StyledButton
                variant="contained"
                onClick={handleNext}
                endIcon={<ChevronRight size={18} />}
              >
                Next
              </StyledButton>
            )}
          </>
        </Stack>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default CreateStudentModal;

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
  Button,
} from '@mui/material';
import CreateStudentPandel from './CreateStudentPandel';
import CreateGuardianPanel from './CreateGuardianPanel';
import { ColorlibConnector, ColorlibStepIcon } from './StepperComponent';

const steps = ['Student Information', 'Guardian Information'];

const CreateStudentModal = ({ open, handleCreateModalClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [studentData, setStudentData] = useState({});
  const [guardianData, setGuardianData] = useState({});

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
    <Dialog
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
      <DialogContent>
        {activeStep === 0 ? (
          <CreateStudentPandel setStudentData={setStudentData} />
        ) : (
          <CreateGuardianPanel setGuardianData={setGuardianData} />
        )}
      </DialogContent>
      <DialogActions>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          <Box>
            {activeStep === steps.length - 1 ? (
              <Button variant="contained" onClick={onSubmit}>
                Create
              </Button>
            ) : (
              <Button variant="contained" onClick={handleNext}>
                Next
              </Button>
            )}
          </Box>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default CreateStudentModal;

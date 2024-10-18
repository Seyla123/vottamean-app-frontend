// - React and third-party libraries
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

// - Mui Component
import { Box, Stepper, Step, StepLabel, Card, Typography } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';

// - Icon from lucide
import { User, KeyRound } from 'lucide-react';

// - Redux Hooks and APIs
import { updateFormData } from '../../store/slices/studentSlice';

// - Custom Components
import StudentForm from './StudentForm';
import GuardianForm from './GuardianForm';
import { shadow } from '../../styles/global';

function FormInfoStudent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Dispatch the action to update the form data
  const dispatch = useDispatch();

  // State variable to keep track of the current step
  const [activeStep, setActiveStep] = useState(0);

  // Function to handle the form data change
  const handleFormChange = (stepData) => {
    dispatch(updateFormData(stepData));
  };

  // Function to go to the previous step
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Function to go to the next step
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  // Array of steps to display in the stepper
  const steps = [
    {
      label: 'Student',
      description: 'Enter student details',
      icon: <User size={24} />,
    },
    {
      label: 'Guardian',
      description: 'Enter guardian details',
      icon: <KeyRound size={24} />,
    },
  ];

  // Array of components to render in each step
  const stepFormComponents = [
    <StudentForm handleFormChange={handleFormChange} handleNext={handleNext} />,
    <GuardianForm
      handleFormChange={handleFormChange}
      handleNext={handleNext}
      handleBack={handleBack}
    />,
  ];

  const CustomIconBox = ({ icon }) => (
    <Box
      sx={{
        width: 40,
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        backgroundColor: '#fff',
        padding: '8px',
      }}
    >
      {icon}
    </Box>
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 2, sm: 3 },
        height: '100%',
      }}
    >
      <Card sx={cardContainer}>
        {/* Sidebar with stepper */}
        <Box
          sx={{
            width: { xs: '100%', sm: '250px' },
            borderRight: { sm: '1px solid #e0e0e0' },
            p: 2,
          }}
        >
          <Stepper
            activeStep={activeStep}
            orientation={isMobile ? 'horizontal' : 'vertical'}
            sx={{ mt: 2 }}
          >
            {steps.map((step, index) => (
              <Step
                key={index}
                sx={{
                  opacity: activeStep === index ? 1 : 0.5,
                  transition: 'opacity 0.3s cubic-bezier(0.45, 0, 0.55, 1)',
                }}
              >
                <StepLabel
                  icon={<CustomIconBox icon={step.icon} />}
                  optional={
                    <Typography variant="body2" color="grey.300">
                      {step.description}
                    </Typography>
                  }
                >
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {step.label}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* Form components */}
        <Box
          sx={{
            flex: 1,
            p: 3,
            backgroundColor: '#ffffff',
            overflowY: 'auto',
          }}
        >
          {/* Render the form component based on the active step */}
          {stepFormComponents[activeStep]}
        </Box>
      </Card>
    </Box>
  );
}

export default FormInfoStudent;

// Styles
const cardContainer = {
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'row' },
  width: '100%',
  height: '100%',
  borderRadius: 1,
  overflow: 'hidden',
  ...shadow,
};

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Typography,
  Card,
  Stepper,
  StepLabel,
  Step,
  useMediaQuery,
} from '@mui/material';
import { shadow } from '../../../styles/global';
import {
  useGetStudentsByIdQuery,
  useUpdateStudentMutation,
} from '../../../services/studentApi';

import StudentUpdateForm from '../../../components/student/StudentUpdateForm';
import GuardianUpdateForm from '../../../components/student/GuardianUpdateForm';

import { KeyRound, User } from 'lucide-react';
import { useTheme } from '@emotion/react';

// import { updateFormData } from '../../../store/slices/studentSlice';
import { useNavigate } from 'react-router-dom';


const StudentUpdatePage = () => {
  const navigate =useNavigate()
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
    // Function to go to the next step
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
 
  // Function to go to the previous step
  const handleBack = () => {
    console.log('Hello');
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
   
  };
  const handleCancel = () => {
     navigate('/admin/students')
  }


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
  // Array of components to render in each step
  const stepFormComponents = [
    <StudentUpdateForm handleFormChange={handleFormChange} handleNext={handleNext}  onClose={handleCancel}
    />,
    <GuardianUpdateForm
    handleFormChange={handleFormChange}
    handleNext={handleNext}
    onClose={handleBack}
    />,
  ];

  return (
    <>
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
    </>
  );
};

export default StudentUpdatePage;

const imgStyle = {
  width: { xs: 120, sm: 160 },
  height: { xs: 120, sm: 160 },
};

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

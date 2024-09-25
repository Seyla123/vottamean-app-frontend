import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSignupMutation } from '../../services/authApi';
import { updateFormData } from '../../store/slices/formSlice';
import GetStartedNowForm from '../../components/auth/GetStartedNowForm';
import YourDetailsForm from '../../components/auth/YourDetailsForm';
import ContactForm from '../../components/auth/ContactForm';
import CreateSchoolForm from '../../components/auth/CreateSchoolForm';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import { User, Users, Contact, School } from 'lucide-react';
// IMAGES & ICONS
import Logo from '../../assets/images/Logo.svg';
import illustrationImg1 from '../../assets/images/illustration-img-1.svg';
import illustrationImg2 from '../../assets/images/illustration-img-2.svg';
import illustrationImg3 from '../../assets/images/illustration-img-3.svg';
import illustrationImg4 from '../../assets/images/illustration-img-4.svg';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form);
  const [signup] = useSignupMutation();

  const [activeStep, setActiveStep] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const handleFormChange = (stepData) => {
    dispatch(updateFormData(stepData));
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const formattedData = {
        email: formData.email,
        password: formData.password,
        passwordConfirm: formData.passwordConfirm,
        address: formData.address,
        dob: formData.dob,
        first_name: formData.first_name,
        last_name: formData.last_name,
        gender: formData.gender,
        phone_number: formData.phone_number,
        school_name: formData.school_name,
        school_address: formData.school_address,
        school_phone_number: formData.school_phone_number,
      };

      await signup(formattedData).unwrap();

      setSnackbarMessage(
        'Your account has been successfully created. Please verify your email.',
      );
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarMessage(
        'There was an issue with your signup. Please try again.',
      );
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const steps = [
    {
      label: 'Get Started Now',
      description: 'Create your own email and password',
      icon: <User size={24} />,
    },
    {
      label: 'Personal details',
      description: 'Provide your personal details',
      icon: <Users size={24} />,
    },
    {
      label: 'Contact Details',
      description: 'Provide your contact information',
      icon: <Contact size={24} />,
    },
    {
      label: 'School Information',
      description: 'Enter school information',
      icon: <School size={24} />,
    },
  ];

  const stepFormComponents = [
    <GetStartedNowForm
      formData={formData}
      handleFormChange={handleFormChange}
    />,
    <YourDetailsForm formData={formData} handleFormChange={handleFormChange} />,
    <ContactForm formData={formData} handleFormChange={handleFormChange} />,
    <CreateSchoolForm
      formData={formData}
      handleFormChange={handleFormChange}
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
        backgroundColor: '#6c63ff',
        padding: '8px',
        color: 'white',
      }}
    >
      {icon}
    </Box>
  );

  return (
    <Box
      component={'div'}
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
        bgcolor: 'white',
      }}
    >
      {/* LEFT CONTAINER */}
      <Box
        component={'div'}
        sx={{
          position: 'relative',
          width: '30%',
          height: '100%',
          bgcolor: '#F5F5F7',
          borderRadius: 2,
          p: 2,
          overflow: 'hidden',
        }}
      >
        {/* LOGO */}
        <img src={Logo} alt="wavetrack logo" style={{ width: '200px' }} />
        {/* STEPPER */}
        <Box component={'div'} sx={{ px: { xs: 0, md: 4 } }}>
          <Stepper
            activeStep={activeStep}
            orientation="vertical"
            sx={{ mt: 8 }}
          >
            {steps.map((step, index) => (
              <Step
                key={index}
                sx={{
                  opacity: activeStep === index ? 1 : 0.5,
                  transform: activeStep === index ? 'scale(1)' : 'scale(0.98)',
                  transition:
                    'opacity 0.5s cubic-bezier(0.5, 1, 0.89, 1), transform 0.3s cubic-bezier(0.45, 0, 0.55, 1)',
                }}
              >
                <StepLabel
                  icon={<CustomIconBox icon={step.icon} />}
                  optional={
                    <Typography variant="body2">{step.description}</Typography>
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

        {/* ILLUSTRATION CONTAINER */}
        <Box
          component={'div'}
          sx={{
            position: 'absolute',
            bottom: -50,
            left: 0,
            zIndex: 0,
            width: '100%',
            height: '50%',
            overflow: 'hidden',
          }}
        >
          {[
            illustrationImg1,
            illustrationImg2,
            illustrationImg3,
            illustrationImg4,
          ].map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Illustration ${index + 1}`}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: activeStep === index ? 1 : 0,
                transform: `translateX(${(index - activeStep) * 100}%)`,
                transition:
                  'opacity 0.8s ease-in-out, transform 0.8s cubic-bezier(0.65, 0, 0.35, 1)',
              }}
            />
          ))}
        </Box>
      </Box>

      {/* RIGHT CONTAINER */}
      <Box component={'div'} sx={{ width: '70%', padding: '2rem' }}>
        {stepFormComponents[activeStep]}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '2rem',
          }}
        >
          <Button onClick={handleBack} disabled={activeStep === 0}>
            Back
          </Button>
          <Button
            variant="contained"
            onClick={
              activeStep === steps.length - 1 ? handleSubmit : handleNext
            }
          >
            {activeStep === steps.length - 1 ? 'Get Started' : 'Next'}
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RegisterPage;

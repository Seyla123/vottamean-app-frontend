import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSignupMutation } from '../../services/authApi';
import { updateFormData } from '../../store/slices/formSlice';
import GetStartedNowForm from '../../components/auth/GetStartedNowForm';
import PersonalDetailsForm from '../../components/auth/PersonalDetailsForm';
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
import image1 from '../../assets/images/image-1.jpg';
import image2 from '../../assets/images/image-2.jpg';
import image3 from '../../assets/images/image-3.webp';
import image4 from '../../assets/images/image-4.webp';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form);
  const [signup] = useSignupMutation();

  const [activeStep, setActiveStep] = useState(2);
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
      handleFormChange={handleFormChange}
      handleNext={handleNext}
    />,
    <PersonalDetailsForm
      formData={formData}
      handleFormChange={handleFormChange}
      handleNext={handleNext}
      handleBack={handleBack}
    />,
    <ContactForm
      formData={formData}
      handleFormChange={handleFormChange}
      handleNext={handleNext}
      handleBack={handleBack}
    />,
    <CreateSchoolForm
      formData={formData}
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
        backgroundColor: '#6c63ff',
        padding: '8px',
        color: 'common.white',
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
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
        gap: 2,
        bgcolor: 'white',
      }}
    >
      {/* RIGHT CONTAINER */}
      <Box
        component={'div'}
        sx={{
          display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' },
          position: 'relative',
          width: '100%',
          height: '100%',
          bgcolor: '#F5F5F7',
          borderRadius: 2,
          p: 2,
          overflow: 'hidden',
        }}
      >
        {/* STEPPER */}
        <Box
          component={'div'}
          sx={{ px: { xs: 0, md: 4 }, position: 'relative', zIndex: 10 }}
        >
          <Stepper
            activeStep={activeStep}
            orientation="vertical"
            sx={{ mt: 4 }}
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
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 'bold' }}
                    color="common.white"
                  >
                    {step.label}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* IMAGE CONTAINER */}
        <Box
          component={'div'}
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            zIndex: 1,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
          }}
        >
          {[image1, image2, image3, image4].map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Image ${index + 1}`}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: activeStep === index ? 1 : 0,
                transform: `translateX(${(index - activeStep) * 100}%)`,
                transition:
                  'opacity 0.8s ease-in-out, transform 0.8s cubic-bezier(0.83, 0, 0.17, 1)',
              }}
            />
          ))}

          {/* IMAGE OVERLAY */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background:
                ' linear-gradient(145deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)',
              pointerEvents: 'none',
            }}
          />
        </Box>
      </Box>

      {/* LEFT CONTAINER */}
      <Box
        component={'div'}
        sx={{
          width: { xs: '100%', sm: '100%', md: '100%', lg: '65%' },
          height: '100%',
          position: 'relative',
        }}
      >
        {/* LOGO */}
        <img
          src={Logo}
          alt="wavetrack logo"
          style={{
            width: '150px',
            position: 'absolute',
            top: '10px',
            left: '10px',
            zIndex: 10,
          }}
        />
        {/* FORM COMPONENTs */}
        {stepFormComponents[activeStep]}
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

// Redux hooks
import { useDispatch, useSelector } from 'react-redux';

// React hooks
import { useState } from 'react';

// Mutation hook for signup API
import { useSignupMutation } from '../../services/authApi';

// Redux slices
import { updateFormData } from '../../store/slices/formSlice';

// Material UI components for layout and stepper
import {
  Box,
  Container,
  Step,
  Stepper,
  StepLabel,
  Typography,
  Alert,
  Snackbar,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Custom component for card layout
import AuthContainerCard from '../../components/auth/AuthContainerCard';

/**
 * Components corresponding to each step
 * Step 1: @param Account details form
 * Step 2: @param Personal info form
 * Step 3: @param Contact info form
 * Step 4: @param School info form
 */
import GetStartSignUpForm from '../../components/auth/GetStartSignUpForm';
import PersonalInformationForm from '../../components/auth/PersonalInformationForm';
import ContactInformationForm from '../../components/auth/ContactInformationForm';
import RegisterSchoolForm from '../../components/auth/RegisterSchoolForm';

// Stepper labels for each step in the signup process
const steps = [
  'Account details',
  'Personal information',
  'Contact information',
  'School information',
];

function SignupPage() {
  // 1. Initialize dispatch for updating Redux store
  const dispatch = useDispatch();

  // 2. Get form data from Redux store
  const formData = useSelector((state) => state.form);

  // 3. Manage the current step of the signup process
  const [stepActive, setStepActive] = useState(0);

  // 4. Hook for calling signup API and tracking its state
  const [signup] = useSignupMutation();

  // 5. Manage the submission state and Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  // 6. Function to handle form data changes and update Redux store
  const handleFormChange = (stepData) => {
    dispatch(updateFormData(stepData)); // Update form data in the Redux store
  };

  // 7. Function to move to the previous step
  const handleBack = () => setStepActive((prev) => prev - 1);

  // 8. Function to move to the next step
  const handleNext = () => setStepActive((prev) => prev + 1);

  // 9. Function to submit form data to the API at the final step
  const handleSubmit = async () => {
    try {
      // 9.1 Format data for API submission
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

      // 9.2 Send the formatted data to the API
      await signup(formattedData).unwrap();

      // 9.3 On success, set a success message and open Snackbar
      setSnackbarMessage(
        'Your account has been successfully created. Please verify your email.',
      );
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (err) {
      // 9.4 On error, set an error message and open Snackbar
      setSnackbarMessage(
        'There was an issue with your signup. Please try again.',
      );
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  // 10. Function to handle Snackbar close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // 11. Array of forms, each corresponding to a signup step
  const stepForms = [
    <GetStartSignUpForm
      onClickBack={handleBack}
      onFormChange={handleFormChange}
      nextStep={handleNext}
    />,
    <PersonalInformationForm
      onClickBack={handleBack}
      onFormChange={handleFormChange}
      nextStep={handleNext}
    />,
    <ContactInformationForm
      onClickBack={handleBack}
      onFormChange={handleFormChange}
      nextStep={handleNext}
    />,
    <RegisterSchoolForm
      onClickBack={handleBack}
      onFormChange={handleFormChange}
      onSubmit={handleSubmit} // Final submit at the last step
    />,
  ];

  return (
    <Container
      maxWidth="lg"
      sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
    >
      {/* 12. Display Stepper at the top to show current step */}
      <Box sx={{ width: 1, paddingTop: { xs: 3, md: 4 } }}>
        <Stepper activeStep={stepActive} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {/* 13. Show the form for the current step */}
      <AuthContainerCard sideCard={stepActive === 3 ? 'right' : 'left'}>
        {stepForms[stepActive]}
      </AuthContainerCard>

      {/* 14. Display Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackbarClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default SignupPage;

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
} from '@mui/material';

// Custom component for card layout
import AuthContainerCard from '../../components/auth/AuthContainerCard';

// Components for each step
import GetStartSignUpForm from '../../components/auth/GetStartSignUpForm';
import PersonalInformationForm from '../../components/auth/PersonalInformationForm';
import ContactInformationForm from '../../components/auth/ContactInformationForm';
import RegisterSchoolForm from '../../components/auth/RegisterSchoolForm';

// Stepper labels
const steps = [
  'Account details',
  'Personal information',
  'Contact information',
  'School information',
];

function SignupPage() {
  // Initialize dispatch for updating Redux store
  const dispatch = useDispatch();

  // Get form data from Redux store
  const formData = useSelector((state) => state.form);

  // Manage the current step of the signup process
  const [stepActive, setStepActive] = useState(0);

  // Hook for calling signup API and tracking its state
  const [signup, { isError, error, isSuccess, data }] = useSignupMutation();

  // Manage the submission state
  const [submitMessage, setSubmitMessage] = useState('');

  // Handle form data changes and update Redux store
  const handleFormChange = (stepData) => {
    dispatch(updateFormData(stepData));
  };

  // Move to the previous step
  const handleBack = () => setStepActive((prev) => prev - 1);

  // Move to the next step
  const handleNext = () => setStepActive((prev) => prev + 1);

  // Submit form data to the API at the final step
  const handleSubmit = async () => {
    try {
      // Format data for API submission
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

      // Send the formatted data to the API
      const response = await signup(formattedData).unwrap();

      // Extract tempToken from the response if it exists
      const tempToken = response.token;

      // Handle the response
      if (response.status === 'success') {
        // Redirect to the verification page with tempToken
        window.location.href = `http://localhost:5173/auth/verify-email/${response.verificationToken}?token=${tempToken}`;
      }

      // Set a success message
      setSubmitMessage(
        'Your account has been successfully created. Please check your email for confirmation.',
      );
    } catch (err) {
      // On error, display a user-friendly message
      setSubmitMessage(
        'There was an issue with your signup. Please try again.',
      );
    }
  };

  // Array of forms, each corresponding to a signup step
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
      <Box sx={{ width: 1, paddingTop: { xs: 3, md: 4 } }}>
        <Stepper activeStep={stepActive} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <AuthContainerCard sideCard={stepActive === 3 ? 'right' : 'left'}>
        {stepForms[stepActive]}
      </AuthContainerCard>

      {isSuccess && (
        <Alert severity="success" sx={{ textAlign: 'center', mt: 2 }}>
          Your account has been successfully created. Please check your email
          for confirmation.
        </Alert>
      )}
      {isError && (
        <Alert severity="error" sx={{ textAlign: 'center', mt: 2 }}>
          Signup failed:{' '}
          {error?.data?.message || 'Something went wrong. Please try again.'}
        </Alert>
      )}

      {submitMessage && (
        <Typography textAlign="center" variant="body1" mt={2}>
          {submitMessage}
        </Typography>
      )}
    </Container>
  );
}

export default SignupPage;

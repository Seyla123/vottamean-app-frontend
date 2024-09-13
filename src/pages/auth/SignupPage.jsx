import { useDispatch, useSelector } from 'react-redux';
import { updateFormData } from '../../store/slices/formSlice';
import { useSignupMutation } from '../../services/authApi';
import { useState } from 'react';
import {
  Box,
  Container,
  Button,
  Step,
  Stepper,
  StepLabel,
} from '@mui/material';
import AuthContainerCard from '../../components/auth/AuthContainerCard';
import GetStartSignUpForm from '../../components/auth/GetStartSignUpForm';
import PersonalInformationForm from '../../components/auth/PersonalInformationForm';
import ContactInformationForm from '../../components/auth/ContactInformationForm';
import RegisterSchoolForm from '../../components/auth/RegisterSchoolForm';

const steps = [
  'Account details',
  'Personal information',
  'Contact information',
  'School information',
];

function SignupPage() {
  // Redux hooks
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form);

  // State to manage the active step in the signup process
  const [stepActive, setStepActive] = useState(0);

  // Signup mutation hook
  const [signup, { isLoading, isSuccess, isError, error }] =
    useSignupMutation();

  // Function to handle form data change
  const handleFormChange = (stepData) => {
    dispatch(updateFormData(stepData));
  };

  // Function to go back to the previous step
  const handleBack = () => setStepActive((prev) => prev - 1);

  // Function to proceed to the next step
  const handleNext = () => {
    // You can add validation here if necessary
    setStepActive((prev) => prev + 1);
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      await signup(formData);
      console.log('Signup successful');
    } catch (err) {
      console.error('Signup failed', err);
    }
  };

  // Render the button with conditional behavior
  const renderButton = (btnName) => (
    <Button
      onClick={btnName ? handleSubmit : handleNext}
      sx={{ padding: { xs: 1, md: 2 } }}
      variant="contained"
      disabled={isLoading}
    >
      {isLoading ? 'Submitting...' : btnName || 'CONTINUE'}
    </Button>
  );

  // Array of form components corresponding to each step
  const stepForms = [
    <GetStartSignUpForm
      onClickBack={handleBack}
      onFormChange={handleFormChange}
      nextStep={handleNext}
    />,
    <PersonalInformationForm
      onClickBack={handleBack}
      onFormChange={handleFormChange}
    />,
    <ContactInformationForm
      onClickBack={handleBack}
      onFormChange={handleFormChange}
    />,
    <RegisterSchoolForm
      onClickBack={handleBack}
      onFormChange={handleFormChange}
    >
      {renderButton('Start Now')}
    </RegisterSchoolForm>,
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
      {isError && (
        <p style={{ color: 'red' }}>
          Signup failed: {error?.data?.message || error?.error}
        </p>
      )}
    </Container>
  );
}

export default SignupPage;

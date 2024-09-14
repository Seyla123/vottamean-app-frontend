// Redux hooks
import { useDispatch, useSelector } from 'react-redux';

// React hooks
import { useState } from 'react';

// Redux slices
import { updateFormData } from '../../store/slices/formSlice';

// Mutation hook for signup API
import { useSignupMutation } from '../../services/authApi';

// Material UI components for layout and stepper
import { Box, Container, Step, Stepper, StepLabel } from '@mui/material';

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
  const [signup, { isError, error }] = useSignupMutation();

  // 5. Function to handle form data changes and update Redux store
  const handleFormChange = (stepData) => {
    dispatch(updateFormData(stepData)); // Update form data in the Redux store
  };

  // 6. Function to move to the previous step
  const handleBack = () => setStepActive((prev) => prev - 1);

  // 7. Function to move to the next step
  const handleNext = () => setStepActive((prev) => prev + 1);

  // 8. Function to submit form data to the API at the final step
  const handleSubmit = async () => {
    try {
      // 8.1 Format data for API submission
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

      // 8.2 Send the formatted data to the API
      const response = await signup(formattedData).unwrap();

      console.log('Signup successful:', response); // Log success
    } catch (err) {
      // 8.3 Log errors if the signup fails
      console.error('Signup failed:', err);
      if (err?.data) {
        console.error('Error details:', err.data);
      }
    }
  };

  // 9. Array of forms, each corresponding to a signup step
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
      {/* 10. Display Stepper at the top to show current step */}
      <Box sx={{ width: 1, paddingTop: { xs: 3, md: 4 } }}>
        <Stepper activeStep={stepActive} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {/* 11. Show the form for the current step */}
      <AuthContainerCard sideCard={stepActive === 3 ? 'right' : 'left'}>
        {stepForms[stepActive]}
      </AuthContainerCard>

      {/* 12. Show error message if signup fails */}
      {isError && (
        <p style={{ color: 'red' }}>
          Signup failed: {error?.data?.message || error?.error}
        </p>
      )}
    </Container>
  );
}

export default SignupPage;

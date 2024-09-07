import AuthContainerCard from "../../components/auth/AuthContainerCard";
import GetStartSignUpForm from "../../components/auth/GetStartSignUpForm";
import PersonalInformationForm from "../../components/auth/PersonalInformationForm";
import ContactInformationForm from "../../components/auth/ContactInformationForm";
import RegisterSchoolForm from "../../components/auth/RegisterSchoolForm";
import { Box, Container, Button, Step, Stepper, StepLabel } from "@mui/material";
import { useState } from "react";

// Array of step labels for the signup process
const steps = [
  "Account details",
  "Personal information",
  "Contact information",
  "School information",
];

function SignupPage() {
  // State to track the active step in the signup process
  const [stepActive, setStepActive] = useState(0);

  // Function to go back to the previous step
  const handleBack = () => setStepActive((prev) => prev - 1);

  // Function to proceed to the next step
  const handleNext = () => setStepActive((prev) => prev + 1);

  // Function to render the button with conditional behavior
  const renderButton = (btnName) => (
    <Button
      onClick={btnName ? () => console.log('submit') : handleNext}
      sx={{ padding: { xs: 1, md: 2 } }}
      variant="contained"
    >
      {btnName || 'CONTINUE'}
    </Button>
  );

  // Array of form components corresponding to each step
  const stepForms = [
    <GetStartSignUpForm onClickBack={handleBack}>{renderButton()}</GetStartSignUpForm>,
    <PersonalInformationForm onClickBack={handleBack}>{renderButton()}</PersonalInformationForm>,
    <ContactInformationForm onClickBack={handleBack}>{renderButton()}</ContactInformationForm>,
    <RegisterSchoolForm onClickBack={handleBack}>{renderButton('Start Now')}</RegisterSchoolForm>,
  ];

  return (
    <Container maxWidth="lg" sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Stepper to indicate the current step in the signup process */}
      <Box sx={{ width: 1, paddingTop: { xs: 3, md: 4 } }}>
        <Stepper activeStep={stepActive} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      {/* AuthContainerCard to display the current step's form */}
      <AuthContainerCard sideCard={stepActive === 3 ? 'right' : 'left'}>
        {stepForms[stepActive]}
      </AuthContainerCard>
    </Container>
  );
}

export default SignupPage;
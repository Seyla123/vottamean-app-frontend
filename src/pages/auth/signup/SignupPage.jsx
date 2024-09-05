import AuthContainerCard from "../../../components/auth/AuthContainerCard";
import {
  Box,
  Container,
  Button,
  Step,
  Stepper,
  StepLabel,
} from "@mui/material";
import GetStartSignUpForm from "../../../components/auth/GetStartSignUpForm";
import PersonalInformationForm from "../../../components/auth/PersonalInformationForm";
import { useState } from "react";
function SignupPage() {
const [stepActive ,setStepActive] = useState(0);
const handleBack = () => {
  setStepActive(stepActive - 1)
}
const handleNext = () => {
  setStepActive(stepActive + 1)
}
const stepFrom = {
  0: <GetStartSignUpForm/>,
  1: <PersonalInformationForm onClickBack={handleBack}/>
}
  return (
    <>
      <Container
        maxWidth="lg"
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
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
        <AuthContainerCard sideCard="left" >
            {/* <GetStartSignUpForm/> */}
            {stepFrom[stepActive]}
        </AuthContainerCard>
      </Container>
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button onClick={handleBack} color="inherit"  disabled={false} sx={{ mr: 1 }}>
          Back
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        <Button onClick={handleNext}>Next</Button>
      </Box>
    </>
  );
}

export default SignupPage;

const steps = [
  "Account details",
  "Personal information",
  "Contact information",
  "School information",
];

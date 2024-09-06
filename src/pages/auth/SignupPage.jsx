import AuthContainerCard from "../../components/auth/AuthContainerCard";
import GetStartSignUpForm from "../../components/auth/GetStartSignUpForm";
import PersonalInformationForm from "../../components/auth/PersonalInformationForm";
import ContactInformationForm from "../../components/auth/ContactInformationForm";
import {
  Box,
  Container,
  Button,
  Step,
  Stepper,
  StepLabel,
} from "@mui/material";
import { useState } from "react";
function SignupPage() {
const [stepActive ,setStepActive] = useState(0);
const handleBack = () => {
  setStepActive(stepActive - 1)
}
const handleNext = () => {
  setStepActive(stepActive + 1)
}
const btn = ()=>{
  return (
  <Button onClick={handleNext} sx={{ padding: { xs: 1.8, md: 2 } }} variant="contained">
  CONTINUE
</Button>
  )
}


const stepFrom = {
  0: <GetStartSignUpForm >
    {btn()}
  </GetStartSignUpForm>,
  1: <PersonalInformationForm > {btn()}</PersonalInformationForm>,
  2: <ContactInformationForm > {btn()}</ContactInformationForm>,
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

import AuthContainerCard from "../../components/auth/AuthContainerCard";
import GetStartSignUpForm from "../../components/auth/GetStartSignUpForm";
import PersonalInformationForm from "../../components/auth/PersonalInformationForm";
import ContactInformationForm from "../../components/auth/ContactInformationForm";
import RegisterSchoolForm from "../../components/auth/RegisterSchoolForm";
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
  const [stepActive, setStepActive] = useState(0);
  const handleBack = () => {
    setStepActive(stepActive - 1)
  }
  const handleNext = () => {
      setStepActive(stepActive + 1)
  }
  // button continue next step
  const btn = (btnName) => {
    const sumbit =()=>{
      console.log('submit');
      
    }
    return (
      <Button onClick={btnName ? sumbit : handleNext} sx={{ padding: { xs: 1, md: 2 } }} variant="contained">
        {btnName ? btnName : 'CONTINUE'} 
      </Button>
    )
  }

// form sign step list
  const stepFrom = {
    0: <GetStartSignUpForm onClickBack={handleBack} >  {btn()} </GetStartSignUpForm>,
    1: <PersonalInformationForm onClickBack={handleBack} > {btn()}</PersonalInformationForm>,
    2: <ContactInformationForm onClickBack={handleBack} > {btn()}</ContactInformationForm>,
    3: <RegisterSchoolForm onClickBack={handleBack} > {btn('Start Now')}</RegisterSchoolForm>
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

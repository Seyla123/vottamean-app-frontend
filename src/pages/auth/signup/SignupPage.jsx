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
function SignupPage() {

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      >
        <Box sx={{ width: 1, paddingTop: { xs: 3, md: 4 } }}>
          <Stepper activeStep={0} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <AuthContainerCard sideCard="left" >
            {/* <GetStartSignUpForm/> */}
            <PersonalInformationForm/>
        </AuthContainerCard>
      </Container>
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button color="inherit"  disabled={false} sx={{ mr: 1 }}>
          Back
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        <Button>Next</Button>
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

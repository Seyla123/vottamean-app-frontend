import AuthContainerCard from "../../../components/auth/AuthContainerCard";
import {
  Box,
  Typography,
  Paper,
  Container,
  Button,
  Step,
  Stepper,
  StepLabel,
  TextField,
  Checkbox
} from "@mui/material";
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
          <Box  sx={{gap: 3,justifyContent: "center", display: "flex", flexDirection: "column"}}>
            <Box >
              <Typography variant="h4" fontWeight={600} padding={0}>
                Get Started
              </Typography>
              <Typography variant="subtitle1">Create your account now</Typography>
            </Box>

            {/* form container */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 3, md: 4} }}>
              {/* email input container */}
              <Box display={'flex'} flexDirection={"column"} gap={0.5}>
                <Typography variant="body1">Email</Typography>
                <TextField
                  fullWidth={true}
                  placeholder="email"
                />
              </Box>
              {/* Password input container */}
              <Box display={'flex'} flexDirection={"column"} gap={0.5}>
                <Typography variant="body1">Password</Typography>
                <TextField
                  fullWidth={true}
                  placeholder="password"
                />
              </Box>
              {/* Confirm password input container */}
              <Box display={'flex'} flexDirection={"column"} gap={0.5}>
                <Typography variant="body1">Confirm Password </Typography>
                <TextField
                  fullWidth={true}
                  placeholder="confirm password"
                />
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Checkbox
                color="default"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
              <Typography variant="body1">
              By Signing Up I Agree with 
              <Typography variant="body1" component={"span"} color={'primary'}> Terms and Conditions</Typography>
              </Typography>
            </Box>
            <Button sx={{padding: {xs: 1, md: 2}}} variant="contained" color="primary">Continue</Button>
          </Box>
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

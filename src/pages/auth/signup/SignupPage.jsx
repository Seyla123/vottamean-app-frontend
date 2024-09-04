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
        <AuthContainerCard sideCard="left">
          <Container sx={{ display: "flex", minWidth: 1, bgcolor: "#90CAF9", flexDirection: "column", gap: 2 }}>
            <Box >
              <Typography variant="h4" fontWeight={500} padding={0}>
                Get Started
              </Typography>
              <Typography variant="body1">Create your account now</Typography>
            </Box>
            <Box display={'flex'} flexDirection={"column"} gap={3}>
              <Box>
                <Typography variant="body1">Email</Typography>
                <TextField 
                  fullWidth={true}
                  helperText="Please enter your name"
                  id="demo-helper-text-aligned"
                  placeholder="email"
                />
              </Box>
              <Box>
                <Typography variant="body1">Password</Typography>
                <TextField
                fullWidth={true}
                  placeholder="password"
                />
              </Box>
              <Box>
                <Typography variant="body1">Confirm Password </Typography>
                <TextField
                fullWidth={true}
                  placeholder="confirm password"
                />
              </Box>
            </Box>
          </Container>
        </AuthContainerCard>
      </Container>
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button color="inherit" disabled={false} sx={{ mr: 1 }}>
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

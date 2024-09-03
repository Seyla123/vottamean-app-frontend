import * as React from "react";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Container,Box,Grid} from "@mui/material";

const steps = ["Account details", "Personal information", "School information"];
function SignupPage() {
  return (
    <>
      <Container maxWidth="lg" sx={{ display: "flex", flexDirection: "column" ,gap: 3}}>
      <Box sx={{ width: 1,bgcolor: "green", paddingTop: { xs: 3, md: 4 } }}>
        <Stepper activeStep={0} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Grid component="form"
        sx={{
          width: '100%',
          padding: { xs: 3, md: 4 },
          display: "flex",
          justifyContent: "center",
          bgcolor: "#FFFFFF",
          height: "50vh",
          borderRadius: "24px",
          border: "0.3px solid #E0E0E0",
          boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.08)",
        }}
      >
        <Box></Box>
      </Grid>
      <Box sx={{ width: '100%' }}>
    </Box>
      </Container>
    </>
  );
}
export default SignupPage;

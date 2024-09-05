import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  useTheme,
} from "@mui/material";
import FormInfo from '../../../components/teacher/formInfo'
function TeacherCreatePage() {
  const theme = useTheme();

 
  const containerBox = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    bgcolor: "#F9FAFB",
    maxWidth: "lg",
    width: "100%",
    padding: "16px",
  };


  return (
    <Container sx={containerBox}>
      <Box sx={{ marginBottom: "24px", marginTop: "32px" }}>
        <Typography fontWeight="bold" variant="h4">
          TEACHER LIST
        </Typography>
        <Typography
          color="text.secondary"
          sx={{
            mt: "10px",
            [theme.breakpoints.down("sm")]: {
              fontSize: "14px",
            },
            [theme.breakpoints.up("sm")]: {
              fontSize: "16px",
            },
          }}
        >
          Please Fill Teacher Information
        </Typography>
      </Box>
      {/* Tabs */}
      <FormInfo />
    </Container>
  );
}

export default TeacherCreatePage;

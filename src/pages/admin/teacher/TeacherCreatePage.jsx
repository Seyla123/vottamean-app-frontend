import React, { useState } from "react";
import Box from "@mui/material/Box";
import FormInfo from '../../../components/teacher/FormInfo'
import Header from "../../../components/teacher/Header";

function TeacherCreatePage() {
  return (
    <Box sx={{ display: "flex", alignContent: "center", justifyContent: "center" }}>
      <Box sx={containerBox}>
        {/* Header */}
        <Header header="TEACHER LIST" subheader=" Please Fill Teacher Information" />
        {/* Tabs */}
        <FormInfo />
      </Box>
    </Box>
  );
}

export default TeacherCreatePage;

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

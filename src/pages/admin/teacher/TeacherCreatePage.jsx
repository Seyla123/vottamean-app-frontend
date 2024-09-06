import React, { useState } from "react";
import Box from "@mui/material/Box";
import FormInfo from '../../../components/teacher/FormInfo';
import Header from "../../../components/teacher/Header";

function TeacherCreatePage() {
  return (
      <Box>
        {/* Header */}
        <Header header="TEACHER LIST" subheader=" Please Fill Teacher Information" />
        {/* Tabs */}
        <FormInfo />
      </Box>
  );
}

export default TeacherCreatePage;


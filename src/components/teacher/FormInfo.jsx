import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import TeacherForm from './TeacherForm'
// import TeacherInfo from "./TeacherInfo";
// import AccountInfo from "./AccountInfo";

function FormInfo() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const handleNext = () => {
  //   if (value === "1") {
  //     setValue("2");
  //   }
  // };

  // const handleBack = () => {
  //   if (value === "2") {
  //     setValue("1");
  //   }
  // };

  return (
    <>
      <Box>
        <TeacherForm/>

      </Box>
    </>
  );
}

export default FormInfo;
const tabSize = {
  fontWeight: "medium",
  fontSize: {
    xs: "12px",
    sm: "14px",
  },
};
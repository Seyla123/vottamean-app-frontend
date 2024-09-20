import React, { useState } from "react";
import { Box, Tabs, Tab, Snackbar, Alert } from "@mui/material";
import TeacherInfo from "./TeacherInfo";
import AccountInfo from "./AccountInfo";
import { useSignUpTeacherMutation } from '../../services/teacherApi';
import dayjs from 'dayjs';

function FormInfo() {
  const [value, setValue] = useState("1");
  const [isTeacherInfoValid, setIsTeacherInfoValid] = useState(false);
  const [teacherData, setTeacherData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  const [signUpTeacher, { isLoading }] = useSignUpTeacherMutation();

  const handleNextClick = (isValid, data) => {
    if (isValid) {
      setTeacherData(data);
      setValue("2");
      setIsTeacherInfoValid(true);
    }
  };

  const handleBack = () => {
    setValue("1");
  };

  const handleAccountSubmit = async (data) => {
    const today = dayjs();
    const dob = dayjs(data.dob);
  
    if (!dob.isValid() || dob.isAfter(today)) {
      setErrorMessage("Date of birth cannot be in the future");
      return;
    }
  
    const payload = {
      email: data.email,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
      address: data.address || '',
      dob: dob.format('YYYY-MM-DD'),
      first_name: data.firstName || '',
      last_name: data.lastName || '',
      gender: data.gender || '',
      phone_number: data.phoneNumber || '',
    };
  
    console.log("Payload being sent:", payload);
  
    try {
      const response = await signUpTeacher(payload).unwrap();
      console.log("Signup successful:", response);
      setErrorMessage("");
      setSuccessMessage(response.message || "Signup successful. Please check your email for verification.");
    } catch (err) {
      console.error('Signup failed:', err);
      setErrorMessage(err.data?.message || "An error occurred during signup");
    }
  };
  return (
    <Box>
      <Tabs value={value} onChange={(event, newValue) => setValue(newValue)}>
        <Tab label="TEACHER INFORMATION" value="1" />
        <Tab label="ACCOUNT INFORMATION" value="2" disabled={!isTeacherInfoValid} />
      </Tabs>
      {value === "1" && (
        <TeacherInfo
          handleNextClick={handleNextClick}
          defaultValues={teacherData}
        />
      )}
      {value === "2" && (
        <AccountInfo
          handleBack={handleBack}
          handleAccountSubmit={handleAccountSubmit}
          teacherData={teacherData}
        />
      )}
      {isLoading && <p>Loading...</p>}
      <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={() => setErrorMessage("")}>
        <Alert onClose={() => setErrorMessage("")} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
      <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={() => setSuccessMessage("")}>
        <Alert onClose={() => setSuccessMessage("")} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default FormInfo;
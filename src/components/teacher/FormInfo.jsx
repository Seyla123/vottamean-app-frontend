import { useState } from "react";
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
  
  // add teacher api 
  const [signUpTeacher, { isLoading }] = useSignUpTeacherMutation();

  // handle next tab click to account information
  const handleNextClick = (isValid, data) => {
    if (isValid) {
      setTeacherData(data);
      setValue("2");
      setIsTeacherInfoValid(true);
    }
  };

  // navigate back to teacher information tab
  const handleBack = () => {
    setValue("1");
  };

  // Handle form check dob validation
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
  
    try {
      // Validate and process the teacher data
      const response = await signUpTeacher(payload).unwrap();
      console.log("Signup successful:", response);
      //  messages
      // setErrorMessage("");
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
        {/* disable account info when teacher info is not valid */}
      </Tabs>
      {value === "1" && (
        <TeacherInfo
          handleNextClick={handleNextClick}
          // save current form data 
          defaultValues={teacherData}
        />
      )}
      {value === "2" && (
        <AccountInfo
          handleBack={handleBack}
          // check dob info 
          handleAccountSubmit={handleAccountSubmit}
          // pass current teacher data
          teacherData={teacherData}
        />
      )}
    </Box>
  );
}

export default FormInfo;
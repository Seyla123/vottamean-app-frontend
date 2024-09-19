// import React, { useState } from "react";
// import { Box, Tabs, Tab } from "@mui/material";
// import TeacherInfo from "./TeacherInfo";
// import AccountInfo from "./AccountInfo";

// function FormInfo() {
//   const [value, setValue] = useState("1");
//   const [isTeacherInfoValid, setIsTeacherInfoValid] = useState(false);
//   const [teacherData, setTeacherData] = useState({}); // Store teacher info
//   const [accountData, setAccountData] = useState({}); // Store account info

//   const handleNextClick = (isValid, data) => {
//     if (isValid) {
//       setTeacherData(data); // Save TeacherInfo data
//       setValue("2");
//       setIsTeacherInfoValid(true);
//     }
//   };

//   const handleBack = () => {
//     setValue("1"); // Go back to TeacherInfo tab
//   };

//   const handleAccountSubmit = (accountData) => {
//     setAccountData(accountData); // Save AccountInfo data
//     // You can further handle submission of both teacherData and accountData here.
//   };

//   return (
//     <Box>
//       <Tabs value={value} onChange={(event, newValue) => setValue(newValue)}>
//         <Tab label="TEACHER INFORMATION" value="1" />
//         <Tab
//           label="ACCOUNT INFORMATION"
//           value="2"
//           disabled={!isTeacherInfoValid}
//         />
//       </Tabs>
//       {value === "1" && (
//         <TeacherInfo
//           handleNextClick={handleNextClick}
//           defaultValues={teacherData}
//         />
//       )}
//       {value === "2" && (
//         <AccountInfo
//           handleBack={handleBack}
//           handleAccountSubmit={handleAccountSubmit}
//           defaultValues={accountData}
//         />
//       )}
//     </Box>
//   );
// }

// export default FormInfo;
import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import TeacherInfo from "./TeacherInfo";
import AccountInfo from "./AccountInfo";

function FormInfo() {
  const [value, setValue] = useState("1");
  const [isTeacherInfoValid, setIsTeacherInfoValid] = useState(false);
  const [teacherData, setTeacherData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    gender: '',
    dob: null,
    address: '',
  }); // Initialize with default values
  const [accountData, setAccountData] = useState({}); // Store account info

  const handleNextClick = (isValid, data) => {
    if (isValid) {
      setTeacherData(data); // Save TeacherInfo data
      setValue("2");
      setIsTeacherInfoValid(true);
    }
  };

  const handleBack = () => {
    setValue("1"); // Go back to TeacherInfo tab
  };

  const handleAccountSubmit = (accountData) => {
    setAccountData(accountData); // Save AccountInfo data
    // You can further handle submission of both teacherData and accountData here.
  };

  return (
    <Box>
      <Tabs value={value} onChange={(event, newValue) => setValue(newValue)}>
        <Tab label="TEACHER INFORMATION" value="1" />
        <Tab
          label="ACCOUNT INFORMATION"
          value="2"
          disabled={!isTeacherInfoValid}
        />
      </Tabs>
      {value === "1" && (
        <TeacherInfo
          handleNextClick={handleNextClick}
          defaultValues={teacherData} // Pass teacherData here
        />
      )}
      {value === "2" && (
        <AccountInfo
          handleBack={handleBack}
          handleAccountSubmit={handleAccountSubmit}
          defaultValues={accountData}
        />
      )}
    </Box>
  );
}

export default FormInfo;

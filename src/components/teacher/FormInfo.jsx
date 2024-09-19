// import React, { useState } from "react";
// import { Box, Tabs, Tab } from "@mui/material";
// import TeacherInfo from "./TeacherInfo";
// import AccountInfo from "./AccountInfo";

// function FormInfo() {
//   const [value, setValue] = useState("1");
//   const [isTeacherInfoValid, setIsTeacherInfoValid] = useState(false);

//   const handleNext = (isValid) => {
//     if (isValid) {
//       setValue("2");
//       setIsTeacherInfoValid(true);
//     }
//   };

//   const handleBack = () => {
//     if (value === "2") {
//       setValue("1");
//       setIsTeacherInfoValid(false);
//     }
//   };

//   return (
//     <Box>
//       <Tabs value={value} onChange={(event, newValue) => setValue(newValue)}>
//         <Tab label="TEACHER INFORMATION" value="1" sx={tabSize} />
//         <Tab label="ACCOUNT INFORMATION" value="2" sx={tabSize} disabled={!isTeacherInfoValid} />
//       </Tabs>
//       {value === "1" && <TeacherInfo handleNext={handleNext} />}
//       {value === "2" && <AccountInfo handleBack={handleBack} />}
//     </Box>
//   );
// }
// export default FormInfo;

// const tabSize = {
//   fontWeight: "medium",
//   fontSize: {
//     xs: "12px",
//     sm: "14px",
//   },
// };


// import React, { useState } from "react";
// import { Box, Tabs, Tab } from "@mui/material";
// import TeacherInfo from "./TeacherInfo";
// import AccountInfo from "./AccountInfo";

// function FormInfo() {
//   const [value, setValue] = useState("1");
//   const [isTeacherInfoValid, setIsTeacherInfoValid] = useState(false);

//   const handleNext = (isValid) => {
//     if (isValid) {
//       setValue("2");
//       setIsTeacherInfoValid(true);
//     }
//   };

//   const handleBack = () => {
//     if (value === "2") {
//       setValue("1");
//       setIsTeacherInfoValid(false);
//     }
//   };

//   return (
//     <Box>
//       <Tabs value={value} onChange={(event, newValue) => setValue(newValue)}>
//         <Tab label="TEACHER INFORMATION" value="1" sx={tabSize} />
//         <Tab label="ACCOUNT INFORMATION" value="2" sx={tabSize} disabled={!isTeacherInfoValid} />
//       </Tabs>
//       {value === "1" && <TeacherInfo handleNext={handleNext} />}
//       {value === "2" && <AccountInfo handleBack={handleBack} />}
//     </Box>
//   );
// }

// export default FormInfo;

// const tabSize = {
//   fontWeight: "medium",
//   fontSize: {
//     xs: "12px",
//     sm: "14px",
//   },
// };



// import React, { useState } from "react";
// import { Box, Tabs, Tab } from "@mui/material";
// import TeacherInfo from "./TeacherInfo";
// import AccountInfo from "./AccountInfo";

// function FormInfo() {
//   const [value, setValue] = useState("1");
//   const [isTeacherInfoValid, setIsTeacherInfoValid] = useState(false);

//   const handleNext = (isValid) => {
//     if (isValid) {
//       setValue("2");
//       setIsTeacherInfoValid(true);
//     }
//   };

//   const handleBack = () => {
//     if (value === "2") {
//       setValue("1");
//       setIsTeacherInfoValid(false);
//     }
//   };

//   return (
//     <Box>
//       <Tabs value={value} onChange={(event, newValue) => setValue(newValue)}>
//         <Tab label="TEACHER INFORMATION" value="1" sx={tabSize} />
//         <Tab label="ACCOUNT INFORMATION" value="2" sx={tabSize} disabled={!isTeacherInfoValid} />
//       </Tabs>
//       {value === "1" && <TeacherInfo handleNext={handleNext} />}
//       {value === "2" && <AccountInfo handleBack={handleBack} />}
//     </Box>
//   );
// }

// export default FormInfo;

// const tabSize = {
//   fontWeight: "medium",
//   fontSize: {
//     xs: "12px",
//     sm: "14px",
//   },
// };


import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import TeacherInfo from "./TeacherInfo";
import AccountInfo from "./AccountInfo";

function FormInfo() {
  const [value, setValue] = useState("1");
  const [isTeacherInfoValid, setIsTeacherInfoValid] = useState(false);

  const handleNextClick = (isValid) => {
    if (isValid) {
      setValue("2");
      setIsTeacherInfoValid(true);
    }
  };

  const handleBack = () => {
    if (value === "2") {
      setValue("1");
      setIsTeacherInfoValid(false);
    }
  };

  return (
    <Box>
      <Tabs value={value} onChange={(event, newValue) => setValue(newValue)}>
        <Tab label="TEACHER INFORMATION" value="1" sx={tabSize} />
        <Tab label="ACCOUNT INFORMATION" value="2" sx={tabSize} disabled={!isTeacherInfoValid} />
      </Tabs>
      {value === "1" && <TeacherInfo handleNextClick={handleNextClick} />}
      {value === "2" && <AccountInfo handleBack={handleBack} />}
    </Box>
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

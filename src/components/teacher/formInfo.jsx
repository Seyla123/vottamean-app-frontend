import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import SubHeader from "./SubHeader";
import TextFieldBox from './TextFieldBox';

const profileBox = {
  border: "1px solid",
  borderColor: "#E0E0E0",
  borderRadius: "8px",
  bgcolor: "#ffffff",
  marginTop: "32px",
  padding: {
    xs: 2,
    sm: 3,
  },
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  position: "relative",
};

const valueBoxOne = {
  width: 100,
  height: 100,
  borderRadius: "50%",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  mb: 2,
  position: "relative",
};

const tabSize = {
  fontWeight: "medium",
  fontSize: {
    xs: "12px",
    sm: "14px",
  },
};

const textFieldGap = {
  display: "flex",
  gap: 0.5,
  flexDirection: "column",
};

const gender = [
  {
    value: "Male",
  },
  {
    value: "Female",
  },
];
function TeacherCreatePage() {
  const [gender, setGender] = useState('');

  const handleChangeGender = (e) => {
      setGender(e.target.value);
  };

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleNext = () => {
    if (value === "1") {
      setValue("2");
    }
  };
  const handleBack = () => {
    if (value === "2") {
      setValue("1");
    }
  };

  return (
    <Box>
      <Box>
        <Tabs value={value} onChange={handleChange} aria-label="tabs information">
          <Tab label="TEACHER INFORMATION" value="1" sx={tabSize} />
          <Tab label="ACCOUNT INFORMATION" value="2" sx={tabSize} />
        </Tabs>
      </Box>

      {/* Teacher Information */}
      {value === "1" && (
        <Box sx={profileBox}>
          {/* Profile image with edit icon */}
          <Box sx={valueBoxOne}>
            <img
              src="https://via.placeholder.com/100"
              alt="Profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            {/* Edit icon */}
            <Button
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                bgcolor: "#ffffff",
                borderRadius: "50%",
                p: 1,
                "&:hover": {
                  bgcolor: "#f0f0f0",
                },
              }}
            >
              {/* <EditIcon /> */}
            </Button>
          </Box>
          {/* Subheader */}
          <SubHeader title={"Teacher Information"} />
          {/* Text fields */}
          <Box component="form" width={"100%"} mt={2} display={"flex"} flexDirection={"column"} sx={{
            gap: {
              xs: '12px',
              sm: 3
            }
          }}>
            {/* Name */}
            <Box display={"flex"} flexDirection={ "row"} sx={{
              gap: {
                xs: '12px',
                sm: 3
              },
              width: "100%"
            }}>
              <Box sx={{ flex: 1 }}>
                <TextFieldBox text={"First Name"} id="first-name" placeholder="first name" />
              </Box>
              <Box sx={{ flex: 1 }}>
                <TextFieldBox text={"Last Name"} id="last-name" placeholder="last name" />
              </Box>
            </Box>

            {/* Gender */}
            <Box sx={textFieldGap}>
              <Typography>Gender</Typography>
              <Select fullWidth
                        value={gender}
                        onChange={handleChangeGender}
                        displayEmpty
                        renderValue={(selected) => {
                            if (!selected) {
                                return <Box component="p" variant="body2" sx={{ color: '#B5B5B5' }}>gender</Box>;
                            }
                            return selected;
                        }}
                    >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                    </Select>

            </Box>
            
            {/* Phone Number */}
            <TextFieldBox text={"Phone Number"} id="phone-number" placeholder={"phone number"} />

            {/* Address */}
            <TextFieldBox text={"Address"} id="address" placeholder={"address"} />

            {/* Button */}
            <Box display={"flex"} justifyContent={"flex-end"}>
              <Button
                variant="contained"
                sx={{ width: {
                  xs: '100%',
                  sm:"170px"
                }}}
                gap={1}
                onClick={handleNext}
              >
                Next
              </Button>
            </Box>
          </Box>
        </Box>
      )}

      {/* Account Information */}
      {value === "2" && (
        <Box sx={profileBox}>
          <Box component="form" width={"100%"} display={"flex"} flexDirection={"column"} sx={{
            gap: {
              xs: '12px',
              sm: 3
            }
          }}>
            {/* Subheader */}
            <SubHeader title={"Account Information"} />

            {/* Email */}
            <TextFieldBox text={"Email"} id="email" placeholder={"email"} />

            {/* Password */}
            <TextFieldBox text={"Password"} id="password" placeholder={"password"} />

            {/* Confirm Password */}
            <TextFieldBox text={"Confirm Password"} id="confirm-password" placeholder={"confirm password"} />

            {/* Buttons */}
            <Box display={"flex"} alignSelf={"flex-end"} width={"100%"} sx={{maxWidth: {xs: "100%", sm: '340px'}}}  justifyContent={"flex-end"} gap={2}>
              <Button
                variant="outlined"
                sx={{borderColor: "inherit", color: "inherit" }}
                onClick={handleBack}
                fullWidth
              >
                Back
              </Button>
              <Button
              fullWidth
                variant="contained"
              >
                Add Teacher
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default TeacherCreatePage;

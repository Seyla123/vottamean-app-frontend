import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  Divider,
  TextField,
  MenuItem,
  Container,
} from "@mui/material";

function TeacherCreatePage() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

  const profileBox = {
    border: "1px solid",
    borderColor: "#E0E0E0",
    borderRadius: "8px",
    bgcolor: "#ffffff",
    marginTop: "32px",
    padding: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
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

  const gender = [
    {
      value: "Male",
      label: "Male",
    },
    {
      value: "Female",
      label: "Female",
    },
  ];

  return (
    <Container sx={containerBox}>
      <Box sx={{ marginBottom: "24px", marginTop: "32px" }}>
        <Typography
          fontWeight="bold"
          sx={{
            fontSize: {
              xs: "20px",
              sm: "32px",
            },
          }}
        >
          TEACHER LIST
        </Typography>
        <Typography
          color="text.secondary"
          sx={{
            mt: "10px",
            fontSize: {
              xs: "12px",
              sm: "16px",
            },
          }}
        >
          Please Fill Student Information
        </Typography>
      </Box>

      {/* Tabs */}
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="tabs information"
        >
          <Tab
            label="TEACHER INFORMATION"
            value="1"
            sx={{
              fontWeight: "medium",
              fontSize: {
                xs: "12px",
                sm: "14px",
              },
            }}
          />
          <Tab
            label="ACCOUNT INFORMATION"
            value="2"
            sx={{
              fontWeight: "medium",
              fontSize: {
                xs: "12px",
                sm: "14px",
              },
            }}
          />
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
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignContent={"start"}
            width={"100%"}
          >
            <Typography fontSize={
              {
                sm: "16px",
                xs: "14px"
              }
            } fontWeight={"bold"} marginBottom={2}>
              Teacher Information
            </Typography>
            <Divider sx={{ width: "100%", mb: 2 }} />
          </Box>
          {/* Text fields */}
          <Box
            component="form"
            noValidate
            autoComplete="off"
            width={"100%"}
            display={"flex"}
            flexDirection={"column"}
            gap={3}
          >
            <Box display={"flex"} gap={3} flexWrap="wrap">
              <Box flexGrow={1}>
                <Typography>First Name</Typography>
                <TextField
                  id="first-name"
                  placeholder="First Name"
                  variant="outlined"
                  fullWidth
                />
              </Box>
              <Box flexGrow={1}>
                <Typography>Last Name</Typography>
                <TextField
                  id="last-name"
                  placeholder="Last Name"
                  variant="outlined"
                  fullWidth
                />
              </Box>
            </Box>

            {/* Gender */}
            <Box>
              <Typography>Gender</Typography>
              <TextField
                id="gender"
                select
                defaultValue={gender[0].value}
                fullWidth
              >
                {gender.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            {/* Phone Number */}
            <Box>
              <Typography>Phone Number</Typography>
              <TextField
                id="phone-number"
                placeholder="Phone Number"
                variant="outlined"
                fullWidth
              />
            </Box>

            {/* Address */}
            <Box>
              <Typography>Address</Typography>
              <TextField
                id="address"
                placeholder="Address"
                variant="outlined"
                fullWidth
              />
            </Box>
            <Box display={"flex"} justifyContent={"flex-end"}>
              <Button variant="contained" sx={{
                width: {
                  xs: "350px", sm: "180px"
                }
              }} gap={1}>
                Next
              </Button>
            </Box>
          </Box>
        </Box>
      )}

      {/* Account Information */}
      {value === "2" && (
        <Box sx={profileBox}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            width={"100%"}
            display={"flex"}
            flexDirection={"column"}
            gap={3}
          >
            <Box>
              <Typography ffontSize={
                {
                  sm: "16px",
                  xs: "14px"
                }
              } fontWeight={"bold"} marginBottom={2}>
                Account Information
              </Typography>
              <Divider sx={{ width: "100%" }} />
            </Box>
            {/* Email */}
            <Box width={"100%"}>
              <Typography>Email</Typography>
              <TextField
                id="email"
                placeholder="Email"
                variant="outlined"
                fullWidth
              />
            </Box>
            {/* Password */}
            <Box width={"100%"}>
              <Typography>Password</Typography>
              <TextField
                id="password"
                placeholder="Password"
                variant="outlined"
                fullWidth
              />
            </Box>
            {/* Confirm Password */}
            <Box width={"100%"}>
              <Typography>Confirm Password</Typography>
              <TextField
                id="confirm-password"
                placeholder="Confirm Password"
                variant="outlined"
                fullWidth
              />
            </Box>
            <Box display={"flex"} justifyContent={"flex-end"} gap={2}>
              <Button variant="outlined" gap={1} sx={{
                width: {
                  xs: "160px", sm: "180px"
                }, borderColor: "black", color: "black"
              }} >
                Back
              </Button>
              <Button variant="contained" gap={1} sx={{
                width: {
                  xs: "160px", sm: "180px"
                }
              }}>
                Add Teacher
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Container>
  );
}

export default TeacherCreatePage;

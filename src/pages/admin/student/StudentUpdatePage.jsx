import React, { useState } from "react";
import {OutlinedInput,Button,Box,Typography,Divider,useMediaQuery,Card,Select,MenuItem, Tab,Tabs} from "@mui/material";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const StudentUpdatePage = () => {
  const navigate = useNavigate();
  const [newStudent, setNewStudent] = useState({firstName: "",lastName: "",className: "",gender: "",dob: dayjs(),phoneNumber: "",email: "",address: "",});
  const [newGuardian, setNewGuardian] = useState({firstName: "",lastName: "",relationship: "",email: "",phoneNumber: "",});
  const [activeTab, setActiveTab] = useState(0);

  const isMobile = useMediaQuery("(max-width:600px)");

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];
  const selectType = [
    { value: "Class A", label: "Class A" },
    { value: "Class B", label: "Class B" },
  ];

  const handleCancel = () => {
    if (activeTab === 0) {
      navigate("/student");
    } else if (activeTab === 1) {
      setActiveTab(0);
    }
  };

  const handleNext = () => {
    if (activeTab === 0) {
      setActiveTab(1);
    } else {
      navigate("/student"); 
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (activeTab === 0) {
      setNewStudent((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewGuardian((prev) => ({ ...prev, [name]: value }));
    }
  };

  const profile = {
    width: 100,
    height: 100,
    borderRadius: "50%",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  };

  return (
    <Box sx={{ width: "100%", margin: "0 auto", flexWrap: "wrap" }}>
      <Box>
        <Typography
          sx={{
            fontFamily: "Roboto",
            fontWeight: 600,
            fontSize: { xs: "20px", sm: "32px" },
          }}
        >
          UPDATE STUDENT
        </Typography>
        <Typography
          sx={{
            fontFamily: "Roboto",
            fontSize: isMobile ? "14px" : "16px",
            paddingBottom: "24px",
          }}
        >
          Please fill student Information
        </Typography>
      </Box >
      <Box>
        <Tabs
          value={activeTab}
          onChange={(event, newValue) => setActiveTab(newValue)}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="STUDENT INFORMATION" />
          <Tab label="GUARDIAN INFORMATION" />
        </Tabs>
      </Box>
        

 
      {activeTab === 0  && (
        <Card
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleNext();
          }}
          sx={{
            backgroundColor: "#FFFFFF",
            padding: { xs: 3, sm: 4 },
            borderRadius: "4px",
          }}
        >
          <Box sx={{display:'flex', justifyContent:'center'}}>
            <Box sx={profile}>
              <img
                src="https://via.placeholder.com/100"
                alt="Profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
          </Box>
          <Typography sx={{ fontWeight: 600, fontSize: "18px" }}>
            Student Information
          </Typography>
          <Divider
            sx={{ my: { xs: "12px", sm: "16px" }, borderBottomWidth: 3 }}
          />
          <Box
            sx={{display: "flex",flexDirection: "row",justifyContent: "space-between", gap: "12px", }}>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontSize: "16px" }}>First Name</Typography>
              <OutlinedInput
                name="firstName"
                placeholder="First name"
                value={newStudent.firstName}
                onChange={handleInputChange}
                fullWidth
              
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontSize: "16px" }}>Last Name</Typography>
              <OutlinedInput
                name="lastName"
                placeholder="Last name"
                value={newStudent.lastName}
                onChange={handleInputChange}
                fullWidth
              
              />
            </Box>
          </Box>
          <Box sx={{ width: "100%" ,py: { xs: "8px", sm: "12px" } }}>
            <Typography sx={{ fontSize: "16px" }}>Class</Typography>
            <Select
              name="gender"
              value={newStudent.gender}
              onChange={handleInputChange}
              fullWidth
              displayEmpty
            
              renderValue={(selected) => {
                if (!selected) {
                    return <Box component="p" variant="body2" sx={{ color: '#B5B5B5' }}>class</Box>;
                }
                return selected;
            }}
            >
              {selectType.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "12px",
              alignItems: "center",
            }}
          >
            <Box sx={{ width: "100%", flex: 1 }}>
              <Typography sx={{ fontSize: "16px" }}>Gender</Typography>
              <Select
                name="gender"
                value={newStudent.gender}
                onChange={handleInputChange}
                fullWidth
                displayEmpty
                renderValue={(selected) => {
                  if (!selected) {
                      return <Box component="p" variant="body2" sx={{ color: '#B5B5B5' }}>gender</Box>;
                  }
                  return selected;
              }}
              >
                {genderOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            {/* Form Date of birth*/}
            <Box sx={{ width: "100%", flex: 1 }}>
              <Typography>Date of Birth</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box sx={{ width: "100%" }}>
                  <DesktopDatePicker
                    defaultValue={dayjs("2022-04-17T15:30")}
                    sx={{
                      width: "100%",
                      "@media (max-width:600px)": { width: "100%" },
                    }}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                </Box>
              </LocalizationProvider>
            </Box>
          </Box>
          <Box sx={{ width: "100%",py: { xs: "8px", sm: "12px" }  }}>
            <Typography sx={{ fontSize: "16px" }}>Phone Number</Typography>
            <OutlinedInput
              name="phoneNumber"
              placeholder="Phone number"
              value={newStudent.phoneNumber}
              onChange={handleInputChange}
              fullWidth

            />
          </Box>
          <Box sx={{ width: "100%", py: { xs: "8px", sm: "12px" } }}>
            <Typography sx={{ fontSize: "16px" }}>Email</Typography>
            <OutlinedInput
              name="email"
              placeholder="Email"
              value={newStudent.email}
              onChange={handleInputChange}
              fullWidth
            
            />
          </Box>
          <Box sx={{ width: "100%", py: { xs: "8px", sm: "12px" } }}>
            <Typography sx={{ fontSize: "16px" }}>Address</Typography>
            <OutlinedInput
              name="address"
              placeholder="Address"
              value={newStudent.address}
              onChange={handleInputChange}
              fullWidth
            
              multiline
              rows={5}
            />
          </Box>
          {/* Button cancel and Add*/}
          <Box
            sx={{width: "100%", alignItems: "flex-end", pt: { xs: 2, sm: 3 },backgroundColor: "white",}}
          >
            <Box
              sx={{
                maxwidth: "340px",
                display: "flex",
                justifyContent: "right",
                gap: isMobile ? "16px" : "24px",
              }}
            >
              <Button onClick={handleCancel} variant="outlined"color="black"
                sx={{
                  backgroundColor: "#ffffff",
                  color: "black",
                  width: { xs: 1, sm: "170px" },
                  height: "42px",
                }}
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary"
                sx={{ width: { xs: 1, sm: "170px" }, height: "42px" }}
              >
                Add Student
              </Button>
            </Box>
          </Box>
        </Card>
      )}

      {/* Gurdian INformation */}
      {activeTab === 1 && (
        <Card
          component="form"
          onSubmit={handleNext}
          sx={{
            backgroundColor: "#FFFFFF",
            padding: { xs: 3, sm: 4 },
            borderRadius: "4px",
          }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: "18px" }}>
            Guardian Information
          </Typography>
          <Divider
            sx={{ my: { xs: "12px", sm: "16px" }, borderBottomWidth: 3 }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: "12px",
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontSize: "16px" }}>First Name</Typography>
              <OutlinedInput
                name="firstName"
                placeholder="First name"
                value={newGuardian.firstName}
                onChange={handleInputChange}
                fullWidth
              
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontSize: "16px" }}>Last Name</Typography>
              <OutlinedInput
                name="lastName"
                placeholder="Last name"
                value={newGuardian.lastName}
                onChange={handleInputChange}
                fullWidth
              
              />
            </Box>
          </Box>
          <Box sx={{ width: "100%", py: { xs: "8px", sm: "12px" } }}>
            <Typography sx={{ fontSize: "16px" }}>
              Guardian's Relationship
            </Typography>
            <OutlinedInput
              name="relationship"
              placeholder="Relationship"
              value={newGuardian.relationship}
              onChange={handleInputChange}
              fullWidth
            
            />
          </Box>
          <Box sx={{ width: "100%", py: { xs: "8px", sm: "12px" } }}>
            <Typography sx={{ fontSize: "16px" }}>Email</Typography>
            <OutlinedInput
              name="email"
              placeholder="Email"
              value={newGuardian.email}
              onChange={handleInputChange}
              fullWidth
            
            />
          </Box>
          <Box sx={{ width: "100%", py: { xs: "8px", sm: "12px" } }}>
            <Typography sx={{ fontSize: "16px" }}>Phone Number</Typography>
            <OutlinedInput
              name="phoneNumber"
              placeholder="Phone number"
              value={newGuardian.phoneNumber}
              onChange={handleInputChange}
              fullWidth
            
            />
          </Box>
          {/* Button cancel and Add*/}
          <Box
            sx={{
              width: "100%",
              alignItems: "flex-end",
              pt: { xs: 2, sm: 3 },
              backgroundColor: "white",
            }}
          >
            <Box
              sx={{
                maxwidth: "340px",
                display: "flex",
                justifyContent: "right",
                gap: isMobile ? "16px" : "24px",
              }}
            >
              <Button
                onClick={handleCancel}
                variant="outlined"
                color="black"
                sx={{
                  backgroundColor: "#ffffff",
                  color: "black",
                  width: { xs: 1, sm: "140px" },
                  height: "42px",
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ width: { xs: 1, sm: "140px" }, height: "42px" }}
              >
                Add Guardian
              </Button>
            </Box>
          </Box>
        </Card>
      )}
    </Box>
  );
};

export default StudentUpdatePage;

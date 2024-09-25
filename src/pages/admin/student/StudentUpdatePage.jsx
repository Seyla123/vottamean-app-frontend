import React, { useState } from "react";
import {OutlinedInput,Button,Box,Typography,Divider,useMediaQuery,Card,Select,MenuItem, Tab,Tabs} from "@mui/material";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import FormComponent from "../../../components/common/FormComponent";
import CardComponent from "../../../components/common/CardComponent";
import ButtonContainer from "../../../components/common/ButtonContainer";

const StudentCreatePage = () => {
  const navigate = useNavigate();
  const [newStudent, setNewStudent] = useState({firstName: "",lastName: "",className: "",gender: "",dob: dayjs(),phoneNumber: "",email: "",address: "",});
  const [newGuardian, setNewGuardian] = useState({firstName: "",lastName: "",relationship: "",email: "",phoneNumber: "",});
  const [activeTab, setActiveTab] = useState(0);

  const handleCancel = () => {
    if (activeTab === 0) {
      navigate("/admin/students");
    } else if (activeTab === 1) {
      setActiveTab(0);
    }
  };

  const handleNext = () => {
    if (activeTab === 0) {
      setActiveTab(1);
    } else {
      navigate("/admin/students"); 
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


  return (
    <>

      <FormComponent
        title={"Add Student"}
        subTitle={"Please fill Students Indformation"}
      >
         <Tabs
          value={activeTab}
          onChange={(event, newValue) => setActiveTab(newValue)}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="STUDENT INFORMATION" />
          <Tab label="GUARDIAN INFORMATION" />
        </Tabs>
        
        {activeTab === 0  && (
      //  <Card>
         
        <CardComponent title={"Student Information"}>        
        <Box sx={{display:'flex', justifyContent:'center'}}>
            <Box sx={profile}>
              <img
                src="https://via.placeholder.com/100"
                alt="Profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
          </Box> 
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
          <ButtonContainer
            leftBtn={handleCancel}
            rightBtn={handleNext}
            leftBtnTitle={"Cancel"}
            rightBtnTitle={"Update Student"}
          />

        </CardComponent>
        //  </Card>
      )}

      {/* Gurdian INformation */}
      {activeTab === 1 && (
        <CardComponent title={"Guardian Information"}>
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
          <ButtonContainer
            leftBtn={handleCancel}
            rightBtn={handleNext}
            leftBtnTitle={"Cancel"}
            rightBtnTitle={"Update Guardian"}
          />
        </CardComponent>
      )}
      </FormComponent>
       </>
  );
};

export default StudentCreatePage;

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];
const selectType = [
  { value: "Class A", label: "Class A" },
  { value: "Class B", label: "Class B" },
];

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
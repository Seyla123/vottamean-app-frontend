import {Box,Typography,useTheme,useMediaQuery,Divider,Card, Tabs,Tab,} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const StudentDetailPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const mobile = theme.breakpoints;

  const handleUpdateStudent = (selectedPostId) => {
    navigate(`/student/update/${selectedPostId}`);
  };
    // State to track the active tab
    const [activeTab, setActiveTab] = useState(0);

  const textStyles = {
    fontWeight: "bold",
    display: "flex",
    gap: 0.5,
    overflowWrap: "break-word",
    textOverflow: "ellipsis",
    [mobile.down("sm")]: {
      fontSize: "14px",
    },
    [mobile.up("sm")]: {
      fontSize: "16px",
    },
  };

  const textInput = {
    [mobile.down("sm")]: {
      fontSize: "14px",
    },
    [mobile.up("sm")]: {
      fontSize: "16px",
    },
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

  const containerStyles = {
    width: "100%",
    margin: "0 auto",
    flexWrap: "wrap",
  };

  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box sx={containerStyles}>
      <Box>
        <Typography
          sx={{
            fontFamily: "Roboto",
            fontWeight: 600,
            fontSize: { xs: "20px", sm: "32px" },
          }}
        >
          STUDENT DETAIL
        </Typography>
        <Typography
          sx={{
            fontFamily: "Roboto",
            fontSize: isMobile ? "14px" : "16px",
            marginBottom: "24px",
          }}
        >
          There are student's information
        </Typography>
      </Box>

      <Tabs
        value={activeTab}
        onChange={(event, newValue) => setActiveTab(newValue)}
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="STUDENT INFORMATION" />
        <Tab label="GUARDIAN CONTACT" />
      </Tabs>

      {/* Conditionally render Student or Guardian information */}
      {activeTab === 0 && (
        <Card sx={{ width: "100%", px: "16px",py:"32px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: 600, fontSize: "18px" }}>
              Student Information
            </Typography>
            <Box>
              <EditIcon
                sx={{ mr: 1, color: "blue" }}
                onClick={() => handleUpdateStudent("ANB1000")}
              />
              <DeleteIcon sx={{ color: "red" }} />
            </Box>
          </Box>
          <Divider
            sx={{ my: { xs: "12px", sm: "16px" }, borderBottomWidth: 3 }}
          />
          {/* Student details go here */}
          <Box
            sx={{display: "flex",flexDirection: {xs: "column",sm: "row",},width: "100%",alignItems: "center",gap: {s: 3,sm: 5,},mt: 2,}}>
            <Box sx={profile}>
              <img
                src="https://via.placeholder.com/100"
                alt="Profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
            <Box             sx={{
              display: "flex",
              flexDirection: "column",
              gap: {
                xs: "8px",
                sm: "16px",
              },
              width: "100%",
            }}>
              {/* Example Student Information */}
              <Typography sx={textStyles}>
                Student ID: <Typography sx={textInput}>ANB1000</Typography>
              </Typography>
              <Typography sx={textStyles}>
                Full Name: <Typography sx={textInput}>Potato Fried</Typography>
              </Typography>
              <Typography sx={textStyles}>
                Class: <Typography sx={textInput}>Classs 5</Typography>
              </Typography>
              <Typography sx={textStyles}>
                Age: <Typography sx={textInput}>18</Typography>
              </Typography>
              <Typography sx={textStyles}>
                Gender: <Typography sx={textInput}>Female</Typography>
              </Typography>
              <Typography sx={textStyles}>
                Date of Birth:{" "}
                <Typography sx={textInput}>01/01/2000</Typography>
              </Typography>
              <Typography sx={textStyles}>
                Phone Number: <Typography sx={textInput}>01234567</Typography>
              </Typography>
              <Typography sx={textStyles}>
                Email:{" "}
                <Typography sx={textInput}>mrpotato@123gmail.com</Typography>
              </Typography>
              <Typography sx={textStyles}>
                Address:
                <Typography sx={textInput}>
                  Potatoes village, french fried city
                </Typography>
              </Typography>
            </Box>
          </Box>
        </Card>
      )}

      {activeTab === 1 && (
        <Card sx={{ width: "100%", py: "32px", px:'16px' }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: 600, fontSize: "18px" }}>
              Guardian Information
            </Typography>
            <Box>
              <EditIcon
                sx={{ mr: 1, color: "blue" }}
                onClick={() => handleUpdateStudent("ANB1000")}
              />
            </Box>
          </Box>
          <Divider
            sx={{ my: { xs: "12px", sm: "16px" }, borderBottomWidth: 3 }}
          />
          {/* Guardian details go here */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: {
                xs: "10px",
                sm: "12px",
              },
              width: "100%",
            }}
          >
            {/* Example Guardian Information */}
            <Typography sx={textStyles}>
              Guardian Name:{" "}
              <Typography sx={textInput}>Potato Fried</Typography>
            </Typography>
            <Typography sx={textStyles}>
              Relationship: <Typography sx={textInput}>Father</Typography>
            </Typography>
            <Typography sx={textStyles}>
              Email:{" "}
              <Typography sx={textInput}>exampleusergmail.com</Typography>
            </Typography>
            <Typography sx={textStyles}>
              Phone Number: <Typography sx={textInput}>01234567</Typography>
            </Typography>
          </Box>
        </Card>
      )}
    </Box>
  );
};

export default StudentDetailPage;

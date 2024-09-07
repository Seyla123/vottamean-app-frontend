import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  Hidden,
  Divider,
  Card,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentDetailPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const mobile = theme.breakpoints;
  const [selectedPostId, setSelectedPostId] = useState(null);

  const handleUpdateStudent = () => {
    navigate(`/student/update/${selectedPostId}`);
  };

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
    alignItems: {
      xs: "center",
      sm: "flex-start",
    },
  };

  // State to track the active tab
  const [activeTab, setActiveTab] = useState("student");

  const containerStyles = {
    width: "100%",
    margin: "0 auto",
    flexWrap: "wrap",
  };

  const isMobile = useMediaQuery("(max-width:600px)");

  const selectType = [
    { value: "Class A", label: "Class A" },
    { value: "Class B", label: "Class B" },
  ];

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
      <Box sx={{ display: "flex", alignItems: "center", py: "24px" }}>
        <Box
          onClick={() => setActiveTab("student")}
          sx={{
            cursor: "pointer",
            width: "206px",
            borderBottom:
              activeTab === "student" ? "2px solid #1976d2" : "none",
          }}
        >
          <Button
            sx={{
              color: activeTab === "student" ? "#2196F3" : "rgba(0, 0, 0, 0.6)",
              fontFamily: "Roboto",
              fontSize: "14px",
              fontWeight: "medium",
            }}
          >
            STUDENT INFORMATION
          </Button>
        </Box>
        <Box
          onClick={() => setActiveTab("guardian")}
          sx={{
            cursor: "pointer",
            width: "206px",
            borderBottom:
              activeTab === "guardian" ? "2px solid #1976d2" : "none",
          }}
        >
          <Button
            sx={{
              color:
                activeTab === "guardian" ? "#2196F3" : "rgba(0, 0, 0, 0.6)",
              fontFamily: "Roboto",
              fontSize: "14px",
              fontWeight: "medium",
            }}
          >
            GUARDIAN CONTACT
          </Button>
        </Box>
      </Box>
      {/* Conditionally render Student or Guardian information */}
      {activeTab === "student" && (
        <Card
          sx={{
            width: "100%",
            py: "32px",
          }}
        >
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
                onClick={handleUpdateStudent}
              />
              <DeleteIcon sx={{ color: "red" }} />
            </Box>
          </Box>
          <Divider
            sx={{ my: { xs: "12px", sm: "16px" }, borderBottomWidth: 3 }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              width: "100%",
              alignItems: "center",
              gap: {
                xs: 3,
                sm: 5,
              },
              mt: 2,
            }}
          >
            <Box sx={profile}>
              <img
                src="https://via.placeholder.com/100"
                alt="Profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
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

      {activeTab === "guardian" && (
        <Card
          sx={{
            width: "100%",
            py: "32px",
          }}
        >
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
                onClick={handleUpdateStudent}
              />
            </Box>
          </Box>
          <Divider
            sx={{ my: { xs: "12px", sm: "16px" }, borderBottomWidth: 3 }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              width: "100%",
              alignItems: "center",
              gap: {
                xs: 3,
                sm: 5,
              },
              mt: 2,
            }}
          >
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
              <Typography sx={textStyles}>
                Guardain Name:{" "}
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
          </Box>
        </Card>
      )}
    </Box>
  );
};

export default StudentDetailPage;

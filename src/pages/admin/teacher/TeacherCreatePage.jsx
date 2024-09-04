import React, { useState } from "react";
import { Box, Typography, Button, Tabs, Tab, IconButton } from "@mui/material";


function TeacherCreatePage() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const containerBox = {
    display: "flex",
    flexDirection: "column",
    bgcolor: "#F9FAFB",
    maxWidth: "lg",
  };

  const profileBox = {
    border:'1px solid',
    borderColor:"#E0E0E0",
    borderRadius: "8px",
    bgcolor: "#ffffff",
    maxWidth:"1064px",
    marginTop:"32px",
    padding:"32px",
    display: "flex",
    alignItems: "center",
    justifyContent:"center",
    flexDirection:"column",
    position:"relative"
  };
  

  return (
    <Box sx={containerBox}>
      <Box sx={{ marginBottom: "24px", marginTop: "32px" }}>
        <Typography variant="h4" fontWeight="bold">
          TEACHER LIST
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: "10px" }}>
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
            sx={{ fontWeight: "medium" }}
          />
          <Tab
            label="ACCOUNT INFORMATION"
            value="2"
            sx={{ fontWeight: "medium" }}
          />
        </Tabs>
      </Box>

      {value === "1" && 
        <Box
          sx={profileBox}
        >
          {/* Profile image with edit icon */}
          <Box
            sx={{
              width: 100, 
              height: 100, 
              borderRadius: "50%", 
              overflow: "hidden", 
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2, 
              position: "relative", 
            }}
          >
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
          
          <Box >
            <Typography fontSize={18} fontWeight={'bold'}>
              Teacher Information
            </Typography>
          </Box>
        </Box>
        
      }

      {/* box 2 */}
      {value === "2" && <Box p={3}>Item Two</Box>}
    </Box>
  );
}

export default TeacherCreatePage;

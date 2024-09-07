import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Typography,
  FormHelperText,
  Divider,
  useMediaQuery,
  Card,
  MenuItem,
  Hidden,
} from "@mui/material";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const StudentUpdatePage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
  });
  const [error, setError] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);

  // State to track the active tab
  const [activeTab, setActiveTab] = useState("student");

  const handleCreate = async (e) => {
    e.preventDefault();
    setTitleError(false);
    setContentError(false);

    if (!newPost.title) {
      setTitleError(true);
      return;
    }
    if (!newPost.content) {
      setContentError(true);
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/posts",
        newPost
      );
      setPosts([...posts, response.data]);
      setNewPost({ title: "", content: "" });
      setError("");
    } catch (err) {
      setError("An error occurred while creating the class.");
    }
  };

  const handleTitleChange = (event) => {
    const newTitle = event.target.value;
    setNewPost({ ...newPost, title: newTitle });
  };

  const handleContentChange = (event) => {
    setNewPost({ ...newPost, content: event.target.value });
  };

  const handleCancel = () => {
    if (activeTab==='student'){
      navigate("/student");
    }
    else if (activeTab === "guardian") {
      setActiveTab("student");
  };
}

  const handleNext = () => {
    if (activeTab === "student") {
      setActiveTab("guardian");
    } else if (activeTab === "guardian") {
      handleCreate(); 
    }
  };

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
          UPDATE STUDENT
        </Typography>
        <Typography
          sx={{
            fontFamily: "Roboto",
            fontSize: isMobile ? "14px" : "16px",
            marginBottom: "24px",
          }}
        >
          Please fill student Information
        </Typography>
      </Box>
      <Hidden smDown>
        <Box sx={{ display: "flex", alignItems: "center", padding: "16px" }}>
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
                color:
                  activeTab === "student" ? "#2196F3" : "rgba(0, 0, 0, 0.6)",
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
              GUARDIAN INFORMATION
            </Button>
          </Box>
        </Box>
      </Hidden>
      {/* Conditionally render Student or Guardian information */}
      {activeTab === "student" && (
        <Card
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleNext(); // Call handleNext to switch to the next tab
          }}
          sx={{
            backgroundColor: "#FFFFFF",
            padding: { xs: 3, sm: 4 },
            borderRadius: "4px",
          }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: "18px" }}>
            Student Information
          </Typography>
          {/* Student form content */}
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
              <TextField
                placeholder="First name"
                variant="outlined"
                value={newPost.title}
                onChange={handleTitleChange}
                fullWidth
                margin="dense"
                error={titleError}
              />
              {titleError && (
                <FormHelperText sx={{ fontSize: "14px" }} error>
                  First name is required.
                </FormHelperText>
              )}
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontSize: "16px" }}>Last Name</Typography>
              <TextField
                placeholder="Last name"
                variant="outlined"
                value={newPost.content}
                onChange={handleContentChange}
                fullWidth
                margin="dense"
                error={contentError}
              />
              {contentError && (
                <FormHelperText sx={{ fontSize: "14px" }} error>
                  Last name is required.
                </FormHelperText>
              )}
            </Box>
          </Box>

          <Box sx={{ width: "100%", my: { xs: "12px", sm: "16px" } }}>
            <Typography sx={{ fontSize: "16px" }}>Class name</Typography>
            <TextField
              select
              placeholder="Select"
              variant="outlined"
              defaultValue="Select"
              fullWidth
              margin="dense"
            >
              {selectType.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "12px",
              my: { xs: "12px", sm: "16px" },
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontSize: "16px" }}>Gender</Typography>
              <TextField
                select
                placeholder="Select"
                variant="outlined"
                defaultValue="Select"
                fullWidth
                margin="dense"
              >
                {selectType.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            {/* Form Date of birth*/}
            <Box sx={{ width: "100%", flex: 1, marginTop: "2px" }}>
              <Typography gutterBottom>Date of Birth</Typography>
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

          <Box sx={{ width: "100%", my: { xs: "12px", sm: "16px" } }}>
            <Typography sx={{ fontSize: "16px" }}>Phone Number</Typography>
            <TextField
              placeholder="Phone number"
              variant="outlined"
              value={newPost.content}
              onChange={handleContentChange}
              fullWidth
              margin="dense"
              error={contentError}
            />
            {contentError && (
              <FormHelperText sx={{ fontSize: "14px" }} error>
                Phone number is required.
              </FormHelperText>
            )}
          </Box>

          <Box sx={{ width: "100%", my: { xs: "12px", sm: "16px" } }}>
            <Typography sx={{ fontSize: "16px" }}>Email</Typography>
            <TextField
              placeholder="Email"
              variant="outlined"
              value={newPost.content}
              onChange={handleContentChange}
              fullWidth
              margin="dense"
              error={contentError}
            />
            {contentError && (
              <FormHelperText sx={{ fontSize: "14px" }} error>
                Email is required.
              </FormHelperText>
            )}
          </Box>

          <Box sx={{ width: "100%", my: { xs: "12px", sm: "16px" } }}>
            <Typography sx={{ fontSize: "16px" }}>Address</Typography>
            <TextField
              placeholder="Address"
              variant="outlined"
              value={newPost.content}
              onChange={handleContentChange}
              fullWidth
              margin="dense"
              multiline
              rows={5}
              error={contentError}
            />
            {contentError && (
              <FormHelperText sx={{ fontSize: "14px" }} error>
                Address is required.
              </FormHelperText>
            )}
          </Box>

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
              Next
            </Button>
          </Box>
        </Card>
      )}

      {activeTab === "guardian" && (
        <Card
          component="form"
          onSubmit={handleCreate}
          sx={{
            backgroundColor: "#FFFFFF",
            padding: { xs: 3, sm: 4 },
            borderRadius: "4px",
          }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: "18px" }}>
            Guardian Information
          </Typography>
          {/* Guardian form content */}
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
              <TextField
                placeholder="First name"
                variant="outlined"
                value={newPost.title}
                onChange={handleTitleChange}
                fullWidth
                margin="dense"
                error={titleError}
              />
              {titleError && (
                <FormHelperText sx={{ fontSize: "14px" }} error>
                  First name is required.
                </FormHelperText>
              )}
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontSize: "16px" }}>Last Name</Typography>
              <TextField
                placeholder="Last name"
                variant="outlined"
                value={newPost.content}
                onChange={handleContentChange}
                fullWidth
                margin="dense"
                error={contentError}
              />
              {contentError && (
                <FormHelperText sx={{ fontSize: "14px" }} error>
                  Last name is required.
                </FormHelperText>
              )}
            </Box>
          </Box>

          <Box sx={{ width: "100%", my: { xs: "12px", sm: "16px" } }}>
            <Typography sx={{ fontSize: "16px" }}>
              Guardian's Relationship
            </Typography>
            <TextField
              placeholder="Relationship"
              variant="outlined"
              value={newPost.content}
              onChange={handleContentChange}
              fullWidth
              margin="dense"
              error={contentError}
            />
            {contentError && (
              <FormHelperText sx={{ fontSize: "14px" }} error>
                Email is required.
              </FormHelperText>
            )}
          </Box>

          <Box sx={{ width: "100%", my: { xs: "12px", sm: "16px" } }}>
            <Typography sx={{ fontSize: "16px" }}>Email</Typography>
            <TextField
              placeholder="Email"
              variant="outlined"
              value={newPost.content}
              onChange={handleContentChange}
              fullWidth
              margin="dense"
              error={contentError}
            />
            {contentError && (
              <FormHelperText sx={{ fontSize: "14px" }} error>
                Email is required.
              </FormHelperText>
            )}
          </Box>

          <Box sx={{ width: "100%", my: { xs: "12px", sm: "16px" } }}>
            <Typography sx={{ fontSize: "16px" }}>Phone Number</Typography>
            <TextField
              placeholder="Phone number"
              variant="outlined"
              value={newPost.content}
              onChange={handleContentChange}
              fullWidth
              margin="dense"
              error={contentError}
            />
            {contentError && (
              <FormHelperText sx={{ fontSize: "14px" }} error>
                Phone number is required.
              </FormHelperText>
            )}
          </Box>

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
              Next
            </Button>
          </Box>
        </Card>
      )}
    </Box>
  );
};

export default StudentUpdatePage;

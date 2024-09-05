import React, { useState } from "react";
import axios from "axios";

import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  FormHelperText,
  Divider,
  useMediaQuery,
  Card,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

const ClassCreatePage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
  });
  const [error, setError] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);

  // Create Class
  const handleCreate = async (e) => {
    e.preventDefault();

    // Validate form
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
      setNewPost({ title: "", content: "", totalStudent: "", female: "" });
      setError("");
    } catch (err) {
      setError("An error occurred while creating the class.");
    }
  };

  //Handle Title Change
  const handleTitleChange = (event) => {
    const newTitle = event.target.value;
    setNewPost({ ...newPost, title: newTitle });
  };
  // Click to Cancel
  const handleCancel = () => {
    navigate("/class");
  };

  const containerStyles = {
    width: 1,
    maxWidth: "lg",
    margin: "0 auto",
    flexWrap: "wrap",
  };
  // Set size for mobile devices
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box sx={containerStyles}>
      {/* Card Title*/}
      <Box>
        <Typography
          sx={{
            fontFamily: "Roboto",
            fontWeight: 600,
            fontSize: { xs: "20px", sm: "32px" },
          }}
        >
          ADD CLASS
        </Typography>
        <Typography
          sx={{
            fontFamily: "Roboto",
            fontSize: isMobile ? "14px" : "16px",
            marginBottom: "24px",
          }}
        >
          Please fill class Information
        </Typography>
      </Box>
      {/* Input Form */}
      <Card
        component="form"
        onSubmit={handleCreate}
        sx={{
          backgroundColor: "#FFFFFF",
          padding: { xs: 3, sm: 4 },
          borderRadius: "4px",
        }}
      >
        {error && (
          <Alert severity="error" sx={{ marginBottom: "16px" }}>
            {error}
          </Alert>
        )}
        <Typography
          sx={{
            backgroundColor: "#ffffff",
            // pb: "16px",
            fontWeight: 600,
            fontSize: "18px",
          }}
        >
          Class Information
        </Typography>
        <Divider sx={{ my: { xs: "12px", sm: "16px" }, border: 0.5 }} />
        {/* Form Class Name */}
        <Box sx={{ my: { xs: "12px", sm: "16px" } }}>
          <Typography sx={{ fontSize: "16px" }}>Class Name</Typography>
          <TextField
            placeholder="Class name"
            variant="outlined"
            value={newPost.title}
            onChange={handleTitleChange}
            fullWidth
            margin="dense"
            error={titleError}
          />
          {titleError && (
            <FormHelperText sx={{ fontSize: "14px" }} error>
              Class name is required.
            </FormHelperText>
          )}
        </Box>
        {/* Form Class Description */}
        <Box>
          <Typography sx={{ fontSize: "16px" }}>Description</Typography>
          <TextField
            placeholder="Description"
            variant="outlined"
            value={newPost.content}
            onChange={(event) =>
              setNewPost({ ...newPost, content: event.target.value })
            }
            fullWidth
            margin="dense"
            error={contentError}
            rows={8}
            multiline
          />
          {contentError && (
            <FormHelperText sx={{ fontSize: "14px" }} error>
              Description is required.
            </FormHelperText>
          )}
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
              Add Class
            </Button>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default ClassCreatePage;

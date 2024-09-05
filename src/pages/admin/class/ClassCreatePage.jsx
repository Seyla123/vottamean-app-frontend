import React, { useState } from "react";
import axios from "axios";

import {
  TextField,
  Button,
  Box,
  Container,
  Typography,
  Alert,
  FormHelperText,
  Divider,
  useMediaQuery,
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
    width: "Auto",
    maxWidth: "lg",
    minWidth: "300px",
    margin: "0 auto",
    padding: "32px",
    flexWrap: "wrap",
    backgroundColor: "#F9FAFB",
  };
  // Set size for mobile devices
  const isMobile = useMediaQuery("(max-width:sm)");


  return (
    <Container sx={containerStyles}>
      <Typography
        sx={{ fontFamily: "Roboto", fontSize: isMobile ? "20px" : "32px" }}
      >
        CLASS ADD
      </Typography>
      <Typography
        sx={{
          fontFamily: "Roboto",
          fontSize: isMobile ? "14px" : "16px",
          marginBottom: "24px",
        }}
      >
        Please fill in the Information about the Class
      </Typography>

      {/* Input Form */}
      <Box
        component="form"
        onSubmit={handleCreate}
        sx={{
          backgroundColor: "#ffffff",
          padding: "24px",
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
            marginBottom: "16px",
            fontWeight: 600,
            fontSize: "18px",
          }}
        >
          Class Information
        </Typography>
        <Divider />
        <Box>
          <Typography sx={{ fontSize: "16px", marginTop: "16px" }}>
            Class Name
          </Typography>
          <TextField
            placeholder="Class Name"
            variant="outlined"
            value={newPost.title}
            onChange={handleTitleChange}
            fullWidth
            margin="normal"
            error={titleError}
          />
          {titleError && (
            <FormHelperText error>Class Name is required.</FormHelperText>
          )}
        </Box>
        <Box>
          <Typography sx={{ fontSize: "16px", marginTop: "16px" }}>
            Description
          </Typography>
          <TextField
            placeholder="Description"
            variant="outlined"
            value={newPost.content}
            onChange={(event) =>
              setNewPost({ ...newPost, content: event.target.value })
            }
            fullWidth
            margin="normal"
            error={contentError}
            multiline
            rows={4}
          />
          {contentError && (
            <FormHelperText error>Description is required.</FormHelperText>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "right",
            gap: isMobile ? "16px" : "24px",
            alignItems: "center",
            marginTop: "16px",
            backgroundColor: "#ffffff",
          }}
        >
          <Button
            onClick={handleCancel}
            variant="outlined"
            color="black"
            sx={{
              backgroundColor: "#ffffff",
              color: "black",
              width: isMobile ? "167px" : "140px",
              height: "42px",
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ width: isMobile ? "167px" : "140px", height: "42px" }}
          >
            Add Class
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ClassCreatePage;

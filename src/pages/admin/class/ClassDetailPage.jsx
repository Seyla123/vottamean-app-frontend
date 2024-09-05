import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Paper,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ClassDetailPage = () => {
  const [posts, setPosts] = useState([]);
  const [menuClick, setMenuClick] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Fetch Data
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/posts`);
        setPosts(response.data);
      } catch (err) {
        console.log(`Error fetching posts: ${err}`);
      }
    };

    fetchPosts();
  }, []);

  //Click to View Detail Student
  const handleTitleClick = (postId) => {
    navigate(`/student/${postId}`);
  };

  //Click to Drop Menu Click
  const handleMenuClick = (event, postId) => {
    setMenuClick(event.currentTarget);
    setSelectedPostId(postId);
  };

  //Handle Menu Close
  const handleMenuClose = () => {
    setMenuClick(null);
    setSelectedPostId(null);
  };

  //navigate to Update Page
  const handleUpdate = () => {
    navigate(`/student/update/${selectedPostId}`, { state: { posts } });
    handleMenuClose();
  };

  //Hadle to Update Class
  const handleUpdateClass = () => {
    navigate(`/class/update/${selectedPostId}`, { state: { posts } });
    handleMenuClose();
  };

  //Handle Delete
  const handleDelete = async (selectedPostId) => {
    try {
      await axios.delete(
        `http://localhost:3001/api/v1/posts/${selectedPostId}`
      );
      setPosts(posts.filter((post) => post.id !== selectedPostId));
      console.log(`Deleted post with id: ${selectedPostId}`);
    } catch (err) {
      console.log(`Error deleting post: ${err}`);
    }
    handleMenuClose();
  };

  //Filter using for searching post even if lower or upper case
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const isMoble = useMediaQuery("(max-width:600px)");

  // Const Column for using with DataGrid
  const columns = [
    !isMoble && {
      field: "title",
      headerName: "Student ID",
      disableColumnMenu: true,
      sortable: false,
      resizable: false,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <span
          style={{ cursor: "pointer" }}
          onClick={() => handleTitleClick(params.row.id)}
        >
          {params.value}
        </span>
      ),
    },
    {
      field: "content",
      headerName: "Full Name",
      disableColumnMenu: true,
      sortable: false,
      resizable: false,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "gender",
      headerName: "Gender",
      disableColumnMenu: true,
      sortable: false,
      resizable: false,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "class",
      headerName: "Class",
      disableColumnMenu: true,
      sortable: false,
      resizable: false,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    !isMoble && {
      field: "dateofbirth",
      headerName: "Date of Birth",
      disableColumnMenu: true,
      sortable: false,
      resizable: false,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    !isMoble && {
      field: "phone",
      headerName: "Phone",
      disableColumnMenu: true,
      sortable: false,
      resizable: false,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    !isMoble && {
      field: "address",
      headerName: "Address",
      disableColumnMenu: true,
      sortable: false,
      resizable: false,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "action",
      headerName: "Action",
      disableColumnMenu: true,
      sortable: false,
      resizable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Box sx={{ boxShadow: "none" }}>
          <IconButton
            onMouseEnter={(event) => handleMenuClick(event, params.row.id)}
          >
            ...
          </IconButton>
          <Menu
            anchorEl={menuClick}
            open={Boolean(menuClick)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleUpdate(params.row.id)}>
              Edit
            </MenuItem>
            <MenuItem onClick={() => handleDelete(params.row.id)}>
              Delete
            </MenuItem>
          </Menu>
        </Box>
      ),
      flex: 1,
    },
  ].filter(Boolean);
  //Add Style

  const containerStyles = {
    width: "100%",
    minWidth: "300px",
    margin: "0 auto",
    alignItems: "end",
    flexWrap: "wrap",
    backgroundColor: "#F9FAFB",
    border: "1px solid",
    borderColor: "divider",
  };
  const tableContainerStyles = {
    width: "100%",
    overflowX: "auto",
    backgroundColor: "#FFFFFF",
    marginTop: "24px",
  };

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Box sx={containerStyles}>
      <Typography
        sx={{ fontFamily: "Roboto", fontSize: isMoble ? "20px" : "32px" }}
      >
        {posts.title} Class Detail
      </Typography>
      <Typography
        sx={{ fontFamily: "Roboto", fontSize: "16px", marginBottom: "32px" }}
      >
        There are class's information
      </Typography>

      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          padding: "32px",
          marginBottom: "32px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontSize: "16px", fontWeight: "bold" }}
          >
            Class Information
          </Typography>
          <Box>
            <EditIcon
              sx={{ mr: 1, color: "blue" }}
              onClick={handleUpdateClass}
            />
            <DeleteIcon sx={{ color: "red" }} />
          </Box>
        </Box>
        <Divider />
        <Box
          sx={{ marginTop: "16px", display: "flex", flexDirection: "column" }}
        >
          <Typography
            variant="body3"
            gutterBottom
            sx={{ fontFamily: "Roboto" }}
          >
            Class ID: 0001
          </Typography>
          <Typography
            variant="body3"
            gutterBottom
            sx={{ fontFamily: "Roboto" }}
          >
            Class Name: AnB
          </Typography>
          <Typography
            variant="body3"
            gutterBottom
            sx={{ fontFamily: "Roboto" }}
          >
            Total Student: 40 Students
          </Typography>
          <Typography
            variant="body3"
            gutterBottom
            sx={{ fontFamily: "Roboto" }}
          >
            Female: 20 Students
          </Typography>
          <Typography
            variant="body3"
            gutterBottom
            sx={{ fontFamily: "Roboto" }}
          >
            Description: The total amount one class
          </Typography>
        </Box>
      </Box>

      <Box sx={{ backgroundColor: "#FFFFFF", padding: "32px" }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontFamily: "Roboto",
            fontSize: "16px",
            marginBottom: "24px",
            fontWeight: "bold",
          }}
        >
          Total 40 Student
        </Typography>
        <Divider />
        <Paper sx={tableContainerStyles}>
          <DataGrid
            rows={filteredPosts}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10, 15]}
            checkboxSelection
            sx={{ border: 0 }}
            disableRowSelectionOnClick
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default ClassDetailPage;

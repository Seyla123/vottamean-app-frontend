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
  Card,
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
      headerName: "Full name",
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
      // fontWeight: 'medium',
      headerClassName: "super-app-theme--header",
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
      headerClassName: "super-app-theme--header",
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
      headerName: "",
      disableColumnMenu: true,
      sortable: false,
      resizable: false,
      headerAlign: "center",
      align: "center",

      renderCell: (params) => (
        <Box sx={{ boxShadow: "none" }}>
          <IconButton
            onClick={(event) => handleMenuClick(event, params.row.id)}
          >
            ...
          </IconButton>
          <Menu
            anchorEl={menuClick}
            open={Boolean(menuClick)}
            onClose={handleMenuClose}
            elevation={1}
            PaperProps={{ sx: { width: isMoble ? "82px" : "110px" } }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
              height: isMoble ? "25px" : "35px",
            }}
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
    borderColor: "divider",
  };
  const tableContainerStyles = {
    width: "100%",
    overflowX: "auto",
    backgroundColor: "#FFFFFF",
  };

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Box sx={containerStyles}>
      <Typography
        sx={{
          fontFamily: "Roboto",
          fontWeight: 600,
          fontSize: { xs: "20px", sm: "32px" },
        }}
      >
        {posts.title} AnB's CLASS DETAIL
      </Typography>
      <Typography
        sx={{
          fontFamily: "Roboto",
          fontSize: "16px",
          pb: { xs: "12px", sm: "24px" },
        }}
      >
        There are class's information
      </Typography>
      <Box sx={{ gap: 4 }}>
        <Box
          sx={{
            backgroundColor: "#FFFFFF",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Card
            sx={{
              padding: { xs: "24px", sm: "32px" },
              gap: 4,
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
                sx={{
                  backgroundColor: "#ffffff",
                  // pb: "16px",
                  fontWeight: 600,
                  fontSize: "18px",
                }}
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
            <Divider
              sx={{ my: { xs: "12px", sm: "16px" }, borderBottomWidth: 3 }}
            />
            <Box
              sx={{
                marginTop: "16px",
                display: "flex",
                flexDirection: "column",
              }}
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
          </Card>

          <Card
            sx={{
              backgroundColor: "#FFFFFF",
              padding: { xs: "24px", sm: "32px" },
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontFamily: "Roboto",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Total 40 Student
            </Typography>
            <Divider
              sx={{ my: { xs: "16px", sm: "24px" }, borderBottomWidth: 3 }}
            />
            <Paper sx={tableContainerStyles}>
              <DataGrid
                rows={filteredPosts}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10, 15]}
                checkboxSelection
                sx={{
                  border: 0,
                  "& .MuiDataGrid-columnHeader": {
                    backgroundColor: "#F3F3F5",
                  },
                }}
                disableRowSelectionOnClick
              />
            </Paper>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default ClassDetailPage;
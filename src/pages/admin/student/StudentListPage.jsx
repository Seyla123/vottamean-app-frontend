import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Paper,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Hidden,
  InputAdornment,
  useMediaQuery,
  Select,
  FormControl,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

const StudentListPage = () => {
  const [posts, setPosts] = useState([]);
  const [menuClick, setMenuClick] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

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

  //Navigate to create page
  const handleCreate = () => {
    navigate(`/student/create`);
  };

  //Click to View Detail
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

  const isMobile = useMediaQuery("(max-width:600px)");

  // Const Column for using with DataGrid
  const columns = [
    !isMobile && {
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
    !isMobile && {
      field: "dateofbirth",
      headerName: "Date of Birth",
      disableColumnMenu: true,
      sortable: false,
      resizable: false,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    !isMobile && {
      field: "phone",
      headerName: "Phone",
      disableColumnMenu: true,
      sortable: false,
      resizable: false,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    !isMobile && {
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
            PaperProps={{ sx: { width: isMobile ? "82px" : "110px" } }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
              height: isMobile ? "25px" : "35px",
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

  const paginationModel = { page: 0, pageSize: 5 };
  //Add Style

  const containerStyles = {
    width: "100%",
    margin: "0 auto",
    alignItems: "end",
    flexWrap: "wrap",
  };
  const inputBoxStyles = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "right",
    py: { xs: 1, sm: 3 },
    alignItems: "center",
    width: "100%",
    "& .MuiInputBase-root": {
      height: "42px",
    },
    "& .MuiInputBase-input": {
      padding: "8px 14px",
      fontSize: "14px",
    },
    "& .MuiInputLabel-root": {
      top: "-4px",
      fontSize: "14px",
      lineHeight: "1",
    },
  };

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
          STUDENT LISTS
        </Typography>
        <Typography sx={{ fontFamily: "Roboto", fontSize: "16px" }}>
          There are total students
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreate}
          sx={{
            width: isMobile ? "110px" : "140px",
            height: { xs: "38px", sm: "46px" },
            fontSize: isMobile ? "14px" : "16px",
            padding: isMobile ? "8px" : "10px",
          }}
        >
          ADD NEW
        </Button>
      </Box>

      <Box sx={inputBoxStyles}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: { xs: 2, sm: 3 },
            width: { xs: 1, sm: "100%" },
          }}
        >
          {/* Filter */}
          <Box
            sx={{
              width: 220,
              marginTop: "7px",
              display: "flex",
              justifyContent: { xs: "right", sm: "left" },
              order: { xs: 2, sm: 1 },
            }}
          >
            <FormControl fullWidth>
              <Select
                id="demo-simple-select"
                value={filter}
                onChange={handleChange}
                displayEmpty
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <em>Filter</em>;
                  }
                  return selected;
                }}
              >
                <MenuItem value={10}>Raksa</MenuItem>
                <MenuItem value={20}>Svieta</MenuItem>
                <MenuItem value={30}>Seiha</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {/* Search  */}
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "left", sm: "right" },
              order: { xs: 1, sm: 2 },
              alignItems: "center",
              gap: "24px",
              width: { xs: 1, sm: "540px" },
            }}
          >
            <TextField
              placeholder="Search"
              variant="outlined"
              margin="normal"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: "100%", maxwidth: { xs: 1, sm: "540px" } }}
              InputProps={{
                endAdornment: isMobile ? (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ) : null,
              }}
            />

            <Hidden smDown>
              <Button
                variant="contained"
                color="primary"
                sx={{ width: "108px", height: 42, marginTop: "5px" }}
              >
                Search
              </Button>
            </Hidden>
          </Box>
        </Box>
      </Box>
      <Paper
        sx={{ width: "100%", overflowX: "auto", backgroundColor: "#FFFFFF" }}
      >
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
    </Box>
  );
};

export default StudentListPage;

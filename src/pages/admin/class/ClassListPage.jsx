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
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";

const ClassListPage = () => {
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

  //Navigate to create page
  const handleCreate = () => {
    navigate(`/class/create`);
  };

  //Click to View Detail
  const handleTitleClick = (postId) => {
    navigate(`/class/${postId}`);
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

  const theme = useTheme();

  const isMobile = useMediaQuery("(max-width:600px)");

  // Const Column for using with DataGrid
  const columns = [
    {
      field: "title",
      headerName: "Class ID",
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
      headerName: "Class Name",
      disableColumnMenu: true,
      sortable: false,
      resizable: false,
      flex: 1,
      headerAlign: "center",
      align: "center",

    },
    {
      field: "description",
      headerName: "Description",
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
      flex: 0.5,
      headerAlign: "center",
      align: "center",

      renderCell: (params) => (
        <Box>
          <IconButton
            onMouseEnter={(event) => handleMenuClick(event, params.row.id)}
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
    },
  ];

  //Add Style

  const containerStyles = {
    width: "100%",
    margin: "0 auto",
    alignItems: "end",
    flexWrap: "wrap",
  };
  const flexBoxStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  };
  const inputBoxStyles = {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "right",
    marginBottom: "24px",
    alignItems: "center",
    width: "100%",
    maxWidth: "100%",
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
  const textFieldStyles = {
    width: "508px",
    width: isMobile ? "366px" : "508px",

  };

  const tableContainerStyles = (theme) => ({
    width: "100%",
    overflowX: "auto",
    backgroundColor: "#FFFFFF",
    [theme.breakpoints.down("sm")]: {
      height: "100%",
    },
  });

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
        CLASS LISTS
      </Typography>
      <Box sx={flexBoxStyles}>
        <Typography sx={{ fontFamily: "Roboto", fontSize: "16px" }}>
          There are total classes
        </Typography>
        <Button
          onClick={handleCreate}
          sx={{
            backgroundColor: "#1976d2",
            color: "#fff",
            width: isMobile ? "110px" : "140px",
            height: { xs: "38px", sm: "46px" },
            fontSize: isMobile ? "14px" : "16px",
            padding: isMobile ? "8px" : "10px",
          }}
        >
          ADD CLASS
        </Button>
      </Box>

      <Box sx={inputBoxStyles}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <TextField
            placeholder="Search"
            variant="outlined"
            margin="normal"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={textFieldStyles}
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
      <Paper sx={tableContainerStyles(theme)}>
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

export default ClassListPage;

import React, { useState } from "react";
import {TextField,Button,Box,Paper,Menu,MenuItem,IconButton,Typography,Hidden,InputAdornment,useMediaQuery,Select,FormControl,} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const StudentListPage = () => {
  const navigate = useNavigate();
  const [menuClick, setMenuClick] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");

  //Click to Drop Menu Click
const handleMenuClick = (event, postId) => {
  setMenuClick(event.currentTarget);
  setSelectedPostId(postId);
  };
  //Navigate to create page
const handleCreate = () => {
  navigate(`/student/create`);
  };
  //navigate to upfdate
  const handleUpdate = () => {
    navigate(`/student/update/${selectedPostId}`);
    };

const handleChange = (event) => {
setFilter(event.target.value);
};
  //Handle Menu Close
  const handleMenuClose = () => {
  setMenuClick(null);
  setSelectedPostId(null);
  };
  // Static student data
  const posts = [
    { id: 1, title: "ANB1000", content: "Potato Fried", gender: "Female", class: "Class 5", dateofbirth: "01/01/2000", phone: "01234567", address: "Potatoes Village" },
    { id: 2, title: "ANB1001", content: "Tomato Mashed", gender: "Male", class: "Class 6", dateofbirth: "02/02/2001", phone: "01234568", address: "Tomatoes Town" },
    { id: 3, title: "ANB1002", content: "Cucumber Mashed", gender: "Female", class: "Class 7", dateofbirth: "03/03/2002", phone: "01234569", address: "Cucumber Village" },
  ];

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isMobile = useMediaQuery("(max-width:600px)");

  const columns = [
    {field: "title",headerName: "Student ID",disableColumnMenu: true,sortable: false,resizable: false,
      renderCell: (params) => (
        <span style={{ cursor: "pointer" }} onClick={() => navigate(`/student/${params.row.id}`)}>
          {params.value}
        </span>
      ),
      flex: 1,
    },
    { field: "content", headerName: "Full name",   disableColumnMenu: true,sortable: false,resizable: false,flex: 1, },
    { field: "gender", headerName: "Gender",    disableColumnMenu: true,sortable: false,resizable: false,flex: 1 },
    { field: "class", headerName: "Class",   disableColumnMenu: true,sortable: false,resizable: false, flex: 1 },
    !isMobile && { field: "dateofbirth",   disableColumnMenu: true,sortable: false,resizable: false, headerName: "Date of Birth", flex: 1 },
    !isMobile && { field: "phone",    disableColumnMenu: true,sortable: false,resizable: false,headerName: "Phone", flex: 1 },
    !isMobile && { field: "address", headerName: "Address",  disableColumnMenu: true,sortable: false,resizable: false, flex: 1 },
    {field: "action",headerName:(<DeleteForeverIcon sx={{ color: "red" }}/>),disableColumnMenu: true,sortable: false,resizable: false,headerAlign: "center",align: "center",
    
      renderCell: (params) => (
        <Box sx={{ boxShadow: "none", alignItems:'center' }}>
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
      flex: 0.5,
    },
  ].filter(Boolean);

  return (
    <Box sx={{ width: "100%", margin: "0 auto" }}>
      <Box>
          <Typography sx={{fontFamily: "Roboto",fontWeight: 600,fontSize: { xs: "20px", sm: "32px" },
          }}>
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
      {/* Filter */}
      <Box sx={{width: 220,marginTop: "7px",display: "flex",justifyContent: { xs: "right", sm: "left" },order: { xs: 2, sm: 1 },}}>
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
      <Box sx={{display: "flex",justifyContent: { xs: "left", sm: "right" },order: { xs: 1, sm: 2 },alignItems: "center",gap: "24px",width: { xs: 1, sm: "540px" },}}>
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
      <Paper sx={{ width: "100%", overflowX: "auto" }}>
        <DataGrid
          rows={filteredPosts}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 15]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Paper>
    </Box>
  );
};

export default StudentListPage;
const inputBoxStyles = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  py: { xs: 1, sm: 2 },
  gap: { xs: 1, sm: 2 },
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
import React, { useState } from 'react';
import Header from '../../../components/teacher/Header';
import { Box, Button, TextField, InputAdornment, Paper, IconButton, Menu, MenuItem } from '@mui/material';
import { Search as SearchIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function TeacherListPage() {
  const [rows, setRows] = useState([
    { id: 1, lastName: 'Fried', firstName: 'Potato', gender: 'Male', email: 'mrFried123@gmail.com', phoneNumber: '01234567' },
    { id: 2, lastName: 'Fried', firstName: 'Potato', gender: 'Female', email: 'mssFried123@gmail.com', phoneNumber: '01234567' },
    { id: 3, lastName: 'Fried', firstName: 'Potato', gender: 'Male', email: 'mrpotato123@gmail.com', phoneNumber: '01234567' },
    { id: 4, lastName: 'Fried', firstName: 'Potato', gender: 'Male', email: 'mrpotato123@gmail.com', phoneNumber: '01234567' },
    { id: 5, lastName: 'Fried', firstName: 'Potato', gender: 'Female', email: 'msspotato123@gmail.com', phoneNumber: '01234567' },
    { id: 6, lastName: 'Fried', firstName: 'Potato', gender: 'Male', email: 'mrpotato123@gmail.com', phoneNumber: '01234567' },
    { id: 7, lastName: 'Fried', firstName: 'Potato', gender: 'Female', email: 'msspotato123@gmail.com', phoneNumber: '01234567' },
    { id: 8, lastName: 'Fried', firstName: 'Potato', gender: 'Female', email: 'msspotato123@gmail.com', phoneNumber: '01234567' },
    { id: 9, lastName: 'Fried', firstName: 'Potato', gender: 'Male', email: 'mrpotato123@gmail.com', phoneNumber: '01234567' },
  ]);

  const [selectionModel, setSelectionModel] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);

  const handleDeleteSelected = () => {
    setRows(rows.filter(row => !selectionModel.includes(row.id)));
    setSelectionModel([]); // Clear selection after deletion
  };

  const handleMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRowId(null);
  };

  const handleEdit = () => {
    console.log("Edit row:", selectedRowId);
    handleMenuClose();
  };

  const handleDeleteSingle = () => {
    setRows(rows.filter(row => row.id !== selectedRowId));
    handleMenuClose();
  };

  const columns = [
    {
      field: 'fullName',
      headerName: 'Full Name',
      description: 'This column has a value getter and is not sortable.',
      disableColumnMenu: true,
      sortable: false,
      resizable: false,
      width: 260,
      headerAlign: 'center',
      flex: 1,
      align: 'center',
      valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
    {
      field: 'gender',
      headerName: 'Gender',
      description: 'This column is not sortable.',
      type: 'string',
      disableColumnMenu: true,
      sortable: false,
      resizable: false,
      width: 260,
      headerAlign: 'center',
      flex: 1,
      align: 'center',
    },
    {
      field: 'email',
      headerName: 'Email',
      description: 'This column is not sortable.',
      type: 'string',
      disableColumnMenu: true,
      sortable: false,
      resizable: false,
      width: 260,
      headerAlign: 'center',
      flex: 1,
      align: 'center',
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      type: 'number',
      disableColumnMenu: true,
      sortable: false,
      resizable: false,
      width: 260,
      headerAlign: 'center',
      flex: 1,
      align: 'center',
    },
    {
      field: 'actions',
      headerName: <DeleteForeverIcon sx={{ color: 'red' }}/>,
      width: 55,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => (
        <IconButton onClick={(event) => handleMenuOpen(event, params.id)} size="small" align="horizontal" >
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box>
      {/* Header */}
      <Header header="TEACHER LIST" subheader="There are 24 teachers" />

      {/* Button to Delete Selected Rows */}
      <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', mb: 2 }}>
        <Button 
          variant="contained" 
          onClick={handleDeleteSelected}
          disabled={selectionModel.length === 0}
        >
          DELETE SELECTED
        </Button>
      </Box>

      {/* Button to Add Teacher */}
      <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', mb: 2 }}>
        <Button variant="contained" sx={{ width: { xs: '130px', sm: '170px' } }}>
          ADD TEACHER
        </Button>
      </Box>

      {/* Search Bar */}
      <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', gap: 2, mb: 3 }}>
        <TextField
          id="search"
          placeholder="Search"
          variant="outlined"
          sx={{
            flexGrow: 1,
            maxWidth: { xs: '100%', sm: '510px' },
            '& .MuiInputBase-root': {
              height: '40px',
            },
            '& .MuiInputBase-input': {
              padding: '8px 14px',
              fontSize: '14px',
            },
            '& .MuiInputAdornment-root': {
              display: { xs: 'flex', sm: 'none' },
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon sx={{ display: { xs: 'flex', sm: 'none' } }} />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          sx={{
            height: '40px',
            fontSize: '14px',
            bgcolor: '#2196F3',
            width: '88px',
            display: { xs: 'none', sm: 'flex' },
          }}
        >
          Search
        </Button>
      </Box>

      {/* Table */}
      <Box sx={{ width: '100%', mx: 'auto' }}>
        <Paper>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            onSelectionModelChange={setSelectionModel}
            sx={{ border: 0.5, borderColor: '#E0E0E0' }}
          />
        </Paper>
      </Box>

      {/* Menu for Edit/Delete Options */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{ sx: { width: '200px' } }}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDeleteSingle}>Delete</MenuItem>
      </Menu>
    </Box>
  );
}

export default TeacherListPage;

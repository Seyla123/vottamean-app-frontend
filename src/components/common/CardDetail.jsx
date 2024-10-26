import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    InputAdornment,
    Paper,
    IconButton,
    Menu,
    MenuItem,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import StyledButton from './StyledMuiButton';
import { Search as SearchIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Header from '../../../components/teacher/Header';
import './TeacherListPage.css'; // Ensure your CSS file is imported

function TeacherListPage() {
    const [rows, setRows] = useState([
        { id: 1, lastName: 'Fried', firstName: 'Potato', gender: 'Male', email: 'mrFried123@gmail.com', phoneNumber: '01234567' },
        { id: 2, lastName: 'Fried', firstName: 'Potato', gender: 'Female', email: 'mssFried123@gmail.com', phoneNumber: '01234567' },
        { id: 3, lastName: 'Fried', firstName: 'Potato', gender: 'Male', email: 'mrpotato123@gmail.com', phoneNumber: '01234567' },
        { id: 4, lastName: 'Fried', firstName: 'Potato', gender: 'Male', email: 'mrpotato123@gmail.com', phoneNumber: '01234567' },
        { id: 5, lastName: 'Fried', firstName: 'Potato', gender: 'Female', email: 'msspotato123@gmail.com', phoneNumber: '01234567' },
        { id: 6, lastName: 'Fried', firstName: 'Potato', gender: 'Male', email: 'mrpotato123@gmail.com', phoneNumber: '01234567' },
        { id: 7, lastName: 'Fried', firstName: 'Potato', gender: 'Female', email: 'mssFried123@gmail.com', phoneNumber: '01234567' },
        { id: 8, lastName: 'Fried', firstName: 'Potato', gender: 'Female', email: 'msspotato123@gmail.com', phoneNumber: '01234567' },
        { id: 9, lastName: 'Fried', firstName: 'Potato', gender: 'Male', email: 'mrpotato123@gmail.com', phoneNumber: '01234567' },
    ]);

    const [selectionModel, setSelectionModel] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRowId, setSelectedRowId] = useState(null);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleMenuOpen = (event, id) => {
        setAnchorEl(event.currentTarget);
        setSelectedRowId(id);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedRowId(null);
    };

    const handleEdit = () => {
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
            disableColumnMenu: true,
            sortable: false,
            resizable: false,
            width: 260,
            headerAlign: 'center',
            flex: 1,
            align: 'center',
            valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
        ...(isMobile ? [] : [
            {
                field: 'gender',
                headerName: 'Gender',
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
                disableColumnMenu: true,
                sortable: false,
                resizable: false,
                width: 260,
                headerAlign: 'center',
                flex: 1,
                align: 'center',
            }
        ]),
        {
            field: 'email',
            headerName: 'Email',
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
            headerName: '',
            width: 70,
            disableColumnMenu: true,
            sortable: false,
            renderCell: (params) => (
                <IconButton onClick={(event) => handleMenuOpen(event, params.id)} size="small">
                    <MoreHorizIcon />
                </IconButton>
            ),
        },
    ];

    return (
      <Box>
        <Header header="TEACHER LIST" subheader="There are 24 teachers" />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <StyledButton
            size="small"
            variant="contained"
            sx={{ width: { xs: '130px', sm: '170px' } }}
          >
            ADD TEACHER
          </StyledButton>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'center',
            gap: 2,
            mb: 3,
          }}
        >
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
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <StyledButton
            variant="contained"
            size="small"
            sx={{
              height: '40px',
              fontSize: '14px',
              bgcolor: '#2196F3',
              width: '88px',
            }}
          >
            Search
          </StyledButton>
        </Box>
        <Box sx={{ width: '100%', mx: 'auto' }}>
          <Paper>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: { paginationModel: { page: 0, pageSize: 5 } },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              onSelectionModelChange={setSelectionModel}
              sx={{
                border: 0.5,
                borderColor: '#E0E0E0',
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: '#f0f4f8', // Ensure this is the desired color
                },
                '& .MuiDataGrid-columnHeaderTitle': {
                  textAlign: 'center', // Center align the header title
                },
              }}
            />
          </Paper>
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{ sx: { width: '150px' } }}
        >
          <MenuItem onClick={handleEdit}>
            <MoreVertIcon sx={{ mr: 1 }} />
            Edit
          </MenuItem>
          <MenuItem onClick={handleDeleteSingle} sx={{ color: 'red' }}>
            <DeleteForeverIcon sx={{ mr: 1 }} />
            Delete
          </MenuItem>
        </Menu>
      </Box>
    );
}

export default TeacherListPage;
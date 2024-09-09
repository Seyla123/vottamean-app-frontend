import React, { useState } from 'react';
import {
    TextField,
    Button,
    Box,
    MenuItem,
    Hidden,
    InputAdornment,
    useMediaQuery,
    Select,
    FormControl,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import DataTable from '../../../components/common/DataTable';
import FormComponent from '../../../components/common/FormComponent';

const StudentListPage = () => {
    const navigate = useNavigate();
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('');

    const isMobile = useMediaQuery('(max-width: 600px)');
    //Navigate to create page
    const handleCreate = () => {
        navigate(`/dashboard/students/create`);
    };
    //navigate to upfdate

    const handleChange = event => {
        setFilter(event.target.value);
    };
    // Static student data
    const columns = [
        { id: 'name', label: 'Name' },
        { id: 'gender', label: 'Gender' },
        { id: 'email', label: 'Email' },
        { id: 'phoneNumber', label: 'Phone Number' },
    ];

    const rows = [
        {
            id: 1,
            name: 'Srey Mey',
            gender: 'Female',
            email: 'sreymey@example.com',
            phoneNumber: '1234567890',
        },
        {
            id: 2,
            name: 'Sok Vanna',
            gender: 'Male',
            email: 'sokvanna@example.com',
            phoneNumber: '0987654321',
        },
        {
            id: 3,
            name: 'Chenda Daro',
            gender: 'Male',
            email: 'chendadaro@example.com',
            phoneNumber: '0123456789',
        },
    ];

    const handleEdit = row => {
        navigate(`/dashboard/students/update/${row.id}`);
    };

    const handleDelete = row => {
        console.log('Delete row:', row);
    };

    const handleSelectedDelete = () => {
        console.log('Delete all');
    };

    const hideColumns = ['name', 'phoneNumber'];

    return (
        <Box>
            <FormComponent
                title={'Student Lists'}
                subTitle={'There are 24 Students'}
            >
                <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={handleCreate}
                        sx={{
                            width: isMobile ? '110px' : '140px',
                            height: { xs: '38px', sm: '46px' },
                            fontSize: isMobile ? '14px' : '16px',
                            padding: isMobile ? '8px' : '10px',
                        }}
                    >
                        ADD NEW
                    </Button>
                </Box>
                <Box sx={inputBoxStyles}>
                    {/* Filter */}
                    <Box
                        sx={{
                            width: 220,
                            marginTop: '7px',
                            display: 'flex',
                            justifyContent: { xs: 'right', sm: 'left' },
                            order: { xs: 2, sm: 1 },
                        }}
                    >
                        <FormControl fullWidth>
                            <Select
                                id='demo-simple-select'
                                value={filter}
                                onChange={handleChange}
                                displayEmpty
                                renderValue={selected => {
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
                            display: 'flex',
                            justifyContent: { xs: 'left', sm: 'right' },
                            order: { xs: 1, sm: 2 },
                            alignItems: 'center',
                            gap: '24px',
                            width: { xs: 1, sm: '540px' },
                        }}
                    >
                        <TextField
                            placeholder='Search'
                            variant='outlined'
                            margin='normal'
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            sx={{
                                width: '100%',
                                maxwidth: { xs: 1, sm: '540px' },
                            }}
                            InputProps={{
                                endAdornment: isMobile ? (
                                    <InputAdornment position='end'>
                                        <SearchIcon />
                                    </InputAdornment>
                                ) : null,
                            }}
                        />
                        <Hidden smDown>
                            <Button
                                variant='contained'
                                color='primary'
                                sx={{
                                    width: '108px',
                                    height: 42,
                                    marginTop: '5px',
                                }}
                            >
                                Search
                            </Button>
                        </Hidden>
                    </Box>
                </Box>
                {/* List Student*/}
                <DataTable
                    rows={rows}
                    columns={columns}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onSelectedDelete={handleSelectedDelete}
                    hideColumns={hideColumns}
                    emptyTitle={'No Student'}
                    emptySubTitle={'No Student Available'}
                />
            </FormComponent>
        </Box>
    );
};

export default StudentListPage;

const inputBoxStyles = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: { xs: 1, sm: 2 },
    alignItems: 'center',
    width: '100%',
    '& .MuiInputBase-root': {
        height: '42px',
    },
    '& .MuiInputBase-input': {
        padding: '8px 14px',
        fontSize: '14px',
    },
    '& .MuiInputLabel-root': {
        top: '-4px',
        fontSize: '14px',
        lineHeight: '1',
    },
};

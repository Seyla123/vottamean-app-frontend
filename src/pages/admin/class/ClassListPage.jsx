import React from 'react';
import {
    TextField,
    Button,
    Box,
    Typography,
    Hidden,
    useMediaQuery,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../components/common/DataTable';

const ClassListPage = () => {
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width:600px)');

    const handleEdit = row => {
        navigate(`/dashboard/classes/update/${row.id}`);
    };

    const handleDelete = row => {
        console.log('Delete row:', row);
    };

  //Navigate to create page
  const handleCreate = () => {
    navigate(`/dashboard/classes/create`);
  };
const handleSelectedDelete = () => {
    console.log('Delete all');
    
};
    const columns = [
        { id: 'id', label: 'Class ID' },
        { id: 'name', label: 'Class Name' },
        { id: 'description', label: 'Description' },
    ];

    const rows = [
        { id: 1, name: '12D2', description: 'Math Class' },
        { id: 2, name: '11D3', description: 'English Class' },
    ];

    const hideColumns = ['description'];

    return (
        <Box sx={containerStyles}>
            <Box>
                <Typography sx={titleStyles}>CLASS LISTS</Typography>
                <Typography sx={subtitleStyles}>
                    There are total students
                </Typography>
            </Box>
            <Box sx={flexBoxStyles}>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={handleCreate}
                    sx={addButtonStyles(isMobile)}
                >
                    ADD CLASS
                </Button>
            </Box>

            <Box sx={inputBoxStyles}>
                <Box sx={searchBoxStyles}>
                    <TextField
                        placeholder='Search'
                        variant='outlined'
                        margin='normal'
                        sx={textFieldStyles}
                    />
                    <Hidden smDown>
                        <Button
                            variant='contained'
                            color='primary'
                            sx={searchButtonStyles}
                        >
                            Search
                        </Button>
                    </Hidden>
                </Box>
            </Box>
            <DataTable
                rows={rows}
                columns={columns}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onSelectedDelete={handleSelectedDelete}
                hideColumns={hideColumns}
                emptyTitle={'No Class'}
                emptySubTitle={'No Class Available'}
            />
        </Box>
    );
};

export default ClassListPage;

// Styles
const containerStyles = {
    width: '100%',
    margin: '0 auto',
    alignItems: 'end',
    flexWrap: 'wrap',
};

const titleStyles = {
    fontFamily: 'Roboto',
    fontWeight: 600,
    fontSize: { xs: '20px', sm: '32px' },
};

const subtitleStyles = {
    fontFamily: 'Roboto',
    fontSize: '16px',
};

const flexBoxStyles = {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    marginBottom: '16px',
};

const addButtonStyles = isMobile => ({
    width: isMobile ? '110px' : '140px',
    height: { xs: '38px', sm: '46px' },
    fontSize: isMobile ? '14px' : '16px',
    padding: isMobile ? '8px' : '10px',
});

const inputBoxStyles = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'right',
    marginBottom: '24px',
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

const searchBoxStyles = {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    gap: '24px',
    width: { xs: 1, sm: '540px' },
};

const textFieldStyles = {
    width: '100%',
    width: { xs: 1, sm: '540px' },
};

const searchButtonStyles = {
    width: '108px',
    height: 42,
    marginTop: '5px',
};

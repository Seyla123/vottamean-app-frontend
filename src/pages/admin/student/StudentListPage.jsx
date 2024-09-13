import React, { useState } from 'react';
import {
    Button,
    Box,
    Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../components/common/DataTable';
import FormComponent from '../../../components/common/FormComponent';
import FilterComponent from '../../../components/common/FilterComponent';
import SearchComponent from '../../../components/common/SearchComponent';
import { Link } from 'react-router-dom'
import { PlusIcon } from 'lucide-react';
const StudentListPage = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('');
    console.log('searchTerm', searchTerm);

    //Navigate to create page
    const handleCreate = () => {
        navigate(`/dashboard/students/create`);
    };
    //navigate to upfdate

    const handleChange = event => {
        setFilter(event.target.value);
    };
    const handleEdit = row => {
        navigate(`/dashboard/students/update/${row.id}`);
    };

    const handleDelete = row => {
        console.log('Delete row:', row);
    };
    // Static student data
    const columns = [
        { id: 'name', label: 'Name' },
        { id: 'gender', label: 'Gender' },
        { id: 'email', label: 'Email' },
        { id: 'phoneNumber', label: 'Phone Number' },
    ];

    const rows = [
        // {
        //     id: 1,
        //     name: 'Srey Mey',
        //     gender: 'Female',
        //     email: 'sreymey@example.com',
        //     phoneNumber: '1234567890',
        // },
        // {
        //     id: 2,
        //     name: 'Sok Vanna',
        //     gender: 'Male',
        //     email: 'sokvanna@example.com',
        //     phoneNumber: '0987654321',
        // },
        // {
        //     id: 3,
        //     name: 'Chenda Daro',
        //     gender: 'Male',
        //     email: 'chendadaro@example.com',
        //     phoneNumber: '0123456789',
        // },
    ];


    const handleSelectedDelete = () => {
        console.log('Delete all');
    };
    const classes = [
        { value: '12Aaaaaaaaaaa12Aaaaaaaaaa', label: '12Aaaaaaaaaaa12Aaaaaaaaaaaaa' },
        { value: '12B', label: '12B' },
        { value: '12C', label: '12C' },
    ];
    const hideColumns = ['name', 'phoneNumber'];

    return (
        <Box>
            <FormComponent
                title={'Student Lists'}
                subTitle={'There are 24 Students'}
            >
                {/* button add student container */}
                <Stack direction="row" justifyContent="flex-end">
                    {/* add student button */}
                    <Link to="/dashboard/classes/create">
                        <Button
                            size='large'
                            variant='contained'
                            color='primary'
                            startIcon={<PlusIcon size={20} />}
                        >
                            ADD STUDENT
                        </Button>
                    </Link>
                </Stack>

                {/* Container  */}
                <Box sx={inputBoxStyles}>
                    <Stack direction="row" justifyContent={'space-between'} width={'100%'} gap={2} >
                        {/* Filter by class */}
                        <FilterComponent
                            onChange={handleChange}
                            placeholder='By class'
                            data={classes}
                            value={filter}
                            customStyles={{ minWidth: '100px', maxWidth: '150px' }}
                        />

                        {/* Search student */}
                        <SearchComponent
                            sx={{ width: '100%', maxWidth: '700px' }}
                            placeholder='Search'
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            onClickIcon={() => console.log('click search icon')}
                        />
                    </Stack>
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
    width: '100%'
};

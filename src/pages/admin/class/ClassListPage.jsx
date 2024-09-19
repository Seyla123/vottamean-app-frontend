import { useState } from 'react';
import {
    Stack,
    Button,
    Box,
    Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../components/common/DataTable';
import { Link } from 'react-router-dom';
import SearchComponent from '../../../components/common/SearchComponent';
import FormComponent from '../../../components/common/FormComponent';
import { PlusIcon } from 'lucide-react';
import { useGetClassesQuery } from '../../../services/classApi'; // Adjust the import based on your project structure

const ClassListPage = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch classes using the API hook
    const { data: response = {}, error, isLoading } = useGetClassesQuery();
    const classes = response.data || []; ;

    const handleEdit = row => {
        navigate(`/dashboard/classes/update/${row.id}`);
    };

    const handleDelete = row => {
        console.log('Delete row:', row);
    };

    // Navigate to create page
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

    // Filter rows based on the search term
    const filteredRows = classes.filter(classItem =>
        classItem.class_name.toLowerCase().includes(searchTerm.toLowerCase())
    ) ;
    console.log('Filtered Rows:', filteredRows);


    const hideColumns = ['description'];

    return (
        <FormComponent title='Class List' subTitle={`Total Classes: ${classes.length}`}>
            {/* Button add class container */}
            <Stack direction="row" justifyContent="flex-end">
                <Link to="/dashboard/classes/create">
                    <Button
                        size='large'
                        variant='contained'
                        color='primary'
                        startIcon={<PlusIcon size={20} />}
                    >
                        ADD CLASS
                    </Button>
                </Link>
            </Stack>

            {/* Container */}
            <Box>
                <Stack direction="row" justifyContent={'flex-end'} width={'100%'} gap={2}>
                    {/* Search class */}
                    <SearchComponent
                        sx={{ width: '100%', maxWidth: '700px' }}
                        placeholder='Search'
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        onClickIcon={() => console.log('click search icon')}
                    />
                </Stack>
            </Box>

            {/* Loading and error handling */}
            {isLoading && <Typography>Loading classes...</Typography>}
            {error && <Typography>Error fetching classes: {error.message}</Typography>}

            <DataTable
                rows={filteredRows}
                columns={columns}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onSelectedDelete={handleSelectedDelete}
                hideColumns={hideColumns}
                emptyTitle={'No Class'}
                emptySubTitle={'No Class Available'}
            />
        </FormComponent>
    );
};

export default ClassListPage;

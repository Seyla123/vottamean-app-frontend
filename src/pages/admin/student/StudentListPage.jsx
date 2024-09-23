import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Button,
    Box,
    Stack,
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import DataTable from '../../../components/common/DataTable';
import FormComponent from '../../../components/common/FormComponent';
import FilterComponent from '../../../components/common/FilterComponent';
import SearchComponent from '../../../components/common/SearchComponent';
import { PlusIcon } from 'lucide-react';
import { useGetStudentsDataQuery } from '../../../services/studentApi';
import DeleteConfirmationModal from '../../../components/common/DeleteConfirmationModal';
import LoadingCircle from '../../../components/loading/LoadingCircle';

const columns = [
    { id: 'name', label: 'Name' },
    { id: 'gender', label: 'Gender' },
    { id: 'email', label: 'Email' },
    { id: 'phoneNumber', label: 'Phone Number' },
];

const StudentListPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [rows, setRows] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('');
    const [selectedClass , setSelectedClass ] = useState(null);

    // Fetch students using the API hook
    const { data, isLoading, isError,isSuccess, error } = useGetStudentsDataQuery();

    useEffect(() => {
        if (isSuccess && data) {
          const formattedStudents= data.data;
          setRows(formattedStudents);
          console.log('data :', formattedStudents);
        } 
      }, [isSuccess, data]);

    const handleCreate = () => {
        navigate(`/admin/students/create`);
    };

    const handleChange = event => {
        setFilter(event.target.value);
    };

    const handleEdit = row => {
        navigate(`/dashboard/students/update/${row.id}`);
    };

    const handleDelete = row => {
        console.log('Delete row:', row);
    };

    const handleSelectedDelete = () => {
        console.log('Delete all');
    };
    if(isLoading) {
        return <LoadingCircle />;
    }

    if (isError) {
        return <div>Error loading students: {error?.data?.message}</div>;
    }

    return (
        <Box>
            <FormComponent
                title={'Student Lists'}
                subTitle={`There are ${rows.length} Students`}
            >
                <Stack direction="row" justifyContent="flex-end">
                    <Link to="/admin/students/create">
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

                <Box sx={inputBoxStyles}>
                    <Stack direction="row" justifyContent={'space-between'} width={'100%'} gap={2}>
                        <FilterComponent
                            onChange={handleChange}
                            placeholder='By class'
                            data={[]}
                            value={filter}
                            customStyles={{ minWidth: '100px', maxWidth: '150px' }}
                        />

                        <SearchComponent
                            sx={{ width: '100%', maxWidth: '700px' }}
                            placeholder='Search'
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            onClickIcon={() => console.log('click search icon')}
                        />
                    </Stack>
                </Box>

                <DataTable
                    rows={rows}
                    columns={columns}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onSelectedDelete={handleSelectedDelete}
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

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Box, Stack } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import DataTable from '../../../components/common/DataTable';
import FormComponent from '../../../components/common/FormComponent';
import FilterComponent from '../../../components/common/FilterComponent';
import SearchComponent from '../../../components/common/SearchComponent';
import { PlusIcon } from 'lucide-react';
import {
  useDeleteStudentsDataMutation,
  useGetStudentsDataQuery,
} from '../../../services/studentApi';
import DeleteConfirmationModal from '../../../components/common/DeleteConfirmationModal';
import LoadingCircle from '../../../components/loading/LoadingCircle';
import { studentsData } from '../../../utils/formatData';
import { setSnackbar, setModal } from '../../../store/slices/uiSlice';

const columns = [
  { id: 'name', label: 'Name' },
  { id: 'gender', label: 'Gender' },
  { id: 'email', label: 'Email' },
  { id: 'phoneNumber', label: 'Phone Number' },
];

const StudentListPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { modal, snackbar } = useSelector((state) => state.ui);
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Fetch students using the API hook
  const { data, isLoading, isError, isSuccess } = useGetStudentsDataQuery({
    search: searchTerm,
  });

  const [deleteStudent, {isLoading: isDeleting, isSuccess: isDeleteSuccess,  isError: isDeleteError,  error } ] = useDeleteStudentsDataMutation();
 
  useEffect(() => {
    if (isSuccess && data) {
      const formattedStudents = studentsData(data.data);
      setRows(formattedStudents);
    }
  }, [isSuccess, data,dispatch]);
  //If loading is error, show error message
  if (isError) {
    console.log('error message :', error.data.message);
  }
  //filter change by Student
  const handleChange = (event) => {
    setFilter(event.target.value);
  };
  // Handle for goes to edit page
  const handleEdit = (row) => {
    navigate(`/dashboard/students/update/${row.student_id}`);
  };

   // When the delete is in progress, show a snackbar with a message "Deleting..."
  // When the delete is failed, show a snackbar with an error message
  // When the delete is successful, show a snackbar with a success message and navigate to the class list page
  useEffect(()=>{
    if(isDeleting){
      dispatch(setSnackbar({ open:true , message: 'Deleting...' ,severity : 'info'}));
    }else if(isDeleteError){
      dispatch(setSnackbar({ open:true , message: error.data.message , severity : 'error'}));
    }else if(isDeleteSuccess){
      dispatch(setSnackbar({ open:true , message: 'Deleted successfully', severity :'success'}));
      navigate('/admin/students');
    }
  },[dispatch, isDeleteError, isDeleteSuccess, isDeleting])

  // Handle delete clicked
  const handleDelete = (row) => {
    setSelectedStudent(row.id);
    dispatch(setModal({ open: true }));
  };
  // handle confirm deletion
  const handleDeleteConfirmed = async () => {
    dispatch(setModal({ open: false }));
    await deleteStudent(selectedStudent).unwrap();

  };
  // Handle for delete All
  const handleSelectedDelete = () => {
    console.log('Delete all');
  };
  const handleView = (row) => {
    navigate(`/dashboard/students/${row.id}`);
  }

//Loading Data
  if (isLoading) {
    return <LoadingCircle />;
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
              size="large"
              variant="contained"
              color="primary"
              startIcon={<PlusIcon size={20} />}
            >
              ADD STUDENT
            </Button>
          </Link>
        </Stack>

        <Box sx={inputBoxStyles}>
          <Stack
            direction="row"
            justifyContent={'space-between'}
            width={'100%'}
            gap={2}
          >
            <FilterComponent
              onChange={handleChange}
              placeholder="By Class"
              data={[]}
              value={filter}
              customStyles={{ minWidth: '100px', maxWidth: '150px' }}
            />

            <SearchComponent
              sx={{ width: '100%', maxWidth: '700px' }}
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Stack>
        </Box>

        <DataTable
          rows={rows}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
          onSelectedDelete={handleSelectedDelete}
          emptyTitle={'No Student'}
          emptySubTitle={'No Student Available'}
        />

        <DeleteConfirmationModal
          open={modal.open}
          onClose={() => dispatch(setModal({ open: false }))}
          onConfirm={handleDeleteConfirmed}
          itemName="Student"
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
};

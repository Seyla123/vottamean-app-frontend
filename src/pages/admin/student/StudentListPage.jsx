import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Box, Stack } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import FormComponent from '../../../components/common/FormComponent';
import FilterComponent from '../../../components/common/FilterComponent';
import SearchComponent from '../../../components/common/SearchComponent';
import { PlusIcon } from 'lucide-react';
import {
  useDeleteStudentMutation,
  useGetAllStudentsQuery,
} from '../../../services/studentApi';
import LoadingCircle from '../../../components/loading/LoadingCircle';
import { formatStudentsList } from '../../../utils/formatData';
import { setSnackbar } from '../../../store/slices/uiSlice';
import StudentListTable from '../../../components/student/StudentListTable';

const StudentListPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');

  // Fetch students using the API hook
  const { data, isLoading, isError, isSuccess } = useGetAllStudentsQuery({
    search: searchTerm,
  });

  const [
    deleteStudent,
    {
      isLoading: isDeleting,
      isSuccess: isDeleteSuccess,
      isError: isDeleteError,
      error,
    },
  ] = useDeleteStudentMutation();

  useEffect(() => {
    if (isSuccess && data) {
      const formattedStudents = formatStudentsList(data.data);
      setRows(formattedStudents);
    }
  }, [isSuccess, data, dispatch]);

  //If loading is error, show error message
  if (isError) {
    console.log('error message :', error.data.message);
  }
  //filter change
  const handleChange = (event) => {
    setFilter(event.target.value);
  };
  // Handle Search by  name
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // When the delete is in progress, show a snackbar with a message "Deleting..."
  // When the delete is failed, show a snackbar with an error message
  // When the delete is successful, show a snackbar with a success message and navigate to the class list page
  useEffect(() => {
    if (isDeleting) {
      dispatch(
        setSnackbar({ open: true, message: 'Deleting...', severity: 'info' }),
      );
    } else if (isDeleteError) {
      dispatch(
        setSnackbar({
          open: true,
          message: error.data.message,
          severity: 'error',
        }),
      );
    } else if (isDeleteSuccess) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Deleted successfully',
          severity: 'success',
        }),
      );
      navigate('/admin/students');
    }
  }, [dispatch, isDeleteError, isDeleteSuccess, isDeleting]);

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
              onChange={handleSearchChange}
            />
          </Stack>
        </Box>
        {/* Student Table */}
        <StudentListTable />
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

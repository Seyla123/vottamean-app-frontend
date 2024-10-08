import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import DataTable from '../../components/common/DataTable';
import { Box } from '@mui/material';
import {
  useDeleteStudentMutation,
  useGetAllStudentsQuery,
} from '../../services/studentApi';
import DeleteConfirmationModal from '../../components/common/DeleteConfirmationModal';
import LoadingCircle from '../../components/loading/LoadingCircle';
import { formatStudentsList } from '../../utils/formatData';
import { setSnackbar, setModal } from '../../store/slices/uiSlice';

const columns = [
  { id: 'name', label: 'Name' },
  { id: 'gender', label: 'Gender' },
  { id: 'Date of Birth', label: 'Date Of Birth' },
  { id: 'class', label: 'Class Name' },
  { id: 'address', label: 'Address' },
];

const StudentListTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { modal } = useSelector((state) => state.ui);
  const [rows, setRows] = useState([]);

  const [selectedStudent, setSelectedStudent] = useState(null);

  // Fetch students using the API hook
  const { data, isLoading, isError, isSuccess } = useGetAllStudentsQuery({});

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

  // Handle for goes to edit page
  const handleEdit = (row) => {
    navigate(`/admin/students/update/${row.id}`);
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
    navigate(`/admin/students/${row.id}`);
  };

  //Loading Data
  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <Box>
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
    </Box>
  );
};

export default StudentListTable;

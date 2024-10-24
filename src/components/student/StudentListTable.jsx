import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import DataTable from '../../components/common/DataTable';
import { Box } from '@mui/material';
import {
  useDeleteStudentMutation,
  useDeleteManyStudentsMutation,
  useGetAllStudentsQuery,
} from '../../services/studentApi';
import DeleteConfirmationModal from '../../components/common/DeleteConfirmationModal';
import LoadingCircle from '../../components/loading/LoadingCircle';
import { formatStudentsList } from '../../utils/formatData';
import { setSnackbar, setModal } from '../../store/slices/uiSlice';
import SomethingWentWrong from '../common/SomethingWentWrong';

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
  const [selectedStudents, setSelectedStudents] = useState([]); // Track selected students

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

  const [
    deleteManyStudents,
    {
      isLoading: isDeletingMany,
      isSuccess: isDeleteManySuccess,
      isError: isDeleteManyError,
    },
  ] = useDeleteManyStudentsMutation(); // Add mutation for deleting many students

  useEffect(() => {
    if (isSuccess && data) {
      const formattedStudents = formatStudentsList(data.data);
      setRows(formattedStudents);
    }
  }, [isSuccess, data, dispatch]);

  // If loading is error, show error message
  if (isError) {
    console.log('error message :', error.data.message);
  }

  // Handle for goes to edit page
  const handleEdit = (row) => {
    navigate(`/admin/students/update/${row.id}`);
  };

  // Snackbar handling for delete operations
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
    } else if (isDeletingMany) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Deleting selected students...',
          severity: 'info',
        }),
      );
    } else if (isDeleteManyError) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Error deleting selected students.',
          severity: 'error',
        }),
      );
    } else if (isDeleteManySuccess) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Selected students deleted successfully.',
          severity: 'success',
        }),
      );
      navigate('/admin/students');
    }
  }, [
    dispatch,
    isDeleteError,
    isDeleteSuccess,
    isDeleting,
    isDeletingMany,
    isDeleteManyError,
    isDeleteManySuccess,
  ]);

  // Handle delete clicked
  const handleDelete = (row) => {
    setSelectedStudent(row.id);
    dispatch(setModal({ open: true }));
    console.log('Preparing to delete student:', row);
  };

  // Handle confirm deletion of a single student
  const handleDeleteConfirmed = async () => {
    dispatch(setModal({ open: false }));
    await deleteStudent(selectedStudent).unwrap();
  };

  // Handle for delete All
  const handleSelectedDelete = () => {
    if (selectedStudents.length > 0) {
      dispatch(setModal({ open: true }));
    } else {
      dispatch(
        setSnackbar({
          open: true,
          message: 'No students selected for deletion.',
          severity: 'warning',
        }),
      );
    }
  };

  // Handle confirm deletion of selected students
  const handleDeleteManyConfirmed = async () => {
    dispatch(setModal({ open: false }));
    console.log('Deleting students with IDs:', selectedStudents);
    try {
      await deleteManyStudents(selectedStudents).unwrap();
      setSelectedStudents([]);
    } catch (error) {
      console.error('Error deleting students:', error);
    }
  };

  const handleView = (row) => {
    navigate(`/admin/students/${row.id}`);
  };

  //Loading Data
  if (isLoading) {
    return <LoadingCircle />;
  }
  if (isError) {
    return <SomethingWentWrong description={error?.data?.message} />
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
        setSelectedStudents={setSelectedStudents}
        emptyTitle={'No Student'}
        emptySubTitle={'No Student Available'}
      />

      <DeleteConfirmationModal
        open={modal.open}
        onClose={() => dispatch(setModal({ open: false }))}
        onConfirm={
          selectedStudents.length > 0
            ? handleDeleteManyConfirmed
            : handleDeleteConfirmed
        } // Check if many students are selected
        itemName={selectedStudents.length > 0 ? 'Students' : 'Student'}
      />
    </Box>
  );
};

export default StudentListTable;

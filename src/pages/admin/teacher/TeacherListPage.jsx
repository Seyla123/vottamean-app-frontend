// React and third-party libraries
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Stack, Button } from '@mui/material';

// Custom components
import FormComponent from '../../../components/common/FormComponent';
import DataTable from '../../../components/common/DataTable';
import SearchComponent from '../../../components/common/SearchComponent';
import LoadingCircle from '../../../components/loading/LoadingCircle';
import DeleteConfirmationModal from '../../../components/common/DeleteConfirmationModal';
import SomethingWentWrong from '../../../components/common/SomethingWentWrong';

// Redux API and slice
import {
  useGetAllTeachersQuery,
  useDeleteTeacherMutation,
  useDeleteManyTeachersMutation,
} from '../../../services/teacherApi';
import { setModal, setSnackbar } from '../../../store/slices/uiSlice';

// Format data
import { teacherData } from '../../../utils/formatData';
// Update Modal
import UpdateTeacherForm from '../../../components/teacher/UpdateTeacherForm';
// Icon from lucide
import { PlusIcon } from 'lucide-react';
import StyledButton from '../../../components/common/StyledMuiButton';
import TitleHeader from '../../../components/common/TitleHeader';

// Table columns
const columns = [
  { id: 'name', label: 'Full Name' },
  { id: 'gender', label: 'Gender' },
  { id: 'email', label: 'Email' },
  { id: 'phoneNumber', label: 'Contact Number' },
];

const TeacherListPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // - rows: the teacher records that are currently being displayed on the page
  // - searchTerm: the search term that is currently being used to filter the table
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // - selectedItems: the teacher records that are currently being selected
  // - selectedTeacherId: the id of the teacher that is currently being updated
  // - isUpdateOpen: the state of the update modal
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  // - rowsPerPage: the number of rows per page
  // - page: the current page number that is being displayed
  // - totalRows: the total number of rows that are available
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);

  // open: the state of the delete confirmation modal
  const { modal } = useSelector((state) => state.ui);

  // useGetAllTeachersQuery : a hook return function for fetching all teachers records
  const {
    data: allTeachersData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllTeachersQuery({
    search: searchTerm,
    limit: rowsPerPage,
    page: page + 1,
  });

  // useDeleteTeacherMutation : a hook return function for Delete teacher
  const [
    deleteTeacher,
    {
      isLoading: isDeleting,
      isError: isDeleteError,
      isSuccess: isDeleteSuccess,
      error: deleteError,
    },
  ] = useDeleteTeacherMutation();

  // useDeleteManyTeachersMutation : a hook return function for Delete many teachers
  const [
    deleteManyTeachers,
    {
      isLoading: isDeletingMany,
      isError: isDeleteManyError,
      isSuccess: isDeleteManySuccess,
      error: deleteManyError,
    },
  ] = useDeleteManyTeachersMutation();

  //  when the teachers records are fetched successfully, transform the data and set the rows state
  useEffect(() => {
    if (isSuccess && allTeachersData) {
      const formattedData = teacherData(allTeachersData.data);
      setRows(formattedData);
      setTotalRows(allTeachersData.results);
    }
  }, [allTeachersData, isSuccess, searchTerm]);

  // when delete is in progress, show a snackbar with a message "Deleting..."
  // when delete is failed, show a snackbar with an error message
  // when delete is successful, show a snackbar with a success message
  useEffect(() => {
    if (isDeleting || isDeletingMany) {
      dispatch(
        setSnackbar({ open: true, message: 'Deleting...', severity: 'info' }),
      );
    } else if (isDeleteSuccess || isDeleteManySuccess) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Deleted successfully',
          severity: 'success',
        }),
      );
    } else if (isDeleteError) {
      dispatch(
        setSnackbar({
          open: true,
          message: deleteError.data.message || 'Failed to delete teacher',
          severity: 'error',
        }),
      );
    } else if (isDeleteManyError) {
      dispatch(
        setSnackbar({
          open: true,
          message: deleteManyError.data.message || 'Failed to delete teachers',
          severity: 'error',
        }),
      );
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

  // Handle page change
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
  // Handle row per page change
  const handleChangeRowsPerPage = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
  };

  // Handle search name
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle Update clicked
  const handleEdit = (teacher) => {
    setSelectedTeacherId(teacher.id);
    setIsUpdateOpen(true);
  };

  // Handle view teacher information
  const handleView = (row) => {
    navigate(`/admin/teachers/${row.id}`);
  };

  // Handle delete one clicked
  const handleDelete = (row) => {
    setSelectedItems(row);
    dispatch(setModal({ open: true }));
  };

  // Handle delete multiple teachers
  const handleMultiDelete = async (selectedIds) => {
    dispatch(setModal({ open: false }));
    await deleteManyTeachers(selectedIds).unwrap();
  };

  // Handle confirm deletion of a single teacher
  const handleConfirmDeleteOne = async () => {
    dispatch(setModal({ open: false }));
    await deleteTeacher(selectedItems?.id).unwrap();
  };

  // Loading and error state
  if (isLoading) {
    return <LoadingCircle />;
  }

  // if error occur
  if (isError) {
    return <SomethingWentWrong description={error?.data?.message} />;
  }

  return (
    <FormComponent>
      {/* Add Teacher Button */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <TitleHeader title={'Teacher'} />
        <Link to="/admin/teachers/create">
          <StyledButton
            variant="contained"
            color="primary"
            size="small"
            startIcon={<PlusIcon size={18} />}
          >
            Create Teacher
          </StyledButton>
        </Link>
      </Stack>
      {/* Search bar */}
      <Stack direction="row" justifyContent={'flex-end'} width={'100%'} gap={2}>
        <SearchComponent
          sx={{ width: '100%', maxWidth: '700px' }}
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Stack>
      {/* Table */}
      <DataTable
        rows={rows}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        onSelectedDelete={handleMultiDelete}
        emptyTitle="No Teachers"
        emptySubTitle="No Teachers Available."
        hideColumns={['phoneNumber', 'email']}
        page={page}
        rowsPerPage={rowsPerPage}
        setPage={handleChangePage}
        setRowsPerPage={handleChangeRowsPerPage}
        totalRows={totalRows}
      />
      {/* Delete confirmation modal */}
      <DeleteConfirmationModal
        open={modal.open}
        onClose={() => dispatch(setModal({ open: false }))}
        onConfirm={handleConfirmDeleteOne}
        itemName={selectedItems?.name}
      />
      {/* Update teacher modal */}
      <UpdateTeacherForm
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        teacherId={selectedTeacherId}
      />
    </FormComponent>
  );
};

export default TeacherListPage;

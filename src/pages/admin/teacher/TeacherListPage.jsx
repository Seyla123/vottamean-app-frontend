// React and third-party libraries
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Stack, Button } from '@mui/material';

// Custom components
import FormComponent from '../../../components/common/FormComponent';
import DataTable from '../../../components/common/DataTable';
import SearchComponent from '../../../components/common/SearchComponent';
import LoadingCircle from '../../../components/loading/LoadingCircle';
import DeleteConfirmationModal from '../../../components/common/DeleteConfirmationModal';

// Redux API and slice
import {
  useGetAllTeachersQuery,
  useDeleteTeacherMutation,
} from '../../../services/teacherApi';
import { setSnackbar } from '../../../store/slices/uiSlice';

// Format data
import { teacherData } from '../../../utils/formatData';
// Update Modal
import UpdateTeacherForm from '../../../components/teacher/UpdateTeacherForm';
// Icon from lucide
import { PlusIcon } from 'lucide-react';

// Table columns
const columns = [
  { id: 'name', label: 'Name' },
  { id: 'gender', label: 'Gender' },
  { id: 'email', label: 'Email' },
  { id: 'phoneNumber', label: 'Phone Number' },
];

const TeacherListPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState(null);

  // Get all teachers
  const {
    data: allTeachersData,
    isLoading,
    isSuccess,
    isError,
  } = useGetAllTeachersQuery({ search: searchTerm });

  // Delete teacher
  const [deleteTeacher] = useDeleteTeacherMutation();

  // Format data
  useEffect(() => {
    if (isSuccess && allTeachersData) {
      const formattedData = teacherData(allTeachersData.data);
      setRows(formattedData);
    }
  }, [allTeachersData, isSuccess, searchTerm]);

  // Handle search name
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle Update teacher information
  const handleEdit = (teacher) => {
    setSelectedTeacherId(teacher.id);
    setIsUpdateOpen(true);
  };

  // Handle view teacher information
  const handleView = (row) => {
    navigate(`/admin/teachers/${row.id}`);
  };

  // Handle delete a single teacher
  const handleDelete = (row) => {
    setSelectedItems([row.id]);
    setIsOpen(true);
  };
  // Handle delete multiple teachers
  const handleMultiDelete = (selected) => {
    if (selected.length > 0) {
      setSelectedItems(selected);
      setIsOpen(true);
    }
  };

  // Confirm delete
  const confirmDelete = async () => {
    setIsOpen(false);
    try {
      dispatch(
        setSnackbar({
          open: true,
          message: `Deleting ${selectedItems.length > 1 ? 'teachers' : 'teacher'}`,
          severity: 'info',
        }),
      );
      // Loop through selected items to delete
      // Delete each of the selected teachers
      for (const id of selectedItems) {
        // extract the result of the mutation
        await deleteTeacher(id).unwrap();
      }
      dispatch(
        setSnackbar({
          open: true,
          message: `Deleted successfully ${selectedItems.length > 1 ? 'teachers' : 'teacher'}`,
          severity: 'success',
        }),
      );
    } catch (error) {
      console.error('Error deleting teachers:', error);
      dispatch(
        setSnackbar({
          open: true,
          message: `Failed to delete ${selectedItems.length > 1 ? 'teachers' : 'teacher'}`,
          severity: 'error',
        }),
      );
    } finally {
      setSelectedItems([]); // Clear selected items
    }
  };

  // Loading and error state
  if (isLoading) {
    return <LoadingCircle />;
  }
  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <FormComponent
      title="Teacher List"
      subTitle={
        rows.length === 1
          ? `There is ${rows.length} teacher`
          : `There are ${rows.length} teachers`
      }
    >
      {/* Add Teacher Button */}
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        mb={2}
      >
        <Link to="/admin/teachers/create">
          <Button
            size="large"
            variant="contained"
            color="primary"
            startIcon={<PlusIcon size={20} />}
          >
            ADD TEACHER
          </Button>
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
        hideColumns={['phoneNumber', 'email']}
        emptyTitle="No Teachers"
        emptySubTitle="No Teachers Available. Click 'ADD TEACHER' to create one."
        onSelectedDelete={handleMultiDelete}
      />
      {/* Delete confirmation modal */}
      <DeleteConfirmationModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={confirmDelete}
        itemName={` Teacher${selectedItems.length > 1 ? 's' : ''} `}
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

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Stack, Box, Button, IconButton } from '@mui/material';
import { PlusIcon, Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import FormComponent from '../../../components/common/FormComponent';
import DataTable from '../../../components/common/DataTable';
import SearchComponent from '../../../components/common/SearchComponent';
import {
  useGetAllTeachersQuery,
  useDeleteTeacherMutation,
} from '../../../services/teacherApi';
import LoadingCircle from '../../../components/loading/LoadingCircle';
import DeleteConfirmationModal from '../../../components/common/DeleteConfirmationModal';
import { teacherData } from '../../../utils/formatData';
import { setSnackbar } from '../../../store/slices/uiSlice';

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


  // Get all teachers
  const {
    data: allTeachersData,
    isLoading,
    isSuccess,
  } = useGetAllTeachersQuery({
    search: searchTerm,
  });
  // Delete teacher 
  const [deleteTeacher] = useDeleteTeacherMutation();


  // Format teacher data and set it in the state
  useEffect(() => {
    if (isSuccess && allTeachersData) {
      const formattedData = teacherData(allTeachersData.data);
      setRows(formattedData);
    }
  }, [allTeachersData, isSuccess]);


  // Handle Search by teacher name
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle Edit action
  const handleEdit = (row) => {
    navigate(`/admin/teachers/update/${row.id}`);
  };

  // Handle View action
  const handleView = (row) => {
    navigate(`/admin/teachers/${row.id}`);
  };

  // Handle Delete action
  const handleDelete = (row) => {
    setSelectedItems([row.id]);
    setIsOpen(true);
  };

  // Handle Confirm Delete
  const confirmDelete = async () => {
    setIsOpen(false);
    try {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Deleting...',
          severity: 'info',
        }),
      );
      // Delete each selected teacher row
      let newRows = [...rows];
      // Access the item of the selected rows
      for (const id of selectedItems) {
        try {
          await deleteTeacher(id).unwrap();
          // Remove the deleted teacher from the list of rows
          newRows = newRows.filter((row) => row.id !== id); 
          // create a new aray of rows excluding the deleted teachers
        } catch (error) {
          console.error('Error deleting teacher:', error);
          dispatch(
            setSnackbar({
              open: true,
              message:'Failed to delete teacher',
              severity: 'error',
            }),
          );
          // Stop the deletion process
          return;
        }
      }
      // Update the state with the new list of rows
      setRows(newRows);
      dispatch(
        setSnackbar({
          open: true,
          message: 'Deleted successfully',
          severity: 'success',
        }),
      );
    } catch (error) {
      console.error('Error deleting teachers:', error);
      dispatch(
        setSnackbar({
          open: true,
          message: 'Failed to delete teachers',
          severity: 'error',
        }),
      );
    } finally {
      setSelectedItems([]); // Clear selectedItems
    }
  };

  // Handle multiple delete
  const handleMultiDelete = (selected) => {
    if (selected.length > 0) {
      setIsOpen(true);
    }
  };

  // loading state
  if (isLoading) {
    return <LoadingCircle />;
  }
  // error state
  if (!isSuccess) {
    return <div>Error fetching data</div>;
  }
  
  return (
    <FormComponent
      title="Teacher List"
      subTitle={`There are ${rows.length} Teachers`}
    >
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
      <Stack direction="row" justifyContent={'flex-end'} width={'100%'} gap={2}>
        <SearchComponent
          sx={{ width: '100%', maxWidth: '300px' }}
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Stack>
      <DataTable
        rows={rows}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        hideColumns={['phoneNumber', 'email']}
        emptyTitle="No Teachers"
        emptySubTitle="No Teachers Available"
        onSelectedDelete={handleMultiDelete}
      />
      <DeleteConfirmationModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={confirmDelete}
        itemName={` Teacher${selectedItems.length > 1 ? 's' : ''} `}
      />
    </FormComponent>
  );
};

export default TeacherListPage;

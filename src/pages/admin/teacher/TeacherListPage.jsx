import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Stack, Box, Button } from '@mui/material';
import { PlusIcon } from 'lucide-react';
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
import UpdateTeacherForm from '../../../components/teacher/UpdateTeacherForm';

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

  const {
    data: allTeachersData,
    isLoading,
    isSuccess,
    isError,
  } = useGetAllTeachersQuery({ search: searchTerm });

  const [deleteTeacher] = useDeleteTeacherMutation();

  useEffect(() => {
    if (isSuccess && allTeachersData) {
      const formattedData = teacherData(allTeachersData.data);
      setRows(formattedData);
    }
  }, [allTeachersData, isSuccess, searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleEdit = (row) => {
    setSelectedTeacherId(row.id);
    setIsUpdateOpen(true);
  };

  const handleView = (row) => {
    navigate(`/admin/teachers/${row.id}`);
  };

  const handleDelete = (row) => {
    setSelectedItems([row.id]);
    setIsOpen(true);
  };

  const handleMultiDelete = (selected) => {
    if (selected.length > 0) {
      setSelectedItems(selected);
      setIsOpen(true);
    }
  };

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

      for (const id of selectedItems) {
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
      setSelectedItems([]);
    }
  };

  if (isLoading) {
    return <LoadingCircle />;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <FormComponent
      title="Teacher List"
      subTitle={`There are ${rows.length} Teachers`}
    >
      <Stack direction="row" justifyContent="flex-end" alignItems="center" mb={2}>
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
          sx={{ width: '100%', maxWidth: '700px' }}
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
        emptySubTitle="No Teachers Available. Click 'ADD TEACHER' to create one."
        onSelectedDelete={handleMultiDelete}
      />
      <DeleteConfirmationModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={confirmDelete}
        itemName={` Teacher${selectedItems.length > 1 ? 's' : ''} `}
      />
       <UpdateTeacherForm
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        teacherId={selectedTeacherId}
      />
    </FormComponent>
  );
};

export default TeacherListPage;
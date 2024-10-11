import React, { useEffect, useState } from 'react';
import { Stack, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { PlusIcon } from 'lucide-react';
// import components
import DataTable from '../../../components/common/DataTable';
import SearchComponent from '../../../components/common/SearchComponent';
import FormComponent from '../../../components/common/FormComponent';
import CircularIndeterminate from '../../../components/loading/LoadingCircle';
import DeleteConfirmationModal from '../../../components/common/DeleteConfirmationModal';
import CreateModal from '../../../components/common/CreateModal';
import EditModal from '../../../components/common/EditModal';
import ViewModal from '../../../components/common/ViewModal';
// import api and uiSlice
import { setSnackbar, setModal } from '../../../store/slices/uiSlice';
import {
  useDeleteClassesDataMutation,
  useGetClassesDataQuery,
  usePostClassesDataMutation,
  useUpdateClassesDataMutation,
  useGetClassesByIdQuery,
} from '../../../services/classApi';
import { ClassValidator } from '../../../validators/validationSchemas';
import StyledButton from '../../../components/common/StyledMuiButton';

// Define table columns title
const columns = [
  { id: 'class_id', label: 'Class ID' },
  { id: 'class_name', label: 'Class Name' },
  { id: 'description', label: 'Description' },
];

const ClassListPage = () => {
  const [rows, setRows] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [search, setSearch] = useState('');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const dispatch = useDispatch();
  const { modal } = useSelector((state) => state.ui);

  // API hooks
  const { data, isLoading, isSuccess, isError } = useGetClassesDataQuery();
  const [
    deleteClasses,
    {
      isLoading: isDeleting,
      isSuccess: isDeleteSuccess,
      isError: isDeleteError,
      error: deleteError,
    },
  ] = useDeleteClassesDataMutation();

  const [postClassesData] = usePostClassesDataMutation();

  useEffect(() => {
    if (data && isSuccess) {
      setRows(data.data);
    }

    if (isDeleting) {
      dispatch(
        setSnackbar({ open: true, message: 'Deleting...', severity: 'info' }),
      );
    } else if (isDeleteError) {
      dispatch(
        setSnackbar({
          open: true,
          message: deleteError.data?.message || 'Failed to delete class',
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
    }
  }, [
    data,
    isSuccess,
    isDeleting,
    isDeleteError,
    isDeleteSuccess,
    dispatch,
    deleteError,
  ]);

  if (isLoading) {
    return <CircularIndeterminate />;
  }

  if (isError) {
    console.log('error message:', isError.data.message);
  }

  const handleCreate = async (formData) => {
    try {
      await postClassesData(formData).unwrap();
      dispatch(
        setSnackbar({
          open: true,
          message: 'Class created successfully',
          severity: 'success',
        }),
      );
      setCreateModalOpen(false);
    } catch (error) {
      dispatch(
        setSnackbar({
          open: true,
          message: error.data?.message || 'Failed to create class',
          severity: 'error',
        }),
      );
    }
  };

  // DELETE FUNCTIONS
  const handleDelete = (row) => {
    setSelectedClass(row);
    dispatch(setModal({ open: true }));
  };

  const handleDeleteConfirmed = async () => {
    dispatch(setModal({ open: false }));
    try {
      await deleteClasses(selectedClass?.class_id).unwrap();
      dispatch(
        setSnackbar({
          open: true,
          message: 'Class deleted successfully',
          severity: 'success',
        }),
      );
    } catch (error) {
      dispatch(
        setSnackbar({
          open: true,
          message: error.data?.message || 'Failed to delete class',
          severity: 'error',
        }),
      );
    }
  };

  // VIEW FUNCTIONS
  const handleView = (row) => {
    setSelectedClass(row);
    setViewModalOpen(true);
  };

  const handleEditOpen = (row) => {
    setSelectedClass(row);
    setEditModalOpen(true);
  };

  // DELETE MULTIPLE FUNCTIONS
  const handleSelectedDelete = async (selectedIds) => {
    try {
      await Promise.all(selectedIds.map((id) => deleteClasses(id).unwrap()));
      dispatch(
        setSnackbar({
          open: true,
          message: 'Selected classes deleted successfully',
          severity: 'success',
        }),
      );
    } catch (error) {
      dispatch(
        setSnackbar({
          open: true,
          message: error.data?.message || 'Failed to delete selected classes',
          severity: 'error',
        }),
      );
    }
  };

  return (
    <FormComponent
      title="Class List"
      subTitle={`Total Classes: ${rows.length}`}
    >
      <Stack direction="row" justifyContent="flex-end">
        <StyledButton
          size="large"
          variant="contained"
          color="primary"
          startIcon={<PlusIcon size={18} />}
          onClick={() => setCreateModalOpen(true)}
        >
          Create class
        </StyledButton>
      </Stack>
      <Box>
        <Stack
          direction="row"
          justifyContent={'flex-end'}
          width={'100%'}
          gap={2}
        >
          <SearchComponent
            sx={{ width: '100%', maxWidth: '700px' }}
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClickIcon={() => console.log('click search icon')}
          />
        </Stack>
      </Box>
      <DataTable
        rows={rows}
        columns={columns}
        onEdit={handleEditOpen}
        onDelete={handleDelete}
        onView={handleView}
        onSelectedDelete={handleSelectedDelete}
        hideColumns={['description']}
        emptyTitle={'No Class'}
        emptySubTitle={'No Class Available'}
        isLoading={isLoading}
        showNO={false}
        idField="class_id"
      />
      {/* CREATE CLASS MODAL */}
      <CreateModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Create New Class"
        description="Enter the details for the new class"
        fields={[
          {
            name: 'class_name',
            label: 'Class Name',
            required: true,
            icon: '',
          },
          {
            name: 'description',
            label: 'Description',
            required: true,
            multiline: true,
            icon: '',
          },
        ]}
        onSubmit={handleCreate}
        validationSchema={ClassValidator}
        submitText={'Create Class'}
      />

      <EditModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Update Class"
        description="Update the class details"
        fields={[
          {
            name: 'class_name',
            label: 'Class Name',
            required: true,
            icon: '',
          },
          {
            name: 'description',
            label: 'Description',
            required: true,
            multiline: true,
            icon: '',
          },
        ]}
        validationSchema={ClassValidator}
        id={selectedClass?.class_id}
        getDataQuery={useGetClassesByIdQuery}
        useUpdateDataMutation={useUpdateClassesDataMutation}
       
      />

      <ViewModal
        open={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        title="View Class"
        description="Class details"
        data={selectedClass}
      />
      <DeleteConfirmationModal
        open={modal.open}
        onClose={() => dispatch(setModal({ open: false }))}
        onConfirm={handleDeleteConfirmed}
        itemName={selectedClass?.class_name}
      />
    </FormComponent>
  );
};

export default ClassListPage;

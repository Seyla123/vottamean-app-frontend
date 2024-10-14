import React, { useEffect, useState } from 'react';
import { Stack, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { PlusIcon } from 'lucide-react';
// import components
import DataTable from '../../../components/common/DataTable';
import SearchComponent from '../../../components/common/SearchComponent';
import FormComponent from '../../../components/common/FormComponent';
import LoadingCircle from '../../../components/loading/LoadingCircle';
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
  useDeleteManyClassesMutation,
} from '../../../services/classApi';
import { ClassValidator } from '../../../validators/validationSchemas';
import StyledButton from '../../../components/common/StyledMuiButton';
import SomethingWentWrong from '../../../components/common/SomethingWentWrong';

// Define table columns title
const columns = [
  { id: 'class_id', label: 'Class ID' },
  { id: 'class_name', label: 'Class Name' },
  { id: 'description', label: 'Description' },
];

const ClassListPage = () => {
  const dispatch = useDispatch();

  // - rows: the teacher records that are currently being displayed on the page
  // - search: the search term that is currently being used to filter the table
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState('');

  // - selectedClass: the class record that is currently being selected
  const [selectedClass, setSelectedClass] = useState(null);

  // - createModalOpen: the state of the create modal
  // - editModalOpen: the state of the edit modal
  // - viewModalOpen: the state of the view modal
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  // open: the state of the delete confirmation modal
  const { modal } = useSelector((state) => state.ui);

  // - rowsPerPage: the number of rows per page 
  // - page: the current page number that is being displayed
  // - totalRows: the total number of rows that are available 
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0)

  //useGetClassesDataQuery :  a hook that returns a function to fetch classes record
  const { data, isLoading, isSuccess, isError, error } = useGetClassesDataQuery({ search: search, limit: rowsPerPage, page: page + 1 });

  //useDeleteManyClassesMutation :  a hook that returns a function to delete many class record
  const [
    deleteManyClasses,
    {
      isLoading: isDeletingMany,
      isSuccess: isDeleteManySuccess,
      isError: isDeleteManyError,
    },
  ] = useDeleteManyClassesMutation();

  //useDeleteClassesDataMutation :  a hook that returns a function to delete an class record
  const [
    deleteClasses,
    {
      isLoading: isDeleting,
      isSuccess: isDeleteSuccess,
      isError: isDeleteError,
      error: deleteError,
    },
  ] = useDeleteClassesDataMutation();

  //usePostClassesDataMutation :  a hook that returns a function to create an class record
  const [postClassesData, { isLoading: isCreating, isSuccess: isCreatedSuccess, isError: isCreateError, erorr: createError }] = usePostClassesDataMutation();

  //  when the class records are fetched successfully, set the rows state
  useEffect(() => {
    if (data && isSuccess) {
      setRows(data.data);
      setTotalRows(data.results)
    }
  }, [data, isSuccess]);

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
  }
  // Handle row per page change
  const handleChangeRowsPerPage = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
  };

  useEffect(() => {
    if (isCreatedSuccess){
      dispatch(setModal({ open: false, message: 'Class created successfully', severity: 'success' }));
      setCreateModalOpen(false);
    } else if(isError){
      dispatch(setModal({ open: false, message: createError.data.message || 'Failed to create class', severity: 'error' }));
      setCreateModalOpen(false);
    }
  }, []);
  // CREATE FUNCTION
  const handleCreate = async (formData) => {
    await postClassesData(formData).unwrap();
  };

  // Handle delete button click
  const handleDelete = (row) => {
    setSelectedClass(row);
    dispatch(setModal({ open: true }));
  };

  // Handle confirm deletion
  const handleDeleteConfirmed = async () => {
    dispatch(setModal({ open: false }));
    await deleteClasses(selectedClass?.class_id).unwrap();
  };

  // Handle view button clickl
  const handleView = (row) => {
    setSelectedClass(row);
    setViewModalOpen(true);
  };

  // Handle edit button click
  const handleEditOpen = (row) => {
    setSelectedClass(row);
    setEditModalOpen(true);
  };

  // Handle delete multiple button click
  const handleSelectedDelete = async (selectedIds) => {
    dispatch(setModal({ open: false }));
    await deleteManyClasses(selectedIds).unwrap();
  };

  if (isLoading) {
    return <LoadingCircle />;
  }

  if (isError) {
    return <SomethingWentWrong description={error?.data?.message} />
  }
  return (
    <FormComponent
      title="Class List"
      subTitle={`Total Classes: ${totalRows}`}
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
        page={page}
        rowsPerPage={rowsPerPage}
        setPage={handleChangePage}
        setRowsPerPage={handleChangeRowsPerPage}
        totalRows={totalRows}
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
        isLoading={isCreating}
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
        title="Class Details"
        description={`These are Subject's information`}
        data={selectedClass}
        icons={''}
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

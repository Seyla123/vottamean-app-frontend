import { useEffect, useState } from 'react';
import { Stack, Button, Box, Snackbar, Alert } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { PlusIcon } from 'lucide-react';
import DataTable from '../../../components/common/DataTable';
import SearchComponent from '../../../components/common/SearchComponent';
import FormComponent from '../../../components/common/FormComponent';
import DeleteConfirmationModal from '../../../components/common/DeleteConfirmationModal';
import LoadingCircle from '../../../components/loading/LoadingCircle';
import {
  useDeleteClassesDataMutation,
  useGetClassesDataQuery,
} from '../../../services/classApi';
import {
  setRows,
  setSearch,
  setSelectedClass,
  setSnackbar
} from '../../../store/slices/classSlice';
import { setModel } from '../../../store/slices/uiSlice';
import { useDispatch, useSelector } from 'react-redux';

const ClassListPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { rows, selectClass, search,snackbar } = useSelector((state) => state.classes);
  const { model } = useSelector((state) => state.ui);

  // Fetch classes using the API hook
  const { data, isLoading } = useGetClassesDataQuery();
  const [deleteClasses, { isLoading: isDeleting, isSuccess, isError, error }] =
    useDeleteClassesDataMutation();

  useEffect(() => {
    if (data) {
      const classes = data.data;
      dispatch(setRows(classes));
      console.log('data :', classes);
    } else {
      dispatch(setRows([]));
      console.log('data is null');
    }
  }, [data, isSuccess, dispatch]);
  // Handle delete confirmation
  const handleDelete = (row) => {
    dispatch(setSelectedClass(row));
    dispatch(setModel({ open: true }));
  };

  if (isError) {
    console.log('error message :', error.data.message);
  }
  const handleDeleteConfirmed = async () => {
    try {
      dispatch(setModel({ open: false }));
     await deleteClasses(selectClass.class_id).unwrap();
    } catch (error) {
     console.log('error message :', error);
    }
  };
  const handleEdit = (row) => {
    navigate(`/admin/classes/update/${row.class_id}`);
  };

  if (isLoading) {
    return <LoadingCircle />;
  }
  const handleSelectedDelete = () => {
    console.log('Delete all');
  };
  const handleView = (row) => {
    navigate(`/admin/classes/${row.class_id}`);
  };

  const columns = [
    { id: 'class_id', label: 'Class ID' },
    { id: 'class_name', label: 'Class Name' },
    { id: 'description', label: 'Description' },
  ];
  const hideColumns = ['description'];

  return (
    <FormComponent
      title="Class List"
      subTitle={`Total Classes: ${rows.length}`}
    >
      {/* Button add class container */}
      <Stack direction="row" justifyContent="flex-end">
        <Link to="/admin/classes/create">
          <Button
            size="large"
            variant="contained"
            color="primary"
            startIcon={<PlusIcon size={20} />}
          >
            ADD CLASS
          </Button>
        </Link>
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
            onChange={(e) => dispatch(setSearch(e.target.value))}
            onClickIcon={() => console.log('click search icon')}
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
        hideColumns={hideColumns}
        emptyTitle={'No Class'}
        emptySubTitle={'No Class Available'}
      />
      <DeleteConfirmationModal
        open={model.open}
        onClose={() => dispatch(setModel({ open: false }))}
        onConfirm={handleDeleteConfirmed}
        itemName="Class"
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => dispatch(setSnackbar({ open: false }))}
      >
        <Alert
          onClose={() => dispatch(setSnackbar({ open: false }))}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </FormComponent>
  );
};

export default ClassListPage;

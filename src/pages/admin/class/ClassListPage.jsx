import { useEffect, useState } from 'react';
import { Stack, Button, Box, Snackbar, Alert } from '@mui/material';
<<<<<<< HEAD
import { useNavigate, Link } from 'react-router-dom';
import { PlusIcon } from 'lucide-react';
=======
import { useNavigate } from 'react-router-dom';
>>>>>>> ef360aa (feature: add delete to classs list)
import DataTable from '../../../components/common/DataTable';
import SearchComponent from '../../../components/common/SearchComponent';
import FormComponent from '../../../components/common/FormComponent';
<<<<<<< HEAD
=======
import { PlusIcon } from 'lucide-react';
import CircularIndeterminate from '../../../components/loading/LoadingCircle';
import ClassCardSkeleton from '../../../components/loading/ClassCardSkeleton';
>>>>>>> ef360aa (feature: add delete to classs list)
import DeleteConfirmationModal from '../../../components/common/DeleteConfirmationModal';
import LoadingCircle from '../../../components/loading/LoadingCircle';
import {
  useDeleteClassesDataMutation,
  useGetClassesDataQuery,
} from '../../../services/classApi';
<<<<<<< HEAD
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
<<<<<<< HEAD
  const { data, isLoading } = useGetClassesDataQuery();
  const [deleteClasses, { isLoading: isDeleting, isSuccess, isError, error }] =
    useDeleteClassesDataMutation();
=======
  const { data, error, isLoading } = useGetClassesDataQuery();
  if (isLoading) {
    return ClassCardSkeleton;
  }
  if (error) {
    return CircularIndeterminate;
  }
  // Ensure data is defined before mapping
  const classesData = data?.data
  ?.filter((item) => {
    return (
      item.class_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  })
  .map((item) => {
    const { class_id, class_name, description } = item;
    return {
      class_id,
      class_name,
      description,
    };
  });
>>>>>>> a7df0ed (feature: rebase develop into class-fetch api)
=======

const ClassListPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(' ');
  const [rows, setRows] = useState([]);
  // Fetch classes using the API hook
  const { data, error, isLoading, refetch } = useGetClassesDataQuery();
  const [ deleteClasses, { isLoading: isDeleting, isSuccess }] = useDeleteClassesDataMutation();
  useEffect(() => {
    if(data){
      const classes = data.data;
      setRows(classes)
    }
  }, [data,isSuccess]);
  // Delete class using the API hook

  // if (isLoading) {
  //   return ClassCardSkeleton;
  // }
  // if (error) {
  //   return CircularIndeterminate;
  // }
  // Handle delete confirmation
  const handleDelete = (row) => {
    setItemToDelete(row);
    setIsOpen(true);
  };
  const handleDeleteConfirmed = async () => {
    try {
      setIsOpen(false);
      setSnackbarOpen(true);
      setSnackbarMessage('Class deleted successfully!');
      await deleteClasses(itemToDelete.class_id).unwrap();
      refetch();
    } catch (error) {
      setSnackbarMessage('Failed to delete');
      setSnackbarOpen(false);
    }
  };
>>>>>>> ef360aa (feature: add delete to classs list)

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
<<<<<<< HEAD
=======

  if (isLoading) {
    return <LoadingCircle />;
  }
>>>>>>> ef360aa (feature: add delete to classs list)

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
<<<<<<< HEAD
=======

>>>>>>> ef360aa (feature: add delete to classs list)
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
<<<<<<< HEAD
        open={model.open}
        onClose={() => dispatch(setModel({ open: false }))}
=======
        open={isOpen}
        onClose={() => setIsOpen(false)}
>>>>>>> ef360aa (feature: add delete to classs list)
        onConfirm={handleDeleteConfirmed}
        itemName="Class"
      />
      <Snackbar
<<<<<<< HEAD
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
=======
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={
            isDeleting
              ? 'Class'
              : snackbarMessage.includes('Failed')
                ? 'error'
                : 'success'
          }
          sx={{ width: '100%' }}
        >
          {isDeleting ? 'Deleting...' : snackbarMessage}
>>>>>>> ef360aa (feature: add delete to classs list)
        </Alert>
      </Snackbar>
    </FormComponent>
  );
};

export default ClassListPage;

import { useEffect, useState } from 'react';
import { Stack, Button, Box, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../../components/common/DataTable';
import { Link } from 'react-router-dom';
import SearchComponent from '../../../components/common/SearchComponent';
import FormComponent from '../../../components/common/FormComponent';
import { PlusIcon } from 'lucide-react';
import CircularIndeterminate from '../../../components/loading/LoadingCircle';
import ClassCardSkeleton from '../../../components/loading/ClassCardSkeleton';
import DeleteConfirmationModal from '../../../components/common/DeleteConfirmationModal';
import LoadingCircle from '../../../components/loading/LoadingCircle';
import {
  useDeleteClassesDataMutation,
  useGetClassesDataQuery,
} from '../../../services/classApi';

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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleDeleteConfirmed}
        itemName="Class"
      />
      <Snackbar
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
        </Alert>
      </Snackbar>
    </FormComponent>
  );
};

export default ClassListPage;

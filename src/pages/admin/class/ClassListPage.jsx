import { useEffect, useState } from 'react';
import { Stack, Button, Box } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from'react-redux';
import { PlusIcon } from 'lucide-react';
// import components
import DataTable from '../../../components/common/DataTable';
import SearchComponent from '../../../components/common/SearchComponent';
import FormComponent from '../../../components/common/FormComponent';
import CircularIndeterminate from '../../../components/loading/LoadingCircle';
import DeleteConfirmationModal from '../../../components/common/DeleteConfirmationModal';
// import api and uiSlice
import { setSnackbar, setModal } from '../../../store/slices/uiSlice';
import { useDeleteClassesDataMutation, useGetClassesDataQuery } from '../../../services/classApi';

// Define table columns title
const columns = [
  { id: 'class_id', label: 'Class ID' },
  { id: 'class_name', label: 'Class Name' },
  { id: 'description', label: 'Description' },
];

const ClassListPage = () => {
  // useState: "data to be displayed", "data to be deleted" and searching
  const [rows, setRows] = useState([]);
  const [selectedClass , setSelectedClass ] = useState(null);
  const [search , setSearch] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { modal } = useSelector((state) => state.ui);

  // useGetClassesDataQuery : return a function to fetch all subject records
  const { data, isLoading, isSuccess, isError } = useGetClassesDataQuery();

  // useDeleteSubjectMutation : returns a function to delete a subject
  const [deleteClasses,
    { isLoading: isDeleting,
      isSuccess:isDeleteSuccess,
      isError:isDeleteError,
      error }
    ] = useDeleteClassesDataMutation();

  useEffect(() => {
    // set the rows state when class records are fetched successfully
    if (data && isSuccess) {
      // classes data fetched from api
      const classes = data.data;
      setRows(classes);
    } 
  
    // Show a snackbar with messages during delete (progress, failure, success)
    if(isDeleting){
      dispatch( setSnackbar({
        open:true,
        message: 'Deleting...',
        severity : 'info'
      }));
    }else if(isDeleteError){
      dispatch( setSnackbar({
        open:true,
        message: error.data.message,
        severity : 'error'
      }));
    }else if(isDeleteSuccess){
      dispatch( setSnackbar({
        open:true,
        message: 'Deleted successfully',
        severity :'success'
      }));
      navigate('/admin/classes');
    }
  }, [ data, dispatch, isSuccess, isDeleting, isDeleteError, isDeleteSuccess ]);
  
  // loading the data until it successfully fetched
  if (isLoading) {
    return <CircularIndeterminate />;
  }

  // Handle error state
  if (isError) {
    console.log('error message :', error.data.message);
  }

  // Handle delete clicked
  const handleDelete = (row) => {
    setSelectedClass(row);
    dispatch(setModal({ open: true }));
  };

  // handle confirm deletion
  const handleDeleteConfirmed = async () => {
      dispatch(setModal({ open: false }));
     await deleteClasses(selectedClass.class_id).unwrap();
  };

  // Handle DELETE ALL action
  const handleSelectedDelete = () => {
    console.log('Delete all');
  };

  // Handle DETAIL action
  const handleView = (row) => {
    navigate(`/admin/classes/${row.class_id}`);
  };

  // Handle EDIT action
  const handleEdit = (row) => {
    navigate(`/admin/classes/update/${row.class_id}`);
  };

  return (
    <FormComponent
      title="Class List"
      subTitle={`Total Classes: ${rows.length}`}
    >
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
      <DeleteConfirmationModal
        open={modal.open}
        onClose={() => dispatch(setModal({ open: false }))}
        onConfirm={handleDeleteConfirmed}
        itemName="Class"
      />

      <DataTable
        rows={rows}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        onSelectedDelete={handleSelectedDelete}
        hideColumns={['description']}
        emptyTitle={'No Class'}
        emptySubTitle={'No Class Available'}
      />
    </FormComponent>
  );
}

export default ClassListPage;

import { useEffect, useState } from 'react';
import { Stack, Button, Box } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from'react-redux';
import { PlusIcon } from 'lucide-react';
import DataTable from '../../../components/common/DataTable';
import SearchComponent from '../../../components/common/SearchComponent';
import FormComponent from '../../../components/common/FormComponent';
import DeleteConfirmationModal from '../../../components/common/DeleteConfirmationModal';
import LoadingCircle from '../../../components/loading/LoadingCircle';
import { setSnackbar, setModal } from '../../../store/slices/uiSlice';
import {
  useDeleteClassesDataMutation,
  useGetClassesDataQuery,
} from '../../../services/classApi';

const columns = [
  { id: 'class_id', label: 'Class ID' },
  { id: 'class_name', label: 'Class Name' },
  { id: 'description', label: 'Description' },
];
const ClassListPage = () => {
  // - rows:
  // - selectedClass : 
  // - search :  
  const [rows, setRows] = useState([]);
  const [selectedClass , setSelectedClass ] = useState(null);
  const [search , setSearch] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { modal, snackbar } = useSelector((state) => state.ui);

 // - useGetClassesDataQuery : 
 // - useDeleteClassesDataMutation :
  const { data, isLoading, isError } = useGetClassesDataQuery();
  const [deleteClasses, { isLoading: isDeleting, isSuccess:isDeleteSuccess, isError:isDeleteError, error }] = useDeleteClassesDataMutation();

  // - when the attendance records are fetched successfully, set the rows state
  useEffect(() => {
    if (data) {
      const classes = data.data;
      setRows(classes);
      console.log('data :', classes);
    } 
  }, [data, dispatch]);
  
  // Handle delete confirmation
  if (isError) {
    console.log('error message :', error.data.message);
  }
  
  // When the delete is in progress, show a snackbar with a message "Deleting..."
  // When the delete is failed, show a snackbar with an error message
  // When the delete is successful, show a snackbar with a success message and navigate to the class list page
  useEffect(()=>{
    if(isDeleting){
      dispatch(setSnackbar({ open:true , message: 'Deleting...' ,severity : 'info'}));
    }else if(isDeleteError){
      dispatch(setSnackbar({ open:true , message: error.data.message , severity : 'error'}));
    }else if(isDeleteSuccess){
      dispatch(setSnackbar({ open:true , message: 'Deleted successfully', severity :'success'}));
      navigate('/admin/classes');
    }
  },[dispatch, isDeleteError, isDeleteSuccess, isDeleting])

  // handle confirm deletion
  const handleDeleteConfirmed = async () => {
      dispatch(setModal({ open: false }));
     await deleteClasses(selectedClass.class_id).unwrap();
  };

  // Handle delete clicked
  const handleDelete = (row) => {
    setSelectedClass(row);
    dispatch(setModal({ open: true }));
  };

  const handleSelectedDelete = () => {
    console.log('Delete all');
  };
  const handleView = (row) => {
    navigate(`/admin/classes/${row.class_id}`);
  };
  const handleEdit = (row) => {
    navigate(`/admin/classes/update/${row.class_id}`);
  };
  if (isError) {
    console.log('error message :', error.data.message);
  }
  if (isLoading) {
    return <LoadingCircle />;
  }
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
        hideColumns={['description']}
        emptyTitle={'No Class'}
        emptySubTitle={'No Class Available'}
      />
      <DeleteConfirmationModal
        open={modal.open}
        onClose={() => dispatch(setModal({ open: false }))}
        onConfirm={handleDeleteConfirmed}
        itemName="Class"
      />
    </FormComponent>
  );
}

export default ClassListPage;

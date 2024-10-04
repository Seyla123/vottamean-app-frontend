import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Stack, Button } from '@mui/material';
import { PlusIcon } from 'lucide-react';
// import components
import DataTable from '../../../components/common/DataTable';
import FormComponent from '../../../components/common/FormComponent';
import CircularIndeterminate from '../../../components/loading/LoadingCircle';
import DeleteConfirmationModal from '../../../components/common/DeleteConfirmationModal';
// import api and uiSlice
import { setModal, setSnackbar } from '../../../store/slices/uiSlice';
import { useGetSubjectsQuery, useDeleteSubjectMutation } from '../../../services/subjectApi';

// Define table columns title
const tableTiles = [
  { id: 'subject_id', label: 'Subject ID' },
  { id: 'subject_name', label: 'Subject Name' },
  { id: 'description', label: 'Subject Description' },
];

function SubjectListPage() {
  // useState: "data to be displayed" and "data to be deleted"
  const [rows, setRows] = useState([]);
  const [subjectToDelete, setSubjectToDelete] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { modal } = useSelector((state) => state.ui);

  // useGetSubjectsQuery : return a function to fetch all subject records
  const { data, isLoading, isSuccess, isError } = useGetSubjectsQuery();

  // useDeleteSubjectMutation : returns a function to delete a subject
  const [ deleteSubject,
    { isLoading: isDeleting,
      isSuccess: isDeleteSuccess,
      isError: isDeleteError,
      error }
    ] = useDeleteSubjectMutation();

  useEffect(() => {
    // set the rows state when subject records are fetched successfully
    if (data && isSuccess) {
      setRows(subjectData);
    }
  
    // Show a snackbar with messages during delete (progress, failure, success)
    if (isDeleting) {
      dispatch( setSnackbar({
        open: true,
        message: 'Deleting...',
        severity: 'info',
      }));
    } else if (isDeleteError) {
      dispatch( setSnackbar({
        open: true,
        message: error?.data?.message || 'Failed to delete subject',
        severity: 'error',
      }));
    } else if (isDeleteSuccess) {
      dispatch( setSnackbar({
        open: true,
        message: 'Deleted successfully',
        severity: 'success',
      }));
      navigate('/admin/subjects');
    }
  }, [data, dispatch, isSuccess, isDeleteSuccess, isDeleting, isDeleteError ]);
  
  // loading the data until it successfully fetched
  if (isLoading) {
    return <CircularIndeterminate />;
  }

  // Handle error state
  if (isError) {
    console.log('error message :', error.data.message);
  }

  // Handle DELETE action
  const handleDelete = (rows) => {
    setSubjectToDelete(rows);
    dispatch(setModal({ open: true }));
  };

  // Handle delete confirmation modal
  const confirmDelete = async () => {
    dispatch(setModal({ open: false }));
    await deleteSubject(subjectToDelete.subject_id).unwrap();
  };

  // Handle DELETE ALL action
  const handleSelectedDelete = () => {
    console.log('Delete all');
  };

  // Handle DETAIL action
  const handleView = (row) => {
    navigate(`/admin/subjects/${row.subject_id}`);
  };

  // Handle EDIT action
  const handleEdit = (row) => {
    navigate(`/admin/subjects/update/${row.subject_id}`);
  };

  // Define formatted data to display
  const subjectData = data.data.map((item) => {
    const { subject_id, subject_name, description } = item;
    return {
      subject_id,
      subject_name,
      description
    };
  });

  return (
    <FormComponent
      title="Subject List"
      subTitle={`There are total ${rows.length} Subjects`}
    >
      <Stack direction={'row'} gap={1} alignSelf={'flex-end'}>
        <Link to={'/admin/subjects/create'}>
          <Button
            size="large"
            variant="contained"
            color="primary"
            startIcon={<PlusIcon size={20} />}
          >
            Add subject
          </Button>
        </Link>
      </Stack>
      <DeleteConfirmationModal
        open={modal.open}
        onClose={() => dispatch(setModal({ open: false }))}
        onConfirm={confirmDelete}
        itemName="Subject"
      />

      <DataTable
        rows={rows}
        columns={tableTiles}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSelectedDelete={handleSelectedDelete}
        hideColumns={'description'}
        emptyTitle={'No Subject'}
        emptySubTitle={'No Subject Available'}
      />
    </FormComponent>
  );
}

export default SubjectListPage;

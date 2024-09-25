import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Stack, Button } from '@mui/material';
import { PlusIcon } from 'lucide-react';
import DataTable from '../../../components/common/DataTable';
import FormComponent from '../../../components/common/FormComponent';
import CircularIndeterminate from '../../../components/loading/LoadingCircle';
import DeleteConfirmationModal from '../../../components/common/DeleteConfirmationModal';
import { useGetSubjectsQuery, useDeleteSubjectMutation } from '../../../services/subjectApi';
import { setModal, setSnackbar } from '../../../store/slices/uiSlice';

function SubjectListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [subjectToDelete, setSubjectToDelete] = useState(null);
  const { modal } = useSelector((state) => state.ui);

  const { data, isError, isLoading, isSuccess } = useGetSubjectsQuery();
  const [
    deleteSubject,
    {
      isLoading: isDeleting,
      isSuccess: isDeleteSuccess,
      isError: isDeleteError,
      error,
    },
  ] = useDeleteSubjectMutation();

  useEffect(() => {
    if (data && isSuccess) {
      setRows(subjectData);
    }
  }, [data, isSuccess, isDeleteSuccess]);

  useEffect(() => {
    if (isDeleting) {
      dispatch(
        setSnackbar({ open: true, message: 'Deleting...', severity: 'info' }),
      );
    } else if (isDeleteError) {
      dispatch(
        setSnackbar({
          open: true,
          message: error.data.message,
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
      navigate('/admin/subjects');
    }
  }, [dispatch, isDeleteError, isDeleteSuccess, isDeleting]);

  // loading the data until it successfully fetched
  if (isLoading) {
    return <CircularIndeterminate />;
  }
  if (isError) {
    console.log('error message :', error.data.message);
  }
  const handleDelete = (rows) => {
    setSubjectToDelete(rows);
    dispatch(setModal({ open: true }));
  };
  const confirmDelete = async () => {
    dispatch(setModal({ open: false }));
    await deleteSubject(subjectToDelete.subject_id).unwrap();
  };
  const handleSelectedDelete = () => {
    console.log('Delete all');
  };
  const handleView = (row) => {
    navigate(`/admin/subjects/${row.subject_id}`);
  }
  const handleEdit = (row) => {
    navigate(`/admin/subjects/update/${row.subject_id}`);
  };

  const tableTiles = [
    { id: 'subject_id', label: 'Subject ID' },
    { id: 'name', label: 'Subject Name' },
    { id: 'description', label: 'Subject Description' },
  ];

  const subjectData = data.data.map((item) => {
    const { subject_id, name, description } = item;
    return {
      subject_id,
      name,
      description,
    };
  });

  return (
    <FormComponent title="Subject List" subTitle={`There are total ${rows.length} Subjects`}>
      {/* Subject Create Button */}
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

      {/* List Subject */}
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
        showNO={true}
      />
    </FormComponent>
  );
}

export default SubjectListPage;

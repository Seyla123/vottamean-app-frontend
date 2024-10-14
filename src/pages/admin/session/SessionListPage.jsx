import { useEffect, useState } from 'react';
import { Button, Stack } from '@mui/material';
import DataTable from '../../../components/common/DataTable';
import FormComponent from '../../../components/common/FormComponent';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { PlusIcon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetSessionsQuery,
  useDeleteSessionMutation,
  useDeleteManySessionsMutation,
} from '../../../services/sessionApi';
import { transformSessionsData } from '../../../utils/formatData';
import LoadingCircle from '../../../components/loading/LoadingCircle';
import DeleteConfirmationModal from '../../../components/common/DeleteConfirmationModal';
import { setModal, setSnackbar } from '../../../store/slices/uiSlice';
import SomethingWentWrong from '../../../components/common/SomethingWentWrong';

const columns = [
  { id: 'time', label: 'Time' },
  { id: 'day', label: 'Day' },
  { id: 'subject', label: 'Subject' },
  { id: 'class', label: 'Class' },
  { id: 'teacher', label: 'Teacher' },
];

function SessionListPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // rows : Array of objects representing the data to be displayed in the table
  // selectSesion : The selected session to be deleted
  const [rows, setRows] = useState([]);
  const [selectSession, setSelectSession] = useState(null);

  // model : The state of the modal
  const { modal } = useSelector((state) => state.ui);

  // useGetSessionsQuery : a hook that returns a function to fetch all session records
  const { data, isError, isLoading, isSuccess } = useGetSessionsQuery();

  // useDeleteManySessionsMutation : returns a function to delete many sessions
  const [
    deleteManySessions,
    {
      isLoading: isDeletingMany,
      isSuccess: isDeleteManySuccess,
      isError: isDeleteManyError,
      error: deleteManyError,
    },
  ] = useDeleteManySessionsMutation();

  // useDeleteSessionMutation : a hook that returns a function to delete an session record
  const [
    deleteSession,
    {
      isLoading: isDeleting,
      isSuccess: isDeleteSuccess,
      isError: isDeleteError,
      error,
    },
  ] = useDeleteSessionMutation();

  // when the session records are fetched successfully, transform the data and set the rows state
  useEffect(() => {
    if (data && isSuccess) {
      const transformedData = transformSessionsData(data.data);
      setRows(transformedData);
    }
  }, [data, isSuccess, isDeleteSuccess]);

  // When the delete is in progress, show a snackbar with a message "Deleting..."
  // When the delete is failed, show a snackbar with an error message
  // When the delete is successful, show a snackbar with a success message and navigate to the sessions list page
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
      navigate('/admin/sessions');
    } else if (isDeleteError) {
      dispatch(
        setSnackbar({
          open: true,
          message: error.data.message || 'Failed to delete session',
          severity: 'error',
        }),
      );
    } else if (isDeleteManyError) {
      dispatch(
        setSnackbar({
          open: true,
          message: deleteManyError.data.message || 'Failed to delete sessions',
          severity: 'error',
        }),
      );
    }
  }, [dispatch, isDeleteError, isDeleteSuccess, isDeleting, isDeleteManyError, isDeleteSuccess, isDeletingMany]);

  // handle edit action
  const handleEdit = (row) => {
    navigate(`/admin/sessions/update/${row.id}`);
  };

  // handle confirm deletion
  const handleDeleteConfirmed = async () => {
    dispatch(setModal({ open: false }));
    await deleteSession(selectSession.id).unwrap();
  };

  // handle delete action
  const handleDelete = (rows) => {
    setSelectSession(rows);
    dispatch(setModal({ open: true }));
  };

  // Handle view session
  const handleView = (rows) => {
    navigate(`/admin/sessions/${rows.id}`);
  };

  // Handle selected delete action
  const handleSelectedDelete = (selectedIds) => {
    deleteManySessions(selectedIds).unwrap();
  };

  // if loading, show loading circle
  if (isLoading) {
    return <LoadingCircle />;
  }

  // if error
  if (isError) {
    return <SomethingWentWrong />
  }

  return (
    <FormComponent
      title={'Session List'}
      subTitle={`There are ${rows.length} sessions`}
    >
      {/* button add session container */}
      <Stack direction="row" justifyContent="flex-end">
        {/* add session button */}
        <Link to="/admin/sessions/create">
          <Button
            size="large"
            variant="contained"
            color="primary"
            startIcon={<PlusIcon size={20} />}
          >
            ADD SESSION
          </Button>
        </Link>
      </Stack>
      <DataTable
        rows={rows}
        columns={columns}
        onEdit={handleEdit}
        onView={handleView}
        onDelete={handleDelete}
        onSelectedDelete={handleSelectedDelete}
        hideColumns={['day', 'teacher']}
        emptyTitle={'No Session'}
        emptySubTitle={'No Session Available'}
      />
      <DeleteConfirmationModal
        open={modal.open}
        onClose={() => dispatch(setModal({ open: false }))}
        onConfirm={handleDeleteConfirmed}
        itemName="Session"
      />
    </FormComponent>
  );
}

export default SessionListPage;

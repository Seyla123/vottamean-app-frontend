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
import ViewModal from '../../../components/common/ViewModal';
import SomethingWentWrong from '../../../components/common/SomethingWentWrong';
import StyledButton from '../../../components/common/StyledMuiButton';
import TitleHeader from '../../../components/common/TitleHeader';

const columns = [
  { id: 'teacher', label: 'Teacher' },
  { id: 'time', label: 'Time' },
  { id: 'duration', label: 'Duration' },
  { id: 'day', label: 'Day' },
  { id: 'subject', label: 'Subject' },
  { id: 'class', label: 'Class' },
];

function SessionListPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // rows : Array of objects representing the data to be displayed in the table
  // selectSesion : The selected session to be deleted
  const [rows, setRows] = useState([]);
  const [selectSession, setSelectSession] = useState(null);

  // viewModalOpen : The state of the view subject modal
  const [viewModalOpen, setViewModalOpen] = useState(false);

  // - rowsPerPage: the number of rows per page
  // - page: the current page number that is being displayed
  // - totalRows: the total number of rows that are available
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);

  // model : The state of the modal
  const { modal } = useSelector((state) => state.ui);

  // useGetSessionsQuery : a hook that returns a function to fetch all session records
  const { data, isError, isLoading, isSuccess, isFetching } =
    useGetSessionsQuery({ page: page + 1, limit: rowsPerPage });

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
      setTotalRows(data.results);
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
  }, [
    dispatch,
    isDeleteError,
    isDeleteSuccess,
    isDeleting,
    isDeleteManyError,
    isDeleteSuccess,
    isDeletingMany,
  ]);

  // Handle page change
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
  // Handle row per page change
  const handleChangeRowsPerPage = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
  };
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
  const handleView = (row) => {
    // navigate(`/admin/sessions/${row.id}`);
    setSelectSession(row);
    setViewModalOpen(true);
  };

  // Handle selected delete action
  const handleSelectedDelete = (selectedIds) => {
    deleteManySessions(selectedIds).unwrap();
  };

  // const {}

  // if loading, show loading circle
  if (isLoading) {
    return <LoadingCircle />;
  }

  // if error
  if (isError) {
    return <SomethingWentWrong description={error?.data?.message} />;
  }

  return (
    <FormComponent>
      {/* button add session container */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems={'center'}
      >
        <TitleHeader title={'Session'} />
        {/* add session button */}
        <Link to="/admin/sessions/create">
          <StyledButton
            variant="contained"
            color="primary"
            size="small"
            startIcon={<PlusIcon size={18} />}
          >
            Create Session
          </StyledButton>
        </Link>
      </Stack>
      <DataTable
        rows={rows}
        columns={columns}
        onEdit={handleEdit}
        onView={handleView}
        onDelete={handleDelete}
        onSelectedDelete={handleSelectedDelete}
        hideColumns={['day', 'teacher', 'duration']}
        emptyTitle={'No Session'}
        emptySubTitle={'No Session Available'}
        isLoading={isLoading}
        page={page}
        rowsPerPage={rowsPerPage}
        setPage={handleChangePage}
        setRowsPerPage={handleChangeRowsPerPage}
        totalRows={totalRows}
      />
      <DeleteConfirmationModal
        open={modal.open}
        onClose={() => dispatch(setModal({ open: false }))}
        onConfirm={handleDeleteConfirmed}
        itemName={'Session'}
      />
      <ViewModal
        open={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        title="Session Details"
        data={selectSession}
      />
    </FormComponent>
  );
}

export default SessionListPage;

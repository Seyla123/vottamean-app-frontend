// React and third-party libraries
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// - Custom Components
import FormComponent from '../../../components/common/FormComponent';
import CardComponent from '../../../components/common/CardComponent';
import CardInformation from '../../../components/common/CardInformation';
import LoadingCircle from '../../../components/loading/LoadingCircle';
import DeleteConfirmationModal from '../../../components/common/DeleteConfirmationModal';

// - Redux Hooks and APIs
import {
  useGetSessionByIdQuery,
  useDeleteSessionMutation,
} from '../../../services/sessionApi';

// - Format Data
import { formatSessionDetail } from '../../../utils/formatData';

// - UI Slice for snackbar and modal
import { setModal, setSnackbar } from '../../../store/slices/uiSlice';

function SessionDetailPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data, isError, isLoading } = useGetSessionByIdQuery(id);
  const { modal } = useSelector((state) => state.ui);

  const [
    deleteSession,
    {
      isLoading: isDeleting,
      isSuccess: isDeleteSuccess,
      isError: isDeleteError,
      error,
    },
  ] = useDeleteSessionMutation();

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
      navigate('/admin/sessions');
    }
  }, [dispatch, isDeleteError, isDeleteSuccess, isDeleting]);

  const handleDeleteConfirm = async () => {
    dispatch(setModal({ open: false }));
    await deleteSession(id).unwrap();
    navigate('/admin/sessions');
  };

  const handleDelete = () => {
    dispatch(setModal({ open: true }));
  };

  const clickEdit = () => {
    navigate(`/admin/sessions/update/${id}`);
  };

  if (isLoading) {
    return <LoadingCircle />;
  }

  if (isError) {
    console.log('error message:', error.data.message);
  }

  // Use the formatting function here
  const session = formatSessionDetail(data?.data);

  return (
    <FormComponent
      title={'Session Detail'}
      subTitle={"These are Session's information"}
    >
      <CardComponent
        title={'Subject Information'}
        handleEdit={clickEdit}
        handleDelete={handleDelete}
      >
        <CardInformation data={session} />
      </CardComponent>
      <DeleteConfirmationModal
        open={modal.open}
        onClose={() => dispatch(setModal({ open: false }))}
        onConfirm={handleDeleteConfirm}
        itemName="Session"
      />
    </FormComponent>
  );
}

export default SessionDetailPage;

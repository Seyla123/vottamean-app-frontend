import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import FormComponent from '../../../components/common/FormComponent';
import CardComponent from '../../../components/common/CardComponent';
import CardInformation from '../../../components/common/CardInformation';
import DeleteConfirmationModal from '../../../components/common/DeleteConfirmationModal';
import CircularIndeterminate from '../../../components/loading/LoadingCircle';
import { useGetClassPeriodByIdQuery, useDeleteClassPeriodMutation } from '../../../services/classPeriodApi';
import { calculatePeriod, formatTimeTo12Hour } from '../../../utils/formatHelper';
import { setModal, setSnackbar } from '../../../store/slices/uiSlice';
import { classPeriodDetail } from '../../../utils/formatData';

function ClassPeriodDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [details, setDetails] = useState([]);
  const [classPeriodToDelete, setClassPeriodToDelete] = useState(null);
  const { modal } = useSelector((state) => state.ui);

  const { data, error, isLoading, isSuccess } = useGetClassPeriodByIdQuery(id);
  const [
    deleteClassPeriod, { isLoading: isDeleting, isSuccess: isDeleteSuccess, isError: isDeleteError }
  ] = useDeleteClassPeriodMutation();

  useEffect(() => {
    if (data && isSuccess) {
      setDetails(classPeriodDetail(data));
    }
  }, [data, isSuccess, isDeleteSuccess]);

  useEffect(() => {
    if (isDeleting) {
      dispatch(
        setSnackbar({ open: true, message: 'Deleting...', severity: 'info' }),
      );
    } else if (isDeleteError) {
      dispatch(setSnackbar({ open: true, message: error.data.message, severity: 'error' }));
    } else if (isDeleteSuccess) {
      dispatch(
        setSnackbar({ open: true, message: 'Deleted successfully', severity: 'success' }),
      );
      navigate('/admin/class-periods');
    }
  }, [dispatch, isDeleteError, isDeleteSuccess, isDeleting]);

  if (isLoading) {
    return <CircularIndeterminate />;
  }

  if (error) {
    return <div>Error loading class periods: {error.message}</div>;
  }

  const clickEdit = () => {
    navigate(`/admin/class-periods/update/${id}`);
  };

  const clickDetele = () => {
    setClassPeriodToDelete(data.data);
    dispatch(setModal({ open: true }));
  };

  const confirmDelete = async () => {
    dispatch(setModal({ open: false }));
    await deleteClassPeriod(classPeriodToDelete.period_id).unwrap();
  };

  // Manually remove or nullify the `photo` property in the `data` object to avoid showing the profile image.
  const dataWithoutPhoto = {
    ...data.data,
    Info: {
      ...data.data.Info,
      photo: null,  // This will prevent the `Avatar` from being rendered
    },
  };

  return (
    <FormComponent
      title={'Class Period Detail'}
      subTitle={'These are Class Period’s information'}
    >
      <CardComponent
        title={'Class Period Information'}
        handleEdit={clickEdit}
        handleDelete={clickDetele}
        data={dataWithoutPhoto}  // Pass data with `photo` field set to null
      >
        <CardInformation data={details} />
      </CardComponent>
      <DeleteConfirmationModal
        open={modal.open}
        onClose={() => dispatch(setModal({ open: false }))}
        onConfirm={confirmDelete}
        itemName="Class Period"
      />
    </FormComponent>
  );
}

export default ClassPeriodDetailPage;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import FormComponent from '../../../components/common/FormComponent';
import CardComponent from '../../../components/common/CardComponent';
import CardInformation from '../../../components/common/CardInformation';
import DeleteConfirmationModal from '../../../components/common/DeleteConfirmationModal';
import CircularIndeterminate from '../../../components/loading/LoadingCircle';
import { useGetClassPeriodByIdQuery, useDeleteClassPeriodMutation } from '../../../services/classPeriodApi';
import { calculatePeriod, formatTimeTo12Hour } from '../../../utils/formatData';
import { setModal, setSnackbar } from '../../../store/slices/uiSlice';

function ClassPeriodDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // rows : Array of objects representing the data to be displayed in the table
  // classPeriodToDelete : a selected class period to be deleted
  const [details, setDetails] = useState([]);
  const [classPeriodToDelete, setClassPeriodToDelete] = useState(null);
  const { modal } = useSelector((state) => state.ui);

  // useGetClassPeriodByIdQuery : a hook that returns a function to fetch a class period record by its id
  // useDeleteClassPeriodMutation : a hook that returns a function to delete an class period record
  const { data, error, isLoading, isSuccess } = useGetClassPeriodByIdQuery(id);
  const [
    deleteClassPeriod,{
       isLoading: isDeleting, 
       isSuccess: isDeleteSuccess, 
       isError: isDeleteError
      }
    ] = useDeleteClassPeriodMutation();

  // when the class period records are fetched successfully, then set the rows state
  useEffect(() => {
    if (data && isSuccess) {
      setDetails(periodDetail);
    }
  }, [data, isSuccess, isDeleteSuccess]);

  // When the delete is in progress, show a snackbar with a message "Deleting..."
  // When the delete is failed, show a snackbar with an error message
  // When the delete is successful, show a snackbar with a success message and navigate to the class period list page
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

  // Handle loading state
  if (isLoading) {
    return <CircularIndeterminate />;
  }

  // Handle error state
  if (error) {
    return <div>Error loading class periods: {error.message}</div>;
  }

  // Handle EDIT action
  const clickEdit = () => {
    navigate(`/admin/class-periods/update/${id}`);
  };


  // Handle DELETE action
  const clickDetele = () => {
    setClassPeriodToDelete(data.data);
    dispatch(setModal({ open: true }));
  };

  const confirmDelete = async () => {
    dispatch(setModal({ open: false }));
    await deleteClassPeriod(classPeriodToDelete.period_id).unwrap();
  };
  
  // destrusturing specific data
  const { period_id, start_time, end_time } = data.data;

  // Define formatted data to display
  const periodDetail = {
    'Class Period ID': period_id,
    'Start Time': formatTimeTo12Hour(start_time),
    'End Time': formatTimeTo12Hour(end_time),
    Period: calculatePeriod(start_time, end_time),
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
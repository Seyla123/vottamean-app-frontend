import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
// import components
import FormComponent from '../../../components/common/FormComponent';
import CardComponent from '../../../components/common/CardComponent';
import CardInformation from '../../../components/common/CardInformation';
import DeleteConfirmationModal from '../../../components/common/DeleteConfirmationModal';
import LoadingCircle from '../../../components/loading/LoadingCircle';
// import api, formatHelper and uiSlice
import { setModal, setSnackbar } from '../../../store/slices/uiSlice';
import { calculatePeriod, formatTimeTo12Hour } from '../../../utils/formatHelper';
import { useGetClassPeriodByIdQuery, useDeleteClassPeriodMutation } from '../../../services/classPeriodApi';


function ClassPeriodDetailPage() {
  // useState: "data to be displayed as details" and "data to be deleted"
  const [details, setDetails] = useState([]);
  const [classPeriodToDelete, setClassPeriodToDelete] = useState(null);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { modal } = useSelector((state) => state.ui);


  // useGetClassPeriodByIdQuery : return a function a class period within ID
  const { data, error, isLoading, isSuccess } = useGetClassPeriodByIdQuery(id);

  // useDeleteClassPeriodMutation : returns a function to delete a class period
  const [ deleteClassPeriod,
    { isLoading: isDeleting, 
      isSuccess: isDeleteSuccess,
      isError: isDeleteError }
    ] = useDeleteClassPeriodMutation();

  // when the class period records are fetched successfully, then set the rows state
  useEffect(() => {
    if (data && isSuccess) {
      setDetails(periodDetail);
    }

    if (isDeleting) {
      dispatch( setSnackbar({
        open: true,
        message: 'Deleting...',
        severity: 'info'
      }));
    } else if (isDeleteError) {
      dispatch( setSnackbar({
        open: true,
        message: error.data.message,
        severity: 'error'
      }));
    } else if (isDeleteSuccess) {
      dispatch( setSnackbar({
        open: true,
        message: 'Deleted successfully',
        severity: 'success'
      }));
      navigate('/admin/class-periods');
    }
  }, [ data, dispatch, isSuccess, isDeleting, isDeleteError, isDeleteSuccess ]);

  // Handle loading state
  if (isLoading) {
    return <LoadingCircle />;
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

  // Handle delete confirmation modal
  const confirmDelete = async () => {
    dispatch(setModal({ open: false }));
    await deleteClassPeriod(classPeriodToDelete.period_id).unwrap();
  };
  
  const { period_id, start_time, end_time } = data.data;
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
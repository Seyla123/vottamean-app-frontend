import React, { useState } from 'react';
import {Snackbar, Alert } from '@mui/material';
import FormComponent from '../../../components/common/FormComponent';
import CardComponent from '../../../components/common/CardComponent';
import CardInformation from '../../../components/common/CardInformation';
import { useGetClassPeriodByIdQuery, useDeleteClassPeriodMutation } from '../../../services/classPeriodApi';
import { useNavigate, useParams } from 'react-router-dom';
import { calculatePeriod, formatTimeTo12Hour } from '../../../utils/formatData';
import CircularIndeterminate from '../../../components/loading/LoadingCircle';
import DeleteConfirmationModal from '../../../components/common/DeleteConfirmationModal';

function ClassPeriodDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetClassPeriodByIdQuery(id);
  const [isOpen, setIsOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [deleteClassPeriod, { isLoading: isDeleting }] =
  useDeleteClassPeriodMutation();

  // Handle loading state
  if (isLoading) {
    return <CircularIndeterminate/>;
  }

  // Handle error state
  if (error) {
    return <div>Error loading class periods: {error.message}</div>;
  }

  // Handle EDIT action
  const clickEdit = () => {
    navigate(`/admin/class-periods/update/${id}`);
  };

  
  const { period_id, start_time, end_time } = data.data;
  
  // Handle DELETE action
  const clickDetele = () => {
    setItemToDelete(data.data.period_id);
    setIsOpen(true);
  };

  const confirmDelete = async () => {
    try {
      setIsOpen(false);
      setSnackbarMessage('Deleted successfully');
      setSnackbarOpen(true);
      await deleteClassPeriod(itemToDelete).unwrap();
      navigate(`/admin/class-periods`);
    } catch (error) {
      setSnackbarMessage('Failed to delete');
      setSnackbarOpen(true);
    }
  };

  // Define formatted data to display
  const periodDetail = {
    'Class Period ID': period_id,
    'Start Time': formatTimeTo12Hour(start_time),
    'End Time': formatTimeTo12Hour(end_time),
    'Period': calculatePeriod(start_time, end_time),
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
        <CardInformation data={periodDetail} />
      </CardComponent>
      <DeleteConfirmationModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={confirmDelete}
        itemName="Example Item"
      />
            <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={
            isDeleting
              ? 'info'
              : snackbarMessage.includes('Failed')
                ? 'error'
                : 'success'
          }
          sx={{ width: '100%' }}
        >
          {isDeleting ? 'Deleting...' : snackbarMessage}
        </Alert>
      </Snackbar>
    </FormComponent>
  );
}

export default ClassPeriodDetailPage;

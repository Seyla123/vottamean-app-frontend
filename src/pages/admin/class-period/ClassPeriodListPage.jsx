import React, { useState, useEffect } from 'react';
import { Button, Stack, Snackbar, Alert } from '@mui/material';
import FormComponent from '../../../components/common/FormComponent';
import { Link, useNavigate } from 'react-router-dom';
import DataTable from '../../../components/common/DataTable';
import { PlusIcon } from 'lucide-react';
import {
  useGetClassPeriodQuery,
  useDeleteClassPeriodMutation,
} from '../../../services/classPeriodApi';
import { calculatePeriod, formatTimeTo12Hour } from '../../../utils/formatData';
import CircularIndeterminate from '../../../components/loading/LoadingCircle';
import DeleteConfirmationModal from '../../../components/common/DeleteConfirmationModal';

function ClassPeriodListPage() {
  const [rows, setRows] = useState([]);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  const { data, isError, isLoading, isSuccess } = useGetClassPeriodQuery();
  const [
    deleteClassPeriod,
    {
      isLoading: isDeleting,
      isSuccess: isDeleteSuccess,
      isError: isDeleteError,
      error
    },
  ] = useDeleteClassPeriodMutation();

  useEffect(() => {
    if (data && isSuccess) {
      setRows(periodData);
    }
  }, [data, isSuccess, isDeleteSuccess]);

  // Handle loading state
  if (isLoading) {
    return <CircularIndeterminate />;
  }

  // Handle error state
  if (isError) {
    return <div>Error loading class periods: {error.message}</div>;
  }

  // Handle DELETE action
  const handleDelete = (id) => {
    setItemToDelete(id.period_id);
    setIsOpen(true);
  };

  const confirmDelete = async () => {
    try {
      setIsOpen(false);
      setSnackbarMessage('Deleted successfully');
      setSnackbarOpen(true);
      await deleteClassPeriod(itemToDelete).unwrap();
    } catch (error) {
      setSnackbarMessage('Failed to delete');
      setSnackbarOpen(true);
    }
  };

  // Handle DELETE ALL action
  const handleSelectedDelete = () => {
    console.log('Delete all');
  };

  // Handle DETAIL action
  const handleView = (row) => {
    navigate(`/admin/class-periods/${row.period_id}`);
  };

  // Handle EDIT action
  const handleEdit = (row) => {
    navigate(`/admin/class-periods/update/${row.period_id}`);
  };

  // Define table columns title
  const tableTitles = [
    { id: 'period_id', label: 'ID' },
    { id: 'start_time', label: 'Start Time' },
    { id: 'end_time', label: 'End Time' },
    { id: 'period', label: 'Period' },
  ];

  // Define formatted data to display
  const periodData = data.data.map((item) => {
    const { period_id, start_time, end_time } = item;
    return {
      period_id: period_id,
      start_time: formatTimeTo12Hour(start_time),
      end_time: formatTimeTo12Hour(end_time),
      period: calculatePeriod(start_time, end_time),
    };
  });

  return (
    <FormComponent
      title={'Class Period List'}
      subTitle={`There are ${rows.length} Class Periods`}
    >
      {/* Button to add a new class period */}
      <Stack direction="row" justifyContent="flex-end">
        <Link to="/admin/class-periods/create">
          <Button
            size="large"
            variant="contained"
            color="primary"
            startIcon={<PlusIcon size={20} />}
          >
            ADD PERIOD
          </Button>
        </Link>
      </Stack>
      <DeleteConfirmationModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={confirmDelete}
        itemName="Example Item"
      />

      {/* Data table to display class periods */}
      <DataTable
        rows={rows}
        columns={tableTitles}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSelectedDelete={handleSelectedDelete}
        hideColumns={'period_id'}
        emptyTitle="No Class Periods"
        emptySubTitle="No class periods available"
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

export default ClassPeriodListPage;

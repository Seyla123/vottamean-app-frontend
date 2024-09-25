import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Stack } from '@mui/material';
import { PlusIcon } from 'lucide-react';
import DataTable from '../../../components/common/DataTable';
import FormComponent from '../../../components/common/FormComponent';
import CircularIndeterminate from '../../../components/loading/LoadingCircle';
import DeleteConfirmationModal from '../../../components/common/DeleteConfirmationModal';
import { useGetClassPeriodQuery, useDeleteClassPeriodMutation } from '../../../services/classPeriodApi';
import { calculatePeriod, formatTimeTo12Hour } from '../../../utils/formatData';
import { setModal, setSnackbar } from '../../../store/slices/uiSlice';

function ClassPeriodListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // rows : Array of objects representing the data to be displayed in the table
  // classPeriodToDelete : a selected class period to be deleted
  const [rows, setRows] = useState([]);
  const [classPeriodToDelete, setclassPeriodToDelete] = useState(null);
  const { modal } = useSelector((state) => state.ui);

  // useGetClassPeriodByIdQuery : a hook that returns a function to fetch a class period record by its id
  // useDeleteClassPeriodMutation : a hook that returns a function to delete an class period record
  const { data, isError, isLoading, isSuccess } = useGetClassPeriodQuery();
  const [
    deleteClassPeriod, {
      isLoading: isDeleting,
      isSuccess: isDeleteSuccess,
      isError: isDeleteError,
      error
    }
  ] = useDeleteClassPeriodMutation();

  // when the class period records are fetched successfully, then set the rows state
  useEffect(() => {
    if (data && isSuccess) {
      setRows(periodData);
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
      dispatch(setSnackbar({ open: true, message: error.data.message, severity: 'error', }),);
    } else if (isDeleteSuccess) {
      dispatch(
        setSnackbar({ open: true, message: 'Deleted successfully', severity: 'success', }),
      );
      navigate('/admin/class-periods');
    }
  }, [dispatch, isDeleteError, isDeleteSuccess, isDeleting]);

  // Handle loading state
  if (isLoading) {
    return <CircularIndeterminate />;
  }

  // Handle error state
  if (isError) {
    console.log('error message :', error.data.message);
  }

  // Handle DELETE action
  const handleDelete = (rows) => {
    setclassPeriodToDelete(rows);
    dispatch(setModal({ open: true }));
  };

  const confirmDelete = async () => {
    dispatch(setModal({ open: false }));
    await deleteClassPeriod(classPeriodToDelete.period_id).unwrap();
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
        open={modal.open}
        onClose={() => dispatch(setModal({ open: false }))}
        onConfirm={confirmDelete}
        itemName="Class Period"
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
    </FormComponent>
  );
}

export default ClassPeriodListPage;

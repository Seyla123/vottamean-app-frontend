import React, { useEffect, useState } from 'react';
import { Stack, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { PlusIcon } from 'lucide-react';
import DataTable from '../../../components/common/DataTable';
import FormComponent from '../../../components/common/FormComponent';
import LoadingCircle from '../../../components/loading/LoadingCircle';
import DeleteConfirmationModal from '../../../components/common/DeleteConfirmationModal';
import CreateModal from '../../../components/common/CreateModal';
import EditModal from '../../../components/common/EditModal';
import ViewModal from '../../../components/common/ViewModal';
import { setSnackbar, setModal } from '../../../store/slices/uiSlice';
import {
  useGetClassPeriodQuery,
  useDeleteClassPeriodMutation,
  useCreateClassPeriodMutation,
  useUpdateClassPeriodMutation,
  useGetClassPeriodByIdQuery,
  useDeleteManyClassPeriodsMutation,
} from '../../../services/classPeriodApi';
import {
  calculatePeriod,
  formatTimeTo12Hour,
  formatTimeToHHMM,
} from '../../../utils/formatHelper';
import { ClassPeriodValidator } from '../../../validators/validationSchemas';
import SomthingWentWrong from '../../../components/common/SomthingWentWrong';

const tableTitles = [
  { id: 'period_id', label: 'ID' },
  { id: 'start_time', label: 'Start Time' },
  { id: 'end_time', label: 'End Time' },
  { id: 'period', label: 'Period' },
];
const fields = [
  { name: 'start_time', label: 'Start Time', type: 'time', required: true },
  { name: 'end_time', label: 'End Time', type: 'time', required: true },
];

function ClassPeriodListPage() {
  const [rows, setRows] = useState([]);
  const [selectedClassPeriod, setSelectedClassPeriod] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const dispatch = useDispatch();
  const { modal } = useSelector((state) => state.ui);

  const { data, isLoading, isSuccess, isError, isFetching } = useGetClassPeriodQuery();

  // useDeleteManyClassPeriodsMutation : returns a function to delete many class periods
  const [
    deleteManyClassPeriods,
    {
      isLoading: isDeletingMany,
      isSuccess: isDeleteManySuccess,
      isError: isDeleteManyError,
      error: deleteManyError,
    },
  ] = useDeleteManyClassPeriodsMutation();

  const [
    deleteClassPeriod,
    {
      isLoading: isDeleting,
      isSuccess: isDeleteSuccess,
      isError: isDeleteError,
      error: deleteError,
    },
  ] = useDeleteClassPeriodMutation();
  const [createClassPeriod] = useCreateClassPeriodMutation();
  const [updateClassPeriod] = useUpdateClassPeriodMutation();
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    if (data && isSuccess) {
      const formattedData = data.data.map((item) => ({
        ...item,
        start_time: formatTimeTo12Hour(item.start_time),
        end_time: formatTimeTo12Hour(item.end_time),
        period: calculatePeriod(item.start_time, item.end_time),
      }));
      setRows(formattedData);
    }
  }, [
    data,
    isSuccess,
  ]);

  // when delete is in progress, show a snackbar with a message "Deleting..."
  // when delete is failed, show a snackbar with an error message
  // when delete is successful, show a snackbar with a success message
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
    } else if (isDeleteError) {
      dispatch(
        setSnackbar({
          open: true,
          message: deleteError.data?.message || 'Failed to delete class',
          severity: 'error',
        }),
      );
    } else if (isDeleteManyError) {
      dispatch(
        setSnackbar({
          open: true,
          message: deleteManyError.data?.message || 'Failed to delete class',
          severity: 'error',
        }),
      );
    }
  }, [
    isDeleting,
    isDeleteError,
    isDeleteSuccess,
    dispatch,
    deleteError,
    isDeletingMany,
    isDeleteManyError,
    isDeleteManySuccess,
    deleteManyError])

  const handleCreate = async (formData) => {
    try {
      await createClassPeriod(formData).unwrap();
      dispatch(
        setSnackbar({
          open: true,
          message: 'Class period created successfully',
          severity: 'success',
        }),
      );
      setCreateModalOpen(false);
    } catch (error) {
      dispatch(
        setSnackbar({
          open: true,
          message: error.data?.message || 'Failed to create class period',
          severity: 'error',
        }),
      );
    }
  };

  const handleDelete = (row) => {
    setSelectedClassPeriod(row);
    dispatch(setModal({ open: true }));
  };

  const handleDeleteConfirmed = async () => {
    dispatch(setModal({ open: false }));
    try {
      await deleteClassPeriod(selectedClassPeriod.period_id).unwrap();
      dispatch(
        setSnackbar({
          open: true,
          message: 'Class period deleted successfully',
          severity: 'success',
        }),
      );
    } catch (error) {
      dispatch(
        setSnackbar({
          open: true,
          message: error.data?.message || 'Failed to delete class period',
          severity: 'error',
        }),
      );
    }
  };

  const handleView = (row) => {
    setSelectedClass(row);
    setViewModalOpen(true);
  };

  const handleEditOpen = (row) => {
    setSelectedClass(row);
    setEditModalOpen(true);
  };

  // DELETE MULTIPLE FUNCTIONS
  const handleSelectedDelete = async (selectedIds) => {
    await deleteManyClassPeriods(selectedIds).unwrap();
  };


  // if data is loading
  if(isLoading) {
    return <LoadingCircle />;
  }
  
  // if there is an error
  if(isError){
    return <SomthingWentWrong/>
  }

  return (
    <FormComponent
      title="Class Period List"
      subTitle={`Total Class Periods: ${rows.length}`}
    >
      <Stack direction="row" justifyContent="flex-end">
        <Button
          size="large"
          variant="contained"
          color="primary"
          startIcon={<PlusIcon size={20} />}
          onClick={() => setCreateModalOpen(true)}
        >
          ADD PERIOD
        </Button>
      </Stack>

      <DataTable
        rows={rows}
        columns={tableTitles}
        onView={handleView}
        onEdit={handleEditOpen}
        onDelete={handleDelete}
        onSelectedDelete={handleSelectedDelete}
        hideColumns={['period_id']}
        emptyTitle="No Class Periods"
        emptySubTitle="No class periods available"
        isLoading={isLoading}
        showNO={false}
        idField="period_id"
      />

      <CreateModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Create New Class Period"
        description="Enter the details for the new class period"
        fields={fields}
        onSubmit={handleCreate}
        validationSchema={ClassPeriodValidator}
        submitText={'Create Period'}
      />

      <EditModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit Class Period"
        description="Update the details for this class period"
        fields={fields}
        initialData={selectedClassPeriod}
        validationSchema={ClassPeriodListPage}
        id={selectedClass?.classperiod_id}
        getDataQuery={useGetClassPeriodByIdQuery}
        useUpdateDataMutation={useUpdateClassPeriodMutation}
      />

      <ViewModal
        open={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        title="Class Period Details"
        data={selectedClassPeriod}
      />

      <DeleteConfirmationModal
        open={modal.open}
        onClose={() => dispatch(setModal({ open: false }))}
        onConfirm={handleDeleteConfirmed}
        itemName={
          selectedClassPeriod
            ? `Period ${selectedClassPeriod.period}`
            : 'this period'
        }
      />
    </FormComponent>
  );
}

export default ClassPeriodListPage;

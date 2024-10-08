import React, { useEffect, useState } from 'react';
import { Stack, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { PlusIcon } from 'lucide-react';
import DataTable from '../../../components/common/DataTable';
import FormComponent from '../../../components/common/FormComponent';
import CircularIndeterminate from '../../../components/loading/LoadingCircle';
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
} from '../../../services/classPeriodApi';
import { calculatePeriod, formatTimeTo12Hour, formatTimeToHHMM } from '../../../utils/formatHelper';

const tableTitles = [
  { id: 'period_id', label: 'ID' },
  { id: 'start_time', label: 'Start Time' },
  { id: 'end_time', label: 'End Time' },
  { id: 'period', label: 'Period' },
];


function ClassPeriodListPage() {
  const [rows, setRows] = useState([]);
  const [selectedClassPeriod, setSelectedClassPeriod] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const dispatch = useDispatch();
  const { modal } = useSelector((state) => state.ui);

  const { data, isLoading, isSuccess, isError } = useGetClassPeriodQuery();
  const [deleteClassPeriod, { isLoading: isDeleting, isSuccess: isDeleteSuccess, isError: isDeleteError, error: deleteError }] = useDeleteClassPeriodMutation();
  const [createClassPeriod] = useCreateClassPeriodMutation();
  const [updateClassPeriod] = useUpdateClassPeriodMutation();

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

    if (isDeleting) {
      dispatch(setSnackbar({ open: true, message: 'Deleting...', severity: 'info' }));
    } else if (isDeleteError) {
      dispatch(setSnackbar({ open: true, message: deleteError.data?.message || 'Failed to delete class period', severity: 'error' }));
    } else if (isDeleteSuccess) {
      dispatch(setSnackbar({ open: true, message: 'Deleted successfully', severity: 'success' }));
    }
  }, [data, isSuccess, isDeleting, isDeleteError, isDeleteSuccess, dispatch, deleteError]);

  if (isLoading) return <CircularIndeterminate />;
  if (isError) console.log('error message:', isError.data.message);

  const handleCreate = async (formData) => {
    try {
      await createClassPeriod(formData).unwrap();
      dispatch(setSnackbar({ open: true, message: 'Class period created successfully', severity: 'success' }));
      setCreateModalOpen(false);
    } catch (error) {
      dispatch(setSnackbar({ open: true, message: error.data?.message || 'Failed to create class period', severity: 'error' }));
    }
  };

  const handleEdit = async (formData) => {
    try {
      await updateClassPeriod({ id: selectedClassPeriod.period_id, ...formData }).unwrap();
      dispatch(setSnackbar({ open: true, message: 'Class period updated successfully', severity: 'success' }));
      setEditModalOpen(false);
    } catch (error) {
      dispatch(setSnackbar({ open: true, message: error.data?.message || 'Failed to update class period', severity: 'error' }));
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
      dispatch(setSnackbar({ open: true, message: 'Class period deleted successfully', severity: 'success' }));
    } catch (error) {
      dispatch(setSnackbar({ open: true, message: error.data?.message || 'Failed to delete class period', severity: 'error' }));
    }
  };

  const handleView = (row) => {
    setSelectedClassPeriod(row);
    setViewModalOpen(true);
  };

  const handleEditOpen = (row) => {
    setSelectedClassPeriod({ ...row, start_time: formatTimeToHHMM(row.start_time), end_time: formatTimeToHHMM(row.end_time) });
    setEditModalOpen(true);
  };

  const handleSelectedDelete = async (selectedIds) => {
    try {
      await Promise.all(selectedIds.map((id) => deleteClassPeriod(id).unwrap()));
      dispatch(setSnackbar({ open: true, message: 'Selected class periods deleted successfully', severity: 'success' }));
    } catch (error) {
      dispatch(setSnackbar({ open: true, message: error.data?.message || 'Failed to delete selected class periods', severity: 'error' }));
    }
  };

  const fields = [
    { name: 'start_time', label: 'Start Time', type: 'time', required: true },
    { name: 'end_time', label: 'End Time', type: 'time', required: true },
  ];

  return (
    <FormComponent title="Class Period List" subTitle={`Total Class Periods: ${rows.length}`}>
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
      />

      <EditModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit Class Period"
        description="Update the details for this class period"
        fields={fields}
        initialData={selectedClassPeriod}
        onSubmit={handleEdit}
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
        itemName={selectedClassPeriod ? `Period ${selectedClassPeriod.period}` : 'this period'}
      />
    </FormComponent>
  );
}

export default ClassPeriodListPage;
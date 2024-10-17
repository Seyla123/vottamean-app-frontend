import React, { useEffect, useState } from 'react';
import { Stack, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  Calendar,
  ClockArrowDown,
  ClockArrowUp,
  FolderPen,
  IdCard,
  LetterText,
  PlusIcon,
  Timer,
} from 'lucide-react';
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
  formatDate,
  formatTimeTo12Hour,
} from '../../../utils/formatHelper';
import { ClassPeriodValidator } from '../../../validators/validationSchemas';
import SomethingWentWrong from '../../../components/common/SomethingWentWrong';
import StyledButton from '../../../components/common/StyledMuiButton';
import TitleHeader from '../../../components/common/TitleHeader';

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
  const dispatch = useDispatch();

  // - rows: the class periods that are currently being displayed on the page
  const [rows, setRows] = useState([]);

  // - selectedClassPeriod: the selected class period that currently selected
  const [selectedClassPeriod, setSelectedClassPeriod] = useState(null);

  // - createModalOpen: the state of the create class period modal
  // - editModalOpen: the state of the edit class period modal
  // - viewModalOpen: the state of the view class period modal
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  // - rowsPerPage: the number of rows per page
  // - page: the current page number that is being displayed
  // - totalRows: the total number of rows that are available
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);

  // - open: the state of the delete confirmation modal
  const { modal } = useSelector((state) => state.ui);

  //useGetClassPeriodQuery : a hook that return a function to fetch all class periods
  const { data, isLoading, isSuccess, isError, isFetching, error } =
    useGetClassPeriodQuery({ page: page + 1, limit: rowsPerPage });

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

  // useCreateClassPeriodMutation : a hook that returns a function to create a class period
  const [
    deleteClassPeriod,
    {
      isLoading: isDeleting,
      isSuccess: isDeleteSuccess,
      isError: isDeleteError,
      error: deleteError,
    },
  ] = useDeleteClassPeriodMutation();
  const [
    createClassPeriod,
    {
      isLoading: isCreating,
      isSuccess: isCreateSuccess,
      isError: isCreateError,
      error: createError,
    },
  ] = useCreateClassPeriodMutation();

  // when the class periods records are fetched successfully, set the rows state
  useEffect(() => {
    if (data && isSuccess) {
      const formattedData = data.data.map((item) => ({
        ...item,
        start_time: formatTimeTo12Hour(item.start_time),
        end_time: formatTimeTo12Hour(item.end_time),
        period: calculatePeriod(item.start_time, item.end_time),
      }));
      setRows(formattedData);
      setTotalRows(data.results);
    }
  }, [data, isSuccess]);

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
    deleteManyError,
  ]);

  // when create is successful, show a snackbar with a success message
  // when create is failed, show a snackbar with an error message
  useEffect(() => {
    if (isCreateSuccess) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Class period created successfully',
          severity: 'success',
        }),
      );
      setCreateModalOpen(false);
    } else if (isCreateError) {
      dispatch(
        setSnackbar({
          open: true,
          message:
            createError?.data?.message || 'Failed to create class period',
          severity: 'error',
        }),
      );
      setCreateModalOpen(false);
    }
  }, [isCreateError, isCreateSuccess, dispatch]);

  // Handle page change
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
  // Handle row per page change
  const handleChangeRowsPerPage = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
  };

  // handle create class period
  const handleCreate = async (formData) => {
    await createClassPeriod(formData).unwrap();
  };

  // handle delete class period clicked
  const handleDelete = (row) => {
    setSelectedClassPeriod(row);
    dispatch(setModal({ open: true }));
  };

  // handle delete one confirmed
  const handleDeleteConfirmed = async () => {
    dispatch(setModal({ open: false }));
    await deleteClassPeriod(selectedClassPeriod.period_id).unwrap();
  };

  // Delete Multiple Class Periods
  const handleSelectedDelete = async (selectedIds) => {
    await deleteManyClassPeriods(selectedIds).unwrap();
  };

  // View Class Period
  const handleView = (row) => {
    setSelectedClassPeriod(row);
    setViewModalOpen(true);
  };

  // Edit Class Period
  const handleEditOpen = (row) => {
    setSelectedClassPeriod(row);
    setEditModalOpen(true);
  };

  // if data is loading
  if (isLoading) {
    return <LoadingCircle />;
  }

  // if there is an error
  if (isError) {
    return <SomethingWentWrong description={error?.data?.message} />;
  }

  console.log(selectedClassPeriod);
  // Class period data details
  const classPeriodDataDetails = [
    {
      'Start Time': selectedClassPeriod?.start_time,
      icon: <ClockArrowUp size={18} />,
    },
    {
      'End Time': selectedClassPeriod?.end_time,
      icon: <ClockArrowDown size={18} />,
    },
    {
      Period: selectedClassPeriod?.period,
      icon: <Timer size={18} />,
    },
    {
      'Create At': formatDate(selectedClassPeriod?.createdAt),
      icon: <Calendar size={18} />,
    },
  ];

  return (
    <FormComponent>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <TitleHeader title={'Class Period'} />
        <StyledButton
          variant="contained"
          color="primary"
          startIcon={<PlusIcon size={18} />}
          size="small"
          onClick={() => setCreateModalOpen(true)}
        >
          Create Period
        </StyledButton>
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
        isLoading={isFetching || isLoading}
        showNO={false}
        idField="period_id"
        page={page}
        rowsPerPage={rowsPerPage}
        setPage={handleChangePage}
        setRowsPerPage={handleChangeRowsPerPage}
        totalRows={totalRows}
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
        isLoading={isCreating}
      />

      <EditModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit Class Period"
        description="Update the details for this class period"
        fields={fields}
        initialData={selectedClassPeriod}
        validationSchema={ClassPeriodListPage}
        id={selectedClassPeriod?.period_id}
        getDataQuery={useGetClassPeriodByIdQuery}
        useUpdateDataMutation={useUpdateClassPeriodMutation}
      />

      <ViewModal
        open={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        title="Class Period Details"
        data={classPeriodDataDetails}
      />

      <DeleteConfirmationModal
        open={modal.open}
        onClose={() => dispatch(setModal({ open: false }))}
        onConfirm={handleDeleteConfirmed}
        itemName={
          selectedClassPeriod
            ? `${selectedClassPeriod.start_time} - ${selectedClassPeriod.end_time}`
            : 'this period'
        }
      />
    </FormComponent>
  );
}

export default ClassPeriodListPage;

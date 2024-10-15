import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  useGetAllAttendanceQuery,
  useDeleteAttendanceMutation,
  useDeleteManyAttendanceMutation,
} from '../../../../services/attendanceApi';
import { setModal, setSnackbar } from '../../../../store/slices/uiSlice';
import { transformAttendanceData } from '../../../../utils/formatData';
import FormComponent from '../../../../components/common/FormComponent';
import AttendanceTable from '../../../../components/attendance/AttendanceListTable';
import LoadingCircle from '../../../../components/loading/LoadingCircle';
import ReportHeader from '../../../../components/attendance/ReportHeader';
import DeleteConfirmationModal from '../../../../components/common/DeleteConfirmationModal';
import AttendanceFilter from '../../../../components/attendance/AttendanceFilter';
import { Box, Stack, Divider } from '@mui/material';
import { tableShadow, shadow } from './../../../../styles/global';

const columns = [
  { id: 'name', label: 'Name' },
  { id: 'time', label: 'Time' },
  { id: 'subject', label: 'Subject' },
  { id: 'class', label: 'Class' },
  { id: 'address', label: 'Address' },
];

const AttendanceListPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // - rows: the attendance records that are currently being displayed on the page
  const [rows, setRows] = useState([]);

  // - filter: the current filter data attendance records
  const filter = useSelector((state) => state.attendance.filter);

  // - itemToDelete: the item that is currently being deleted
  const [itemToDelete, setItemToDelete] = useState(null);

  // - open: the state of the delete confirmation modal
  const { modal } = useSelector((state) => state.ui);

  // - rowsPerPage: the number of rows per page
  // - page: the current page number that is being displayed
  // - totalRows: the total number of rows that are available
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);

  // - useGetAllAttendanceQuery: a hook that returns a function to fetch all attendance records
  const {
    data: allAttendanceData,
    isLoading,
    isSuccess,
    isFetching,
  } = useGetAllAttendanceQuery({
    page: page + 1,
    limit: rowsPerPage,
    ...filter,
  });

  // - useDeleteAttendanceMutation: a hook that returns a function to delete an attendance record
  const [
    deleteAttendance,
    { isLoading: isDeleting,
      isSuccess: isDeleteSuccess,
      isError: isDeleteError,
      error: deleteError, },
  ] = useDeleteAttendanceMutation();

  const [
    deleteManyAttendance,
    {
      isLoading: isDeletingMany,
      isSuccess: isDeleteManySuccess,
      isError: isDeleteManyError,
      error: deleteManyError,
    },
  ] = useDeleteManyAttendanceMutation();
  // - when the attendance records are fetched successfully, transform the data and set the rows state
  useEffect(() => {
    if (isSuccess && allAttendanceData) {
      const formattedData = transformAttendanceData(allAttendanceData.data);
      setRows(formattedData);
      setTotalRows(allAttendanceData.results);
    }
  }, [allAttendanceData, isSuccess]);

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
          message: deleteError.data?.message || 'Failed to delete subject',
          severity: 'error',
        }),
      );
    } else if (isDeleteManyError) {
      dispatch(
        setSnackbar({
          open: true,
          message: deleteManyError.data?.message || 'Failed to delete subjects',
          severity: 'error',
        }),
      );
    }
  }, [
    isDeleting,
    isDeleteError,
    isDeleteSuccess,
    deleteError,
    isDeletingMany,
    isDeleteManyError,
    deleteManyError,
    dispatch,
  ]);

  // Handle page change
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
  // Handle row per page change
  const handleChangeRowsPerPage = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
  };

  // handle delete action
  const onDelete = (id) => {
    setItemToDelete(id);
    dispatch(setModal({ open: true }));
  };

  // confirm delete action
  const confirmDelete = async () => {
    dispatch(setModal({ open: false }));
    await deleteAttendance({ id: itemToDelete }).unwrap();
  };
  // handle delete multiple subjects
  const handleSelectedDelete = async (selectedIds) => {
    console.log('this select mul : ', selectedIds);
    await deleteManyAttendance(selectedIds).unwrap();
  };
  // handle view action
  const onView = (id) => {
    navigate(`/admin/attendance/${id}`);
  };

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <FormComponent title={'Attendance List'}>
      <ReportHeader data={rows} title={filter.filterLabel} />
      <Stack sx={tableShadow}>
        <AttendanceFilter />
        <Divider />
        <AttendanceTable
          rows={rows}
          columns={columns}
          hideColumns={['id', 'subject', 'class', 'address']}
          handleDelete={onDelete}
          handleView={onView}
          onSelectedDelete={handleSelectedDelete}
          loading={isLoading}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={handleChangePage}
          setRowsPerPage={handleChangeRowsPerPage}
          totalRows={totalRows}
        />
      </Stack>
      <DeleteConfirmationModal
        open={modal.open}
        onClose={() => dispatch(setModal({ open: false }))}
        onConfirm={confirmDelete}
        itemName={'attendance'}
      />
    </FormComponent>
  );
};

export default AttendanceListPage;

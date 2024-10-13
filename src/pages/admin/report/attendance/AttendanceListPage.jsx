import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetAllAttendanceQuery, useDeleteAttendanceMutation } from "../../../../services/attendanceApi";
import { setModal, setSnackbar } from "../../../../store/slices/uiSlice";
import { transformAttendanceData } from "../../../../utils/formatData";
import FormComponent from "../../../../components/common/FormComponent";
import AttendanceTable from "../../../../components/attendance/AttendanceListTable";
import LoadingCircle from "../../../../components/loading/LoadingCircle";
import ReportHeader from "../../../../components/attendance/ReportHeader";
import DeleteConfirmationModal from "../../../../components/common/DeleteConfirmationModal";
import AttendanceFilter from '../../../../components/attendance/AttendanceFilter';
import { Box, Stack } from '@mui/material'
import { tableShadow } from './../../../../styles/global'

const columns = [
  { id: "id", label: "StudentID" },
  { id: "name", label: "Name" },
  { id: "time", label: "Time" },
  { id: "subject", label: "Subject" },
  { id: "class", label: "Class" },
  { id: "address", label: "Address" },
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

  // - useGetAllAttendanceQuery: a hook that returns a function to fetch all attendance records
  const { data: allAttendanceData, isLoading, isSuccess, isFetching } = useGetAllAttendanceQuery(filter);

  // - useDeleteAttendanceMutation: a hook that returns a function to delete an attendance record
  const [deleteAttendance, { isError, error, isLoading: isDeleting, isSuccess: isDeleted }] = useDeleteAttendanceMutation();

  // - when the attendance records are fetched successfully, transform the data and set the rows state
  useEffect(() => {
    if (isSuccess && allAttendanceData) {
      const formattedData = transformAttendanceData(allAttendanceData.data);
      setRows(formattedData);
    }
  }, [allAttendanceData, isDeleted]);

  // when delete is in progress, show a snackbar with a message "Deleting..."
  // when delete is failed, show a snackbar with an error message
  // when delete is successful, show a snackbar with a success message and navigate to the attendance list page
  useEffect(() => {
    if (isDeleting) {
      dispatch(setSnackbar({ open: true, message: 'Deleting...', severity: 'info' }));
    } else if (isError) {
      dispatch(setSnackbar({ open: true, message: error.data.message, severity: 'error' }));
    } else if (isDeleted) {
      dispatch(setSnackbar({ open: true, message: 'Deleted successfully', severity: 'success' }));
      navigate('/admin/reports/attendance');
    }
  }, [isDeleting, isError, isDeleted, navigate]);

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

  // handle view action
  const onView = (id) => {
    navigate(`/admin/reports/attendance/${id}`);
  };

  if (isLoading) {
    return <LoadingCircle />;
  }
  console.log('this filter :', filter);


  return (
    <FormComponent title={"Attendance List"}>
      <ReportHeader data={rows} title={filter.filterLabel} />
      <Stack sx={{...tableShadow}}>
      <AttendanceFilter />
      <AttendanceTable
        rows={rows}
        columns={columns}
        hideColumns={["id", "subject", 'class', "address"]}
        handleDelete={onDelete}
        handleView={onView}
        loading={isFetching}
      />
      </Stack>
      <DeleteConfirmationModal
        open={modal.open}
        onClose={() => dispatch(setModal({ open: false }))}
        onConfirm={confirmDelete}
        itemName={"attendance"}
      />
    </FormComponent>
  );
};

export default AttendanceListPage;

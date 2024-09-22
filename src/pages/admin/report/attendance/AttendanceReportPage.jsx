import React, { useEffect, useState } from "react";
import FormComponent from "../../../../components/common/FormComponent";
import { Button, Snackbar, Alert, Box } from "@mui/material";
import { DownloadIcon } from "lucide-react";
import AttendanceTable from "../../../../components/attendance/AttendanceReportTable";
import LoadingCircle from "../../../../components/loading/LoadingCircle";
import ReportHeader from "../../../../components/attendance/ReportHeader";
import { useGetAllAttendanceQuery, useDeleteAttendanceMutation } from "../../../../services/attendanceApi";
import { transformAttendanceData } from "../../../../utils/formatData";
import FilterComponent from "../../../../components/common/FilterComponent";
import DeleteConfirmationModal from "../../../../components/common/DeleteConfirmationModal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setRows, setFilter } from "../../../../store/slices/attendanceSlice";
import {setModal, setSnackbar} from "../../../../store/slices/uiSlice";

const subjects = [
  { value: '', label: "All" },
  { value: 1, label: "Math" },
  { value: 2, label: "Science" },
  { value: 3, label: "English" },
];

const classes = [
  { value: '', label: "All" },
  { value: 1, label: "Class A" },
  { value: 2, label: "Class B" },
  { value: 3, label: "Class C" },
];

const filterOptions = [
  { value: "", label: "All" },
  { value: "today", label: "Daily" },
  { value: "lastWeek", label: "Weekly" },
  { value: "lastMonth", label: "Monthly" },
  { value: "lastYear", label: "Yearly" },
];

const columns = [
  { id: "id", label: "StudentID" },
  { id: "name", label: "Name" },
  { id: "time", label: "Time" },
  { id: "subject", label: "Subject" },
  { id: "class", label: "Class" },
  { id: "address", label: "Address" },
];

const AttendanceReportPage = () => {
  const [filterLabel, setFilterLabel] = useState('All Attendance');
  const [itemToDelete, setItemToDelete] = useState(null);

  const dispatch = useDispatch();
  const { rows, filter } = useSelector((state) => state.attendance);
  const {modal , snackbar} = useSelector((state) => state.ui);

  const navigate = useNavigate();
  const { data: allAttendanceData, isLoading, isSuccess, isFetching } = useGetAllAttendanceQuery(filter);
  
  const [deleteAttendance, { isError, error, isLoading: isDeleting, isSuccess: isDeleted }] = useDeleteAttendanceMutation();

  useEffect(() => {
    if (isSuccess && allAttendanceData) {
      const formattedData = transformAttendanceData(allAttendanceData.data);
      dispatch(setRows(formattedData));
    }
  }, [allAttendanceData, isDeleted]);
console.log('modal :', modal.open);
console.log('snackbar :', snackbar.open);


  const handleSubjectChange = (event) => {
    dispatch(setFilter({ ...filter, subject: event.target.value }));
  };

  const handleClassChange = (event) => {
    dispatch(setFilter({ ...filter, class: event.target.value }));
  };

  const handleFilterChange = (event) => {
    dispatch(setFilter({ ...filter, filter: event.target.value }));
    const selectedLabel = filterOptions.find(item => item.value === event.target.value)?.label || 'All';
    setFilterLabel(selectedLabel);
  };

  const onDelete = (id) => {
    setItemToDelete(id);
    dispatch(setModal({ open: true }));
  };

  useEffect(() => {
    if (isDeleting) {
      dispatch(setSnackbar({ open: true, message: 'Deleting...', severity: 'info' }));
    } else if (isError) {
      dispatch(setSnackbar({ open: true, message: error.data.message, severity: 'error' }));
    } else if (isDeleted) {
      dispatch(setSnackbar({ open: true, message: 'Deleted successfully', severity: 'success' }));
      navigate('/admin/reports/attendance');
    }
  }, [isDeleting, isError, isDeleted, dispatch, navigate]);

  const confirmDelete = async () => {
    dispatch(setModal({ open: false } ));
    await deleteAttendance({ id: itemToDelete }).unwrap();
  };

  const onView = (id) => {
    navigate(`/admin/reports/attendance/${id}`);
  };

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <FormComponent title={"Attendance Report"} subTitle={"Report"}>
      <ReportHeader data={rows} title={filterLabel} />
      <Box sx={filterBoxStyle}>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2, alignSelf: "start" }}>
          <FilterComponent
            value={filter.subject}
            data={subjects}
            onChange={handleSubjectChange}
            placeholder={"By Subject"}
          />
          <FilterComponent
            value={filter.class}
            data={classes}
            onChange={handleClassChange}
            placeholder={"By Class"}
          />
        </Box>
        <Box alignSelf={"end"}>
          <FilterComponent
            value={filter.filter}
            data={filterOptions}
            onChange={handleFilterChange}
            placeholder={"Filter"}
          />
        </Box>
      </Box>
      <AttendanceTable
        rows={rows}
        columns={columns}
        hideColumns={["id", "subject", 'class', "address"]}
        handleDelete={onDelete}
        handleView={onView}
        loading={isFetching}
      />
      <Button
        variant="contained"
        endIcon={<DownloadIcon size={16} />}
        onClick={() => console.log('Export clicked')}
        sx={{ alignSelf: "flex-end" }}
      >
        Export List
      </Button>
      <DeleteConfirmationModal
        open={modal.open}
        onClose={() => dispatch(setModal({ open: false }))}
        onConfirm={confirmDelete}
        itemName="Attendance Record" // Adjust item name if needed
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => dispatch(setSnackbar({ open: false }))}
      >
        <Alert
          onClose={() => dispatch(setSnackbar({ open: false }))}
          severity={snackbar.severity || 'info'} // Provide a default severity
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </FormComponent>
  );
};

export default AttendanceReportPage;

const filterBoxStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 4,
  width: "100%",
  gap: 2,
};

import React, { useEffect, useState } from "react";
import FormComponent from "../../../../components/common/FormComponent";
import { Button, Snackbar, Alert } from "@mui/material";
import { DownloadIcon } from "lucide-react";
import AttendanceTable from "../../../../components/attendance/AttendanceReportTable";
import LoadingCircle from "../../../../components/loading/LoadingCircle";
import ReportHeader from "../../../../components/attendance/ReportHeader";
import { useGetAllAttendanceQuery } from "../../../../services/attendanceApi";
import { transformAttendanceData } from "../../../../utils/formatData";
import { Box, BottomNavigation } from "@mui/material";
import FilterComponent from "../../../../components/common/FilterComponent";
import DeleteConfirmationModal from "../../../../components/common/DeleteConfirmationModal";
import { useDeleteAttendanceMutation } from "../../../../services/attendanceApi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setRows, setFilter } from "../../../../store/slices/attendanceSlice";

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
  const [isOpen, setIsOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  
  const dispatch = useDispatch();
  const {rows, filter} = useSelector((state) => state.attendance);

  const navigate = useNavigate();
  const { data: allAttendanceData, isLoading, isSuccess, isFetching} = useGetAllAttendanceQuery(filter);
  
  const [deleteAttendance, { isError, isLoading: isDeleting, isSuccess: isDeleted }] = useDeleteAttendanceMutation();
  useEffect(() => {
    if (isSuccess && allAttendanceData) {
      const formattedData = transformAttendanceData(allAttendanceData.data);
      dispatch(setRows(formattedData));
      console.log('rows data :', rows);
      console.log('filter :', filter);
    }
  }, [allAttendanceData, dispatch]);

  // Call refetch whenever the filter changes
  console.log(' filter outside : ', filter);

  const handleSubjectChange = (event) => {
    dispatch(setFilter({...filter, subject: event.target.value}));
  };

  const handleClassChange = (event) => {
    dispatch(setFilter({...filter,class: event.target.value}));
  };

  const handleFilterChange = (event) => {
    dispatch(setFilter({...filter,filter: event.target.value}));
    const selectedLabel = filterOptions.find(item => item.value === event.target.value)?.label || 'All';
    setFilterLabel(selectedLabel);
  };

  const handleExport = () => {
    console.log('Export clicked');
  };

  const onDelete = (id) => {
    setItemToDelete(id);
    setIsOpen(true);
  };

  const confirmDelete = async () => {
    try {
      setIsOpen(false);
      setSnackbarMessage("Deleted successfully");
      setSnackbarOpen(true);
      await deleteAttendance({ id: itemToDelete }).unwrap();
    } catch (error) {
      setSnackbarMessage("Failed to delete");
      setSnackbarOpen(true);
    }
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
        hideColumns={["id", "subject",'class', "address"]}
        handleDelete={onDelete}
        handleView={onView}
        loading={isFetching}
      />
      <Button
        variant="contained"
        endIcon={<DownloadIcon size={16} />}
        onClick={handleExport}
        sx={{ alignSelf: "flex-end" }}
      >
        Export List
      </Button>
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
          severity={isDeleting ? "info" : (snackbarMessage.includes("Failed") ? "error" : "success")}
          sx={{ width: '100%' }}
        >
          {isDeleting ? "Deleting..." : snackbarMessage}
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


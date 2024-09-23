import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetAllAttendanceQuery, useDeleteAttendanceMutation } from "../../../../services/attendanceApi";
import { setModal, setSnackbar } from "../../../../store/slices/uiSlice";
import { transformAttendanceData } from "../../../../utils/formatData";
import { Button,Box } from "@mui/material";
import { DownloadIcon } from "lucide-react";
import FormComponent from "../../../../components/common/FormComponent";
import AttendanceTable from "../../../../components/attendance/AttendanceReportTable";
import LoadingCircle from "../../../../components/loading/LoadingCircle";
import ReportHeader from "../../../../components/attendance/ReportHeader";
import FilterComponent from "../../../../components/common/FilterComponent";
import DeleteConfirmationModal from "../../../../components/common/DeleteConfirmationModal";

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

  // - rows: the attendance records that are currently being displayed on the page
  // - filter: the current filter data attendance records
  const [rows, setRows] = useState([]);
  const [filter, setFilter] = useState({
    subject: '',
    class: '',
    filter: '',
  })
  // - filterLabel: the label of the current filter that is displayed on the page
  // - itemToDelete: the item that is currently being deleted
  const [filterLabel, setFilterLabel] = useState('All Attendance');
  const [itemToDelete, setItemToDelete] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { modal, snackbar } = useSelector((state) => state.ui);
  console.log('modal : ', modal);
  console.log('snackbar :', snackbar);
  
  // - useGetAllAttendanceQuery: a hook that returns a function to fetch all attendance records
  // - useDeleteAttendanceMutation: a hook that returns a function to delete an attendance record
  const { data: allAttendanceData, isLoading, isSuccess, isFetching } = useGetAllAttendanceQuery(filter);
  const [deleteAttendance, { isError, error, isLoading: isDeleting, isSuccess: isDeleted }] = useDeleteAttendanceMutation();

  // - when the attendance records are fetched successfully, transform the data and set the rows state
  useEffect(() => {
    if (isSuccess && allAttendanceData) {
      const formattedData = transformAttendanceData(allAttendanceData.data);
      setRows(formattedData);
    }
  }, [allAttendanceData, isDeleted]);

  // handle subject and class change
  const handleSubjectClassChange = (event) => {
    setFilter({ ...filter, subject: event.target.value });
  };

  //handle filter change
  const handleFilterChange = (event) => {
    setFilter({ ...filter, filter: event.target.value });
    const selectedLabel = filterOptions.find(item => item.value === event.target.value)?.label || 'All';
    setFilterLabel(selectedLabel);
  };

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
  }, [isDeleting, isError, isDeleted, dispatch, navigate]);
  
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

  return (
    <FormComponent title={"Attendance Report"} subTitle={"Report"}>
      <ReportHeader data={rows} title={filterLabel} />
      <Box sx={filterBoxStyle}>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2, alignSelf: "start" }}>
          <FilterComponent
            value={filter.subject}
            data={subjects}
            onChange={handleSubjectClassChange}
            placeholder={"By Subject"}
          />
          <FilterComponent
            value={filter.class}
            data={classes}
            onChange={handleSubjectClassChange}
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
        itemName={"attendance"}
      />
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

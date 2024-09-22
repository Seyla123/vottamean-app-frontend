import { Box, Tab, Tabs, Snackbar, Alert } from "@mui/material";
import React, { useState, useEffect } from "react";
import FormComponent from "../../../../components/common/FormComponent";
import CardComponent from "../../../../components/common/CardComponent";
import CardInformation from "../../../../components/common/CardInformation";
import { useGetAttendanceQuery, useDeleteAttendanceMutation } from "../../../../services/attendanceApi";
import { useParams, useNavigate } from "react-router-dom";
import LoadingCircle from "../../../../components/loading/LoadingCircle";
import NotFoundPage from "../../../../pages/NotFoundPage";
import { formatAttendanceData } from "../../../../utils/formatData";
import { setAttendanceDetail } from "../../../../store/slices/attendanceSlice";
import { useDispatch, useSelector } from "react-redux";
import DeleteConfirmationModal from '../../../../components/common/DeleteConfirmationModal';
import {setModal, setSnackbar} from "../../../../store/slices/uiSlice";

const tabs = [
  { label: "ATTENDANCE", value: "1", field: "attendance", title: "Attendance Information" },
  { label: "STUDENT", value: "2", field: "student", title: "Student Information", imgField: "studentImg" },
  { label: "TEACHER", value: "3", field: "teacher", title: "Teacher Information", imgField: "teacherImg" },
  { label: "GUARDIAN", value: "4", field: "guardian", title: "Guardian Information" },
];

const AttendanceViewPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { attendanceDetail } = useSelector((state) => state.attendance);
  const {modal, snackbar} = useSelector((state) => state.ui);
  const [value, setValue] = useState(tabs[0].value);

  const { data: attendanceData, isLoading, isSuccess, isError } = useGetAttendanceQuery({ id });
  const [deleteAttendance, { isLoading: isDeleting, isSuccess: deleteSuccess, isError: deleteError, error }] = useDeleteAttendanceMutation();

  useEffect(() => {
    if (isSuccess && attendanceData) {
      const formattedData = formatAttendanceData(attendanceData.data);
      dispatch(setAttendanceDetail(formattedData));
    }
  }, [isSuccess, attendanceData, dispatch]);

  useEffect(() => {
    if (isDeleting) {
      dispatch(setSnackbar({ open: true, message: "Deleting...", severity: "info" }));
    } else if (deleteError) {
      dispatch(setSnackbar({ open: true, message: error.data.message, severity: "error" }));
    } else if (deleteSuccess) {
      dispatch(setSnackbar({ open: true, message: "Deleted successfully", severity: "success" }));
      navigate("/admin/reports/attendance");
    }
  }, [isDeleting, deleteError, deleteSuccess, dispatch, navigate]);

  const confirmDelete = async () => {
    dispatch(setModal({ open: false }));
    await deleteAttendance({ id }).unwrap();
  }

  const handleDelete = () => {
    dispatch(setModal({ open: true }));
  }

  const handleChange = (event, newValue) => setValue(newValue);

  if (isLoading) return <LoadingCircle />;
  if (isError) return <NotFoundPage />;

  return (
    <FormComponent title="View Attendance" subTitle="These are Attendance’s Detail Information">
      <Tabs value={value} onChange={handleChange} variant="scrollable" aria-label="tabs information">
        {tabs.map((tab) => (
          <Tab key={tab.value} label={tab.label} value={tab.value} sx={tabStyle} />
        ))}
      </Tabs>

      {tabs.map((tab) => (
        value === tab.value && (
          <CardComponent
            key={tab.value}
            title={tab.title}
            handleDelete={tab.value === "1" ? handleDelete : null}
            imgUrl={attendanceDetail[tab.imgField] || ""}
          >
            <CardInformation data={attendanceDetail[tab.field]} />
          </CardComponent>
        )
      ))}
      <DeleteConfirmationModal
        open={modal.open}
        onClose={() => dispatch(setModal({ open: false }))}
        onConfirm={confirmDelete}
        itemName="attendance"
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => dispatch(setSnackbar({ open: false }))}
      >
        <Alert
          onClose={() => dispatch(setSnackbar({ open: false }))}
          severity={snackbar.severity || "info"}
          sx={{ width: '100%' }}
        >
          {snackbar.message || ""}
        </Alert>
      </Snackbar>
    </FormComponent>
  );
};

export default AttendanceViewPage;

const tabStyle = { whiteSpace: "normal", wordBreak: "break-word" };

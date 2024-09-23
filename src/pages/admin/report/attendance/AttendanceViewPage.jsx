import { Tab, Tabs } from "@mui/material";
import React, { useState, useEffect } from "react";
import FormComponent from "../../../../components/common/FormComponent";
import CardComponent from "../../../../components/common/CardComponent";
import CardInformation from "../../../../components/common/CardInformation";
import { useGetAttendanceQuery, useDeleteAttendanceMutation } from "../../../../services/attendanceApi";
import { useParams, useNavigate } from "react-router-dom";
import LoadingCircle from "../../../../components/loading/LoadingCircle";
import NotFoundPage from "../../../../pages/NotFoundPage";
import { formatAttendanceData } from "../../../../utils/formatData";
import { useDispatch, useSelector } from "react-redux";
import DeleteConfirmationModal from '../../../../components/common/DeleteConfirmationModal';
import { setModal, setSnackbar } from "../../../../store/slices/uiSlice";

const tabs = [
  { label: "ATTENDANCE", value: "1", field: "attendance", title: "Attendance Information" },
  { label: "STUDENT", value: "2", field: "student", title: "Student Information", imgField: "studentImg" },
  { label: "TEACHER", value: "3", field: "teacher", title: "Teacher Information", imgField: "teacherImg" },
  { label: "GUARDIAN", value: "4", field: "guardian", title: "Guardian Information" },
];

const AttendanceViewPage = () => {
  
  // - value : Set the initial tab value
  // - attendanceDetail : Get the attendance detail currently to be display on the page
  const [value, setValue] = useState(tabs[0].value);
  const [attendanceDetail, setAttendanceDetail] = useState(null);

  // Get the id from the url parameter
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { modal } = useSelector((state) => state.ui);

  // - useGetAttendanceQuery : Fetch the attendance data with the id
  // - useDeleteAttendanceMutation: a hook that returns a function to delete an attendance record
  const { data: attendanceData, isLoading, isSuccess, isError } = useGetAttendanceQuery({ id });
  const [deleteAttendance, { isLoading: isDeleting, isSuccess: deleteSuccess, isError: deleteError, error }] = useDeleteAttendanceMutation();

  // - When the attendance data is fetched, format the data and set the attendance detail in the state
  useEffect(() => {
    if (isSuccess && attendanceData) {
      const formattedData = formatAttendanceData(attendanceData.data);
      setAttendanceDetail(formattedData);
    }
  }, [isSuccess, attendanceData, dispatch]);

  // When the delete is in progress, show a snackbar with a message "Deleting..."
  // When the delete is failed, show a snackbar with an error message
  // When the delete is successful, show a snackbar with a success message and navigate to the attendance list page
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

  // Confirm delete the attendance data
  const confirmDelete = async () => {
    dispatch(setModal({ open: false }));
    await deleteAttendance({ id }).unwrap();
  }

  // Handle delete action
  const handleDelete = () => {
    dispatch(setModal({ open: true }));
  }

  // Handle tab change
  const handleChange = (event, newValue) => setValue(newValue);

  // If the data is loading, show a loading circle
  // If the data is error, show a not found page
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
        itemName={"attendance"}
      />
    </FormComponent>
  );
};

export default AttendanceViewPage;

const tabStyle = { whiteSpace: "normal", wordBreak: "break-word" };

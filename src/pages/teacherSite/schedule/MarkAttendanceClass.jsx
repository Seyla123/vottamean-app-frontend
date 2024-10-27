import React, { useEffect, useState } from 'react';
import AttendanceTable from '../../../components/teacherSite/AttendanceTable';
import FormComponent from '../../../components/common/FormComponent';
import { Box, CircularProgress } from '@mui/material';
import { SendIcon } from 'lucide-react';
import { useGetAllStudentsByClassInSessionQuery } from '../../../services/teacherApi';
import { useGetStatusQuery } from '../../../services/statusApi';
import { transformMarkAttendancetTable } from '../../../utils/formatData';
import { useParams, useNavigate } from 'react-router-dom';
import { useMarkAttendanceMutation } from '../../../services/attendanceApi';
import { useDispatch } from 'react-redux';
import { setSnackbar } from '../../../store/slices/uiSlice';
import StyledButton from '../../../components/common/StyledMuiButton';
import TeacherWelcomeCard from '../../../components/teacherSite/TeacherWelcomeCard';
import TitleHeader from '../../../components/common/TitleHeader';
import ClassMarkedModal from '../../../components/teacherSite/ClassMarkedModal';
import SomethingWentWrong from '../../../components/common/SomethingWentWrong';

const columns = [
  {
    id: 'id',
    label: 'ID',
  },
  {
    id: 'name',
    label: 'Name',
  },

  {
    id: 'gender',
    label: 'Gender',
  },
  {
    id: 'dob',
    label: 'DOB',
  },
  {
    id: 'phone',
    label: 'Phone',
  },
  {
    id: 'address',
    label: 'Address',
  },
];

function MarkAttendanceClass() {
  const { id: sessionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // - useGetAllStudentsByClassInSessionQuery : a hook return fuction for fetching all students by class in session
  const {
    data: studentsData,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetAllStudentsByClassInSessionQuery(sessionId);

  // - useGetStatusQuery : a hook return fuction for fetching all status
  const {
    data: statusData,
    isLoading: isLoadingStatus,
    isError: isErrorStatus,
    isSuccess: isSuccessStatus,
    error: errorStatus,
  } = useGetStatusQuery();

  // useMarkAttendanceMutation : a hook return fuction for mark attendance students
  const [
    markAttendance,
    {
      isError: isMarkAttendanceError,
      error: markAttendanceError,
      isLoading: isMarkAttendanceLoading,
      isSuccess: isMarkAttendanceSuccess,
    },
  ] = useMarkAttendanceMutation();

  // rows : the data to be displayed in the table
  // status : the status of attendance to be displayed in the table
  const [rows, setRows] = useState([]);
  const [status, setStatus] = useState([]);
  const [classInfo, setClassInfo] = useState({});

  // openModal : state for modal
  const [openModal, setOpenModal] = useState(false);

  // if get all students by class in session is success,
  // then set rows to transformed data
  useEffect(() => {
    if (studentsData && isSuccess) {
      const formattedData = transformMarkAttendancetTable(studentsData.data);
      setRows(formattedData);
      setClassInfo(studentsData.Class);
    }
    if (isError && error?.data?.message === 'This class is already marked today') {
      setOpenModal(true);
    }
  }, [studentsData, isSuccess, isError]);

  // if get all status is success,
  // then set status to status data
  useEffect(() => {
    if (statusData && isSuccessStatus) {
      setStatus(statusData.data);
    }
  }, [statusData]);

  // when Mark Attendance is in progress, show a snackbar with a message "Loading..."
  // when Mark Attendance is failed, show a snackbar with an error message
  // when Mark Attendance is successful, show a snackbar with a success message and navigate to the teacher dashboard
  useEffect(() => {
    if (isMarkAttendanceError) {
      dispatch(
        setSnackbar({
          open: true,
          message: markAttendanceError.data.message,
          severity: 'error',
        }),
      );
    } else if (isMarkAttendanceSuccess) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Mark attendance successfully',
          severity: 'success',
        }),
      );
      navigate('/teacher/schedule');
    }
  }, [
    isMarkAttendanceSuccess,
    markAttendanceError,
    isMarkAttendanceError,
    navigate,
    dispatch,
    isMarkAttendanceLoading,
  ]);

  //handle submit mark attendance student
  const handleSubmit = async () => {
    const submitData = rows.map((row) => ({
      student_id: row.id,
      status_id: row.status || 3, // Default to 'Absent'
    }));
    const data = { session_id: sessionId, attendance: submitData };
    await markAttendance(data);
  };

  // handle status change
  const handleStatusChange = (updatedRow, newStatus) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === updatedRow.id ? { ...row, status: newStatus } : row,
      ),
    );
  };
  if (isError && error?.data?.message !== 'This class is already marked today' || isErrorStatus) {
    return <SomethingWentWrong description={`${error?.data?.message || errorStatus?.data?.message}`} />
  }
  return (
    <FormComponent>
      <TitleHeader title={'Mark Attendance Class'} />
      {/* welcome card */}
      <TeacherWelcomeCard subTitle={`Welcome to class ${classInfo?.class_name || ''}`} />
      <ClassMarkedModal open={openModal} onClose={() => navigate('/teacher/schedule')} />

      <Box display={'flex'} justifyContent={'end'} gap={2}>
        <StyledButton
          size="small"
          variant="contained"
          color="primary"
          startIcon={
            isMarkAttendanceLoading && (
              <CircularProgress size={24} color="inherit" />
            )
          }
          endIcon={<SendIcon size={18} />}
          onClick={handleSubmit}
          disabled={isMarkAttendanceLoading}
        >
          Mark attendance
        </StyledButton>
      </Box>
      <AttendanceTable
        rows={rows}
        columns={columns}
        hideColumns={['dob', 'address', 'phone', 'id']}
        status={status}
        onStatusChange={handleStatusChange}
        isLoading={isLoading || isLoadingStatus}
      />
    </FormComponent>
  );
}

export default MarkAttendanceClass;

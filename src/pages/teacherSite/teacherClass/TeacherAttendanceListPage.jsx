import React, { useEffect, useState } from 'react';
import AttendanceTable from '../../../components/teacherSite/AttendanceTable';
import FormComponent from '../../../components/common/FormComponent';
import { Box, Button, Grid2 } from '@mui/material';
import { SendIcon, DownloadIcon } from 'lucide-react';
import { useGetAllStudentsByClassInSessionQuery } from '../../../services/teacherApi';
import { useGetStatusQuery } from '../../../services/statusApi';
import LoadingCircle from '../../../components/loading/LoadingCircle';
import { transformMarkAttendancetTable } from '../../../utils/formatData';

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

function TeacherAttendanceListPage() {
  // - useGetAllStudentsByClassInSessionQuery : get all students by class in session
  // - useGetStatusQuery : get all status
  const  { data: studentsData, isLoading , isError , isSuccess, error } = useGetAllStudentsByClassInSessionQuery(6);
  const { data: statusData, isLoading: isLoadingStatus, isError: isErrorStatus, isSuccess: isSuccessStatus, error: errorStatus } = useGetStatusQuery();

  // rows : the data to be displayed in the table
  // status : the status of attendance to be displayed in the table
  const [rows, setRows] = useState([]);
  const [status, setStatus] = useState([]);

  // if get all students by class in session is success, 
  // then set rows to transformed data
  useEffect(() => {
    if(studentsData && isSuccess){
      const formattedData = transformMarkAttendancetTable(studentsData.data);
      setRows(formattedData)
    }
  },[studentsData, isSuccess])

  // if get all status is success, 
  // then set status to status data
  useEffect(() => {
    if(statusData && isSuccessStatus){
      setStatus(statusData.data)
    }
  },[statusData])

  // handle loading
  if(isLoading || isLoadingStatus){
    return <LoadingCircle/>
  }

  // if isError or isErrorStatus is true, then show error message
  if(isError ){
    return <div>this is error : {error.data.message}</div>
  }
  if(isErrorStatus ){
    return <div>this is error : {errorStatus.data.message}</div>
  }

  // handle status change
  const handleStatusChange = (updatedRow, newStatus) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === updatedRow.id ? { ...row, status: newStatus } : row,
      ),
    );
    console.log(`Changed ${updatedRow.name} to ${newStatus}`);
  };

  // handle send button
  const handleSend = () => {
    console.log('Send');
  };

  // handle export button
  const handleExport = () => {
    console.log('Export');
  };

  return (
    <FormComponent
      title="Attendance List"
      subTitle={`This is attendance list of ${rows.length} students`}
    >
      <Box display={'flex'} justifyContent={'end'} gap={2}>
        <Button
          variant="outlined"
          endIcon={<SendIcon size={16} />}
          onClick={handleSend}
        >
          Send List
        </Button>
        <Button
          variant="contained"
          endIcon={<DownloadIcon size={16} />}
          onClick={handleExport}
        >
          Export List
        </Button>
      </Box>
      <AttendanceTable
        rows={rows}
        columns={columns}
        hideColumns={['dob', 'address', 'phone']}
        status={status}
        onStatusChange={handleStatusChange}
      />
    </FormComponent>
  );
}

export default TeacherAttendanceListPage;

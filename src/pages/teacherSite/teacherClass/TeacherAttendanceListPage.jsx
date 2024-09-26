import React, { useEffect, useState } from 'react';
import AttendanceTable from '../../../components/teacherSite/AttendanceTable';
import FormComponent from '../../../components/common/FormComponent';
import { Box, Button, Grid2 } from '@mui/material';
import { SendIcon, DownloadIcon } from 'lucide-react';
import { useGetAllStudentsByClassInSessionQuery } from '../../../services/teacherApi';
import LoadingCircle from '../../../components/loading/LoadingCircle';

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

// Function to transform the data
const transformStudentData = (apiResponse) => {
  return apiResponse.map((item) => ({
    id: `ANB0${item.student_id}`,
    img: item.Info.photo || '', // Adjust the URL as needed
    name: `${item.Info.first_name} ${item.Info.last_name}`,
    gender: item.Info.gender === "Male" ? 'M' : 'F', // Convert to 'M' or 'F'
    phone: item.Info.phone_number,
    address: item.Info.address,
    dob: item.Info.dob,
    status: null, // Adjust status based on active field
  }))
};
function TeacherAttendanceListPage() {
  const  { data: studentsData, isLoading , isError , isSuccess, error } = useGetAllStudentsByClassInSessionQuery(6);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if(studentsData && isSuccess){
      const formattedData = transformStudentData(studentsData.data);
      setRows(formattedData)
      console.log('this data : ', formattedData);
    }
  },[studentsData, isSuccess])

  
  
  const status = ['Present', 'Absent', 'Late', 'Permission'];
  const hideColumns = ['dob', 'address', 'phone'];
  console.log('this is : ', );
  
  if(isLoading){
    console.log('loading :',  isLoading);
    return <LoadingCircle/>
  }
  if(isError){
    console.log('this is error :', error.data.message);
    return <div>this is error : {error.data.message}</div>
  }

  const handleStatusChange = (updatedRow, newStatus) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === updatedRow.id ? { ...row, status: newStatus } : row,
      ),
    );
    console.log(`Changed ${updatedRow.name} to ${newStatus}`);
  };

  const handleSend = () => {
    console.log('Send');
  };

  const handleExport = () => {
    console.log('Export');
  };

  return (
    <FormComponent
      title="Attendance List"
      subTitle={`This is attendance list of ${rows.length} students`}
    >
      <Grid2 xs={12} container>
        {/* Status card */}
        {/* <StatusCard rows={rows} /> */}
      </Grid2>
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
        status={status}
        hideColumns={hideColumns}
        onStatusChange={handleStatusChange}
      />
    </FormComponent>
  );
}

export default TeacherAttendanceListPage;

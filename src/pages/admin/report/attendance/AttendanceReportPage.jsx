import { useState, useEffect } from "react";
import FormComponent from "../../../../components/common/FormComponent";
import LoadingCircle from "../../../../components/loading/LoadingCircle";
import { useGetReportAttendanceByClassQuery } from "../../../../services/attendanceApi";
import AttendanceTable from "../../../../components/attendance/AttendanceTable";
import { useSelector } from "react-redux";
import { Stack } from "@mui/material";
import { shadow } from "../../../../styles/global";
const AttendanceReportPage = () => {
  const [reportData, setReportData] = useState({});  
  const [toggleAttendanceKey, setToggleAttendanceKey] = useState(false);

  const filter = useSelector((state) => state.attendance.filter);
  const { data, isLoading, isError, isSuccess } = useGetReportAttendanceByClassQuery(filter);

  useEffect(() => {
    if (isSuccess) {
      setReportData(data.data);
    }
  }, [data,isSuccess]);
  
  const { subjects, dates, result, classes, school } = reportData;
  


  return (
    <FormComponent title={"Attendance Report"}>
      <Stack bgcolor={'white'} borderRadius={'8px'} sx={shadow}>
      <AttendanceTable 
        subjects={subjects} 
        dates={dates} 
        result={result} 
        classData={classes} 
        school={school}
        toggleAttendanceKey={toggleAttendanceKey}
        isLoading={isLoading}
      />

      </Stack>
    </FormComponent>
  );
};

export default AttendanceReportPage;


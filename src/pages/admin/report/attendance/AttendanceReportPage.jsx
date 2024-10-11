import { useState, useEffect } from "react";
import FormComponent from "../../../../components/common/FormComponent";
import LoadingCircle from "../../../../components/loading/LoadingCircle";
import { useGetReportAttendanceByClassQuery } from "../../../../services/attendanceApi";
import AttendanceTable from "../../../../components/attendance/AttendanceTable";
const AttendanceReportPage = () => {
  const [reportData, setReportData] = useState({});  
  const [toggleAttendanceKey, setToggleAttendanceKey] = useState(true);

  const { data, isLoading, isError, isSuccess } = useGetReportAttendanceByClassQuery();

  useEffect(() => {
    if (isSuccess) {
      setReportData(data.data);
    }
  }, [data]);
  console.log('this is main data : ', reportData);
  const { subjects, dates, result, class: classData, school } = reportData;
  
  
  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <FormComponent title={"Attendance Report"}>
      {/* <AttendanceReportTable /> */}
      <AttendanceTable 
        subjects={subjects} 
        dates={dates} 
        result={result} 
        classData={classData} 
        school={school}
        toggleAttendanceKey={toggleAttendanceKey}
      />
    </FormComponent>
  );
};

export default AttendanceReportPage;


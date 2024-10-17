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
  }, [data, isSuccess]);

  const { dates, result, classes, school } = reportData;

  let emptyTitleData = {
    emptyTitle: 'No Data',
    emptySubTitle: 'No attendance data available for this class',
  }
  if (filter.class == '' || filter.class == 'all') {
    emptyTitleData = {
      emptyTitle: 'Class Required',
      emptySubTitle: 'Please select a class to view attendance data',
    }
  }
console.log('this ',emptyTitleData);

  return (
    <FormComponent title={"Attendance Report"}>
      <Stack bgcolor={'white'} borderRadius={'8px'} sx={shadow}>
        <AttendanceTable
          dates={dates}
          result={result}
          classData={classes}
          school={school}
          toggleAttendanceKey={toggleAttendanceKey}
          isLoading={isLoading}
          emptyTitle={emptyTitleData.emptyTitle}
          emptySubTitle={emptyTitleData.emptySubTitle}
        />

      </Stack>
    </FormComponent>
  );
};

export default AttendanceReportPage;


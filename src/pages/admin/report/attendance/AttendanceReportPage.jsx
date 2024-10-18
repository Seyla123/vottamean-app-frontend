import { useState, useEffect } from "react";
import FormComponent from "../../../../components/common/FormComponent";
import { useGetReportAttendanceByClassQuery } from "../../../../services/attendanceApi";
import AttendanceTable from "../../../../components/attendance/AttendanceTable";
import { useSelector } from "react-redux";
import { Stack, Box } from "@mui/material";
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

  const emptyTitleData = {
    emptyTitle: filter.class === "" || filter.class === "all" ? "Class Required" : "No Data",
    emptySubTitle: filter.class === "" || filter.class === "all" ? "Please select a class to view attendance data" : "No attendance data available for this class",
  };

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


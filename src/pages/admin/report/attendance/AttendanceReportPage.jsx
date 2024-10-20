import { useState, useEffect } from "react";
import FormComponent from "../../../../components/common/FormComponent";
import { useGetReportAttendanceByClassQuery } from "../../../../services/attendanceApi";
import AttendanceTable from "../../../../components/attendance/AttendanceTable";
import { useSelector } from "react-redux";
import { Stack, Box } from "@mui/material";
import { shadow } from "../../../../styles/global";
import ReportHeader from "../../../../components/attendance/ReportHeader";
const AttendanceReportPage = () => {
  const [reportData, setReportData] = useState({});
  const [toggleAttendanceKey, setToggleAttendanceKey] = useState(false);

  // - selectorClasses: the list of all classes in the attendance data, including deleted ones
  // - selectorSubjects: the list of all subjects in the attendance data, including deleted ones
  const [selectorClasses, setSelectorClasses] = useState([]);
  const [selectorSubjects, setSelectorSubjects] = useState([]);

  // totalStatusSummary: the total summary of attendance status
  const [totalStatusSummary, setTotalStatusSummary] = useState([]);

  const filter = useSelector((state) => state.attendance.filter);
  const { data, isLoading, isError, isSuccess } = useGetReportAttendanceByClassQuery(filter);

  useEffect(() => {
    if (isSuccess) {
      setReportData(data.data);
      setSelectorClasses(data.all_classes_unique);
      setSelectorSubjects(data.all_subjects_unique);
      setTotalStatusSummary(data?.total_summary);
    }
  }, [data, isSuccess]);

  const { dates, result, classes, school } = reportData;

  const emptyTitleData = {
    emptyTitle: filter.class === "" || filter.class === "all" ? "Class Required" : "No Data",
    emptySubTitle: filter.class === "" || filter.class === "all" ? "Please select a class to view attendance data" : "No attendance data available for this class",
  };

  return (
    <FormComponent title={"Attendance Report"}>
      <ReportHeader data={totalStatusSummary} />
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
          selectedClasses={selectorClasses} 
          selectedSubjects={selectorSubjects}
        />

      </Stack>
    </FormComponent>
  );
};

export default AttendanceReportPage;


import FormComponent from "../../../../components/common/FormComponent";
import LoadingCircle from "../../../../components/loading/LoadingCircle";
import AttendanceFilter from '../../../../components/attendance/AttendanceFilter';
import AttendanceReportTable from "../../../../components/attendance/AttendanceReportTable";
import AttendanceTable from "../../../../components/attendance/AttendanceTable";
const AttendanceReportPage = () => {

  // if (isLoading) {
  //   return <LoadingCircle />;
  // }


  return (
    <FormComponent title={"Attendance Report"}>
      {/* <AttendanceFilter pdfData/> */}
      {/* <AttendanceReportTable /> */}
      <AttendanceTable/>
    </FormComponent>
  );
};

export default AttendanceReportPage;

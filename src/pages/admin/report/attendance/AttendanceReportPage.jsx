import { useState, useEffect } from 'react';
import FormComponent from '../../../../components/common/FormComponent';
import { useGetReportAttendanceByClassQuery } from '../../../../services/attendanceApi';
import AttendanceTable from '../../../../components/attendance/AttendanceTable';
import { useSelector } from 'react-redux';
import ReportHeader from '../../../../components/attendance/ReportHeader';
import TitleHeader from '../../../../components/common/TitleHeader';

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
  const { data, isLoading, isError, isSuccess } =
    useGetReportAttendanceByClassQuery(filter, { skip: !filter.class });

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
    emptyTitle:
      filter.class === '' || filter.class === 'all'
        ? 'Class Required'
        : 'No Data',
    emptySubTitle:
      filter.class === '' || filter.class === 'all'
        ? 'Please select a class to view attendance data'
        : 'No attendance data available for this class',
  };

  return (
    <FormComponent>
      <TitleHeader title={'Subject'} />
      <ReportHeader data={totalStatusSummary} />
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
    </FormComponent>
  );
};

export default AttendanceReportPage;

import StaticTable from '../../../components/common/StaticTable';
import { useGetTeacherScheduleClassesQuery } from '../../../services/teacherApi';
import { useState, useEffect } from 'react';
import { formatStartEndTime } from '../../../utils/formatHelper';
import LoadingCircle from '../../../components/loading/LoadingCircle';
import FormComponent from '../../../components/common/FormComponent';
import ClassNotFound from '../../../components/teacherSite/ClassNotFound';
import EmptyList from '../../../components/common/EmptyList';
import emptyImage from '../../../assets/images/conversation-29.svg';
import { Plus } from 'lucide-react';

const columns = [
  { id: 'session_id', label: 'Session ID' },
  { id: 'class_name', label: 'Class Name' },
  { id: 'time', label: 'Time' },
  { id: 'day', label: 'Day' },
  { id: 'subject', label: 'Subject' },
];

function TeacherSessionPage() {
  // useGetTeacherScheduleClassesQuery : This is the data fetching hook for the teacher classes,fetch the classes schedule for the current day
  const {
    data: getTeacherClasses,
    error,
    isLoading,
    isSuccess,
    isError,
  } = useGetTeacherScheduleClassesQuery();

  // rows : This is the state for the session Classes
  const [rows, setRows] = useState([]);

  // It will set the state of the classes based on the data from the hook
  useEffect(() => {
    if (getTeacherClasses && isSuccess) {
      const fetchedData = getTeacherClasses.data;
      setRows(fetchedData);
    }
  }, [getTeacherClasses, isSuccess]);

  // add format time data
  const formattedRows = rows.map((row) => ({
    ...row,
    time: formatStartEndTime(row),
  }));

  // error handler
  if (isError) {
    return <div>Error loading class data: {error.data.message}</div>;
  }

  if (isLoading) {
    return <LoadingCircle />;
  }

  // This is the handling for no classes found
  if (isSuccess && rows.length == 0) {
    return (
      <EmptyList
        image={emptyImage}
        title="No Schedule found"
        description="It looks like your schedule list is empty. Add some session to get started!"
      />
    );
  }
  return (
    <FormComponent
      title="Teacher schedule"
      subTitle={`These are ${rows.length} classes`}
    >
      <StaticTable
        columns={columns}
        rows={formattedRows}
        hideColumns={['session_id']}
      />
    </FormComponent>
  );
}

export default TeacherSessionPage;

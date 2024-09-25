import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import FormComponent from '../../../components/common/FormComponent';
import CardComponent from '../../../components/common/CardComponent';
import ButtonContainer from '../../../components/common/ButtonContainer';
import SelectField from '../../../components/common/SelectField';
import { useCreateSessionMutation } from '../../../services/sessionApi';
import {
  useGetClassPeriodByIdQuery,
  useViewListClassPeriodQuery,
} from '../../../services/classPeriodApi';
import { useGetClassesDataQuery } from '../../../services/classApi';
import { useGetAllTeachersQuery } from '../../../services/teacherApi';

// Main Component
const SessionCreatePage = () => {
  const [form, setForm] = useState({
    teacher: '',
    classPeriod: '',
    classes: '',
    subject: '',
    dayOfWeek: '',
  });

  const [createSession, { isLoading, isError, isSuccess }] =
    useCreateSessionMutation();

  const [periods, setPeriods] = useState([]);
  const { data } = useViewListClassPeriodQuery();
  useEffect(() => {
    if (data) {
      const transformPeriod = data.data.map((item) => {
        return {
          value: `${item.start_time} - ${item.end_time}`,
          label: `${item.start_time} - ${item.end_time}`,
        };
      });
      setPeriods(transformPeriod);
      console.log(data);
    }
  }, [data]);

  const periodsData = periods;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async () => {
    try {
      const result = await createSession(form);
      console.log('session create success', result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormComponent
      title="Add session"
      subTitle="Please Fill session information"
    >
      <CardComponent title="Session Information">
        <Box component="form" sx={containerStyle}>
          {/* Teacher field */}
          <SelectField
            label="Teacher"
            name="teacher"
            placeholder="Teacher"
            value={form.teacher}
            onChange={handleChange}
            options={teachersData}
          />
          {/* Class Period */}
          <SelectField
            label="Class Period"
            name="classPeriod"
            placeholder="class Period"
            value={form.classPeriod}
            onChange={handleChange}
            options={periodsData}
          />
          {/* Classes */}
          <SelectField
            label="Class"
            name="classes"
            placeholder="Class"
            value={form.classes}
            onChange={handleChange}
            options={classesData}
          />
          {/* Subject */}
          <SelectField
            label="Subject"
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
            options={subjectsData}
          />
          {/* Day of Week */}
          <SelectField
            label="Day of Week"
            name="dayOfWeek"
            placeholder={'Day of Week'}
            value={form.dayOfWeek}
            onChange={handleChange}
            options={dowData}
          />
        </Box>
        {/* Button Container */}
        <ButtonContainer
          rightBtn={handleCreate}
          leftBtnTitle="Cancel"
          rightBtnTitle="Add Subject"
        />
      </CardComponent>
    </FormComponent>
  );
};

export default SessionCreatePage;
const containerStyle = {
  '& .MuiTextField-root': { width: 1 },
  width: '100%',
  display: 'grid',
  gap: { xs: '12px', md: '24px' },
  margin: '0 auto',
  gridTemplateColumns: {
    xs: 'repeat(1, 1fr)',
    md: 'repeat(2, 1fr)',
  },
};
// Data for the select options
const teachersData = [
  { value: 'Smey', label: 'Smey' },
  { value: 'Mary', label: 'Mary' },
  { value: 'Berry', label: 'Berry' },
];

const classesData = [
  { value: '12A', label: '12A' },
  { value: '12B', label: '12B' },
  { value: '12C', label: '12C' },
];

const subjectsData = [
  { value: 'Math', label: 'Math' },
  { value: 'Khmer', label: 'Khmer' },
  { value: 'English', label: 'English' },
];

const dowData = [
  { value: 'Monday', label: 'Monday' },
  { value: 'Tuesday', label: 'Tuesday' },
  { value: 'Wednesday', label: 'Wednesday' },
];

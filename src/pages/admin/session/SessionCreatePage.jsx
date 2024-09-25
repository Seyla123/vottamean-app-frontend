import { useEffect, useState } from 'react';
import { Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import FormComponent from '../../../components/common/FormComponent';
import CardComponent from '../../../components/common/CardComponent';
import ButtonContainer from '../../../components/common/ButtonContainer';
import { useCreateSessionMutation } from '../../../services/sessionApi';
import { useGetClassPeriodQuery } from '../../../services/classPeriodApi';
import { useGetClassesDataQuery } from '../../../services/classApi';
import { useGetAllTeachersQuery } from '../../../services/teacherApi';
import { useGetDayQuery } from '../../../services/daysApi';
import { useGetSubjectsQuery } from '../../../services/subjectApi';
import { useNavigate } from 'react-router-dom';

// Main Component
const SessionCreatePage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    teacher: '',
    classPeriod: '',
    classes: '',
    subject: '',
    dayOfWeek: '',
  });

  const [createSession] = useCreateSessionMutation();

  // handle periods data for select field
  const [periods, setPeriods] = useState([]);
  const { data } = useGetClassPeriodQuery();
  useEffect(() => {
    if (data) {
      const transformPeriod = data.data.map((item) => ({
        value: item.period_id, // Store period_id
        label: `${item.start_time} - ${item.end_time}`, // Display time range
      }));
      setPeriods(transformPeriod);
    }
  }, [data]);

  // handle class data for select field
  const [classes, setClass] = useState([]);
  const { data: classData } = useGetClassesDataQuery();
  useEffect(() => {
    if (classData) {
      const classFormat = classData.data.map((item) => ({
        value: item.class_id, // Store class_id
        label: item.class_name, // Display class name
      }));
      setClass(classFormat);
    }
  }, [classData]);

  // handle teachers data for select field
  const [teachers, setTeachers] = useState([]);
  const { data: teacherData } = useGetAllTeachersQuery();
  useEffect(() => {
    if (teacherData) {
      const teacherFormat = teacherData.data.map((item) => ({
        value: item.teacher_id, // Store teacher_id
        label: `${item.Info.first_name} ${item.Info.last_name}`, // Display full name
      }));
      setTeachers(teacherFormat);
    }
  }, [teacherData]);

  // handle days data for select field 
  const [days, setDays] = useState([]);
  const { data: dayData } = useGetDayQuery(); 
  useEffect(() => {
    if (dayData) {
      const dayFormat = dayData.data.map((item) => ({
        value: item.day_id, // Store day_id
        label: item.day, // Display day name
      }));
      setDays(dayFormat);
    }
  }, [dayData]);

  // handle subjects data for select field
  const [subjects, setSubjects] = useState([]);
  const { data: subjectData } = useGetSubjectsQuery();
  useEffect(() => {
    if (subjectData){
      const subjectFormat = subjectData.data.map((item) => ({
        value: item.subject_id, // Store subject_id
        label: item.name, // Display subject name
      }));
      setSubjects(subjectFormat);
    }
  }, [subjectData])

  // Form change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleCreate = async () => {
    const sessionData = {
      class_id: form.classes,
      subject_id: form.subject,
      day_id: form.dayOfWeek,
      teacher_id: form.teacher,
      period_id: form.classPeriod,
    };

    try {
      const result = await createSession(sessionData);
      console.log('Session created successfully', result);
      navigate('/admin/sessions');
    } catch (error) {
      console.log('Error creating session', error);
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
          <FormControl fullWidth>
            <InputLabel>Teacher</InputLabel>
            <Select
              name="teacher"
              value={form.teacher}
              onChange={handleChange}
              label="Teacher"
            >
              {teachers.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Class Period */}
          <FormControl fullWidth>
            <InputLabel>Class Period</InputLabel>
            <Select
              name="classPeriod"
              value={form.classPeriod}
              onChange={handleChange}
              label="Class Period"
            >
              {periods.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Classes */}
          <FormControl fullWidth>
            <InputLabel>Class</InputLabel>
            <Select
              name="classes"
              value={form.classes}
              onChange={handleChange}
              label="Class"
            >
              {classes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Subject */}
          <FormControl fullWidth>
            <InputLabel>Subject</InputLabel>
            <Select
              name="subject"
              value={form.subject}
              onChange={handleChange}
              label="Subject"
            >
              {subjects.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Day of Week */}
          <FormControl fullWidth>
            <InputLabel>Day of Week</InputLabel>
            <Select
              name="dayOfWeek"
              value={form.dayOfWeek}
              onChange={handleChange}
              label="Day of Week"
            >
              {days.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <ButtonContainer
          rightBtn={handleCreate}
          leftBtnTitle="Cancel"
          rightBtnTitle="Add Session"
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

import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';

// style
import { Box } from '@mui/material';
import FormComponent from '../../../components/common/FormComponent';
import CardComponent from '../../../components/common/CardComponent';
import ButtonContainer from '../../../components/common/ButtonContainer';
import { setSnackbar } from '../../../store/slices/uiSlice';
import RenderSelect from './RenderSelect';

// api
import { useGetClassPeriodQuery } from '../../../services/classPeriodApi';
import { useGetClassesDataQuery } from '../../../services/classApi';
import { useGetAllTeachersQuery } from '../../../services/teacherApi';
import { useGetDayQuery } from '../../../services/daysApi';
import { useGetSubjectsQuery } from '../../../services/subjectApi';

import {
  useUpdateSessionMutation,
  useGetSessionByIdQuery,
} from '../../../services/sessionApi';

// Validation Schema
import { SessionValidator } from '../../../validators/validationSchemas';

import { ensureOptionInList, transformedForSelector } from '../../../utils/formatHelper';

const SessionUpdatePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  // selector options for session
  const [periods, setPeriods] = useState([]);
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [days, setDays] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [originData, setOriginData] = useState(null); // originData ,

  const { data: session } = useGetSessionByIdQuery(id);
  const [updateSession, { isLoading, isError, isSuccess, error }] =
    useUpdateSessionMutation();
  const { data: periodData, isSuccess: isPeriodSuccess } = useGetClassPeriodQuery();
  const { data: classData, isSuccess: isClassSuccess } = useGetClassesDataQuery();
  const { data: teacherData, isSuccess: isTeacherSuccess } = useGetAllTeachersQuery();
  const { data: dayData, isSuccess: isDaySuccess } = useGetDayQuery();
  const { data: subjectData, isSuccess: isSubjectSuccess } = useGetSubjectsQuery();

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SessionValidator),
    defaultValues: {
      teacher_id: '',
      period_id: '',
      class_id: '',
      subject_id: '',
      day_id: '',
    },
  });
  console.log('this data session : ', session);
  useEffect(() => {
    if (session && isPeriodSuccess && isClassSuccess && isTeacherSuccess && isDaySuccess && isSubjectSuccess) {
      const dataSession = {
        teacher_id: session?.data?.Teacher?.teacher_id,
        period_id: session?.data?.Period?.period_id,
        class_id: session?.data?.Class?.class_id,
        subject_id: session?.data?.Subject?.subject_id,
        day_id: session?.data?.DayOfWeek?.day_id,
      };
      
      const formattedSelectedTeacher = ensureOptionInList(teacherData?.data, session?.data?.Teacher, 'teacher_id', ['Info.first_name', 'Info.last_name'])
      const formattedSelectedClass = ensureOptionInList(classData?.data, session?.data?.Class, 'class_id', 'class_name')
      const formattedSelectedSubject = ensureOptionInList(subjectData?.data, session?.data?.Subject, 'subject_id', 'subject_name')
      const formattedSelectedPeriod = ensureOptionInList(periodData?.data, session?.data?.Period, 'period_id', ['start_time', 'end_time']);
      const formattedSelectedDay= transformedForSelector(dayData?.data, 'day_id', 'day');

      reset(dataSession)
      setOriginData(dataSession);
      setPeriods(formattedSelectedPeriod)
      setClasses(formattedSelectedClass)
      setTeachers(formattedSelectedTeacher)
      setDays(formattedSelectedDay)
      setSubjects(formattedSelectedSubject)
    }

  }, [session, isPeriodSuccess, isClassSuccess, isTeacherSuccess, isDaySuccess, isSubjectSuccess, setValue]);

  const onSubmit = async (formData) => {
    const sessionData = {
      teacher_id: formData.teacher_id * 1,
      period_id: formData.period_id * 1,
      class_id: formData.class_id * 1,
      subject_id: formData.subject_id * 1,
      day_id: formData.day_id * 1,
    };
    console.log('Form Data:', formData);
    const noChange = JSON.stringify(sessionData) == JSON.stringify(originData);
    console.log('session : ', sessionData);
    console.log('origin  : ', originData);
    console.log('is this no change ? : ', noChange);

    // Compare current data with the original data
    if (noChange) {
      console.log('No changes detected');
      dispatch(
        setSnackbar({
          open: true,
          message: 'No changes detected',
          severity: 'info',
        }),
      );
      return;
    }

    console.log('Session Data:', sessionData);

    try {
      const result = await updateSession({ id, sessionData }).unwrap();
      console.log('Session created successfully', result);
    } catch (error) {
      console.log('Error updating session', error);
    }
  };

  useEffect(() => {
    console.log({ isLoading, isError, isSuccess });

    if (isLoading) {
      dispatch(
        setSnackbar({ open: true, message: 'Updating...', severity: 'info' }),
      );
    } else if (isError) {
      dispatch(
        setSnackbar({
          open: true,
          message: error?.data?.message || 'Error updating session',
          severity: 'error',
        }),
      );
    } else if (isSuccess) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Update successfully',
          severity: 'success',
        }),
      );
      navigate('/admin/sessions');
    }
  }, [isLoading, isError, isSuccess, dispatch, error, navigate]);


  return (
    <FormComponent
      title="Add session"
      subTitle="Please Fill session information"
    >
      <CardComponent onSubmit={handleSubmit(onSubmit)} title="Create Session">
        <Box sx={containerStyle}>
          <Box sx={selectedStyle}>
            <Box>
              <RenderSelect
                name="teacher_id"
                label="Teacher"
                options={teachers}
                control={control}
                errors={errors}
              />
            </Box>
            <Box>
              <RenderSelect
                name="period_id"
                label="Class Period"
                options={periods}
                control={control}
                errors={errors}
              />
            </Box>
          </Box>
          <Box sx={selectedStyle}>
            <Box>
              <RenderSelect
                name="class_id"
                label="Class"
                options={classes}
                control={control}
                errors={errors}
              />
            </Box>
            <Box>
              <RenderSelect
                name="subject_id"
                label="Subject"
                options={subjects}
                control={control}
                errors={errors}
              />
            </Box>
          </Box>
          <Box>
            <RenderSelect
              name="day_id"
              label="Day of Week"
              options={days}
              control={control}
              errors={errors}
            />
          </Box>
        </Box>
        <ButtonContainer
          leftBtnTitle="Cancel"
          rightBtnTitle="Add Session"
          rightBtn={handleSubmit(onSubmit)}
        />
      </CardComponent>
    </FormComponent>
  );
};

export default SessionUpdatePage;

const containerStyle = {
  width: '100%',
  display: 'grid',
  gap: { xs: '12px', md: '24px' },
  gridTemplateColumns: {
    xs: 'repeat(1, 1fr)',
    md: 'repeat(2, 1fr)',
  },
};

const selectedStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: { xs: '12px', md: '24px' },
};
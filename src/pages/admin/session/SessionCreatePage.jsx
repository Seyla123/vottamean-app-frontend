import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Box } from '@mui/material';

import FormComponent from '../../../components/common/FormComponent';
import CardComponent from '../../../components/common/CardComponent';
import ButtonContainer from '../../../components/common/ButtonContainer';
import RenderSelect from './RenderSelect';

import { useCreateSessionMutation } from '../../../services/sessionApi';
import { useGetClassPeriodQuery } from '../../../services/classPeriodApi';
import { useGetClassesDataQuery } from '../../../services/classApi';
import { useGetAllTeachersQuery } from '../../../services/teacherApi';
import { useGetDayQuery } from '../../../services/daysApi';
import { useGetSubjectsQuery } from '../../../services/subjectApi';

import { useNavigate } from 'react-router-dom';
import { setSnackbar } from '../../../store/slices/uiSlice';
import { useDispatch } from 'react-redux';
import { formatTimeTo12Hour } from '../../../utils/formatHelper'
// - Validation Schema
import { SessionValidator } from '../../../validators/validationSchemas';

// Main Component
const SessionCreatePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [createSession, { isLoading, isError, isSuccess, error }] =
    useCreateSessionMutation();
  const { data: periodData } = useGetClassPeriodQuery({active: 1});
  const { data: classData } = useGetClassesDataQuery({active: 1});
  const { data: teacherData } = useGetAllTeachersQuery({active: 1});
  const { data: dayData } = useGetDayQuery();
  const { data: subjectData } = useGetSubjectsQuery({active: 1});

  const [periods, setPeriods] = useState([]);
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [days, setDays] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    if (periodData) {
      const transformPeriod = periodData.data.map((item) => ({
        value: item.period_id,
        label: `${formatTimeTo12Hour(item.start_time)} - ${formatTimeTo12Hour(item.end_time)}`,
      }));
      setPeriods(transformPeriod);
    }

    if (classData) {
      const classFormat = classData.data.map((item) => ({
        value: item.class_id,
        label: item.class_name,
      }));
      setClasses(classFormat);
    }

    if (teacherData) {
      const teacherFormat = teacherData.data.map((item) => ({
        value: item.teacher_id,
        label: `${item.Info.first_name} ${item.Info.last_name}`,
      }));
      setTeachers(teacherFormat);
    }

    if (dayData) {
      const dayFormat = dayData.data.map((item) => ({
        value: item.day_id,
        label: item.day,
      }));
      setDays(dayFormat);
    }

    if (subjectData) {
      const subjectFormat = subjectData.data.map((item) => ({
        value: item.subject_id,
        label: item.subject_name,
      }));
      setSubjects(subjectFormat);
    }
  }, [periodData, classData, teacherData, dayData, subjectData]);

  const {
    control,
    handleSubmit,
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

  const onSubmit = async (formData) => {
    console.log('Form Data:', formData);

    const sessionData = {
      class_id: formData.class_id,
      subject_id: formData.subject_id,
      day_id: formData.day_id,
      teacher_id: formData.teacher_id,
      period_id: formData.period_id,
    };

    console.log('Session Data:', sessionData);

    try {
      const result = await createSession(sessionData).unwrap();
      console.log('Session created successfully', result);
    } catch (error) {
      console.log('Error creating session', error);
    }
  };

  useEffect(() => {
    console.log({ isLoading, isError, isSuccess });

    if (isLoading) {
      dispatch(
        setSnackbar({ open: true, message: 'Creating...', severity: 'info' }),
      );
    } else if (isError) {
      dispatch(
        setSnackbar({
          open: true,
          message: error?.data?.message || 'Error creating session',
          severity: 'error',
        }),
      );
    } else if (isSuccess) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Created successfully',
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

export default SessionCreatePage;

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
}
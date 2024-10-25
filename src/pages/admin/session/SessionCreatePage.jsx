import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Box, Stack } from '@mui/material';

import FormComponent from '../../../components/common/FormComponent';
import CardComponent from '../../../components/common/CardComponent';
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
import { transformedForSelector } from '../../../utils/formatHelper'
// - Validation Schema
import { SessionValidator } from '../../../validators/validationSchemas';
import StyledButton from '../../../components/common/StyledMuiButton';
import TitleHeader from '../../../components/common/TitleHeader';

// Main Component
const SessionCreatePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useCreateSessionMutation : a hook that returns a function to create a new session
  const [createSession, { isLoading, isError, isSuccess, error }] =
    useCreateSessionMutation();

  //  hook that returns a function to fetch all selector for creating sessions
  const { data: periodData } = useGetClassPeriodQuery({ active: 1 });
  const { data: classData } = useGetClassesDataQuery({ active: 1 });
  const { data: teacherData } = useGetAllTeachersQuery({ active: 1 });
  const { data: dayData } = useGetDayQuery();
  const { data: subjectData } = useGetSubjectsQuery({ active: 1 });

  // - stae of the list of all for session select creation
  const [periods, setPeriods] = useState([]);
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [days, setDays] = useState([]);
  const [subjects, setSubjects] = useState([]);

  // when data is fetched succesfully ,  transform the data and set the state for create session
  useEffect(() => {
    if (periodData && classData && teacherData && dayData && subjectData) {
      setPeriods(transformedForSelector(periodData.data, 'period_id', ['start_time', 'end_time']));
      setClasses(transformedForSelector(classData.data, 'class_id', 'class_name'));
      setTeachers(transformedForSelector(teacherData.data, 'teacher_id', ['Info.first_name', 'Info.last_name']));
      setDays(transformedForSelector(dayData.data, 'day_id', 'day'));
      setSubjects(transformedForSelector(subjectData.data, 'subject_id', 'subject_name'));
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

  //handle the form submission
  const onSubmit = async (formData) => {
    //Extract the relevant data from the form
    const sessionData = {
      class_id: formData.class_id,
      subject_id: formData.subject_id,
      day_id: formData.day_id,
      teacher_id: formData.teacher_id,
      period_id: formData.period_id,
    };

    //Call the createSession mutation and
    await createSession(sessionData).unwrap();
  };

  // when create is failed, show a snackbar with an error message
  // when create is successful, show a snackbar with a success message and close the create modal
  useEffect(() => {
    if (isError) {
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
  }, [isError, isSuccess, dispatch, error, navigate]);

  return (
    <FormComponent
    >
      <TitleHeader  title="Create Session" />
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
        <Stack
          direction={'row'}
          alignSelf={'flex-end'}
          justifyContent={'flex-end'}
          width={{ xs: '100%', sm: '300px', md: '280px' }}
          gap={2}
          marginTop={{ xs: 2, sm: 0 }}
        >
          <StyledButton
            onClick={() => navigate('/admin/sessions')}
            fullWidth
            variant="outlined"
            color="inherit"
            size="small"
          >
            Back
          </StyledButton>
          <StyledButton
            fullWidth
            variant="contained"
            type="submit"
            size="small"
            disabled={isLoading}
            onClick={handleSubmit(onSubmit)}
          >
            {isLoading ? 'Creating...' : 'Create'}
          </StyledButton>
        </Stack>
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
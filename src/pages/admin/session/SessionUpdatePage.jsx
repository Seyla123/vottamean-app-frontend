import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';

// style
import { Box, Stack } from '@mui/material';
import FormComponent from '../../../components/common/FormComponent';
import CardComponent from '../../../components/common/CardComponent';
import { setSnackbar } from '../../../store/slices/uiSlice';
import RenderSelect from '../../../components/common/RenderSelect';
import StyledButton from '../../../components/common/StyledMuiButton';
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
import TitleHeader from '../../../components/common/TitleHeader';
import LoadingCircle from '../../../components/loading/LoadingCircle';

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

  // store the original data to compare with the new data
  // to check if there is any change to the data
  const [originData, setOriginData] = useState(null);

  // useGetSessionByIdQuery : a hook that returns a function to fetch session to be updated
  const { data: session, isLoading : isSessionLoading } = useGetSessionByIdQuery(id);

  // useUpdateSessionMutation : a hook return a function to update the session
  const [updateSession, { isLoading, isError, isSuccess, error }] =
    useUpdateSessionMutation();

  //  hook that returns a function to fetch all selector for updating sessions
  const { data: periodData, isSuccess: isPeriodSuccess, isLoading: isPeriodLoading } = useGetClassPeriodQuery({ active: 1 });
  const { data: classData, isSuccess: isClassSuccess, isLoading: isClassLoading } = useGetClassesDataQuery({ active: 1 });
  const { data: teacherData, isSuccess: isTeacherSuccess, isLoading: isTeacherLoading } = useGetAllTeachersQuery({ active: 1 });
  const { data: dayData, isSuccess: isDaySuccess, isLoading: isDayLoading } = useGetDayQuery();
  const { data: subjectData, isSuccess: isSubjectSuccess, isLoading: isSubjectLoading } = useGetSubjectsQuery({ active: 1 });

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
      teacherId: '',
      periodId: '',
      classId: '',
      subjectId: '',
      dayId: '',
    },
  });

  // when data is fetched succesfully ,  transform the data and set the state for update session
  useEffect(() => {
    if (session && isPeriodSuccess && isClassSuccess && isTeacherSuccess && isDaySuccess && isSubjectSuccess) {
      const dataSession = {
        teacherId: session?.data?.Teacher?.teacher_id,
        periodId: session?.data?.Period?.period_id,
        classId: session?.data?.Class?.class_id,
        subjectId: session?.data?.Subject?.subject_id,
        dayId: session?.data?.DayOfWeek?.day_id,
      };

      // ensure the selected options are included in the list of options, event the deleted one
      const formattedSelectedTeacher = ensureOptionInList(teacherData?.data, session?.data?.Teacher, 'teacher_id', ['Info.first_name', 'Info.last_name'])
      const formattedSelectedClass = ensureOptionInList(classData?.data, session?.data?.Class, 'class_id', 'class_name')
      const formattedSelectedSubject = ensureOptionInList(subjectData?.data, session?.data?.Subject, 'subject_id', 'subject_name')
      const formattedSelectedPeriod = ensureOptionInList(periodData?.data, session?.data?.Period, 'period_id', ['start_time', 'end_time']);
      const formattedSelectedDay = transformedForSelector(dayData?.data, 'day_id', 'day');

      reset(dataSession)
      setOriginData(dataSession);
      setPeriods(formattedSelectedPeriod)
      setClasses(formattedSelectedClass)
      setTeachers(formattedSelectedTeacher)
      setDays(formattedSelectedDay)
      setSubjects(formattedSelectedSubject)
    }

  }, [session, isPeriodSuccess, isClassSuccess, isTeacherSuccess, isDaySuccess, isSubjectSuccess, setValue]);

  // handle submit
  const onSubmit = async (formData) => {
    //Extract the relevant data from the form
    const sessionData = {
      teacherId: formData.teacherId * 1,
      periodId: formData.periodId * 1,
      classId: formData.classId * 1,
      subjectId: formData.subjectId * 1,
      dayId: formData.dayId * 1,
    };

    const noChange = JSON.stringify(sessionData) == JSON.stringify(originData);
    // Compare current data with the original data
    if (noChange) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'No changes detected',
          severity: 'info',
        }),
      );
      return;
    }
    // Call the updateSession mutation
    await updateSession({
      id,
      data: sessionData,
    }).unwrap();

  };

  // when update is failed, show a snackbar with an error message
  // when update is successful, show a snackbar with a success message and close the update modal
  useEffect(() => {
    if (isError) {
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
  }, [isError, isSuccess, dispatch, error, navigate]);
  return (
    <FormComponent
    >
      <TitleHeader title="Update Session" />
      <CardComponent onSubmit={handleSubmit(onSubmit)} >
      {isSessionLoading || isPeriodLoading || isClassLoading || isTeacherLoading || isDayLoading || isSubjectLoading  ? <LoadingCircle customStyle={{height: '30vh'}}/> 
      :
        <>
        <Box sx={containerStyle}>
          <Box sx={selectedStyle}>
            <Box>
              <RenderSelect
                name="teacherId"
                label="Teacher"
                options={teachers}
                control={control}
                errors={errors}
              />
            </Box>
            <Box>
              <RenderSelect
                name="periodId"
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
                name="classId"
                label="Class"
                options={classes}
                control={control}
                errors={errors}
              />
            </Box>
            <Box>
              <RenderSelect
                name="subjectId"
                label="Subject"
                options={subjects}
                control={control}
                errors={errors}
              />
            </Box>
          </Box>
          <Box>
            <RenderSelect
              name="dayId"
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
            {isLoading ? 'Updating...' : 'Update'}
          </StyledButton>
        </Stack>
        </>
      }

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
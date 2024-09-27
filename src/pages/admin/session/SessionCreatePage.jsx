import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Box,
  MenuItem,
  Select,
  Typography,
  FormHelperText,
} from '@mui/material';

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
import { setSnackbar } from '../../../store/slices/uiSlice';
import { useDispatch } from 'react-redux';

// - Validation Schema
import { SessionValidator } from '../../../validators/validationSchemas';

// Main Component
const SessionCreatePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [createSession, { isLoading, isError, isSuccess, error }] =
    useCreateSessionMutation();
  const { data: periodData } = useGetClassPeriodQuery();
  const { data: classData } = useGetClassesDataQuery();
  const { data: teacherData } = useGetAllTeachersQuery();
  const { data: dayData } = useGetDayQuery();
  const { data: subjectData } = useGetSubjectsQuery();

  const [periods, setPeriods] = useState([]);
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [days, setDays] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    if (periodData) {
      const transformPeriod = periodData.data.map((item) => ({
        value: item.period_id,
        label: `${item.start_time} - ${item.end_time}`,
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
        label: item.name,
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

  const renderSelect = (name, label, options) => (
    <Controller
      name={name}
      control={control}
      fullWidth
      render={({ field }) => (
        <Box sx={box}>
          <Typography>{label}</Typography>
          <Select
            {...field}
            displayEmpty
            fullWidth
            renderValue={(selected) =>
              !selected ? (
                <span style={{ color: 'gray' }}>{label}</span>
              ) : (
                options.find((option) => option.value === selected)?.label || ''
              )
            }
            sx={{
              '& .MuiSelect-placeholder': {
                color: 'gray',
              },
            }}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {errors[name] && (
            <FormHelperText error>{errors[name].message}</FormHelperText>
          )}
        </Box>
      )}
    />
  );

  return (
    <FormComponent
      title="Add session"
      subTitle="Please Fill session information"
    >
      <CardComponent onSubmit={handleSubmit(onSubmit)} title="Create Session">
        <Box sx={containerStyle}>
          <Box sx={selectedStyle}>
            <Box>{renderSelect('teacher_id', 'Teacher', teachers)}</Box>
            <Box>{renderSelect('period_id', 'Class Period', periods)}</Box>
          </Box>
          <Box sx={selectedStyle}> 
            <Box>{renderSelect('class_id', 'Class', classes)}</Box>
            <Box>{renderSelect('subject_id', 'Subject', subjects)}</Box>
          </Box>
          <Box>{renderSelect('day_id', 'Day of Week', days)}</Box>
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

const box = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
}
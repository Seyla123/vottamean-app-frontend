import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Skeleton,
  Divider,
  Tabs,
  Tab,
} from '@mui/material';
import { styled } from '@mui/system';
import { Clock, Calendar, Users } from 'lucide-react';
import { useGetTeacherScheduleClassesQuery } from '../../../services/teacherApi';
import EmptyList from '../../../components/common/EmptyList';
import classHeaderImg1 from '../../../assets/images/study-bg.avif';
import classHeaderImg2 from '../../../assets/images/class-header-img-2.avif';
import classHeaderImg3 from '../../../assets/images/class-header-img-3.avif';
import classHeaderImg4 from '../../../assets/images/class-header-img-4.avif';
import classHeaderImg5 from '../../../assets/images/class-header-img-5.avif';
import classHeaderImg6 from '../../../assets/images/class-header-img-6.avif';
import { shadow } from '../../../styles/global';
import FormComponent from '../../../components/common/FormComponent';
const headerImages = [
  classHeaderImg1,
  classHeaderImg2,
  classHeaderImg3,
  classHeaderImg4,
  classHeaderImg5,
  classHeaderImg6,
];

const StyledPaper = styled(Paper)(({ theme }) => ({
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: shadow.boxShadow,
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: `0 12px 20px rgba(0, 0, 0, 0.1)`,
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.text.secondary,
  '& > svg': {
    marginRight: theme.spacing(1),
  },
}));

const ClassListItem = ({ classData, onClick }) => {
  const dayIndex = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ].indexOf(classData.day.toLowerCase());
  const headerImage = headerImages[dayIndex % headerImages.length];

  return (
    <StyledPaper onClick={onClick}>
      <Box
        sx={{
          position: 'relative',
          backgroundImage: `url(${headerImage})`,
          bgSize: 'top',
          bgRepeat: 'no-repeat',
          bgPosition: 'center',
          height: '120px',
          width: '100%',
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            bottom: 0,
            zIndex: 10,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: 2,
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h5" fontWeight={'bold'} gutterBottom>
            {classData.class_name}
          </Typography>
          <Typography variant="body1">{classData.subject}</Typography>
        </Box>
      </Box>
      <Box sx={{ padding: 3 }}>
        <IconWrapper>
          <Calendar size={18} />
          <Typography variant="body2" textTransform="capitalize">
            {classData.day}
          </Typography>
        </IconWrapper>
        <IconWrapper sx={{ my: 1 }}>
          <Clock size={18} />
          <Typography variant="body2">
            {classData.start_time.slice(0, 5)} -{' '}
            {classData.end_time.slice(0, 5)}
            {classData.start_time.slice(6, 7) === 'PM' ? 'PM' : 'AM'}
          </Typography>
        </IconWrapper>
        <IconWrapper>
          <Users size={18} />
          <Typography variant="body2">{classData.students} students</Typography>
        </IconWrapper>
      </Box>
    </StyledPaper>
  );
};

function TeacherScheduleClassPage() {
  const navigate = useNavigate();
  const {
    data: getTeacherClasses,
    error,
    isLoading,
    isSuccess,
    isError,
  } = useGetTeacherScheduleClassesQuery();

  const [classesData, setClassesData] = useState([]);
  const [selectedDay, setSelectedDay] = useState('All');

  useEffect(() => {
    if (getTeacherClasses && isSuccess) {
      setClassesData(getTeacherClasses.data || []);
    }
  }, [getTeacherClasses, isSuccess]);

  const days = [
    'All',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const filteredClasses = useMemo(() => {
    if (selectedDay === 'All') {
      return classesData;
    }
    return classesData.filter(
      (c) => c.day.toLowerCase() === selectedDay.toLowerCase(),
    );
  }, [classesData, selectedDay]);

  if (isError) {
    return (
      <Typography color="error">
        Error loading class data: {error.data?.message || 'Unknown error'}
      </Typography>
    );
  }

  const handleClassClick = (sessionId) => {
    navigate(`/teacher/mark-attendance/${sessionId}`);
  };

  const handleDayChange = (event, newValue) => {
    setSelectedDay(newValue);
  };

  const renderSkeleton = () => (
    <Grid container spacing={3}>
      {[...Array(4)].map((_, index) => (
        <Grid item xs={12} sm={6} key={index}>
          <Skeleton
            variant="rectangular"
            height={200}
            sx={{ borderRadius: 4 }}
          />
        </Grid>
      ))}
    </Grid>
  );

  if (isSuccess && classesData.length === 0) {
    return (
      <EmptyList
        image="/path/to/empty-classes-image.svg"
        title="No classes found"
        description="It looks like your classes list is empty. Add some classes to get started!"
      />
    );
  }

  return (
    <FormComponent
      title="Class Schedule"
      subTitle={` You have ${classesData.length} classes scheduled`}
    >
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs
          value={selectedDay}
          onChange={handleDayChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="class days"
        >
          {days.map((day) => (
            <Tab
              label={day}
              value={day}
              key={day}
              sx={{ textTransform: 'capitalize' }}
            />
          ))}
        </Tabs>
      </Box>

      {isLoading ? (
        renderSkeleton()
      ) : (
        <Grid container spacing={3}>
          {filteredClasses.map((classData) => (
            <Grid item xs={12} sm={6} key={classData.session_id}>
              <ClassListItem
                classData={classData}
                onClick={() => handleClassClick(classData.session_id)}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </FormComponent>
  );
}

export default TeacherScheduleClassPage;

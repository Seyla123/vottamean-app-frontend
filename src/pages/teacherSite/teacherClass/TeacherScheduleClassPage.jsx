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
  Tab
} from '@mui/material';
import { styled } from '@mui/system';
import { Clock, Calendar, Users } from 'lucide-react';
import { useGetTeacherScheduleClassesQuery } from '../../../services/teacherApi';
import EmptyList from '../../../components/common/EmptyList';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.text.secondary,
  '& > svg': {
    marginRight: theme.spacing(1),
  },
}));

const ClassListItem = ({ classData, onClick }) => (
  <StyledPaper onClick={onClick}>
    <Typography variant="h6" gutterBottom color="primary">
      {classData.class_name}
    </Typography>
    <Typography variant="body1" color="text.secondary" gutterBottom>
      {classData.subject}
    </Typography>
    <Divider sx={{ my: 2 }} />
    <IconWrapper>
      <Calendar size={18} />
      <Typography variant="body2" textTransform="capitalize">
        {classData.day}
      </Typography>
    </IconWrapper>
    <IconWrapper sx={{ my: 1 }}>
      <Clock size={18} />
      <Typography variant="body2">
        {classData.start_time.slice(0, 5)} - {classData.end_time.slice(0, 5)}
      </Typography>
    </IconWrapper>
    <IconWrapper>
      <Users size={18} />
      <Typography variant="body2">{classData.students} students</Typography>
    </IconWrapper>
    <Box mt="auto" pt={2}>
      <Typography variant="caption" color="text.secondary">
        Session ID: {classData.session_id}
      </Typography>
    </Box>
  </StyledPaper>
);

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
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    if (getTeacherClasses && isSuccess) {
      setClassesData(getTeacherClasses.data || []);
    }
  }, [getTeacherClasses, isSuccess]);

  const categories = useMemo(() => {
    const uniqueCategories = ['All', ...new Set(classesData.map(c => c.class_name))];
    return uniqueCategories;
  }, [classesData]);

  const filteredClasses = useMemo(() => {
    if (selectedCategory === 'All') {
      return classesData;
    }
    return classesData.filter(c => c.class_name === selectedCategory);
  }, [classesData, selectedCategory]);

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

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
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
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Class Schedule
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        You have {classesData.length} classes scheduled
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={selectedCategory} 
          onChange={handleCategoryChange} 
          variant="scrollable"
          scrollButtons="auto"
          aria-label="class categories"
        >
          {categories.map((category) => (
            <Tab label={category} value={category} key={category} />
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
    </Container>
  );
}

export default TeacherScheduleClassPage;

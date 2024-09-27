import React, { useState, useEffect } from 'react';
import FormComponent from '../../../components/common/FormComponent';
import ClassCard from '../../../components/teacherSite/ClassCard';
import ClassCardSkeleton from '../../../components/loading/ClassCardSkeleton';
import { Grid2, Box, Typography } from '@mui/material';
import teacher from '../../../assets/icon/teacher.png';
import { useNavigate, Link } from 'react-router-dom';
import { useGetTeacherScheduleClassesQuery } from '../../../services/teacherApi';
import { formatTimeTo12Hour } from '../../../utils/formatHelper';
import ClassNotFound from '../../../components/teacherSite/ClassNotFound';
// colors for card
const colors = [
  '#e7f7ff',
  '#fffaeb',
  '#ffebcb',
  '#f1fcd9',
  '#ffece9',
  '#e7eaff',
];
function TeacherScheduleClassPage() {
  const navigate = useNavigate();

  // useGetTeacherScheduleClassesQuery : This is the data fetching hook for the teacher classes,fetch the classes schedule for the current day
  const { data: getTeacherClasses, error, isLoading, isSuccess, isError } = useGetTeacherScheduleClassesQuery({filter:'today'});

  // classesData : This is the state for the classes
  const [classesData, setClassesData] = useState([]);

  // It will set the state of the classes based on the data from the hook
  useEffect(() => {
    if (getTeacherClasses && isSuccess) {
      const fetchedData = getTeacherClasses.data;
      setClassesData(fetchedData);
    }
  }, [getTeacherClasses, isSuccess]);
  

  // error handler
  if (isError) {
    return <div>Error loading class data: {error.data.message}</div>;
  }
  
  // This is the function for rendering the skeleton while loading
  const renderedSkeleton = () => (
    [...Array(6)].map((_, i) => (
      <Grid2 size={{ xs: 12, md: 6 }} key={i}>
        <ClassCardSkeleton />
      </Grid2>
    ))
  );
  
  // This is the function for formatting the time
  const getTime = (classData) => {
    const time = `${formatTimeTo12Hour(classData.start_time)} - ${formatTimeTo12Hour(classData.end_time)}`;
    return time;
  }
  
  // This is the handling for no classes found
  if (isSuccess && classesData.length == 0) {  
    return (
      <ClassNotFound/>
    )
  }

  return (
    <>
      <FormComponent title="Class Schedule" subTitle="These are 7 classes">
        <Grid2 container spacing={2}>
          {isLoading ?
            // Render skeleton while loading
            renderedSkeleton()
            :
            classesData.length > 0 ?
              // Render actual class cards once loading is complete
              classesData.map((classData, index) => {
                const cardColor = colors[index % colors.length];
                // const randomBorder = border[index % border.length];
                return (
                  <Grid2 size={{ xs: 12, md: 6 }} key={classData.session_id}>
                    <Box
                      component={Link}
                      to={`/teacher/classes-schedule/mark-attendance`}
                      sx={{ color: 'black' }}
                    >
                      <ClassCard
                        className={classData.class_name}
                        day={classData.day}
                        subject={classData.subject}
                        students={classData.students}
                        time={getTime(classData)}
                        classIcon={teacher}
                        randomColor={cardColor}
                      />
                    </Box>
                  </Grid2>
                );
              })
              :
              // Handle no class found
              <ClassNotFound/>
          }
        </Grid2>
      </FormComponent>
    </>
  );
}

export default TeacherScheduleClassPage;

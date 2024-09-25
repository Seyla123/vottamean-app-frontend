import React, { useState, useEffect } from 'react';
import FormComponent from '../../../components/common/FormComponent';
import ClassCard from '../../../components/teacherSite/ClassCard';
import ClassCardSkeleton from '../../../components/loading/ClassCardSkeleton';
import { Grid2, Box } from '@mui/material';
import teacher from '../../../assets/icon/teacher.png';
import { useNavigate, Link } from 'react-router-dom';
import { useGetTeacherClassesQuery } from '../../../services/teacherApi';
import { formatTimeTo12Hour } from '../../../utils/formatData';
// data
// const classesData = [
//   {
//     id: 1,
//     className: 'E.109',
//     day: 'Monday',
//     subject: 'Math',
//     students: 52,
//     time: '7:00 - 9:00',
//   },
//   {
//     id: 2,
//     className: 'E.110',
//     day: 'Tuesday',
//     subject: 'Science',
//     students: 45,
//     time: '9:00 - 11:00',
//   },
//   {
//     id: 3,
//     className: 'E.111',
//     day: 'Wednesday',
//     subject: 'History',
//     students: 30,
//     time: '10:00 - 12:00',
//   },
//   {
//     id: 4,
//     className: 'E.112',
//     day: 'Thursday',
//     subject: 'Geography',
//     students: 40,
//     time: '11:00 - 1:00',
//   },
//   {
//     id: 5,
//     className: 'E.113',
//     day: 'Friday',
//     subject: 'Biology',
//     students: 25,
//     time: '1:00 - 3:00',
//   },
//   {
//     id: 6,
//     className: 'E.109',
//     day: 'Monday',
//     subject: 'Math',
//     students: 52,
//     time: '7:00 - 9:00',
//   },
//   {
//     id: 7,
//     className: 'E.122',
//     day: 'Tuesday',
//     subject: 'Science',
//     students: 45,
//     time: '9:00 - 11:00',
//   },
// ];

// colors for card
const colors = [
  '#e7f7ff',
  '#fffaeb',
  '#ffebcb',
  '#f1fcd9',
  '#ffece9',
  '#e7eaff',
];
// const border = ['#ADC4CE', '#F7B5CA', '#FCDC94', '#f1fcd9', '#E2F3FA', '#E5D1FA'];
function TeacherClassPage() {
  const navigate = useNavigate();
  const { data: getTeacherClasses, error, isLoading, isSuccess, isError } = useGetTeacherClassesQuery();
  const [classesData, setClassesData] = useState([]);
  useEffect(() => {
    if (getTeacherClasses && isSuccess) {
      const fetchedData = getTeacherClasses.data;
      setClassesData(fetchedData);
      console.log('data :', fetchedData);
    }
  }, [getTeacherClasses, isSuccess]);

  console.log(' classesData :', classesData);
  if (classesData.length === 0) {
    return (
      <div>
        <h1>No classes available</h1>
        <p>
          You don't have any classes scheduled yet. Please check back later or contact your teacher for more information.
        </p>
      </div>
    )
  }
  if (isError) {
    return <div>Error loading class data: {error.data.message}</div>;
  }

  // Handle loading state 
  const renderedSkeleton = () => (
    [...Array(6)].map((_, i) => (
      <Grid2 size={{ xs: 12, md: 6 }} key={i}>
        <ClassCardSkeleton />
      </Grid2>
    ))
  );

  return (
    <>
      <FormComponent title="Class Schedule" subTitle="These are 7 classes">
        <Grid2 container spacing={2}>
          {isLoading ?
            // Render skeleton while loading
            renderedSkeleton()
            :
            // Render actual class cards once loading is complete
            classesData.map((classData, index) => {
              const cardColor = colors[index % colors.length];
              // const randomBorder = border[index % border.length];
              const time = `${formatTimeTo12Hour(classData.start_time)} - ${formatTimeTo12Hour(classData.end_time)}`;
              return (
                <Grid2 size={{ xs: 12, md: 6 }} key={classData.session_id}>
                  <p>testing :{classData.Class.class_name}</p>
                  <Box
                    component={Link}
                    to={`/teacher/dashboard/class/${classData.Class.class_id}`}
                    sx={{ color: 'black' }}
                  >
                    <ClassCard
                      className={classData.Class.class_name}
                      day={classData.day}
                      subject={classData.subject}
                      students={classData.students}
                      time={time}
                      classIcon={teacher}
                      randomColor={cardColor}
                    />
                  </Box>
                </Grid2>
              );
            })}
        </Grid2>
      </FormComponent>
    </>
  );
}

export default TeacherClassPage;

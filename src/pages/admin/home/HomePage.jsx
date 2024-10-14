// - React and third-party libraries
import React, { useEffect, useState } from 'react';

// - Material UI Components
import { Typography, Box, CardContent, Chip, Grid } from '@mui/material';
import { GraduationCap, UsersIcon } from 'lucide-react';

// - Custom Components
import FormComponent from '../../../components/common/FormComponent';
import WelcomeHandImage from '../../../assets/images/book-lover-25.svg';
import ShortListTable from '../../../components/common/ShortListTable';
import { shadow } from '../../../styles/global';
import StaticTable from '../../../components/common/StaticTable';

// - Redux APIs
import { useGetUserProfileQuery } from '../../../services/userApi';

// - User Data Formatted
import { getUserProfileDataLayout } from '../../../utils/formatData';
import DateCalendarCard from '../../../components/common/DateCalendarCard';
import ShortcutCard from '../../../components/teacherSite/ShortcutCard';

// Image
import createTeacherImage from '../../../assets/images/create-teacher.svg';
import createClassPeriodImage from '../../../assets/images/create-class-period.svg';
import createClass from '../../../assets/images/create-class.svg';
import createStudent from '../../../assets/images/create-student.svg';
import createSubject from '../../../assets/images/create-subject.svg';
import createSession from '../../../assets/images/create-session.svg';
import SectionTitle from '../../../components/common/SectionTitle';

const teacherArr = [
  {
    id: 1,
    name: 'Sokha Seng',
    gender: 'Female',
    email: 'sokha.seng@example.com',
    phonenumber: '012 345 678',
  },
  {
    id: 2,
    name: 'Vuthy Vong',
    gender: 'Male',
    email: 'vuthy.vong@example.com',
    phonenumber: '098 765 432',
  },
  {
    id: 3,
    name: 'Sopheaktra Sorn',
    gender: 'Male',
    email: 'sopheaktra.sorn@example.com',
    phonenumber: '012 987 654',
  },
  {
    id: 4,
    name: 'Sovannary Seng',
    gender: 'Female',
    email: 'sovannary.seng@example.com',
    phonenumber: '098 123 456',
  },
];

const teacherColumnArr = [
  { id: 'name', label: 'Full Name' },
  { id: 'email', label: 'Email' },
];

const studentArr = [
  {
    id: 1,
    name: 'Sokunthea Chhorn',
    email: 'sokunthea.chhorn@example.com',
  },
  {
    id: 2,
    name: 'Sokha Sorn',
    email: 'sokha.sorn@example.com',
  },
  {
    id: 3,
    name: 'Sovannarith Seng',
    email: 'sovannarith.seng@example.com',
  },
];

const statusCard = [
  {
    id: 1,
    title: 'Total Teachers',
    amount: '1,248',
    icon: <UsersIcon />,
  },
  {
    id: 2,
    title: 'Total Students',
    amount: '2,500',
    icon: <GraduationCap />,
  },
];

function HomePage() {
  const [userData, setUserData] = useState({
    username: 'Username',
  });

  const { data: userDataProfile, isSuccess } = useGetUserProfileQuery();

  const getUserFirstName = userDataProfile?.data?.adminProfile?.Info.first_name;

  // - Fetch user data
  useEffect(() => {
    if (isSuccess && userDataProfile) {
      const transformedData = getUserProfileDataLayout(userDataProfile);
      setUserData(transformedData);
    }
  }, [isSuccess, userDataProfile]);

  // Get the current hour to determine the appropriate greeting
  const currentHour = new Date().getHours();

  let greeting = 'Good evening';

  if (currentHour < 12) {
    greeting = 'Good morning';
  } else if (currentHour < 18) {
    greeting = 'Good afternoon';
  }

  const GreetingCard = () => {
    return (
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          background: 'linear-gradient(45deg, #4e54c8 30%, #A594F9  70%)',
          color: 'white',
          height: { xs: '180px', sm: '240px' },
          overflow: 'hidden',
          p: { xs: 2, sm: 4 },
          ...shadow,
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 2 }}>
          <Typography variant="h4" gutterBottom>
            {greeting}, {getUserFirstName} 👋
          </Typography>
          <Typography variant="subtitle1">
            Welcome to your admin dashboard
          </Typography>
        </Box>

        <img
          src={WelcomeHandImage}
          alt="greeting"
          style={{
            width: '300px',
            objectFit: 'contain',
            position: 'absolute',
            right: 0,
            zIndex: 1,
          }}
        />
      </Box>
    );
  };

  const StatusCard = () => {
    return (
      <Box
        sx={{
          p: { xs: 2, sm: 4 },
          ...shadow,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          height: 1,
          background: '#FFFFFF',
        }}
      >
        {statusCard?.map((item) => (
          <Grid container key={item.id}>
            <Grid item>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Box
                  sx={{ ...shadow }}
                  width={40}
                  height={40}
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                >
                  {item.icon}
                </Box>
                <Box>
                  <Typography variant="body2">{item.title}</Typography>
                  <Typography variant="body1">{item.amount}</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        ))}
      </Box>
    );
  };

  return (
    <FormComponent
      title="Dashboard Overview"
      subTitle="Monitor Student and Teacher Attendance in Real-Time"
    >
      <Grid container spacing={2}>
        <Grid item xs={12} lg={8}>
          <GreetingCard />
        </Grid>
        <Grid item xs={12} lg={4}>
          <StatusCard />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={8}>
          <SectionTitle
            title={'Get started with WaveTrack'}
            subtitle={
              "Create your teacher's account, classes, subjects, and students to start tracking your students's progress."
            }
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <ShortcutCard
              title="Add Teachers"
              description="Create teacher accounts to unlock dashboard access, enabling efficient management of attendance, grades, and classroom activities."
              icon={createTeacherImage}
              href="/admin/teachers"
              buttonText="Add Teacher"
            />
            <ShortcutCard
              title="Set Class Times"
              description="Define class periods to optimize the school day, balance subjects, and create a productive learning environment for students and teachers."
              icon={createClassPeriodImage}
              href="/admin/class-periods"
              buttonText="Set Periods"
            />
            <ShortcutCard
              title="Create Classrooms"
              description="Set up virtual or physical classrooms to organize students, allocate resources, and create focused environments for specific subjects or age groups."
              icon={createClass}
              href="/admin/classes"
              buttonText="Create Class"
            />
            <ShortcutCard
              title="Add Students"
              description="Add comprehensive student profiles to track academic progress, personalize learning experiences, and facilitate communication with parents."
              icon={createStudent}
              href="/admin/students"
              buttonText="Enroll Student"
            />
            <ShortcutCard
              title="Add Subjects"
              description="Develop a rich academic offering by adding subjects like 'C++ Programming', ensuring a well-rounded and future-ready education for your students."
              icon={createSubject}
              href="/admin/subjects"
              buttonText="Add Subject"
            />
            <ShortcutCard
              title="Schedule Classes"
              description="Create teaching sessions by combining teachers, classes, subjects, and schedules, ensuring smooth operations and optimal resource allocation."
              icon={createSession}
              href="/admin/sessions"
              buttonText="Schedule Session"
            />
          </Box>
        </Grid>
        <Grid item xs={12} lg={4}>
          <SectionTitle
            title={'Teacher Directory'}
            subtitle={"View and manage your school's teaching staff"}
          />
          <StaticTable
            rows={teacherArr}
            columns={teacherColumnArr}
            hideColumns={['name']}
          />
        </Grid>
      </Grid>
    </FormComponent>
  );
}

export default HomePage;

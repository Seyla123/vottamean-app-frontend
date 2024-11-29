// - React and third-party libraries
import React, { useEffect, useState } from 'react';

// - Material UI Components
import { Typography, Box, Grid, Stack, CircularProgress } from '@mui/material';
import { Crown, GraduationCap, ShieldCheck, UsersIcon } from 'lucide-react';

// - Custom Components
import FormComponent from '../../../components/common/FormComponent';
import WelcomeHandImage from '../../../assets/images/book-lover-25.svg';
import { shadow } from '../../../styles/global';
import StaticTable from '../../../components/common/StaticTable';

// - Redux APIs
import { useGetUserProfileQuery } from '../../../services/userApi';
import { useGetAllStudentsQuery } from '../../../services/studentApi';
import { useGetAllTeachersQuery } from '../../../services/teacherApi';

// - User Data Formatted
import { getUserProfileDataLayout } from '../../../utils/formatData';
import DateCalendarCard from '../../../components/common/DateCalendarCard';
import ShortcutCard from '../../../components/teacherSite/ShortcutCard';
import { teacherData } from '../../../utils/formatData';
// Image
import createTeacherImage from '../../../assets/images/create-teacher.svg';
import createClassPeriodImage from '../../../assets/images/create-class-period.svg';
import createClass from '../../../assets/images/create-class.svg';
import createStudent from '../../../assets/images/create-student.svg';
import createSubject from '../../../assets/images/create-subject.svg';
import createSession from '../../../assets/images/create-session.svg';
import SectionTitle from '../../../components/common/SectionTitle';
import TitleHeader from '../../../components/common/TitleHeader';
import StyledButton from '../../../components/common/StyledMuiButton';
import { Link } from 'react-router-dom';
import { truncate } from '../../../utils/truncate';

const shortcutCards = [
  {
    title: 'Add Teachers',
    description:
      'Create teacher accounts to unlock dashboard access, enabling efficient management of attendance, grades, and classroom activities.',
    icon: createTeacherImage,
    href: '/admin/teachers',
    buttonText: 'Add Teacher',
  },
  {
    title: 'Set Class Times',
    description:
      'Define class periods to optimize the school day, balance subjects, and create a productive learning environment for students and teachers.',
    icon: createClassPeriodImage,
    href: '/admin/class-periods',
    buttonText: 'Set Periods',
  },
  {
    title: 'Create Classrooms',
    description:
      'Set up virtual or physical classrooms to organize students, allocate resources, and create focused environments for specific subjects or age groups.',
    icon: createClass,
    href: '/admin/classes',
    buttonText: 'Create Class',
  },
  {
    title: 'Add Students',
    description:
      'Add comprehensive student profiles to track academic progress, personalize learning experiences, and facilitate communication with parents.',
    icon: createStudent,
    href: '/admin/students',
    buttonText: 'Enroll Student',
  },
  {
    title: 'Add Subjects',
    description:
      "Develop a rich academic offering by adding subjects like 'C++ Programming', ensuring a well-rounded and future-ready education for your students.",
    icon: createSubject,
    href: '/admin/subjects',
    buttonText: 'Add Subject',
  },
  {
    title: 'Schedule Classes',
    description:
      'Create teaching sessions by combining teachers, classes, subjects, and schedules, ensuring smooth operations and optimal resource allocation.',
    icon: createSession,
    href: '/admin/sessions',
    buttonText: 'Schedule Session',
  },
];

const teacherColumnArr = [
  { id: 'name', label: 'Full Name' },
  { id: 'email', label: 'Email' },
];

function HomePage() {
  const [userData, setUserData] = useState({
    username: 'Username',
  });
  const [totalStudent, setTotalStudent] = useState(0);
  const [totalTeacher, setTotalTeacher] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [shortListTeacher, setShortListTeacher] = useState([]);

  const [getUserFirstName, setUserFirstName] = useState('');

  const { data: userDataProfile, isSuccess } = useGetUserProfileQuery();

  const {
    data: getAllStudent,
    isSuccess: isStudentSuccess,
    isLoading: isStudentLoading,
  } = useGetAllStudentsQuery({ active: 1, page: 1, limit: 5 });
  const {
    data: getAllTeacher,
    isSuccess: isTeacherSuccess,
    isLoading: isTeacherLoading,
  } = useGetAllTeachersQuery({ active: 1, page: 1, limit: 5 });

  // - Fetch user data
  useEffect(() => {
    if (isSuccess && userDataProfile && isTeacherSuccess && isStudentSuccess) {
      const transformedData = getUserProfileDataLayout(userDataProfile);
      setUserData(transformedData);
      setTotalStudent(getAllStudent.results);
      setTotalTeacher(getAllTeacher.results);
      setShortListTeacher(teacherData(getAllTeacher.data));
      setUserFirstName(userDataProfile?.data?.adminProfile?.Info.first_name);
    }
  }, [isSuccess, userDataProfile, isStudentSuccess, isTeacherSuccess]);

  // Check user payment type
  useEffect(() => {
    if (userDataProfile?.data?.subscriptions?.length > 0) {
      const lastSubscription = userDataProfile.data.subscriptions.at(-1);
      
      setPaymentStatus(lastSubscription?.plan_type || null);
    } else {
      setPaymentStatus(null);
    }
  }, [userDataProfile]);
  
  // Get the current hour to determine the appropriate greeting
  const currentHour = new Date().getHours();

  let greeting = 'Good evening';

  if (currentHour < 12) {
    greeting = 'Good morning';
  } else if (currentHour < 18) {
    greeting = 'Good afternoon';
  }
  const statusCard = [
    {
      id: 1,
      title: 'Total Teachers',
      amount: totalTeacher,
      icon: <UsersIcon />,
    },
    {
      id: 2,
      title: 'Total Students',
      amount: totalStudent,
      icon: <GraduationCap />,
    },
  ];
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
            {greeting}, {truncate(getUserFirstName, 10)} 👋
          </Typography>
          <Typography variant="subtitle1">
            Welcome to your admin's home
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
        {isStudentLoading || isTeacherLoading ? (
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          statusCard?.map((item) => (
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
          ))
        )}
      </Box>
    );
  };

  return (
    <FormComponent>
      <Stack
        direction={'row'}
        gap={2}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <TitleHeader title={'Home'} />

        {paymentStatus === 'basic' || !paymentStatus ? (
          <Link to={'/admin/payment'}>
            <StyledButton
              variant={'outlined'}
              color={'primary'}
              size={'small'}
              startIcon={<Crown size={18} />}
            >
              Upgrade to Pro
            </StyledButton>
          </Link>
        ) : (
          <Link to={'/admin/payment'}>
            <StyledButton
              variant={'outlined'}
              color={'primary'}
              size={'small'}
              startIcon={<ShieldCheck size={18} />}
            >
              Your plan is {paymentStatus}
            </StyledButton>
          </Link>
        )}
      </Stack>
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
            title={'Get started with Vottamean'}
            subtitle={
              "Create your teacher's account, classes, subjects, and students to start tracking your students's progress."
            }
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {shortcutCards.map((card, index) => (
              <ShortcutCard
                key={index}
                title={card.title}
                description={card.description}
                icon={card.icon}
                href={card.href}
                buttonText={card.buttonText}
              />
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} lg={4}>
          <SectionTitle
            title={'Teacher Directory'}
            subtitle={"View and manage your school's teaching staff"}
          />
          <Stack gap={3}>
            <StaticTable
              rows={shortListTeacher}
              columns={teacherColumnArr}
              hideColumns={['name']}
            />
            <Box>
              <DateCalendarCard />
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </FormComponent>
  );
}

export default HomePage;

import React from 'react';
import { useGetUserProfileQuery } from '../../../services/userApi';
import DateCalendarCard from '../../../components/common/DateCalendarCard';
import { Box, Typography, Avatar, Paper, Grid, Chip } from '@mui/material';
import { styled } from '@mui/system';
import { shadow } from '../../../styles/global';
import FormComponent from '../../../components/common/FormComponent';
import greetingImage from '../../../assets/images/greeting-teacher.svg';
import { School } from 'lucide-react';
import ShortcutCard from '../../../components/teacherSite/ShortcutCard';
import teacherIcon from '../../../assets/images/teacher-93.svg';
import checkListIcon from '../../../assets/images/checklist-1-97.svg';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  background: 'linear-gradient(45deg,#A594F9 30%, #EBD3F8  70%)',
  color: 'white',
  height: '100%',
  width: '100%',
  overflow: 'hidden',
}));

const TeacherDashboardPage = () => {
  const { data: user, isLoading, error } = useGetUserProfileQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user data</div>;

  console.log(user);

  const { first_name, last_name, gender, photo } =
    user.data.teacherProfile.Info;
  const { school_name } = user.data.teacherProfile.School;

  // Get the current hour to determine the appropriate greeting
  const currentHour = new Date().getHours();
  let greeting = 'Good evening';

  if (currentHour < 12) {
    greeting = 'Good morning';
  } else if (currentHour < 18) {
    greeting = 'Good afternoon';
  }

  return (
    <FormComponent
      title={'Dashboard'}
      subTitle={
        'This is where you manage your class schedule. View, filter, and organize your teaching activities by day to streamline lesson planning and classroom interactions.'
      }
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledPaper elevation={3} sx={shadow}>
            <Box
              position={'relative'}
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                height: '100%',
              }}
            >
              <Box sx={{ position: 'relative', zIndex: '100', width: '100%' }}>
                <Chip
                  icon={<School size={16} />}
                  label={school_name || 'School Name'}
                  color="primary"
                  sx={{ mb: 3 }}
                />
                <Typography variant="h4" gutterBottom>
                  {greeting}, {first_name}!
                </Typography>
                <Typography variant="subtitle1">
                  Welcome back to your dashboard
                </Typography>
              </Box>
              <img
                src={greetingImage}
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
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <ShortcutCard
              title={
                'Meet your customers on their preferred communication channel'
              }
              description={
                'Expand your reach and push contacts closer to purchase with multichannel campaigns: email, WhatsApp, SMS, Web Push...'
              }
              icon={checkListIcon}
              href={'/teacher/schedule'}
              buttonText={'View Schedule'}
            />
            <ShortcutCard
              title={
                'Meet your customers on their preferred communication channel'
              }
              description={
                'Expand your reach and push contacts closer to purchase with multichannel campaigns: email, WhatsApp, SMS, Web Push...'
              }
              icon={teacherIcon}
              href={'/teacher/settings/account'}
              buttonText={'View Teacher'}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <DateCalendarCard />
        </Grid>
      </Grid>
    </FormComponent>
  );
};

export default TeacherDashboardPage;

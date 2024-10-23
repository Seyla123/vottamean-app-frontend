import React, { useState, useEffect } from 'react';
import { useGetUserProfileQuery } from '../../../services/userApi';
import DateCalendarCard from '../../../components/common/DateCalendarCard';
import { Box, Paper, Grid } from '@mui/material';
import { styled } from '@mui/system';
import FormComponent from '../../../components/common/FormComponent';
import ShortcutCard from '../../../components/teacherSite/ShortcutCard';
import teacherIcon from '../../../assets/images/teacher-93.svg';
import checkListIcon from '../../../assets/images/checklist-1-97.svg';
import WelcomeCard from '../../../components/common/WelcomeCard'
import LoadingCircle from '../../../components/loading/LoadingCircle';
import SomthingWentWrong from '../../../components/common/SomthingWentWrong';

const TeacherDashboardPage = () => {
  const { data: user, isLoading, error } = useGetUserProfileQuery();

  if (isLoading){
    return <LoadingCircle/>
  };
  if (error){
    return <SomthingWentWrong/>
  };
  console.log(user);
  
  const {first_name}  = user.data.teacherProfile.Info;
  const { school_name } = user.data.teacherProfile.School;
  
  return (
    <FormComponent
      title={'Dashboard'}
      subTitle={
        'This is where you manage your class schedule. View, filter, and organize your teaching activities by day to streamline lesson planning and classroom interactions.'
      }
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <WelcomeCard
            subTitle="Welcome back to your home page"
            name={first_name}
            schoolName={school_name}
          />
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

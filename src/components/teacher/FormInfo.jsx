import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, Tabs, Tab, Typography, Card, Grid2, Grid } from '@mui/material';
import dayjs from 'dayjs';

import TeacherInfo from './TeacherInfo';
import AccountInfo from './AccountInfo';
import { setSnackbar } from '../../store/slices/uiSlice';
import { useSignUpTeacherMutation } from '../../services/teacherApi';
import LoadingCircle from '../../components/loading/LoadingCircle';
import { shadow } from '../../styles/global';
import { User, KeyRound } from 'lucide-react';

function FormInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState('1');
  const [isTeacherInfoValid, setIsTeacherInfoValid] = useState(false);
  const [teacherData, setTeacherData] = useState({});
  const [formError, setFormError] = useState('');

  const [signUpTeacher, { isLoading, isError, error, isSuccess }] =
    useSignUpTeacherMutation();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isLoading) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Signing up...',
          severity: 'info',
          autoHideDuration: 6000,
        }),
      );
    } else if (isError) {
      dispatch(
        setSnackbar({
          open: true,
          message: error?.data?.message || 'An error occurred during signup',
          severity: 'error',
          autoHideDuration: 6000,
        }),
      );
    } else if (isSuccess) {
      dispatch(
        setSnackbar({
          open: true,
          message:
            'Signup successful. Please check your email for verification.',
          severity: 'success',
          autoHideDuration: 6000,
        }),
      );
      navigate('/admin/teachers');
    }
  }, [dispatch, isLoading, isError, error, isSuccess, navigate]);

  const handleAccountSubmit = async (data) => {
    const today = dayjs();
    const dob = dayjs(data.dob);
    if (!dob.isValid() || dob.isAfter(today)) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Date of birth cannot be in the future',
          severity: 'error',
          autoHideDuration: 6000,
        }),
      );
      return;
    }

    const payload = {
      email: data.email,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
      address: data.address || '',
      dob: dob.format('YYYY-MM-DD'),
      first_name: data.firstName || '',
      last_name: data.lastName || '',
      gender: data.gender || '',
      phone_number: data.phoneNumber || '',
    };

    try {
      await signUpTeacher(payload).unwrap();
      setFormError('');
    } catch (err) {
      console.error('Signup failed:', err);
      setFormError('Signup failed. Please try again.');
    }
  };

  const handleNextClick = (isValid, data) => {
    if (isValid) {
      setTeacherData(data);
      setValue('2');
      setIsTeacherInfoValid(true);
    }
  };

  const handleBack = () => {
    setValue('1');
  };

  if (isLoading) return <LoadingCircle />;

  const isMobile = windowWidth < 600;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: {
          xs: 'column',
          sm: 'row',
        },
        gap: {
          xs: '16px',
          sm: 3,
        },
      }}
    >
      <Card sx={styles.container}>
        <Box sx={styles.sidebar(isMobile)}>
          <Tabs
            orientation={isMobile ? 'horizontal' : 'vertical'}
            value={value}
            variant={isMobile ? 'fullWidth' : 'scrollable'}
            onChange={(event, newValue) => setValue(newValue)}
            sx={styles.tabs(isMobile)}
          >
            <Tab
              label="Personal"
              icon={<User size={18} />}
              value="1"
              sx={styles.tab}
            />
            <Tab
              label="Account"
              icon={<KeyRound size={18} />}
              value="2"
              sx={styles.tab}
              disabled={!isTeacherInfoValid}
            />
          </Tabs>
        </Box>
        <Box sx={{ ...styles.content, padding: 0 }}>
          {value === '1' && (
            <TeacherInfo
              handleNextClick={handleNextClick}
              defaultValues={teacherData}
            />
          )}
          {value === '2' && (
            <AccountInfo
              handleBack={handleBack}
              handleAccountSubmit={handleAccountSubmit}
              teacherData={teacherData}
            />
          )}
        </Box>
      </Card>
      <Box
        sx={{
          display: { md: 'block', sm: 'none', xs: 'none' },
          backgroundColor: 'white',
          width: {
            xs: '100%',
            sm: '330px',
          },
          ...shadow,
        }}
      >
        <Box sx={styles.text}>
          <Typography>By setting up teacher accounts </Typography>
          <Grid item xs={6} sx={styles.gridContainer}>
            <Box sx={styles.gridItem}>
              <User />
            </Box>
            <Typography variant="body2">Generate attendance reports</Typography>
          </Grid>
          <Grid item xs={6} sx={styles.gridContainer}>
            <Box sx={styles.gridItem}>
              <User />
            </Box>
            <Typography variant="body2">
              Access their class schedules
            </Typography>
          </Grid>
          <Grid item xs={6} sx={styles.gridContainer}>
            <Box sx={styles.gridItem}>
              <User />
            </Box>
            <Typography variant="body2">
              Administrators enable teachers to efficiently monitor student
              attendance
            </Typography>
          </Grid>
        </Box>
        <Box sx={{ display: { md: 'block', xs: 'none' } }}>
          <Typography sx={{ ...styles.text }}>
            This streamlined process allows educators to focus on delivering
            quality instruction while ensuring that administrative tasks are
            handled smoothly and effectively.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    width: '100%',
    height: '100%',
    borderRadius: '8px',
    overflow: 'hidden',
    ...shadow,
  },
  sidebar: (isMobile) => ({
    width: isMobile ? '100%' : '200px',
    backgroundColor: '#ffffff',
    borderRight: isMobile ? 'none' : '1px solid #E0E0E0',
    borderBottom: isMobile ? '1px solid #E0E0E0' : 'none',
  }),
  tabs: (isMobile) => ({
    '& .MuiTabs-indicator': {
      // left: isMobile ? 'auto' : 0,
      // right: isMobile ? 'auto' : 'auto',
    },
  }),
  tab: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '8px',
    borderRadius: '8px',
    // marginBottom: '8px',
    // padding: '12px 16px',
    '&.Mui-selected': {
      // backgroundColor: '#f0f7ff',
    },
    '&.Mui-disabled': {
      color: '#bdbdbd',
    },
  },
  content: {
    flex: 1,
    padding: '24px',
    backgroundColor: '#f5f5f5',
    overflowY: 'auto',
  },
  text: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    alignContent: 'center',
    justifyContent: 'center',
    padding: 2,
  },
  gridContainer: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    gap: 1,
  },
  gridItem: {
    border: '1px solid #E0E0E0',
    width: '100%',
    maxWidth: '40px',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '40px',
  },
};

export default FormInfo;

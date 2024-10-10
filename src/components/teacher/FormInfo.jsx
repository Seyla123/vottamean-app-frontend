// React and third-party libraries
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Mui Component
import dayjs from 'dayjs';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Card,
  Grid,
  useMediaQuery,
  useTheme,
} from '@mui/material';

// Icon from lucide
import {
  User,
  KeyRound,
  CalendarRange,
  UsersRound,
  FolderDown,
  Settings,
} from 'lucide-react';

// Redux Slice
import { setSnackbar } from '../../store/slices/uiSlice';

// Sign up Teacher Api
import { useSignUpTeacherMutation } from '../../services/teacherApi';

// Custom Components
import TeacherInfo from './TeacherInfo';
import AccountInfo from './AccountInfo';
import LoadingCircle from '../../components/loading/LoadingCircle';
import { shadow } from '../../styles/global';

function FormInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  // Responsive in mobile mode
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [value, setValue] = useState('1');
  const [isTeacherInfoValid, setIsTeacherInfoValid] = useState(false);
  const [teacherData, setTeacherData] = useState({});
  const [formError, setFormError] = useState('');

  // Sign up Teacher Api
  const [signUpTeacher, { isLoading, isError, error, isSuccess }] =
    useSignUpTeacherMutation();

  useEffect(() => {
    if (isLoading) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Signing up Teacher account...',
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

  // Check dob validation in acc info before submitting
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

    // set default values for the form
    const payload = {
      email: data.email,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
      address: data.address || '',
      dob: dob.format('YYYY-MM-DD'), // format the dob
      first_name: data.firstName || '',
      last_name: data.lastName || '',
      gender: data.gender || '',
      phone_number: data.phoneNumber || '',
    };

    try {
      // Send the formatted data to the API
      await signUpTeacher(payload).unwrap();
      setFormError('');
    } catch (err) {
      console.error('Signup failed:', err);
      setFormError('Signup failed. Please try again.');
    }
  };

  // Handle continue to account info after validating correct
  const handleNextClick = (isValid, data) => {
    if (isValid) {
      setTeacherData(data);
      setValue('2');
      setIsTeacherInfoValid(true);
    }
  };

  // Handle back
  const handleBack = () => {
    setValue('1');
  };

  // loading state
  if (isLoading) return <LoadingCircle />;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: {xs: "column",  sm: 'column', md:"column", lg: 'row' },
        gap: { xs: 2, sm: 3 },
      }}
    >
      <Card sx={cardContainer}>
        {/* Sidebar tabs */}
        <Box
          sx={{
            width: { xs: '100%', sm: '140px', md: '160px' },
            borderRight: { sm: '1px solid #e0e0e0' },
          }}
        >
          <Tabs
            orientation={isMobile ? 'horizontal' : 'vertical'}
            value={value}
            variant={isMobile ? 'fullWidth' : 'scrollable'}
            onChange={(event, newValue) => setValue(newValue)}
          >
            <Tab
              label="Personal"
              icon={<User size={18} />}
              value="1"
              sx={tabStyle}
            />
            <Tab
              label="Account"
              icon={<KeyRound size={18} />}
              value="2"
              sx={tabStyle}
              disabled={!isTeacherInfoValid}
            />
          </Tabs>
        </Box>
        {/* Contents */}
        <Box
          sx={{
            flex: 1,
            p: 3,
            backgroundColor: '#ffffff',
            overflowY: 'auto',
          }}
        >
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
      {/* Info Box */}
      <Box sx={infoBox}>
        <Box>
          <Typography variant="subtitle1" fontWeight="medium" marginBottom={2}>
            By setting up teacher accounts
          </Typography>
          <Grid container spacing={2}>
            <GridInfo
              icon={<FolderDown color={theme.palette.primary.main} />}
              text="Export attendance reports"
            />
            <GridInfo
              icon={<CalendarRange color={theme.palette.primary.main} />}
              text="Gain access to class schedules"
            />
            <GridInfo
              icon={<UsersRound color={theme.palette.primary.main} />}
              text="Administrators enable teachers to efficiently monitor student attendance"
            />
          </Grid>
        </Box>
        <Box sx={{ display: { xs: 'none', sm: 'block'} }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Settings color={theme.palette.primary.main} />
            <Typography variant="body2" fontWeight="medium">
              Gain better teacher experiences with our streamlined system
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            This streamlined process allows educators to focus on delivering
            quality instruction while ensuring that administrative tasks are
            handled smoothly and effectively.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

// Grid Info Box
const GridInfo = ({ icon, text }) => (
  <Grid item xs={12}>
    <Box sx={gridBox}>
      <Box sx={miniInfo}>{icon}</Box>
      <Typography variant="body2">{text}</Typography>
    </Box>
  </Grid>
);
export default FormInfo;

// Styles
const cardContainer = {
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'row' },
  width: '100%',
  height: '100%',
  borderRadius: 1,
  overflow: 'hidden',
  ...shadow,
};
const tabStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: 1,
  borderRadius: 1,
  '&.Mui-disabled': {
    color: 'text.disabled',
  },
};
const infoBox = {
  display: 'flex',
  maxWidth: {
    xs: '100%',
    sm: '100%',
    md: '220px',
  },
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: {
    xs: 2,
    sm: 3,
  },
  bgcolor: '#ffffff',
  p: 2,
  borderRadius: 1,
  ...shadow,
};
const gridBox = {
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  gap: 2,
  p: 1,
  borderRadius: 2,
  border: 1,
  borderColor: '#f4f4f4',
  boxShadow: '0px 1px 2px rgba(0,0,0,0.1)',
};
const miniInfo = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 40,
  height: 40,
  borderRadius: 1,
};

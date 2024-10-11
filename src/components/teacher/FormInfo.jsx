// React and third-party libraries
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Mui Component
import { TabContext, TabList, TabPanel } from '@mui/lab';
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
import { Photo } from '@mui/icons-material';

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
  const [photoFile, setPhotoFile] = useState(null); // State to store the uploaded photo

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

  // handle submit
  const handleAccountSubmit = async (formData) => {
    try {
      const response = await signUpTeacher(formData);
      if (response.error) {
        throw new Error(
          response.error.data.message || 'An error occurred during signup',
        );
      }
    } catch (error) {
      console.error('Error signing up teacher:', error.message);
      throw error;
    }
  };

  // Function to handle photo upload
  const handlePhotoChange = (event) => {
    const file = event.target.files[0]; 
    // Get the first file selected
    if (file) {
      setPhotoFile(file);
    } else {
      console.log('No photo selected');
    }
  }

  // Handle continue to account info after check validation correct
  const handleNextClick = (isValid, data) => {
    if (isValid) {
      setTeacherData((prevData) => {
        const newData = {
          ...prevData,
          ...data,
          photo: data.photo,
        };
        return newData;
      });
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
        flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'row' },
        gap: { xs: 2, sm: 3 },
      }}
    >
      <Card sx={cardContainer}>
        <TabContext value={value}>
          <Box
            sx={{
              borderRight: isMobile ? 'none' : 1,
              borderColor: 'divider',
            }}
          >
            <TabList
              orientation={isMobile ? 'horizontal' : 'vertical'}
              variant="scrollable"
              onChange={(event, newValue) => setValue(newValue)}
              aria-label="Vertical tabs"
              sx={{
                width: '100%',
                pb: {
                  xs: 0,
                  sm: 4,
                },
              }}
            >
              {/* Tabs Title */}
              <Tab
                label="Personal"
                icon={<User size={18} />}
                value="1"
                sx={tabStyle}
              />
              <Tab
                label="Account"
                disabled={!isTeacherInfoValid}
                icon={<Settings size={18} />}
                value="2"
                sx={tabStyle}
              />
            </TabList>
          </Box>
          {/* Tab Contents */}
          <TabPanel sx={{ flexGrow: 1 }} value="1">
            <TeacherInfo
              handleNextClick={handleNextClick}
              defaultValues={teacherData}
              handlePhotoChange={handlePhotoChange}
              handleAccountSubmit={handleAccountSubmit}
            />
          </TabPanel>
          <TabPanel sx={{ flexGrow: 1 }} value="2">
            <AccountInfo
              teacherData={teacherData}
              handleBack={handleBack}
              handleAccountSubmit={handleAccountSubmit}
              disabled={!isTeacherInfoValid}
            />
          </TabPanel>
        </TabContext>
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
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
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
    md: '240px',
    lg: '300px',
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

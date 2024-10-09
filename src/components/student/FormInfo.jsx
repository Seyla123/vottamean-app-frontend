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
import { useCreateStudentMutation} from '../../services/studentApi';

// Custom Components
import StudentForm from './StudentForm';
import GuardianForm from './GuardianForm';
import LoadingCircle from '../../components/loading/LoadingCircle';
import { shadow } from '../../styles/global';

function FormInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  // Responsive in mobile mode
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [value, setValue] = useState('1');
  const [isStudentInvalid, setIsStudentInvalid] = useState(false);
  const [studentData, setStudentData] = useState({});
  const [formError, setFormError] = useState('');

  // Sign up Teacher Api
  const [createStudent, { isLoading, isError, error, isSuccess }] =
  useCreateStudentMutation();

  useEffect(() => {
    if (isLoading) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Creating new student....',
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
            'Created Successfully',
          severity: 'success',
          autoHideDuration: 6000,
        }),
      );
      navigate('/admin/students');
    }
  }, [dispatch, isLoading, isError, error, isSuccess, navigate]);

  // Check dob validation in acc info before submitting
  const handleStudentSubmit = async (data) => {
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
      guardian_first_name:data.guardian_first_name || '',
      guardian_last_name:data.guardian_last_name || '',
      guardian_email: data.guardian_email|| '',
      guardian_relationship: data.guardian_relationship || '',
      guardian_phone_number:data.guardian_phone_number || '',
      address: data.address || '',
      dob: dob.format('YYYY-MM-DD'), // format the dob
      first_name: data.firstName || '',
      last_name: data.lastName || '',
      class_id:data.class_id || '',
      gender: data.gender || '',
      phone_number: data.phoneNumber || '',
    };

    try {
      // Send the formatted data to the API
      await createStudent(payload).unwrap();
      setFormError('');
    } catch (err) {
      console.error('Create failed:', err);
      setFormError('Create failed. Please try again.');
    }
  };

  // Handle continue to account info after validating correct
  const handleNextClick = (isValid, data) => {
    if (isValid) {
      setStudentData(data);
      setValue('2');
      setIsStudentInvalid(true);
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
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 2, sm: 3 },
      }}
    >
      <Card
        sx={cardContainer}
      >
        {/* Sidebar tabs */}
        <Box
          sx={{
            width: { xs: '100%', sm: '200px' },
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
              label="Student"
              icon={<User size={18} />}
              value="1"
              sx={tabStyle}
            />
            <Tab
              label="Guardian"
              icon={<KeyRound size={18} />}
              value="2"
              sx={tabStyle}
              disabled={!isStudentInvalid}
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
            <StudentForm
              handleNextClick={handleNextClick}
              defaultValues={studentData}
            />
          )}
          {value === '2' && (
            <GuardianForm
              handleBack={handleBack}
              handleStudentSubmit={handleStudentSubmit}
              studentData={studentData}
            />
          )}
        </Box>
      </Card>
    </Box>
  );
}

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
}
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


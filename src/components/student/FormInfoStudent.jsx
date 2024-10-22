// - React and third-party libraries
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// - Mui Component
import {
  Box,
  useMediaQuery,
  Grid,
  useTheme,
  Stack,
  Typography,
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

// - Icon from lucide
import {
  User,
  Settings,
  NotebookPen,
  BookMarked,
  BellRing,
  FolderKanban,
} from 'lucide-react';

// - Custom Components
import StudentForm from './StudentForm';
import GuardianForm from './GuardianForm';
import { shadow } from '../../styles/global';
import { StyledTab } from '../common/StyledTabs';
import { GridInfo } from '../teacher/FormInfo';
// Api for create student
import { useCreateStudentMutation } from '../../services/studentApi';

// Redux Slice setSnackbar
import { setSnackbar } from '../../store/slices/uiSlice';

function FormInfoStudent() {
  // Dispatch the action
  const dispatch = useDispatch();
  // Navigate
  const navigate = useNavigate();
  // Reference for photo preview to avoid re-render
  const photoPreviewRef = useRef(null);
  // Mobile size responsive
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // useCreateStudentMutation : a hook return function for create student api
  const [createStudent, { isLoading, isError, error, isSuccess }] =
    useCreateStudentMutation();

  // State for tab control
  const [value, setValue] = useState('1');
  // State for student validation
  const [isStudentInfoValid, setIsStudentInfoValid] = useState(false);
  // State for student data
  const [studentData, setStudentData] = useState({});
  // State for Photo upload and ui
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  // Hanlde Photo Upload
  const handlePhotoChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      setPhotoFile(file);
      const newPreviewUrl = URL.createObjectURL(file);
      photoPreviewRef.current.src = newPreviewUrl;
    } else {
      setPhotoFile(null);
      setPhotoPreview(null);
    }
  };

  // Function to go to the previous tab (Student Form)
  const handleBack = () => {
    setValue('1');
  };

  // Function to go to the next tab (Guardian Form)
  const handleNext = (isValid, data) => {
    if (isValid) {
      setStudentData((prevData) => ({
        ...prevData,
        ...data,
        photo: data.photo,
      }));
      setValue('2');
      setIsStudentInfoValid(true);
    }
  };

  // Function to handle form submission
  const handleSubmitForm = async (formData) => {
    try {
      await createStudent(formData).unwrap();
    } catch (error) {
      console.error('Error signing up student:', error.message);
    }
  };

  // Show Loading effect when creating student
  // If the create process was not successful, show an error message
  // Check if the create process was successful and if so, navigate to students list page
  useEffect(() => {
    if (isError) {
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
          message: 'Create student successful.',
          severity: 'success',
          autoHideDuration: 6000,
        }),
      );
      navigate('/admin/students');
    }
  }, [dispatch, isError, error, isSuccess, navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'row' },
        gap: { xs: 2, sm: 3 },
        height: '100%',
      }}
    >
      <Stack
        boxShadow={shadow}
        bgcolor={'background.paper'}
        direction={{ xs: 'column', sm: 'row' }}
        width={'100%'}
      >
        <TabContext value={value}>
          <Box
            sx={{
              borderRight: isMobile ? 'none' : 1,
              borderColor: 'divider',
            }}
          >
            {/* Tab Title */}
            <TabList
              orientation={isMobile ? 'horizontal' : 'vertical'}
              variant="scrollable"
              onChange={(event, newValue) => setValue(newValue)}
              aria-label="Vertical tabs"
              sx={{
                width: { xs: '100%', sm: '200px' },
                pb: { xs: 0, sm: 4 },
              }}
            >
              <StyledTab
                label="Student"
                icon={<User size={18} />}
                value="1"
                sx={tabStyle}
              />
              <StyledTab
                label="Guardian"
                disabled={!isStudentInfoValid}
                icon={<Settings size={18} />}
                value="2"
                sx={tabStyle}
              />
            </TabList>
          </Box>
          {/* Tab Contents */}
          <TabPanel sx={{ flexGrow: 1, padding: 2 }} value="1">
            <StudentForm
              defaultValues={studentData}
              handleNext={handleNext}
              handlePhotoChange={handlePhotoChange}
              photoFile={photoFile}
              setPhotoFile={setPhotoFile}
              photoPreview={photoPreview}
              photoPreviewRef={photoPreviewRef}
              setPhotoPreview={setPhotoPreview}
              handleSubmitForm={handleSubmitForm}
            />
          </TabPanel>
          <TabPanel
            sx={{
              flexGrow: 1,
              height: {
                sm: '60vh',
              },
              padding: 2,
            }}
            value="2"
          >
            <GuardianForm
              studentData={studentData}
              isLoading={isLoading}
              handleBack={handleBack}
              handleSubmitForm={handleSubmitForm}
              disabled={!isStudentInfoValid}
            />
          </TabPanel>
        </TabContext>
      </Stack>
      {/* Info Box */}
      <Stack
        direction={'column'}
        spacing={3}
        bgcolor={'background.paper'}
        boxShadow={shadow}
        p={2}
        justifyContent={'space-between'}
        maxWidth={{
          xs: '100%',
          sm: '100%',
          md: '240px',
          lg: '300px',
        }}
      >
        <Box width={'100%'}>
          <Typography variant="subtitle1" fontWeight="medium" marginBottom={2}>
          Simply create a student account, and fill in guardian information:
          </Typography>
          <Grid container spacing={2}>
            <GridInfo
              icon={<NotebookPen color={'#6c63ff'}/>}
              text="Easy Student Registration and Class Assignment"
            />
            <GridInfo
              icon={<BookMarked color={'#6c63ff'}/>}
              text="Real-time Attendance Updates and Reporting"
            />
            <GridInfo
              icon={<BellRing color={'#6c63ff'}/>}
              text="Automated Guardian Notifications for Attendance Status"
            />
          </Grid>
        </Box>
        <Stack sx={{ display: { xs: 'none', sm: 'block' }}}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap:1 }}>
            <Settings color={'#6c63ff'}/>
            <Typography variant="body2" fontWeight="medium">
            Attendance Management and Parent Communication.
            </Typography>
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            whiteSpace={'pre-line'}
            ml={2.5}
          >
            Our system simplifies attendance tracking, allowing you to focus on
            teaching. Real-time notifications keep guardians informed about
            their child's attendance.
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}

export default FormInfoStudent;

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

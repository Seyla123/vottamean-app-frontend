// - React and third-party libraries
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// - Mui Component
import {
  Box,
  useMediaQuery,
  useTheme,
  Stack,
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

// - Icon from lucide
import { User, Settings } from 'lucide-react';

// - Custom Components
import StudentForm from './StudentForm';
import GuardianForm from './GuardianForm';
import { shadow } from '../../styles/global';
import { StyledTab } from '../common/StyledTabs';

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
          message: 'Create student and send link for verification successful.',
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
        flexDirection: { xs: 'column', sm: 'row' },
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

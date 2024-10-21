// - React and third-party libraries
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

// - Mui Component
import {
  Box,
  Tab,
  Typography,
  Card,
  Grid,
  useMediaQuery,
  useTheme,
  Stack,
} from '@mui/material';

import { TabContext, TabList, TabPanel } from '@mui/lab';

// - Icon from lucide
import { User, KeyRound, Settings } from 'lucide-react';

// - Redux Hooks and APIs
// import { updateFormData } from '../../store/slices/studentSlice';

// - Custom Components
import StudentForm from './StudentForm';
import GuardianForm from './GuardianForm';
import { shadow } from '../../styles/global';
import { StyledTab } from '../common/StyledTabs';

import { useCreateStudentMutation } from '../../services/studentApi';
import { useNavigate } from 'react-router-dom';
// Redux Slice
import { setSnackbar } from '../../store/slices/uiSlice';
function FormInfoStudent() {
  const theme = useTheme();
  const navigate = useNavigate();
  const photoPreviewRef = useRef(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // useSignUpTeacherMutation : a hook return function for sign up teacher api
  const [createStudent, { isLoading, isError, error, isSuccess }] =
    useCreateStudentMutation();

  // Dispatch the action to update the form data
  const dispatch = useDispatch();

  const [value, setValue] = useState('1');
  const [isStudentInfoValid, setIsStudentInfoValid] = useState(false);
  const [studentData, setStudentData] = useState({});
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  // State variable to keep track of the current step
  const [activeStep, setActiveStep] = useState(0);
  // Function to handle the form data change
  // const handleFormChange = (stepData) => {
  //   dispatch(updateFormData(stepData));
  // };
  // Class ID selection
  const [selectedClassId, setSelectedClassId] = useState(null);

    // Function to handle class selection, if needed
    const handleClassChange = (event) => {
      setSelectedClassId(event.target.value);
    };

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

  // Function to go to the previous step
  const handleBack = () => {
    setValue('1');
  };

  // Function to go to the next step
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

  // Handle Submit form
  const handleSubmitForm = async (formData) => {
    
  console.log(formData)
    try {
      await createStudent(formData).unwrap();
    } catch (error) {
      console.error('Error signing up student:', error.message);
    }
  };
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
          message:
            'Create teacher and send link for verification successful.',
          severity: 'success',
          autoHideDuration: 6000,
        }),
      );
      navigate('/admin/teachers');
    }
  }, [dispatch, isError, error, isSuccess, navigate]);
  // // Array of steps to display in the stepper
  // const steps = [
  //   {
  //     label: 'Student',
  //     description: 'Enter student details',
  //     icon: <User size={24} />,
  //   },
  //   {
  //     label: 'Guardian',
  //     description: 'Enter guardian details',
  //     icon: <KeyRound size={24} />,
  //   },
  // ];

  // Array of components to render in each step
  // const stepFormComponents = [
  //   <StudentForm handleFormChange={handleFormChange} handleNext={handleNext} />,
  //   <GuardianForm
  //     handleFormChange={handleFormChange}
  //     handleNext={handleNext}
  //     handleBack={handleBack}
  //   />,
  // ];

  // const CustomIconBox = ({ icon }) => (
  //   <Box
  //     sx={{
  //       width: 40,
  //       height: 40,
  //       display: 'flex',
  //       justifyContent: 'center',
  //       alignItems: 'center',
  //       borderRadius: 2,
  //       backgroundColor: '#fff',
  //       padding: '8px',
  //     }}
  //   >
  //     {icon}
  //   </Box>
  // );

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
             studentData={{ 
              ...studentData, 
              classId: selectedClassId  // Pass class_id from parent state
            }} 
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

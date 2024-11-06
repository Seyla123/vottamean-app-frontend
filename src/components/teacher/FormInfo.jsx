// React and third-party libraries
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Mui Component
import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
  Box,
  Typography,
  Grid,
  useMediaQuery,
  useTheme,
  Stack,
} from '@mui/material';

// Icons from lucide
import {
  User,
  CalendarRange,
  UsersRound,
  Settings,
  WandSparkles,
} from 'lucide-react';

// Redux Slice
import { setSnackbar } from '../../store/slices/uiSlice';

// Sign up Teacher Api
import { useSignUpTeacherMutation } from '../../services/teacherApi';

// Custom Components
import TeacherInfo from './TeacherInfo';
import AccountInfo from './AccountInfo';
import { shadow } from '../../styles/global';
import { StyledTab } from '../common/StyledTabs';

function FormInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const photoPreviewRef = useRef(null);
  const theme = useTheme();

  // Responsive Mobile size
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // States
  const [value, setValue] = useState('1');
  const [isTeacherInfoValid, setIsTeacherInfoValid] = useState(false);
  const [teacherData, setTeacherData] = useState({});
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  // useSignUpTeacherMutation : a hook return function for sign up teacher api
  const [signUpTeacher, { isLoading, isError, error, isSuccess }] =
    useSignUpTeacherMutation();

  // Show Loading effect when signing up the teacher
  // If the sign up was not successful, show an error message
  // Check if the signup was successful and if so, navigate to teachers list page
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
          message: 'Create teacher and send link for verification successful.',
          severity: 'success',
          autoHideDuration: 6000,
        }),
      );
      navigate('/admin/teachers');
    }
  }, [dispatch, isError, error, isSuccess, navigate]);

  // Hanlde Photo Upload
  const handlePhotoChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (
      file &&
      file.type.startsWith('image/') &&
      file.size <= 1 * 1024 * 1024
    ) {
      // If there's an existing preview URL, revoke it
      if (photoPreview) {
        URL.revokeObjectURL(photoPreview);
      }
      setPhotoFile(file);
      const newPreviewUrl = URL.createObjectURL(file);
      setPhotoPreview(newPreviewUrl);
    } else {
      setPhotoFile(null);
      setPhotoPreview(null);
      dispatch(
        setSnackbar({
          open: true,
          message: file
            ? 'File must be an image under 1MB'
            : 'No file selected',
          severity: 'error',
        }),
      );
    }
  };

  // Handle Next with form data persistence
  const handleNextClick = (isValid, data) => {
    if (isValid) {
      setTeacherData((prev) => ({
        ...prev,
        ...data,
        photo: data.photo,
      }));
      setValue('2');
      setIsTeacherInfoValid(true);
    }
  };
  // Handle Submit form
  const handleSubmitForm = async (formData) => {
    await signUpTeacher(formData).unwrap();
  };

  // handle back to teacher info
  const handleBack = () => {
    setValue('1');
  };

  // Cleanup effect for photo URLs
  useEffect(() => {
    return () => {
      if (
        photoPreview &&
        typeof photoPreview === 'string' &&
        photoPreview.startsWith('blob:')
      ) {
        URL.revokeObjectURL(photoPreview);
      }
    };
  }, [photoPreview]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'row' },
        gap: { xs: 2, sm: 3 },
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
                label="Personal"
                icon={<User size={18} />}
                value="1"
                sx={tabStyle}
              />
              <StyledTab
                label="Account"
                disabled={!isTeacherInfoValid}
                icon={<Settings size={18} />}
                value="2"
                sx={tabStyle}
              />
            </TabList>
          </Box>
          {/* Tab Contents */}
          <TabPanel sx={{ flexGrow: 1, padding: 2 }} value="1">
            <TeacherInfo
              defaultValues={teacherData}
              handleNextClick={handleNextClick}
              handlePhotoChange={handlePhotoChange}
              photoFile={photoFile}
              setPhotoFile={setPhotoFile}
              photoPreview={photoPreview}
              setPhotoPreview={setPhotoPreview}
              photoPreviewRef={photoPreviewRef}
              handleSubmitForm={handleSubmitForm}
            />
          </TabPanel>
          <TabPanel
            sx={{
              flexGrow: 1,
              padding: 2,
            }}
            value="2"
          >
            <AccountInfo
              teacherData={teacherData}
              isLoading={isLoading}
              handleBack={handleBack}
              handleSubmitForm={handleSubmitForm}
              disabled={!isTeacherInfoValid}
            />
          </TabPanel>
        </TabContext>
      </Stack>
      {/* Info Box */}
      <Stack sx={infoBox}>
        <Box width={'100%'}>
          <Typography variant="subtitle1" fontWeight="medium" marginBottom={2}>
            By setting up teacher accounts, Teachers will be able to:
          </Typography>
          <Grid container spacing={2}>
            <GridInfo
              icon={<CalendarRange color={'#6c63ff'} />}
              text="Gain access to class schedules"
            />
            <GridInfo
              icon={<UsersRound color={'#6c63ff'} />}
              text="Mark students attendance"
            />
            <GridInfo
              icon={<WandSparkles color={'#6c63ff'} />}
              text="Enhanced Teacher Efficiency"
            />
          </Grid>
        </Box>
        <Stack sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Box
            sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, ml: 1 }}
          >
            <Settings color={'#6c63ff'} />
            <Typography variant="body2" fontWeight="medium">
              Gain better teacher experiences with our streamlined system
            </Typography>
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            whiteSpace={'pre-line'}
            ml={3}
          >
            This streamlined teacher account system aims to enhance efficiency
            and communication within the educational environment. By automating
            key administrative tasks, teachers can dedicate more time to
            delivering quality instruction. Additionally, real-time attendance
            notifications to guardians ensure transparency and accountability.
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}

export default FormInfo;
// Grid Info Box
export const GridInfo = ({ icon, text }) => (
  <Grid item xs={12}>
    <Box sx={gridBox}>
      <Box sx={miniInfo}>{icon}</Box>
      <Typography variant="body2">{text}</Typography>
    </Box>
  </Grid>
);
// Styles
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
  display: { xs: 'none', sm: 'flex' },
  direction: 'column',
  gap: 3,
  bgcolor: 'background.paper',
  boxShadow: shadow,
  p: 2,
  justifyContent: 'space-between',
  maxWidth: {
    xs: '100%',
    sm: '100%',
    md: '240px',
    lg: '300px',
  },
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

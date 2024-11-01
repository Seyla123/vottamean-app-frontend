// React and third-party libraries
import { useState, useEffect,useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tab, Typography, Card, Box } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useMediaQuery } from '@mui/material'; // Import useMediaQuery

// Components
import FormComponent from '../../../components/common/FormComponent';

import MyProfileView from '../../../components/common/MyProfileView';
import SecurityView from '../../../components/common/SecurityView';

// Image and Icon
import { UserRound, Settings } from 'lucide-react';

// Redux hooks and API
import { useDispatch } from 'react-redux';
import { updateFormData } from '../../../store/slices/formSlice';
import {
  useGetUserProfileQuery,
  useDeleteUserAccountMutation,
} from '../../../services/userApi';

// User Profile Data formatting
import { getUserProfileData, getSchoolData } from '../../../utils/formatData';
import { shadow } from '../../../styles/global';
import LoadingPage from '../../LoadingPage';
import SomethingWentWrong from '../../../components/common/SomethingWentWrong';
import TitleHeader from '../../../components/common/TitleHeader';

const AccountSettingsPageTeacher = () => {
  // - Initialize dispatch and navigate hooks
  const dispatch = useDispatch();

  // Redux API calls to get user profile
  const { data: user, isLoading, error, refetch } = useGetUserProfileQuery();
  // Redux API calls to delete user
  const [deleteUserAccount] = useDeleteUserAccountMutation();

  // Separate photo state to handle both blob and server URLs
  const [currentPhoto, setCurrentPhoto] = useState(null);
  // Local state for transformed data
  const [userData, setUserData] = useState({
    userProfile: {},
    schoolProfile: {},
  });

  const [schoolProfile, setSchoolProfile] = useState({
    schoolId: '',
    schoolName: '',
    schoolAddress: '',
    schoolPhoneNumber: '',
  });
  // Local state for tab
  const [value, setValue] = useState('1');

  // Determine if the screen size is mobile
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  // Memoized photo handling to prevent unnecessary re-renders
  const memoizedPhoto = useMemo(() => {
    if (currentPhoto) return currentPhoto;
    return user?.profilePicture || null;
  }, [currentPhoto, user?.profilePicture]);
  // Handle initial data load and subsequent updates
  useEffect(() => {
    if (user) {
      const transformedData = getUserProfileData(user);
      console.log(transformedData);
      // Only update the photo if we don't have a blob URL
      if (!currentPhoto || !currentPhoto.startsWith('blob:')) {
        setCurrentPhoto(transformedData.photo);
      }
      setUserData({
        userProfile: transformedData.userProfile,
        schoolProfile: transformedData.schoolProfile,
      });
    }
  }, [user]);

  // Cleanup blob URLs
  useEffect(() => {
    return () => {
      if (currentPhoto && currentPhoto.startsWith('blob:')) {
        URL.revokeObjectURL(currentPhoto);
      }
    };
  }, []);

  // Handle profile photo update
  const handleProfileUpdate = async (newPhoto) => {
    console.log(newPhoto);
    try {
      // Revoke old blob URL if exists
      if (currentPhoto && currentPhoto.startsWith('blob:')) {
        URL.revokeObjectURL(currentPhoto);
      }

      // Update photo state if new photo provided
      if (newPhoto) {
        setCurrentPhoto(newPhoto);
      }

      // Refresh user data from server
      await refetch();
    } catch (error) {
      dispatch(
        setSnackbar({
          open: true,
          message: `Failed to update profile photo: ${error?.data?.message}`,
          severity: 'error',
        }),
      );
    }
  };
  // Handle delete button click
  const handleDeleteAccount = async () => {
    try {
      await deleteUserAccount().unwrap();

      window.location.href = '/auth/signin';
    } catch (error) {
      console.error('Failed to delete account:', error);
    }
  };

 
 // Handle tab switch with photo preservation
 const handleChange = (event, newValue) => {
  setValue(newValue);
  // Persist profile picture across tabs
  dispatch(updateFormData({ 
    profilePicture: memoizedPhoto 
  }));
};

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error) {
    return <SomethingWentWrong description={error?.data?.message} />;
  }
  console.log(userData);
  return (
    <FormComponent>
      <TitleHeader title="Account Settings" />
      <Card sx={shadow}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <TabContext value={value}>
            <Box
              sx={{
                borderRight: isMobile ? 'none' : 1,
                borderColor: 'divider',
              }}
            >
              <TabList
                orientation={'horizontal'}
                variant="scrollable"
                onChange={handleChange}
                aria-label="Vertical tabs"
                sx={{ width: '100%' }}
              >
                <Tab
                  label="Profile"
                  value="1"
                  icon={<UserRound size={18} />}
                  iconPosition="start"
                  sx={{
                    display: 'flex',
                    justifyContent: 'start',
                  }}
                />
                <Tab
                  label="Account"
                  value="2"
                  icon={<Settings size={18} />}
                  iconPosition="start"
                  sx={{
                    display: 'flex',
                    justifyContent: 'start',
                  }}
                />
              </TabList>
            </Box>

            <TabPanel sx={{ flexGrow: 1 }} value="1">
              {/* MY PROFILE VIEW */}
              <MyProfileView
                profilePhoto={currentPhoto}
                userData={userData?.userProfile}
                schoolProfileData={userData?.schoolProfile}
                onProfileUpdate={handleProfileUpdate}
              />
            </TabPanel>

            <TabPanel sx={{ flexGrow: 1 }} value="2">
              {/* SECURITY VIEW */}
              <SecurityView handleDeleteAccount={handleDeleteAccount} />
            </TabPanel>
          </TabContext>
        </Box>
      </Card>
    </FormComponent>
  );
};

export default AccountSettingsPageTeacher;

// React and third-party libraries
import { useState, useEffect } from 'react';
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

const AccountSettingsPage = () => {
  // - Initialize dispatch and navigate hooks
  const dispatch = useDispatch();

  // Redux API calls to get user profile
  const { data: user, isLoading, error } = useGetUserProfileQuery();
  // Redux API calls to delete user
  const [deleteUserAccount] = useDeleteUserAccountMutation();

  // Local state for transformed data
  const [userData, setUserData] = useState({
    userProfile: {},
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

  // - When the user data is fetched, format the data and set the user data in the state
  useEffect(() => {
    if (user) {
      const transformedData = getUserProfileData(user);
      const schoolData = getSchoolData(user);
      
      setUserData(transformedData);
      setSchoolProfile({
        schoolId: schoolData?.school_id,
        schoolName: schoolData?.school_name,
        schoolAddress: schoolData?.school_address,
        schoolPhoneNumber: schoolData?.school_phone_number,
      });
      dispatch(updateFormData(transformedData));
    }
  }, [user, dispatch]);

    // Handle delete button click
    const handleDeleteAccount = async () => {
      try {
        await deleteUserAccount().unwrap();

        window.location.href = '/auth/signin';
      } catch (error) {
        console.error('Failed to delete account:', error);
      }
    };

  // Handle tab switch
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error) {
    return <SomethingWentWrong description={error?.data?.message} />;
  }
  return (
    <FormComponent
    >
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
                title={'My Profile'}
                profilePhoto={userData.photo}
                userData={userData.userProfile}
                schoolProfileData={schoolProfile}
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

export default AccountSettingsPage;

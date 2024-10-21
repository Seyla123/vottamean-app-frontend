// React and third-party libraries
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tab, Typography, Card, Tabs, Box, styled } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useMediaQuery } from '@mui/material'; // Import useMediaQuery

// Components
import FormComponent from '../../../../components/common/FormComponent';

import MyProfileView from '../../../../components/common/MyProfileView';
import SecurityView from '../../../../components/common/SecurityView';

// Image and Icon
import { UserRound, Settings } from 'lucide-react';

// Redux hooks and API
import { useDispatch } from 'react-redux';
import { updateFormData } from '../../../../store/slices/formSlice';
import {
  useGetUserProfileQuery,
  useDeleteUserAccountMutation,
} from '../../../../services/userApi';

// User Profile Data formatting
import { getUserProfileData } from '../../../../utils/formatData';
import { shadow } from '../../../../styles/global';
import LoadingPage from '../../../LoadingPage';
import { StyledTab } from '../../../../components/common/StyledTabs';
import TitleHeader from '../../../../components/common/TitleHeader';

const AccountSettingsPage = () => {
  // - Initialize dispatch and navigate hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux API calls to get user profile
  const { data: user, isLoading, error } = useGetUserProfileQuery();
  // Redux API calls to delete user
  const [deleteUserAccount] = useDeleteUserAccountMutation();

  // Local state for transformed data
  const [userData, setUserData] = useState({
    userProfile: {},
    schoolProfile: {},
    photo: '',
  });

  // Local state for tab
  const [value, setValue] = useState('1');

  // Determine if the screen size is mobile
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  // - When the user data is fetched, format the data and set the user data in the state
  useEffect(() => {
    if (user) {
      const transformedData = getUserProfileData(user);
      setUserData(transformedData);
      dispatch(updateFormData(transformedData));
    }
  }, [user, dispatch]);

  // Handle tab switch
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Handle delete button click
  const handleDeleteAccount = async () => {
    try {
      await deleteUserAccount().unwrap();

      navigate('/auth/signin');
    } catch (error) {
      console.error('Failed to delete account:', error);
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error) {
    return <Typography>Error loading user data</Typography>;
  }
  

  return (
    <FormComponent>
      <TitleHeader title={'Account Settings'} />
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
            <StyledTab
              label="Profile Information"
              value="1"
              // icon={<UserRound size={14} />}
              iconPosition="start"
            />
            <StyledTab
              label="Account Security"
              value="2"
              // icon={<Settings size={14} />}
              iconPosition="start"
            />
          </TabList>
        </Box>

        <TabPanel sx={{ flexGrow: 1, p: 0 }} value="1">
          {/* MY PROFILE VIEW */}
          <MyProfileView
            profilePhoto={userData?.photo}
            userData={userData?.userProfile}
            schoolProfileData={userData.schoolProfile}
          />
        </TabPanel>

        <TabPanel sx={{ flexGrow: 1, p: 0 }} value="2">
          {/* SECURITY VIEW */}
          <SecurityView handleDeleteAccount={handleDeleteAccount} />
        </TabPanel>
      </TabContext>
    </FormComponent>
  );
};

export default AccountSettingsPage;

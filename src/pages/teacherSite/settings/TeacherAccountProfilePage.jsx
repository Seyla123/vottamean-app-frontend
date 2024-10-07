// React and third-party libraries
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tab, Typography, Card, Tabs, Box } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useMediaQuery } from '@mui/material'; // Import useMediaQuery

// Components
import FormComponent from '../../../components/common/FormComponent';

import MyProfileView from '../../../components/common/MyProfileView';
import SecurityView from '../../../components/common/SecurityView';

// Image and Icon
import { UserRoundPen, Settings } from 'lucide-react';

// Redux hooks and API
import { useDispatch } from 'react-redux';
import { updateFormData } from '../../../store/slices/formSlice';
import {
  useGetUserProfileQuery,
  useDeleteUserAccountMutation,
} from '../../../services/userApi';

// User Profile Data formatting
import { getUserProfileData } from '../../../utils/formatData';
import { shadow } from '../../../styles/global';

const AccountSettingsPage = () => {
  // - Initialize dispatch and navigate hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux API calls to get user profile
  const { data: user, isLoading, error, isSuccess } = useGetUserProfileQuery();
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
    console.log(user);
    if (user) {
      const transformedData = getUserProfileData(user);
      console.log('this data :', user);

      setUserData(transformedData);
      dispatch(updateFormData(transformedData));
      console.log(userData.userProfile);
    }
  }, [user, dispatch]);

  // Handle tab switch
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Handle delete button click
  const handleDeleteAccount = async () => {
    try {
      console.log('Deleting current user');
      await deleteUserAccount().unwrap();
      console.log('Account deleted successfully');

      navigate('/auth/signin');
    } catch (error) {
      console.error('Failed to delete account:', error);
    }
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error loading user data</Typography>;
  }

  return (
    <FormComponent
      title={'Account Settings'}
      subTitle={'Manage your account settings'}
    >
      <Card sx={shadow}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
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
                orientation={isMobile ? 'horizontal' : 'vertical'}
                variant="scrollable"
                onChange={handleChange}
                aria-label="Vertical tabs"
                sx={{ width: '160px' }}
              >
                <Tab
                  label="Profile"
                  value="1"
                  icon={<UserRoundPen size={18} />}
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
                title={'Profile'}
                profilePhoto={userData.photo}
                userData={userData.userProfile}
              />
            </TabPanel>

            <TabPanel sx={{ flexGrow: 1 }} value="2">
              {/* SECURITY VIEW */}
              <SecurityView
                title={'Security'}
                handleDeleteAccount={handleDeleteAccount}
              />
            </TabPanel>
          </TabContext>
        </Box>
      </Card>
    </FormComponent>
  );
};

export default AccountSettingsPage;

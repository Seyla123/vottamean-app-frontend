// React and third-party libraries
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tab, Typography, Card } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

// Components
import FormComponent from '../../../../components/common/FormComponent';

import MyProfileView from '../../../../components/common/MyProfileView';
import SecurityView from '../../../../components/common/SecurityView';

// Image and Icon
import { User, KeyRound } from 'lucide-react';

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

  // - When the user data is fetched, format the data and set the user data in the state
  useEffect(() => {
    if (user) {
      const transformedData = getUserProfileData(user);
      setUserData(transformedData);
      dispatch(updateFormData(transformedData));
    }
  }, [user]);

  // Handle tab switch
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Handle edit button click
  const handleEditUser = () => {
    navigate('/admin/settings/account/update-me');
  };

  // Handle edit school button click
  const handleEditSchool = () => {
    navigate('/admin/settings/account/update-school');
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
        <TabContext value={value}>
          {/* TAB LIST */}
          <TabList onChange={handleChange} aria-label="Account tabs">
            <Tab
              label="My Profile"
              value="1"
              icon={<User size={18} />}
              iconPosition="start"
            />
            <Tab
              label="Security"
              value="2"
              icon={<KeyRound size={18} />}
              iconPosition="start"
            />
          </TabList>

          {/* TAB CONTENT */}
          <TabPanel value="1">
            {/* MY PROFILE VIEW */}
            <MyProfileView
              title={'My Profile'}
              adminProfileData={userData.userProfile}
              schoolProfileData={userData.schoolProfile}
              handleEditSchool={handleEditSchool}
              handleEditUser={handleEditUser}
            />
          </TabPanel>

          <TabPanel value="2">
            {/* SECURITY VIEW */}
            <SecurityView
              title={'Security'}
              handleDeleteAccount={handleDeleteAccount}
            />
          </TabPanel>
        </TabContext>
      </Card>
    </FormComponent>
  );
};

export default AccountSettingsPage;

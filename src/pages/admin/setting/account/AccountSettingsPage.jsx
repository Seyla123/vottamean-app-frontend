// React and third-party libraries
import { useState, useEffect } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';

// Components
import FormComponent from '../../../../components/common/FormComponent';

import MyProfileView from '../../../../components/common/MyProfileView';
import SecurityView from '../../../../components/common/SecurityView';

// Redux hooks and API
import { useDispatch } from 'react-redux';
import { updateFormData } from '../../../../store/slices/formSlice';
import {
  useGetUserProfileQuery,
  useDeleteUserAccountMutation,
} from '../../../../services/userApi';

// User Profile Data formatting
import { getUserProfileData } from '../../../../utils/formatData';
import LoadingCircle from '../../../../components/loading/LoadingCircle';
import { StyledTab } from '../../../../components/common/StyledTabs';
import TitleHeader from '../../../../components/common/TitleHeader';
import SomethingWentWrong from '../../../../components/common/SomethingWentWrong';
const AccountSettingsPage = () => {
  // - Initialize dispatch
  const dispatch = useDispatch();

  // Redux API calls to get user profile
  const { data: user, isLoading, error, refetch } = useGetUserProfileQuery();

  // Redux API calls to delete user
  const [deleteUserAccount] = useDeleteUserAccountMutation();

  // Separate photo state to handle both blob and server URLs
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [userData, setUserData] = useState({
    userProfile: {},
    schoolProfile: {},
  });

  // Local state for tab
  const [value, setValue] = useState('1');

  // Handle initial data load and subsequent updates
  useEffect(() => {
    if (user) {
      const transformedData = getUserProfileData(user);

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

  // Cleanup blob URLs when component unmounts
  useEffect(() => {
    return () => {
      if (currentPhoto && currentPhoto.startsWith('blob:')) {
        URL.revokeObjectURL(currentPhoto);
      }
    };
  }, []);

  // Handle tab switch
  const handleChange = (event, newValue) => {
    setValue(newValue);
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

  // Handle profile photo update
  const handleProfileUpdate = async (newPhoto) => {

    try {
      // Revoke existing blob URL to prevent memory leaks
      if (currentPhoto && currentPhoto.startsWith('blob:')) {
        URL.revokeObjectURL(currentPhoto);
      }

      // Update the current photo state with the new photo, if provided
      if (newPhoto) {
        setCurrentPhoto(newPhoto);
      }

      // Refresh user profile data from the server
      await refetch();
    } catch (error) {
      // Log any errors encountered during the update
      dispatch(
        setSnackbar({
          open: true,
          message:` Failed to update profile photo: ${error?.data?.message}`,
          severity: 'error',
        })
      )
    }
  };


  if (isLoading) {
    return <LoadingCircle />;
  }

  if (error) {
    return <SomethingWentWrong description={error?.data?.message} />;
  }

  return (
    <FormComponent>
      <TitleHeader title={'Account Settings'} />
      <TabContext value={value}>
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
            iconPosition="start"
          />
          <StyledTab
            label="Account Security"
            value="2"
            // icon={<Settings size={14} />}
            iconPosition="start"
          />
        </TabList>
        <TabPanel sx={{ flexGrow: 1, p: 0 }} value="1">
          {/* MY PROFILE VIEW */}
          <MyProfileView
            profilePhoto={currentPhoto}
            userData={userData.userProfile}
            schoolProfileData={userData.schoolProfile}
            onProfileUpdate={handleProfileUpdate}
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

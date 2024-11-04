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

  // State for managing the photo URL (either blob or server URL)
  const [photoUrl, setPhotoUrl] = useState(null);
  // State for storing the actual File object when uploading
  const [photoFile, setPhotoFile] = useState(null);
  const [userData, setUserData] = useState({
    userProfile: {},
    schoolProfile: {},
  });

  // Local state for tab
  const [value, setValue] = useState('1');

  useEffect(() => {
    if (user) {
      const transformedData = getUserProfileData(user);
      setPhotoUrl(transformedData.photo);
      setUserData({
        userProfile: transformedData.userProfile,
        schoolProfile: transformedData.schoolProfile,
      });
    }
  }, [user]);

  // Cleanup function
  const cleanupBlobUrl = (url) => {
    if (url?.startsWith('blob:')) {
      URL.revokeObjectURL(url);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupBlobUrl(photoUrl);
    };
  }, []);
  const handleProfileUpdate = async (newPhoto) => {
    try {
      // Handle photo removal
      if (newPhoto === null) {
        // Cleanup and set photo URL to null immediately
        cleanupBlobUrl(photoUrl);
        setPhotoUrl(null);
        setPhotoFile(null);
        return;
      }
  
      // Handle new photo upload (File object)
      if (newPhoto instanceof File) {
        cleanupBlobUrl(photoUrl);
        setPhotoFile(newPhoto);
        const newBlobUrl = URL.createObjectURL(newPhoto);
        setPhotoUrl(newBlobUrl);
      }
      // Handle server URL update
      else if (typeof newPhoto === 'string' && !newPhoto.startsWith('blob:')) {
        cleanupBlobUrl(photoUrl);
        setPhotoUrl(newPhoto);
        setPhotoFile(null);
      }
  
      // Only refetch if there's a need (e.g., after uploading a new photo)
      await refetch();
    } catch (error) {
      dispatch(
        setSnackbar({
          open: true,
          message: `Failed to update profile photo: ${error?.data?.message}`,
          severity: 'error',
        })
      );
    }
  };
  

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

  // const handleProfileUpdate = async (newPhoto) => {
  //   try {
  //     // Handle photo removal
  //     if (newPhoto === null) {
  //       if (tempBlobUrl) {
  //         URL.revokeObjectURL(tempBlobUrl);
  //         setTempBlobUrl(null);
  //       }
  //       setServerPhotoUrl(null);
  //       return;
  //     }

  //     // Handle new photo upload
  //     if (newPhoto instanceof File) {
  //       // Clean up existing blob URL if it exists
  //       if (tempBlobUrl) {
  //         URL.revokeObjectURL(tempBlobUrl);
  //       }
  //       // Create new blob URL
  //       const newBlobUrl = URL.createObjectURL(newPhoto);
  //       setTempBlobUrl(newBlobUrl);
  //     }
  //     // Handle server URL update after successful upload
  //     else if (typeof newPhoto === 'string' && newPhoto.startsWith('http')) {
  //       setServerPhotoUrl(newPhoto);
  //       // Clean up temp blob URL if it exists
  //       if (tempBlobUrl) {
  //         URL.revokeObjectURL(tempBlobUrl);
  //         setTempBlobUrl(null);
  //       }
  //     }

  //     await refetch();
  //   } catch (error) {
  //     dispatch(
  //       setSnackbar({
  //         open: true,
  //         message: `Failed to update profile photo: ${error?.data?.message}`,
  //         severity: 'error',
  //       })
  //     );
  //   }
  // };

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
            profilePhoto={photoUrl}
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

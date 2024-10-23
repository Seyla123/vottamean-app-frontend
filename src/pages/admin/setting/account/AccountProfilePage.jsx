// React and third-party libraries
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Tab, Box, Stack, Typography, Button } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Trash2, KeyRoundIcon, User, KeyRound } from 'lucide-react';

// Components
import FormComponent from '../../../../components/common/FormComponent';
import CardComponent from '../../../../components/common/CardComponent';
import CardInformation from '../../../../components/common/CardInformation';
import profile from '../../../../assets/images/default-profile.png';

// Redux hooks and API
import { useDispatch } from 'react-redux';
import { updateFormData } from '../../../../store/slices/formSlice';

import {
  useGetUserProfileQuery,
  useDeleteUserAccountMutation,
} from '../../../../services/userApi';

// User Profile Data formatting
import { getUserProfileData } from '../../../../utils/formatData';
import StyledButton from '../../../../components/common/StyledMuiButton';
import { StyledTab } from '../../../../components/common/StyledTabs';

/**
 * AccountProfilePage component displays and manages user account information,
 * allowing updates to user and school profiles, password changes, and account deletion.
 *
 * Key functionalities include:
 * - Fetching user data with {@link useGetUserProfileQuery}.
 * - Deleting the user account using {@link useDeleteUserAccountMutation}.
 * - Managing form state and tab switching for user and school information.
 *
 * @param {Object} userData - The current user's profile data, including personal and school information.
 * @param {Function} onUpdate - Callback to execute when the user updates their information.
 *
 * @returns {JSX.Element} The rendered AccountProfilePage component, including tabs for General
 * and Advanced settings, with relevant user information and actions.
 *
 * Dependencies: React, Redux, Material UI, react-router-dom, lucide-react.
 */

function AccountProfilePage() {
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

  // - When the user data is fetched, format the data and set the user data in the state
  useEffect(() => {
    if (user) {
      const transformedData = getUserProfileData(user);
      console.log(transformedData);
      setUserData(transformedData);
      dispatch(updateFormData(transformedData));
    }
  }, [user, dispatch]);

  // Handle tab switch
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Handle edit button click
  const clickEditUser = () => {
    navigate('/admin/settings/account/update-me');
  };

  // Handle edit school button click
  const clickEditSchool = () => {
    navigate('/admin/settings/account/update-school');
  };

  // Handle delete button click
  const clickDeleteAccount = async () => {
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
      title={'Account Profile'}
      subTitle={'These are user account information'}
    >
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <TabList onChange={handleChange} aria-label="Account tabs">
            <StyledTab
              label="General"
              value="1"
              icon={<User size={18} />}
              iconPosition="start"
            />
            <StyledTab
              label="Advanced"
              value="2"
              icon={<KeyRound size={18} />}
              iconPosition="start"
            />
          </TabList>

          {/* General tab */}
          <TabPanel value="1" sx={{ px: 0, py: 2 }}>
            <Stack direction={'column'} gap={2}>
              {/* User profile information */}
              <CardComponent
                title={'User Information'}
                imgUrl={userData.photo || profile}
                handleEdit={clickEditUser}
              >
                {/* Display user profile data */}
                <CardInformation data={userData.userProfile} />
              </CardComponent>

              {/* School information */}
              <CardComponent
                title={'School Information'}
                handleEdit={clickEditSchool}
              >
                {/* Display school data */}
                <CardInformation data={userData.schoolProfile} />
              </CardComponent>
            </Stack>
          </TabPanel>

          {/* Advanced tab */}
          <TabPanel value="2" sx={{ px: 0, py: 2 }}>
            <CardComponent title={'Login and Security'}>
              <Stack direction={'column'} gap={2}>
                {/* Change password */}
                <Stack
                  direction={{ xs: 'column', md: 'row' }}
                  gap={1}
                  justifyContent={{
                    xs: 'flex-start',
                    md: 'space-between',
                  }}
                  alignItems={{
                    xs: 'flex-start',
                    md: 'center',
                  }}
                >
                  <Box
                    display={'flex'}
                    alignContent={'center'}
                    justifyContent={'center'}
                  >
                    <Typography
                      variant="body1"
                      fontWeight={600}
                      textAlign="center"
                    >
                      Change Password
                    </Typography>
                  </Box>
                  <Link to="change-password" style={{ textDecoration: 'none' }}>
                    <StyledButton
                      variant="contained"
                      size="small"
                      startIcon={<KeyRoundIcon size={18} />}
                    >
                      Change Password
                    </StyledButton>
                  </Link>
                </Stack>

                {/* Delete account */}
                <Stack
                  direction={{ xs: 'column', md: 'row' }}
                  gap={1}
                  justifyContent={{
                    xs: 'flex-start',
                    md: 'space-between',
                  }}
                  alignItems={{
                    xs: 'flex-start',
                    md: 'center',
                  }}
                >
                  <Box
                    display={'flex'}
                    alignContent={'center'}
                    justifyContent={'center'}
                    flexDirection={'column'}
                  >
                    <Typography
                      variant="body1"
                      fontWeight={600}
                      textAlign="start"
                    >
                      Account Ownership
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      textAlign="start"
                      color="text.secondary"
                    >
                      Permanently delete your account from Vottamean service
                    </Typography>
                  </Box>
                  <StyledButton
                    variant="contained"
                    color="error"
                    onClick={clickDeleteAccount}
                    startIcon={<Trash2 size={18} />}
                    size="small"
                  >
                    Delete Account
                  </StyledButton>
                </Stack>
              </Stack>
            </CardComponent>
          </TabPanel>
        </TabContext>
      </Box>
    </FormComponent>
  );
}

export default AccountProfilePage;

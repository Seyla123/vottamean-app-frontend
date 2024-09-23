// React and third-party libraries
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Tab, Box, Stack, Typography, Button } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Trash2, KeyRoundIcon } from 'lucide-react';

// Components
import FormComponent from '../../../../components/common/FormComponent';
import CardComponent from '../../../../components/common/CardComponent';
import CardInformation from '../../../../components/common/CardInformation';
import profile from '../../../../assets/images/default-profile.png';

// Redux hooks and API
import { useDispatch } from 'react-redux';
import { updateFormData } from '../../../../store/slices/formSlice';

import { useLogoutMutation } from '../../../../services/authApi';

import {
  useGetUserProfileQuery,
  useDeleteUserAccountMutation,
} from '../../../../services/userApi';

// User Profile Data formatting
import { UserProfileData } from '../../../../utils/formatData';

function AccountProfilePage() {
  const [value, setValue] = useState('1');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux API calls to get user profile
  const { data: user, isLoading, error } = useGetUserProfileQuery();

  // Redux API calls to delete user and logout
  const [deleteUserAccount] = useDeleteUserAccountMutation();
  const [logout] = useLogoutMutation(); // Correct placement of the hook

  // Local state for transformed data
  const [userData, setUserData] = useState({
    userProfile: {},
    schoolProfile: {},
    img: '',
  });

  // Dispatch user data to form state
  useEffect(() => {
    if (user) {
      const transformedData = UserProfileData(user);
      console.log(transformedData);
      setUserData(transformedData); // Store transformed data locally
      dispatch(updateFormData(transformedData)); // Dispatch to form state
    }
  }, [user, dispatch]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const clickEdit = () => {
    navigate('/admin/settings/account/update-me');
  };
  const clickDeleteAccount = async () => {
    try {
      console.log('Deleting current user');
      await deleteUserAccount().unwrap();
      console.log('Account deleted successfully');

      navigate('/auth/login');
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
            <Tab label="General" value="1" />
            <Tab label="Advanced" value="2" />
          </TabList>

          {/* General tab */}
          <TabPanel value="1" sx={{ px: 0, py: 2 }}>
            <Stack direction={'column'} gap={2}>
              {/* User profile information */}
              <CardComponent
                title={'User Information'}
                imgUrl={userData.img || profile}
                handleEdit={clickEdit}
              >
                <CardInformation data={userData.userProfile} />
                {/* Display user profile data */}
              </CardComponent>

              {/* School information */}
              <CardComponent
                title={'School Information'}
                handleEdit={clickEdit}
              >
                <CardInformation data={userData.schoolProfile} />{' '}
                {/* Display school data */}
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
                    <Button
                      variant="contained"
                      startIcon={<KeyRoundIcon size={20} />}
                    >
                      Change Password
                    </Button>
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
                      Permanently delete your account from WaveTrack service
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={clickDeleteAccount}
                    startIcon={<Trash2 size={20} />}
                  >
                    Delete Account
                  </Button>
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

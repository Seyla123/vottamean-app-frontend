import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Tab, Box, Stack, Typography, Button } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import FormComponent from '../../../../components/common/FormComponent';
import CardComponent from '../../../../components/common/CardComponent';
import CardInformation from '../../../../components/common/CardInformation';
import profile from '../../../../assets/images/default-profile.png';
import { Trash2, KeyRoundIcon } from 'lucide-react';

// Redux hooks and API
import { useSelector, useDispatch } from 'react-redux';
import { updateFormData } from '../../../../store/slices/formSlice';
import {
  useGetUserProfileQuery,
  useDeleteUserAccountMutation,
} from '../../../../services/userApi';

function AccountProfilePage() {
  const [value, setValue] = useState('1');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch user_id from auth slice
  const user_id = useSelector((state) => state.auth.user?.user_id);
  const formData = useSelector((state) => state.form); // Access form data from Redux

  const { data: user, isLoading, error } = useGetUserProfileQuery(user_id);
  const [deleteUserAccount] = useDeleteUserAccountMutation();

  // Dispatch user data to form state
  useEffect(() => {
    if (user && user.data.adminProfile?.Info) {
      const info = user.data.adminProfile.Info;
      const school = user.data.adminProfile?.Schools[0] || {};

      dispatch(
        updateFormData({
          first_name: info.first_name,
          last_name: info.last_name,
          gender: info.gender,
          dob: info.dob,
          phone_number: info.phone_number,
          address: info.address || 'N/A',
          email: user.data.email,
          school_name: school.school_name,
          school_address: school.school_address,
          school_phone_number: school.school_phone_number,
        }),
      );
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
      await deleteUserAccount(user_id).unwrap();
      console.log('Account deleted successfully');
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

  const user_profile = {
    'Full Name': `${formData.first_name} ${formData.last_name}`,
    Age: formData.dob
      ? new Date().getFullYear() - new Date(formData.dob).getFullYear()
      : 'N/A',
    Gender: formData.gender,
    'Date of Birth': formData.dob
      ? new Date(formData.dob).toLocaleDateString()
      : 'N/A',
    Phone: formData.phone_number,
    Email: formData.email,
    Address: formData.address,
  };

  const school = {
    'School Name': formData.school_name,
    'Phone Number': formData.school_phone_number,
    Address: formData.school_address,
  };

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
                imgUrl={profile}
                handleEdit={clickEdit}
              >
                <CardInformation data={user_profile} />
              </CardComponent>

              {/* School information */}
              <CardComponent
                title={'School Information'}
                handleEdit={clickEdit}
              >
                <CardInformation data={school} />
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

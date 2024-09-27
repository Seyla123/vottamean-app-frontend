import React, { useState } from 'react';
import {
  Tab,
  Box,
  Stack,
  Typography,
  Button,
  Avatar,
  Divider,
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Trash2, KeyRound, School, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import FormComponent from '../../../components/common/FormComponent';
import CardComponent from '../../../components/common/CardComponent';
import CardInformation from '../../../components/common/CardInformation';

function TeacherAccountProfilePage() {
  const [value, setValue] = useState('1');
  const clickEdit = () => {
    console.log('edit');
  };
  const clickDeteleAccount = () => {
    console.log('delete account');
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const teacher = {
    Username: 'Sokha Sambath',
    Age: 22,
    Gender: 'Female',
    'Date of Birth': '05/12/1990',
    Phone: '0987654321',
    Email: 'sokhasambath@gmail.com',
    Address: 'Phnom Penh, Cambodia',
  };
  const school = {
    'School Name': 'Sambath High School',
    'Phone number': '023456789',
    Address: 'Phnom Penh, Cambodia',
  };
  return (
    <FormComponent
      title={'Account Profile'}
      subTitle={'Manage your account information and settings'}
    >
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <TabList onChange={handleChange} aria-label="Account tabs">
              <Tab
                label="General"
                value="1"
                icon={<User size={18} />}
                iconPosition="start"
              />
              <Tab
                label="Advanced"
                value="2"
                icon={<KeyRound size={18} />}
                iconPosition="start"
              />
            </TabList>
          </Box>
          {/* tab general */}
          <TabPanel value="1" sx={{ px: 0, py: 2 }}>
            <Stack direction={'column'} gap={4}>
              {/* user profile information */}
              <CardComponent
                title={'User Information'}
                icon={<User size={24} />}
                handleEdit={clickEdit}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar
                    src="https://plus.unsplash.com/premium_photo-1661942126259-fb08e7cce1e2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    sx={{ width: 80, height: 80, mr: 3 }}
                  />
                  <Typography variant="h6">{teacher.Username}</Typography>
                </Box>
                <CardInformation data={teacher} />
              </CardComponent>
              {/* school information */}
              <CardComponent
                title={'School Information'}
                icon={<School size={24} />}
                handleEdit={clickEdit}
              >
                <CardInformation data={school} />
              </CardComponent>
            </Stack>
          </TabPanel>
          {/* tap advanced */}
          <TabPanel value="2" sx={{ px: 0, py: 2 }}>
            <CardComponent
              title={'Login and Security'}
              icon={<KeyRound size={24} />}
            >
              <Stack direction={'column'} gap={3}>
                {/* change password */}
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Change Password
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    It's a good idea to use a strong password that you're not
                    using elsewhere
                  </Typography>
                  <Link
                    to="/change-password"
                    style={{ textDecoration: 'none' }}
                  >
                    <Button
                      variant="outlined"
                      startIcon={<KeyRound size={18} />}
                    >
                      Change Password
                    </Button>
                  </Link>
                </Box>
                <Divider />
                {/* delete account */}
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Account Ownership
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    Permanently delete your account from WaveTrack service
                  </Typography>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={clickDeteleAccount}
                    startIcon={<Trash2 size={18} />}
                  >
                    Delete Account
                  </Button>
                </Box>
              </Stack>
            </CardComponent>
          </TabPanel>
        </TabContext>
      </Box>
    </FormComponent>
  );
}

export default TeacherAccountProfilePage;

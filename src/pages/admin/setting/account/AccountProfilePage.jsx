import { Tab, Box, Stack, Typography, Button } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import FormComponent from '../../../../components/common/FormComponent';
import CardComponent from '../../../../components/common/CardComponent';
import CardInformation from '../../../../components/common/CardInformation';
import { useState } from 'react';
import { Link } from 'react-router-dom';
function AccountProfilePage() {
  const [value, setValue] = useState('1');
  const clickEdit = () => {
    console.log('edit')
  }
  const clickDeteleAccount = () => {
    console.log('delete account');

  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const teacher = {
    "Full Name ": "Potato Fried",
    "Age": 18,
    "Gender": "Male",
    "Date of Birth": "01/01/2001",
    "Phone": "01234567",
    "Email": "mrpotato123gmail.com",
    "Address": "Potato Chip City, FrenchFried Country",
  }
  const school = {
    "School Name": "Potato Fried",
    "school phone number" : "097029304",
    "School Address": "Potato Chip City, FrenchFried Country",
  }

  return (
    <FormComponent title={"Account Profile"} subTitle={"These are user account information"}>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <TabList onChange={handleChange} aria-label="Account tabs">
            <Tab label="General" value="1" />
            <Tab label="Advanced" value="2" />
          </TabList>
          {/* tab general */}
          <TabPanel value="1" sx={{px:0,py:2}}>
            <Stack direction={'column'} gap={2}>
              {/* user profile information */}
              <CardComponent
                title={"User Information"}
                imgUrl='r'
                handleEdit={clickEdit}>
                <CardInformation data={teacher} />
              </CardComponent>
              {/* school information */}
              <CardComponent
                title={"School Information"}
                handleEdit={clickEdit}>
                <CardInformation data={school} />
              </CardComponent>
            </Stack>
          </TabPanel>
          {/* tap advanced */}
          <TabPanel value="2" sx={{px:0,py:2}}>
              <CardComponent
                title={"Login and security"}>
                <Stack direction={'column'} gap={2}>
                  {/* change password */}
                    <Stack direction={{xs:'column',md:'row'}} gap={1} justifyContent={{xs:'flex-start',md:'space-between'}} alignItems={{xs:'flex-start',md:'center'}} >
                        <Box display={'flex'} alignContent={'center'} justifyContent={'center'}>
                        <Typography variant="body1" fontWeight={600} textAlign='center'>Change Password</Typography>
                        </Box>
                        <Link to='/change-password' style={{textDecoration:'none'}}>
                          <Button variant="contained" sx={{width:'170px'}}>Change Password</Button>
                        </Link>
                    </Stack>
                    {/* delete account */}
                    <Stack direction={{xs:'column',md:'row'}} gap={1} justifyContent={{xs:'flex-start',md:'space-between'}} alignItems={{xs:'flex-start',md:'center'}} >
                        <Box display={'flex'} alignContent={'center'} justifyContent={'center'} flexDirection={'column'}>
                          <Typography variant="body1" fontWeight={600} textAlign='start'>Account ownership</Typography>
                          <Typography variant="subtitle1" textAlign='start' color='text.secondary'>Permanently delete your account from WaveTrack service</Typography>
                        </Box>
                        <Button variant="contained" color='error' onClick={clickDeteleAccount} sx={{minWidth:'170px'}}>Delete Account</Button>
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
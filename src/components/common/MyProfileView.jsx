import React from 'react';
import {
  Box,
  Typography,
  Button,
  Avatar,
  Grid,
  IconButton,
  Chip,
  Divider,
} from '@mui/material';

import {
  PencilLine as EditIcon,
  Mail as EmailIcon,
  Phone as PhoneIcon,
  Home as HomeIcon,
  User2 as PersonIcon,
  Cake as CakeIcon,
  School as SchoolIcon,
  IdCard as IdCardIcon,
} from 'lucide-react';

const MyProfileView = ({
  title,
  adminProfileData,
  schoolProfileData,
  handleEditUser,
}) => {
  const userName = `${adminProfileData.first_name} ${adminProfileData.last_name}`;
  const userEmail = adminProfileData.email;
  const userPhoto = adminProfileData.photo || '/api/placeholder/150/150';
  const userPhoneNumber = adminProfileData.phone_number || 'Not provided';
  const userAddress = adminProfileData.address || 'Not provided';
  const userGender = adminProfileData.gender || 'Not specified';
  const userId = adminProfileData.info_id || 'N/A';
  const userDOB = adminProfileData.dob || 'Not provided';

  const schoolName = schoolProfileData?.school_name || 'Not provided';
  const schoolAddress = schoolProfileData?.school_address || 'Not provided';
  const schoolPhoneNumber =
    schoolProfileData?.school_phone_number || 'Not provided';
  const schoolId = schoolProfileData?.school_id || 'N/A';

  return (
    <Box sx={{ margin: 'auto', p: 2 }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1" fontWeight="bold">
          {title}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          onClick={handleEditUser}
          sx={{ textTransform: 'none' }}
        >
          Edit Profile
        </Button>
      </Box>

      <Grid container spacing={4}>
        {/* Profile Section */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              border: '1px solid #e0e0e0',
              borderRadius: 2,
              p: 3,
              textAlign: 'center',
            }}
          >
            <Avatar
              src={userPhoto}
              sx={{ width: 120, height: 120, margin: 'auto', mb: 2 }}
            />
            <Typography variant="h5" gutterBottom>
              {userName}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {userEmail}
            </Typography>
            <Chip
              label={`ID: ${userId}`}
              variant="outlined"
              size="small"
              sx={{ mt: 1 }}
            />
          </Box>
        </Grid>

        {/* Personal Information */}
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              border: '1px solid #e0e0e0',
              borderRadius: 2,
              p: 3,
              height: '100%',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={3}>
              <InfoItem
                icon={<PhoneIcon />}
                label="Phone"
                value={userPhoneNumber}
              />
              <InfoItem
                icon={<HomeIcon />}
                label="Address"
                value={userAddress}
              />
              <InfoItem
                icon={<PersonIcon />}
                label="Gender"
                value={userGender}
              />
              <InfoItem
                icon={<CakeIcon />}
                label="Date of Birth"
                value={userDOB}
              />
            </Grid>
          </Box>
        </Grid>

        {/* School Information */}
        <Grid item xs={12}>
          <Box
            sx={{ border: '1px solid #e0e0e0', borderRadius: 2, p: 3, mt: 4 }}
          >
            <Typography variant="h6" gutterBottom>
              School Information
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={3}>
              <InfoItem
                icon={<SchoolIcon />}
                label="School Name"
                value={schoolName}
              />
              <InfoItem
                icon={<HomeIcon />}
                label="School Address"
                value={schoolAddress}
              />
              <InfoItem
                icon={<PhoneIcon />}
                label="School Phone"
                value={schoolPhoneNumber}
              />
              <InfoItem
                icon={<IdCardIcon />}
                label="School ID"
                value={schoolId}
              />
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <Grid item xs={12} sm={6}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Box
        sx={{
          width: 40,
          height: 40,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'primary.main',
          borderRadius: 2,
          color: 'white',
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="body1">{value}</Typography>
      </Box>
    </Box>
  </Grid>
);

export default MyProfileView;

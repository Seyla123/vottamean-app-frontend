import React, { useState } from 'react';
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
import RandomAvatar from '../common/RandomAvatar';
import EditAccountModal from '../admin/EditAccountModal';
import EditSchoolModal from '../admin/EditSchoolModal';

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
  profilePhoto,
  adminProfileData,
  schoolProfileData,
  handleEditSchool,
  handleEditUser,
}) => {
  const [openModal, setOpenModal] = useState(null);

  const handleOpenModal = (modalType) => {
    setOpenModal(modalType);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
  };

  const handleSaveUserData = (newData) => {
    if (handleEditUser) {
      handleEditUser(newData);
    }
    handleCloseModal();
  };

  const handleSaveSchoolData = (newData) => {
    if (handleEditSchool) {
      handleEditSchool(newData);
    }
    handleCloseModal();
  };

  const {
    userName,
    userEmail,
    userPhoneNumber,
    userAddress,
    userGender,
    userId,
    userDOB,
  } = adminProfileData;
  const { schoolName, schoolAddress, schoolPhoneNumber, schoolId } =
    schoolProfileData;

  return (
    <Box
      component={'section'}
      sx={{
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        height: '100%',
      }}
    >
      {/* Header */}

      <Typography variant="h5" component="h5" fontWeight="bold">
        {title}
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Section */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              border: '1px solid #e0e0e0',
              borderRadius: 2,
              p: 2,
              textAlign: 'center',
            }}
          >
            <Avatar
              src={profilePhoto}
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
              p: 2,
              height: '100%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              <Button
                variant="outlined"
                startIcon={<EditIcon size={20} />}
                onClick={() => handleOpenModal('account')}
              >
                Edit
              </Button>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={3}>
              <InfoItem
                icon={<PhoneIcon size={20} />}
                label="Contact"
                value={userPhoneNumber}
              />
              <InfoItem
                icon={<HomeIcon size={20} />}
                label="Address"
                value={userAddress}
              />
              <InfoItem
                icon={<PersonIcon size={20} />}
                label="Gender"
                value={userGender}
              />
              <InfoItem
                icon={<CakeIcon size={20} />}
                label="Date of Birth"
                value={userDOB}
              />
            </Grid>
          </Box>
        </Grid>

        {/* School Information */}
        <Grid item xs={12}>
          <Box sx={{ border: '1px solid #e0e0e0', borderRadius: 2, p: 2 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: { xs: 'column', sm: 'row' },
              }}
            >
              <Typography variant="h6" gutterBottom>
                School Information
              </Typography>
              <Button
                variant="outlined"
                startIcon={<EditIcon size={20} />}
                onClick={() => handleOpenModal('school')}
              >
                Edit
              </Button>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={3}>
              <InfoItem
                icon={<SchoolIcon size={20} />}
                label="School Name"
                value={schoolName}
              />
              <InfoItem
                icon={<HomeIcon size={20} />}
                label="School Address"
                value={schoolAddress}
              />
              <InfoItem
                icon={<PhoneIcon size={20} />}
                label="School Contact"
                value={schoolPhoneNumber}
              />
              <InfoItem
                icon={<IdCardIcon size={20} />}
                label="School ID"
                value={schoolId}
              />
            </Grid>
          </Box>
        </Grid>
      </Grid>

      {/* Modals */}
      {openModal === 'account' && (
        <EditAccountModal open={true} onClose={handleCloseModal} />
      )}
      {openModal === 'school' && (
        <EditSchoolModal open={true} onClose={handleCloseModal} />
      )}
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
          border: 1,
          borderRadius: 2,
          // backgroundColor: 'primary.main',
          borderColor: 'divider',
          color: 'primary.main',
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

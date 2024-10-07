import React, { useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import ProfileSection from './ProfileSection';
import InformationSection from './InformationSection';
import EditAccountModal from '../admin/EditAccountModal';
import EditSchoolModal from '../admin/EditSchoolModal';

const MyProfileView = ({
  title,
  profilePhoto,
  userData,
  schoolProfileData,
}) => {
  const [openModal, setOpenModal] = useState(null);
  const handleOpenModal = (modalType) => {
    setOpenModal(modalType);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
  };

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
      <Typography variant="h5" component="h5" fontWeight="bold">
        {title}
      </Typography>

      <Grid container spacing={3}>
        <ProfileSection profilePhoto={profilePhoto} userData={userData} />
        <InformationSection
          title="Personal Information"
          data={userData}
          onEdit={() => handleOpenModal('account')}
          infoType="personal"
        />
        {schoolProfileData && (
          <InformationSection
            title="School Information"
            data={schoolProfileData}
            onEdit={() => handleOpenModal('school')}
            infoType="school"
          />
        )}
      </Grid>

      {/* Modals */}
      {openModal === 'account' && (
        <EditAccountModal
          open={true}
          onClose={handleCloseModal}
          profilePhoto={profilePhoto}
          userName={userData.userName}
          userGender={userData.userGender}
        />
      )}
      {openModal === 'school' && schoolProfileData && (
        <EditSchoolModal open={true} onClose={handleCloseModal} />
      )}
    </Box>
  );
};

export default MyProfileView;

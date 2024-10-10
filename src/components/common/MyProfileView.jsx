import React, { useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import ProfileSection from './ProfileSection';
import InformationSection from './InformationSection';
import EditAccountModal from '../admin/EditAccountModal';
import EditSchoolModal from '../admin/EditSchoolModal';
import { grey } from '@mui/material/colors';

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

  const checkUserRole = userData?.userRole;

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
        <Grid item xs={12} sm={12} md={6}>
          <ProfileSection profilePhoto={profilePhoto} userData={userData} />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box
            sx={{
              height: 1,
              borderRadius: 2,
              p: 3,
              backgroundColor: grey[200],
            }}
          >
            Payment Methods ACELEDA ABA
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <InformationSection
            title="Personal Details"
            data={userData}
            onEdit={() => handleOpenModal('account')}
            infoType="personal"
            disableEdit={true}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          {schoolProfileData && (
            <InformationSection
              title="School Details"
              data={schoolProfileData}
              onEdit={() => handleOpenModal('school')}
              infoType="school"
              disableEdit={false}
            />
          )}
        </Grid>
      </Grid>

      {/* MODAL */}
      {openModal === 'account' && (
        <EditAccountModal
          open={true}
          onClose={handleCloseModal}
          profilePhoto={profilePhoto}
          userName={userData.userName}
          userGender={userData.userGender}
          checkUserRole={checkUserRole}
        />
      )}
      {openModal === 'school' && schoolProfileData && (
        <EditSchoolModal open={true} onClose={handleCloseModal} />
      )}
    </Box>
  );
};

export default MyProfileView;

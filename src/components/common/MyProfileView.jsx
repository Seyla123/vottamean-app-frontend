import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import ProfileSection from './ProfileSection';
import InformationSection from './InformationSection';
import EditAccountModal from '../admin/EditAccountModal';
import EditSchoolModal from '../admin/EditSchoolModal';
import SectionTitle from './SectionTitle';

const MyProfileView = ({ profilePhoto, userData, schoolProfileData }) => {
  const [openModal, setOpenModal] = useState(null);
  const handleOpenModal = (modalType) => {
    setOpenModal(modalType);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
  };

  const checkUserRole = userData?.userRole;

  console.log(userData);
  return (
    <Box
      component={'section'}
      sx={{
        margin: 'auto',
        height: '100%',
      }}
    >
      <SectionTitle
        title={'My Profile'}
        subtitle={'Manage your profile settings'}
      />
      {/* CONTAINER */}
      <Grid container>
        {/* <Grid item xs={12}>
          <ProfileSection profilePhoto={profilePhoto} userData={userData} />
        </Grid> */}
        <Grid item xs={12}>
          <InformationSection
            title="Personal Details"
            data={userData}
            onEdit={() => handleOpenModal('account')}
            infoType="personal"
            disableEdit={true}
            profilePhoto={profilePhoto}
            userData={userData}
          />
          {schoolProfileData && (
            <InformationSection
              title="School Details"
              data={schoolProfileData}
              onEdit={() => handleOpenModal('school')}
              infoType="school"
              disableEdit={checkUserRole !== 'teacher'}
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

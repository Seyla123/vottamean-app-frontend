// React library
import React, { useState, useEffect } from 'react';

// Mui
import { Card, Grid } from '@mui/material';

// Custom Components
import InformationSection from './InformationSection';
import EditAccountModal from '../admin/EditAccountModal';
import EditSchoolModal from '../admin/EditSchoolModal';
import SectionTitle from './SectionTitle';
import { shadow } from '../../styles/global';

const MyProfileView = ({ profilePhoto, userData, schoolProfileData }) => {
  // - State to keep track of the open modal type
  const [openModal, setOpenModal] = useState(null);

  // - State to keep track of the current profile photo
  const [currentProfilePhoto, setCurrentProfilePhoto] = useState(profilePhoto);

  // - Update the current profile photo when it is updated
  const handleProfilePhotoUpdate = (newPhoto) => {
    setCurrentProfilePhoto(newPhoto);
  };

  // - Update the current profile photo when the profile photo changes
  useEffect(() => {
    setCurrentProfilePhoto(profilePhoto);
  }, [profilePhoto]);

  // - Open the modal of the corresponding type
  const handleOpenModal = (modalType) => {
    setOpenModal(modalType);
  };

  // - Close the modal
  const handleCloseModal = () => {
    setOpenModal(null);
  };

  // - Check the user's role
  const checkUserRole = userData?.userRole;

  return (
    <Card
      component={'section'}
      sx={{
        boxShadow: shadow,
        p: { xs: 2, sm: 3 },
        margin: 'auto',
        height: '100%',
      }}
    >
      {/* TITLE */}
      <SectionTitle
        title={'My Profile'}
        subtitle={'Manage your profile settings'}
      />
      {/* PROFILE INFORMATION */}
      <Grid container>
        <Grid item xs={12}>
          {/* Personal and School Information */} 
          <InformationSection
            title="Personal Details"
            data={userData}
            onEdit={() => handleOpenModal('account')}
            infoType="personal"
            disableEdit={true}
            profilePhoto={currentProfilePhoto}
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
      {/* EDIT PERSONAL INFORMATION MODALS */}
      {openModal === 'account' && (
        <EditAccountModal
          open={true}
          onClose={handleCloseModal}
          profilePhoto={currentProfilePhoto}
          userName={userData.userName}
          userGender={userData.userGender}
          checkUserRole={checkUserRole}
          onPhotoUpdate={handleProfilePhotoUpdate}
        />
      )}
      {/* EDIT SCHOOL MODAL */}
      {openModal === 'school' && schoolProfileData && (
        <EditSchoolModal open={true} onClose={handleCloseModal} />
      )}
    </Card>
  );
};

export default MyProfileView;

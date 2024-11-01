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
import { getUserProfileData } from '../../utils/formatData';

const MyProfileView = ({
  profilePhoto,
  userData,
  schoolProfileData,
  onProfileUpdate,
}) => {
  console.log(profilePhoto)
  // - State to keep track of the open modal type
  const [openModal, setOpenModal] = useState(null);

  // - State to keep track of the current profile photo
  const [currentProfilePhoto, setCurrentProfilePhoto] = useState(profilePhoto);

  // Add state to track if photo was removed
  const [isPhotoRemoved, setIsPhotoRemoved] = useState(false);

  // // Update local state when profile photo changes
  // useEffect(() => {
  //   setCurrentProfilePhoto(profilePhoto);
  //   setIsPhotoRemoved(!profilePhoto);
  // }, [profilePhoto]);

  // // Clean up blob URLs when component unmounts
  // useEffect(() => {
  //   return () => {
  //     if (currentProfilePhoto && currentProfilePhoto.startsWith('blob:')) {
  //       URL.revokeObjectURL(currentProfilePhoto);
  //     }
  //   };
  // }, []);

  // const handleProfilePhotoUpdate = async (newPhoto, removed) => {
  //   // If there's an existing blob URL, revoke it
  //   if (currentProfilePhoto && currentProfilePhoto.startsWith('blob:')) {
  //     URL.revokeObjectURL(currentProfilePhoto);
  //   }
  //   console.log("new photo", newPhoto)
  //   setCurrentProfilePhoto(removed ? null : newPhoto);
  //   setIsPhotoRemoved(removed);

  //   if (onProfileUpdate) {
  //     await onProfileUpdate();
  //   }
  // };

  // const handleCloseModal = async () => {
  //   setOpenModal(null);
  //   // Always refresh data when modal closes
  //   if (onProfileUpdate) {
  //     await onProfileUpdate();
  //   }
  // };
  // // Instead of calling getUserProfileData as an async function
  // useEffect(() => {
  //   // Ensure userData is available and pass it to getUserProfileData
  //   if (userData) {
  //     const profileData = getUserProfileData(userData);
  //     console.log(first)
  //     setCurrentProfilePhoto(profileData.photo);
  //   }
  // }, [userData]);

  
  // Update local state when profile photo prop changes
  useEffect(() => {
    if (profilePhoto !== currentProfilePhoto) {
      setCurrentProfilePhoto(profilePhoto);
      setIsPhotoRemoved(!profilePhoto);
    }
  }, [profilePhoto]);

  // Cleanup blob URLs
  useEffect(() => {
    return () => {
      if (currentProfilePhoto && currentProfilePhoto.startsWith('blob:')) {
        URL.revokeObjectURL(currentProfilePhoto);
      }
    };
  }, [currentProfilePhoto]);

  const handleProfilePhotoUpdate = async (newPhoto, removed) => {
    // Clean up existing blob URL
    if (currentProfilePhoto && currentProfilePhoto.startsWith('blob:')) {
      URL.revokeObjectURL(currentProfilePhoto);
    }

    const photoToUse = removed ? null : newPhoto;
    setCurrentProfilePhoto(photoToUse);
    setIsPhotoRemoved(removed);

    if (onProfileUpdate) {
      await onProfileUpdate(photoToUse);
    }
  };

  const handleCloseModal = async () => {
    setOpenModal(null);
    if (onProfileUpdate) {
      await onProfileUpdate();
    }
  };

  const handleOpenModal = (modalType) => {
    setOpenModal(modalType);
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
          isPhotoRemoved={isPhotoRemoved}
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

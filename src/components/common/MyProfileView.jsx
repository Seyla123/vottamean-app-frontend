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
  console.log(profilePhoto);

  // - State to keep track of the open modal type
  const [openModal, setOpenModal] = useState(null);

  // - State to keep track of the current profile photo
  const [currentProfilePhoto, setCurrentProfilePhoto] = useState(profilePhoto);

  // Add state to track if photo was removed
  const [isPhotoRemoved, setIsPhotoRemoved] = useState(false);

  console.log(currentProfilePhoto);
  // Update currentProfilePhoto when profilePhoto prop changes
  useEffect(() => {
    if (profilePhoto !== currentProfilePhoto) {
      setCurrentProfilePhoto(profilePhoto);
      setIsPhotoRemoved(!profilePhoto);
    }
  }, [profilePhoto, currentProfilePhoto]);
  // useEffect(() => {
  //   // Only update if we have a new photo and it's different from current
  //   if (profilePhoto !== currentProfilePhoto) {
  //     // If current photo is a blob URL, revoke it
  //     if (currentProfilePhoto?.startsWith('blob:')) {
  //       URL.revokeObjectURL(currentProfilePhoto);
  //     }

  //     setCurrentProfilePhoto(profilePhoto);
  //     setIsPhotoRemoved(!profilePhoto);
  //   }
  // }, [profilePhoto]);

  const handleProfilePhotoUpdate = async (newPhoto) => {
    try {
      if (onProfileUpdate) {
        // Pass the actual File object or null, not the blob URL
        await onProfileUpdate(newPhoto);
      }
    } catch (error) {
      console.error('Error updating profile photo:', error);
    }
  };
  // // Cleanup effect
  // useEffect(() => {
  //   return () => {
  //     if (currentProfilePhoto?.startsWith('blob:')) {
  //       URL.revokeObjectURL(currentProfilePhoto);
  //     }
  //   };
  // }, [currentProfilePhoto]);

  // const handleProfilePhotoUpdate = async (newPhoto, removed) => {
  //   // Clean up existing blob URL if it exists
  //   if (currentProfilePhoto && currentProfilePhoto.startsWith('blob:')) {
  //     URL.revokeObjectURL(currentProfilePhoto);
  //   }

  //   let photoToUse = null;

  //   if (!removed && newPhoto instanceof File) {
  //     // Create object URL only if newPhoto is a valid File or Blob
  //     photoToUse = URL.createObjectURL(newPhoto);
  //   }

  //   setCurrentProfilePhoto(photoToUse);
  //   setIsPhotoRemoved(removed);

  //   if (onProfileUpdate) {
  //     await onProfileUpdate(photoToUse);
  //   }
  // };
  // MyProfileView.jsx

  // const handleProfilePhotoUpdate = async (newPhoto) => {
  //   // When removing photo
  //   if (newPhoto === null || newPhoto === '') {
  //     setCurrentProfilePhoto(null);
  //     setIsPhotoRemoved(true);
  //     if (onProfileUpdate) {
  //       await onProfileUpdate(null);
  //     }
  //     return;
  //   }

  //   // When adding/changing photo
  //   if (newPhoto) {
  //     // If it's a URL string (from S3), use it directly
  //     if (typeof newPhoto === 'string') {
  //       setCurrentProfilePhoto(newPhoto);
  //       setIsPhotoRemoved(false);
  //     }
  //     // If it's a blob URL, use it temporarily
  //     else if (newPhoto.startsWith('blob:')) {
  //       setCurrentProfilePhoto(newPhoto);
  //       setIsPhotoRemoved(false);
  //     }

  //     if (onProfileUpdate) {
  //       await onProfileUpdate(newPhoto);
  //     }
  //   }
  // };

  // const handleProfilePhotoUpdate = async (newPhoto) => {
  //   // newPhoto can be:
  //   // - null (for removal)
  //   // - File object (for new uploads)
  //   // - string (for existing URLs)
  //   try {
  //     if (onProfileUpdate) {
  //       await onProfileUpdate(newPhoto);
  //     }
  //   } catch (error) {
  //     console.error('Error updating profile photo:', error);
  //   }
  // };
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

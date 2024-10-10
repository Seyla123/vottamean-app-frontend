import React, { useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import ProfileSection from './ProfileSection';
import InformationSection from './InformationSection';
import EditAccountModal from '../admin/EditAccountModal';
import EditSchoolModal from '../admin/EditSchoolModal';
import { grey } from '@mui/material/colors';
import AlertCard from './AlertCard';
import { BadgeCheck } from 'lucide-react';
import personalImage from '../../assets/images/personal-data-88.svg';
import accountImage from '../../assets/images/security-tab-image.svg';
import AccountSettingInfoCard from './AccountSettingInfoCard';

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
        height: '100%',
      }}
    >
      <Typography variant="h5" component="h5" fontWeight="bold" gutterBottom>
        {title}
      </Typography>
      {/* CONTAINER */}
      <Grid container>
        <Grid item xs={8}>
          {checkUserRole === 'admin' ? (
            <AlertCard
              title="Administrator Dashboard"
              description="As an administrator, you have comprehensive access to manage user accounts, modify system settings, and oversee content distribution. This feature allows you to maintain and improve the platform, ensuring smooth operation and an optimal user experience."
              icon={<BadgeCheck size={18} />}
            />
          ) : (
            <AlertCard
              title="Educator Control Panel"
              description="As a teacher, you can access course management tools, track student progress, and customize learning materials. This feature enables you to create engaging and effective learning environments tailored to your student's needs."
              icon={<BadgeCheck size={18} />}
            />
          )}
        </Grid>

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

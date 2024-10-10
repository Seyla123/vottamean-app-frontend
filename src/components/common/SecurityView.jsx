import React, { useState } from 'react';
import { Typography, Box } from '@mui/material';
import StyledButton from './StyledMuiButton';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import ChangePasswordForm from '../../pages/admin/setting/account/ChangePasswordForm';
import { Info } from 'lucide-react';

// Image and Icon
import { Lock, Trash2 } from 'lucide-react';
import AlertCard from './AlertCard';

const SecurityView = ({ title, handleDeleteAccount }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);

  const handleDeleteModal = () => {
    handleDeleteAccount();
    setIsDeleteModalOpen(false);
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
      <Typography variant="h5" component="h5" fontWeight="bold" gutterBottom>
        {title}
      </Typography>
      <AlertCard
        title={'Password Change Required'}
        description={
          'For your security, you need to change your password. Please ensure your new password is strong and not used on any other site.'
        }
        severity="info"
        icon={<Info size={18} />}
      />
      {/* CHANGE ACCOUNT SECTION */}
      <Box
        component={'div'}
        sx={{
          border: '1px solid #e0e0e0',
          borderRadius: 2,
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          alignItems: 'start',
        }}
      >
        <Box component={'div'}>
          <Typography variant="h6" gutterBottom>
            Change your password
          </Typography>
          <Typography variant="body1">
            For security reasons, we recommend changing your password regularly.
          </Typography>
        </Box>
        <StyledButton
          size="small"
          variant="outlined"
          startIcon={<Lock size={18} />}
          onClick={() => setIsChangePasswordModalOpen(true)}
        >
          Change password
        </StyledButton>
      </Box>

      {/* DELETE ACCOUNT SECTION */}
      <Box
        component={'div'}
        sx={{
          border: '1px solid #e0e0e0',
          borderRadius: 2,
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          alignItems: 'start',
        }}
      >
        <Box component={'div'}>
          <Typography variant="h6" gutterBottom>
            Delete your account
          </Typography>
          <Typography variant="body1">
            Deleting your account will remove all your data permanently. This
            action cannot be undone.
          </Typography>
        </Box>
        <StyledButton
          size="small"
          variant="outlined"
          startIcon={<Trash2 size={18} />}
          color="error"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          Delete account
        </StyledButton>
      </Box>

      {/* DELETE CONFIRMATION MODAL */}
      <DeleteConfirmationModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteModal}
        itemName="Your account"
      />

      {/* CHANGE PASSWORD MODAL */}
      <ChangePasswordForm
        open={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
      />
    </Box>
  );
};

export default SecurityView;

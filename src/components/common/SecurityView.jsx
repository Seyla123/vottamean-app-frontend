import React, { useState } from 'react';
import { Typography, Box, Button, Card } from '@mui/material';
import StyledButton from './StyledMuiButton';
import DeleteConfirmationModal from './DeleteConfirmationModal';

// Image and Icon
import { Lock, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const SecurityView = ({ title, handleDeleteAccount }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteModal = () => {
    handleDeleteAccount();
    setIsOpen(false);
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
      {/* HEADER */}
      <Typography variant="h5" component="h5" fontWeight="bold">
        {title}
      </Typography>

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
          <Typography variant="h6">Change your password</Typography>
          <Typography variant="body1">
            For security reasons, we recommend changing your password regularly.
          </Typography>
        </Box>
        <Link to={'change-password'}>
          <StyledButton variant="outlined" startIcon={<Lock size={20} />}>
            Change password
          </StyledButton>
        </Link>
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
          <Typography variant="h6">Delete your account</Typography>
          <Typography variant="body1">
            Deleting your account will remove all your data permanently. This
            action cannot be undone.
          </Typography>
        </Box>
        <StyledButton
          variant="outlined"
          startIcon={<Trash2 size={20} />}
          color="error"
          onClick={() => setIsOpen(true)}
        >
          Delete account
        </StyledButton>
      </Box>

      {/* DELETE CONFIRMATION MODAL */}
      <DeleteConfirmationModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleDeleteModal}
        itemName="Your account"
      />
    </Box>
  );
};

export default SecurityView;

import React, { useState } from 'react';
import { Typography, Box, Button, Card } from '@mui/material';
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
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      {/* HEADER */}
      <Typography variant="h4" component="h1" fontWeight="bold" sx={{ mb: 4 }}>
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
          <Button variant="outlined" startIcon={<Lock size={20} />}>
            Change password
          </Button>
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
        <Button
          variant="outlined"
          startIcon={<Trash2 size={20} />}
          color="error"
          onClick={() => setIsOpen(true)}
        >
          Delete account
        </Button>
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

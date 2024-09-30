import React, { useState } from 'react';
import {
  Modal,
  Box,
  TextField,
  Button,
  Avatar,
  Typography,
  IconButton,
} from '@mui/material';
import { Edit as EditIcon } from 'lucide-react';

const EditAccountModal = ({ open, onClose, onSave, initialData }) => {
  const [firstName, setFirstName] = useState(initialData.firstName || '');
  const [lastName, setLastName] = useState(initialData.lastName || '');
  const [profileImage, setProfileImage] = useState(
    initialData.profileImage || '',
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ firstName, lastName, profileImage });
    onClose();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Edit Account
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ position: 'relative' }}>
              <Avatar src={profileImage} sx={{ width: 100, height: 100 }} />
              <input
                accept="image/*"
                type="file"
                id="icon-button-file"
                style={{ display: 'none' }}
                onChange={handleImageUpload}
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  aria-label="upload picture"
                  component="span"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    bgcolor: 'background.paper',
                  }}
                >
                  <EditIcon />
                </IconButton>
              </label>
            </Box>
          </Box>
          <TextField
            fullWidth
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Save Changes
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default EditAccountModal;

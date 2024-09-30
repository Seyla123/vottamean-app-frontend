import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  TextField,
  Button,
  Avatar,
  Typography,
  IconButton,
} from '@mui/material';
import { Edit as EditIcon } from 'lucide-react';

const EditAccountModal = ({ open, onClose, onSave, initialData }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    if (open) {
      setFirstName(initialData.firstName || '');
      setLastName(initialData.lastName || '');
      setProfileImage(initialData.profileImage || '');
    }
  }, [open, initialData]);

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
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Account</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditAccountModal;

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

const EditAccountModal = () => {
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
  
  return <div>EditAccountModal</div>;
};

export default EditAccountModal;

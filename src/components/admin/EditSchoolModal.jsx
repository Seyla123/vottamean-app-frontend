// React and third-party libraries
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Redux Hooks and APIs


// Material UI components
import { Box, Modal } from '@mui/material';

const EditSchoolModal = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          maxWidth: '800px',
          width: '100%',
          transform: 'translate(-50%, -50%)',
          maxHeight: { xs: '100%', sm: '100%' },
          overflowY: 'auto',
          bgcolor: 'background.paper',
          p: 4,
          borderRadius: 2,
        }}
      >
        Edit shcool
      </Box>
    </Modal>
  );
};

export default EditSchoolModal;

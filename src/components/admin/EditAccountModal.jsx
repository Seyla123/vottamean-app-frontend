import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// MUI Components
import {
  Modal,
  Box,
  TextField,
  Button,
  Avatar,
  Typography,
  IconButton,
  Fade,
  Backdrop,
} from '@mui/material';

// Redux Hooks and APIs
import {
  useUpdateUserProfileMutation,
  useGetUserProfileQuery,
} from '../../services/userApi';

// Formatted Data
import { getUserProfileUpdateData } from '../../utils/formatData';

//  User Profile Validator
import { UserProfileValidator } from '../../validators/validationSchemas';

// UI Slice for snackbar
import { setSnackbar } from '../../store/slices/uiSlice';


const EditAccountModal = ({ open, onClose, onSave, dataToEdit }) => {
  return <div>EditAccountModal</div>;
};

export default EditAccountModal;

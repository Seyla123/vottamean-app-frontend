import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Material UI components
import {
  Stack,
  Button,
  TextField,
  CircularProgress,
  Typography,
} from '@mui/material';

// Redux Hooks and APIs
import {
  useUpdateUserProfileMutation,
  useGetUserProfileQuery,
} from '../../services/userApi';
import { useDispatch } from 'react-redux';

// - School formatted Data and Validator
import { getSchoolData } from '../../utils/formatData';
import { SchoolValidator } from '../../validators/validationSchemas';

// - Ui Slice for snackbar
import { setSnackbar } from '../../store/slices/uiSlice';

const EditSchoolModal = () => {
  return <div>EditSchoolModal</div>;
};

export default EditSchoolModal;

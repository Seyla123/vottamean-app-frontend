import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Box,
  TextField,
  Typography,
  Tab,
  Stack,
  Tabs,
  Avatar,
} from '@mui/material';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import userProfile from '../../../assets/images/default-profile.png';
import SelectField from '../../../components/common/SelectField';
import LoadingCircle from '../../../components/loading/LoadingCircle';
import FormComponent from '../../../components/common/FormComponent';
import CardComponent from '../../../components/common/CardComponent';
import ButtonContainer from '../../../components/common/ButtonContainer';

import { useGetClassesDataQuery } from '../../../services/classApi';

import { useCreateStudentMutation } from '../../../services/studentApi';

import { setSnackbar } from '../../../store/slices/uiSlice';

function StudentCreatePage() {
  return <div>StudentCreatePage</div>;
}

export default StudentCreatePage;

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import SomethingWentWrong from './SomethingWentWrong';
import LoadingCircle from '../loading/LoadingCircle';

// - Material UI Components
import { MenuItem, Box, Typography, Select, Button } from '@mui/material';
import { UserRoundPen } from 'lucide-react';

// - Custom Components
import DOBPicker from './DOBPicker';
import PhoneInputField from './PhoneInputField';
import InputField from './InputField';
import GenderSelect from './GenderSelect';
import StyledButton from './StyledMuiButton';
import SubHeader from '../teacher/SubHeader';

// - Redux Slices and APIs
import { useGetClassesByIdQuery } from '../../services/classApi';
import { updateFormData } from '../../store/slices/studentSlice';

// - Validation Schema
import { StudentValidator } from '../../validators/validationSchemas';

import { useNavigate } from 'react-router-dom';

const CreateStudentPandel = ({ handleFormChange }) => {
  return <div>Hello</div>;
};

export default CreateStudentPandel;

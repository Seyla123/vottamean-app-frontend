import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Stack,
  Tabs,
  Tab,
  useMediaQuery,
  Typography,
  Grid,
} from '@mui/material';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { useUpdateStudentMutation } from '../../../services/studentApi';
import StyledButton from '../../../components/common/StyledMuiButton' ; 

import StudentUpdateForm from '../../../components/student/StudentUpdateForm';
import GuardianUpdateForm from '../../../components/student/GuardianUpdateForm';
import UpdateStudentForm from '../../../components/student/UpdateStudentForm';

// Define TabPanel component
const TabPanel = ({ children, value, index }) => {
  return value === index ? <Box>{children}</Box> : null;
};

const StudentUpdatePage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Dispatch the action to update the form data
  const dispatch = useDispatch();

  // State variable to keep track of the active tab
  const [value, setValue] = useState(1);

  const handleFormChange = (stepData) => {
    dispatch(updateFormData(stepData));
  };

  // Handle navigation between tabs
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Handle cancel and navigate away
  const handleCancel = () => {
    navigate('/admin/students');
  };

  return (
    <>

       <UpdateStudentForm/>

    </>
  );
};

export default StudentUpdatePage;

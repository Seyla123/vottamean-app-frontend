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
      <Box sx={{ p: 2 }}>
        <Stack
          sx={{
            direction: 'row',
            bgcolor: '#fafafa',
            boxShadow: '0px 3px 6px rgba(0,0,0,0.1)',
            p: 1.5,
            borderRadius: 4,
            spacing: 2,
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            TabIndicatorProps={{ style: { display: 'none' } }}
          >
            <Tab
              label="Student"
              value={1}
              sx={{
                bgcolor: value === 1 ? '#eeedff' : 'transparent',
                borderRadius: 4,
                padding: isMobile ? '8px 24px' : '8px 16px',
              }}
            />
            <Tab
              label="Guardian"
              value={2}
              sx={{
                bgcolor: value === 2 ? '#eeedff' : 'transparent',
                borderRadius: 4,
                padding: isMobile ? '8px 24px' : '8px 16px',
              }}
            />
          </Tabs>
        </Stack>

        <Box sx={{ mt: 2 }}>
          {/* Render StudentUpdateForm when value is 1 */}
          <TabPanel value={value} index={1}>
            <StudentUpdateForm
              handleFormChange={handleFormChange}
              onClose={handleCancel}
            />
          </TabPanel>

          {/* Render GuardianUpdateForm when value is 2 */}
          <TabPanel value={value} index={2}>
            <GuardianUpdateForm
              handleFormChange={handleFormChange}
              onClose={handleCancel}
            />
          </TabPanel>
        </Box>
      </Box>
    </>
  );
};

export default StudentUpdatePage;

const imgStyle = {
  width: { xs: 120, sm: 160 },
  height: { xs: 120, sm: 160 },
};

const cardContainer = {
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'row' },
  width: '100%',
  height: '100%',
  borderRadius: 1,
  overflow: 'hidden',
};

import React, { useState } from 'react';
import {
  Typography,
  Box,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  DialogContentText,
  useMediaQuery,
  useTheme,
  Tab,
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import StyledButton from './StyledMuiButton';
import FormInfoStudent from '../student/FormInfoStudent';
import CreateStudentPandel from './CreateStudentPandel';
import CreateGuardianPanel from './CreateGuardianPanel';

const CreateStudentModal = ({ open, handleCreateModalClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onSubmit = () => {
    alert('create succesfully');
  };

  return (
    <Dialog
      fullWidth
      maxWidth={'sm'}
      open={open}
      onClose={handleCreateModalClose}
    >
      <DialogTitle>Create Student</DialogTitle>
      <DialogContent>
        <TabContext value={value}>
          <TabList
            orientation={'horizontal'}
            variant="scrollable"
            onChange={handleChange}
            aria-label="Vertical tabs"
            sx={{ width: '100%' }}
          >
            <Tab
              label="Student"
              value="1"
              // icon={<UserRound size={18} />}
              iconPosition="start"
            />
            <Tab
              label="Guardian"
              value="2"
              // icon={<Settings size={18} />}
              iconPosition="start"
            />
          </TabList>

          <TabPanel sx={{ flexGrow: 1 }} value="1">
            <CreateStudentPandel />
          </TabPanel>
          <TabPanel sx={{ flexGrow: 1 }} value="2">
            <CreateGuardianPanel />
          </TabPanel>
        </TabContext>
        <DialogContentText>
          Create a new student account for your class.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <StyledButton onClick={handleCreateModalClose}>Cancel</StyledButton>
        <StyledButton variant="contained" onClick={onSubmit}>
          Create
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
};

export default CreateStudentModal;

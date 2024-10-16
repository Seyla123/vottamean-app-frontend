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

import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector';

const steps = ['Student Information', 'Guardian Information'];

const CreateStudentModal = ({ open, handleCreateModalClose }) => {
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
        <Stepper
          alternativeLabel
          activeStep={1}
          connector={<ColorlibConnector />}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        {/* <TabContext value={value}>
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
        </TabContext> */}
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

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: '#6c63ff',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: '#6c63ff',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme }) => ({
  backgroundColor: '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...theme.applyStyles('dark', {
    backgroundColor: theme.palette.grey[700],
  }),
  variants: [
    {
      props: ({ ownerState }) => ownerState.active,
      style: {
        backgroundColor: '#6c63ff',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
      },
    },
    {
      props: ({ ownerState }) => ownerState.completed,
      style: {
        backgroundColor: '#6c63ff',
      },
    },
  ],
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

export default CreateStudentModal;

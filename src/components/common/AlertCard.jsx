import { Alert, AlertTitle, Box } from '@mui/material';
import React from 'react';

const AlertCard = ({ title, description, severity = 'none', icon }) => {
  return (
    <Alert icon={icon} severity={severity}>
      <AlertTitle>{title}</AlertTitle>
      {description}
    </Alert>
  );
};

export default AlertCard;

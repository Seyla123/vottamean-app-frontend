import { Alert, AlertTitle } from '@mui/material';
import React from 'react';

const AlertCard = ({ title, description, severity, icon }) => {
  return (
    <Alert icon={icon} severity={severity} sx={{ width: 'fit-content' }}>
      <AlertTitle>{title}</AlertTitle>
      {description}
    </Alert>
  );
};

export default AlertCard;

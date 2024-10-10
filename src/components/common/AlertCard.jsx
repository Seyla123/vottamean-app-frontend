import { Alert, AlertTitle } from '@mui/material';
import React from 'react';
import { BadgeCheck } from 'lucide-react';

const AlertCard = ({ title, description }) => {
  return (
    <Alert
      icon={<BadgeCheck size={20} />}
      sx={{
        height: '100%',
      }}
      severity="success"
    >
      <AlertTitle>{title}</AlertTitle>
      {description}
    </Alert>
  );
};

export default AlertCard;

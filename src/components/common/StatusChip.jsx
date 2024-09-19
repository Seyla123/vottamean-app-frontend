import React from 'react';
import { Chip } from '@mui/material';
import { statusObj } from '../../data/status';
const StatusChip = ({ status, statusId }) => {
  const statusConfig = statusObj[statusId];

  return (
    <Chip
      icon={statusConfig.icon}
      label={status}
      sx={{
        backgroundColor: statusConfig.color,
        px: '4px',
        color: statusConfig.textColor,
      }}
      size="small"
    />
  );
};

export default StatusChip;

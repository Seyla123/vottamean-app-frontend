import React from 'react';
import { Chip } from '@mui/material';
import { statusObj } from '../../data/status';

const StatusChip = ({ statusId }) => {
  const id = statusId !== null ? statusId : 0;
  const statusConfig = statusObj[id];

  return (
    <Chip
      icon={statusConfig.icon}
      label={statusConfig.label}
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


import React from 'react';
import { Chip } from '@mui/material';
import { CheckCheckIcon, AlarmClockIcon, CircleX, PencilIcon } from 'lucide-react';

const statusObj = {
  1: { color: '#E0F5D7', icon: <CheckCheckIcon size={16} color="green" />, textColor: 'green' },
  2: { color: '#FFF3C7', icon: <AlarmClockIcon size={16} color="orange" />, textColor: 'orange' },
  3: { color: '#FADBD8', icon: <CircleX size={16} color="red" />, textColor: 'red' },
  4: { color: '#D6EAF8', icon: <PencilIcon size={16} color="blue" />, textColor: 'blue' },
};

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

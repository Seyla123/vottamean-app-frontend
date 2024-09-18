import React from 'react';
import { Chip } from '@mui/material';
import { CheckCheckIcon, AlarmClockIcon, CircleX, PencilIcon } from 'lucide-react';

const statusColor = {
  1: '#E0F5D7',
  2: '#FFF3C7',
  3: '#FADBD8',
  4: '#D6EAF8',
};

const statusIcon = {
  1: <CheckCheckIcon size={16} color="green" />,
  2: <AlarmClockIcon size={16} color="orange" />,
  3: <CircleX size={16} color="red" />,
  4: <PencilIcon size={16} color="blue" />,
};

const getStatusColor = (status) => statusColor[status];
const getStatusIcon = (status) => statusIcon[status];
const getStatusTextColor = (status) =>
  status === 1 ? 'green' : status === 2 ? 'orange' : status === 3 ? 'red' : 'blue';

const StatusChip = ({ status, statusId }) => {
  return (
    <Chip
      icon={getStatusIcon(statusId)}
      label={status}
      sx={{
        backgroundColor: getStatusColor(statusId),
        px: '4px',
        color: getStatusTextColor(statusId),
      }}
      size="small"
    />
  );
};

export default StatusChip;

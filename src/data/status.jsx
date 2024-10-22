import {
  CheckCheckIcon,
  AlarmClockIcon,
  PencilIcon,
  CircleX,
  BadgeInfo,
  NotebookPen,
} from 'lucide-react';
export const statusDetails = [
  {
    label: 'Present',
    bgColor:
      'linear-gradient(135deg, rgba(40, 167, 69, 0.1), rgba(0, 184, 85, 0.3))',
    color: '#28a745',
    icon: CheckCheckIcon,
  },
  {
    label: 'Late',
    bgColor:
      'linear-gradient(135deg, rgba(253, 126, 20, 0.1), rgba(255, 159, 64, 0.3))',
    color: '#fd7e14',
    icon: AlarmClockIcon,
  },
  {
    label: 'Absent',
    bgColor:
      'linear-gradient(135deg, rgba(220, 53, 69, 0.1), rgba(255, 102, 102, 0.3))',
    color: '#dc3545',
    icon: CircleX,
  },
  {
    label: 'Permission',
    bgColor:
      'linear-gradient(135deg, rgba(0, 123, 255, 0.1), rgba(102, 204, 255, 0.3))',
    color: '#007bff',
    icon: NotebookPen,
  },
];

export const statusObj = {
  0: {
    label: 'No Status',
    color: '#F8F9FA',
    icon: <BadgeInfo size={16} color="gray" />,
    textColor: 'gray',
  },
  1: {
    label: 'Present',
    color: '#E0F5D7',
    icon: <CheckCheckIcon size={16} color="green" />,
    textColor: 'green',
  },
  2: {
    label: 'Late',
    color: '#FFF3C7',
    icon: <AlarmClockIcon size={16} color="orange" />,
    textColor: 'orange',
  },
  3: {
    label: 'Absent',
    color: '#FADBD8',
    icon: <CircleX size={16} color="red" />,
    textColor: 'red',
  },
  4: {
    label: 'Permission',
    color: '#D6EAF8',
    icon: <PencilIcon size={16} color="blue" />,
    textColor: 'blue',
  },
};

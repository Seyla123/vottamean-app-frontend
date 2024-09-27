import { CheckCheckIcon, AlarmClockIcon, PencilIcon, CircleX,BadgeInfo } from "lucide-react";
export const statusDetails = [
    { label: "Present", color: "#28a745", icon: CheckCheckIcon },
    { label: "Late", color: "#fd7e14", icon: AlarmClockIcon },
    { label: "Absent", color: "#dc3545", icon: CircleX },
    { label: "Permission", color: "#007bff", icon: PencilIcon },
  ];

export const statusObj = {
    0: { label: "No Status", color: '#F8F9FA', icon: <BadgeInfo size={16} color="gray" />, textColor: 'gray' },
    1: { label: "Present", color: '#E0F5D7', icon: <CheckCheckIcon size={16} color="green" />, textColor: 'green' },
    2: { label: "Late", color: '#FFF3C7', icon: <AlarmClockIcon size={16} color="orange" />, textColor: 'orange' },
    3: { label: "Absent", color: '#FADBD8', icon: <CircleX size={16} color="red" />, textColor: 'red' },
    4: { label: "Permission", color: '#D6EAF8', icon: <PencilIcon size={16} color="blue" />, textColor: 'blue' },
  };

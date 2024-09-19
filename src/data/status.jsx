import { CheckCheckIcon, AlarmClockIcon, PencilIcon, CircleX } from "lucide-react";
export const statusDetails = [
    { label: "Present", color: "#28a745", icon: CheckCheckIcon },
    { label: "Late", color: "#fd7e14", icon: AlarmClockIcon },
    { label: "Permission", color: "#007bff", icon: PencilIcon },
    { label: "Absent", color: "#dc3545", icon: CircleX },
  ];

export const statusObj = {
    1: { color: '#E0F5D7', icon: <CheckCheckIcon size={16} color="green" />, textColor: 'green' },
    2: { color: '#FFF3C7', icon: <AlarmClockIcon size={16} color="orange" />, textColor: 'orange' },
    3: { color: '#FADBD8', icon: <CircleX size={16} color="red" />, textColor: 'red' },
    4: { color: '#D6EAF8', icon: <PencilIcon size={16} color="blue" />, textColor: 'blue' },
  };
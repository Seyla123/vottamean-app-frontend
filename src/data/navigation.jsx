import {
  HouseIcon as HomeIcon,
  CalendarIcon as CalendarMonthIcon,
  BookIcon as ClassIcon,
  LibraryIcon as SubjectIcon,
  GraduationCapIcon as StudentIcon,
  BriefcaseBusinessIcon as TeacherIcon,
  SquareChartGanttIcon as ClassPeriodIcon,
  ClipboardMinusIcon as ReportGmailerrorredIcon,
  ScrollTextIcon as ChecklistIcon,
  SettingsIcon,
  Zap,
  UserRoundIcon as Person,
  CalendarRange,
  BookCopy,
  CalendarClock,
  CalendarDays,
  ListCheck,
  ChartPie,
  Settings2,
} from 'lucide-react';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';

const navigation = [
  { kind: 'header', title: 'Menu' },
  {
    segment: 'admin/home',
    title: 'Home',
    icon: <HomeIcon size={18} />,
  },
  {
    segment: 'admin/teachers',
    title: 'Teacher',
    icon: <TeacherIcon size={18} />,
  },
  {
    segment: 'admin/class-periods',
    title: 'Class Period',
    icon: <CalendarClock size={18} />,
  },
  {
    segment: 'admin/subjects',
    title: 'Subject',
    icon: <BookCopy size={18} />,
  },
  {
    segment: 'admin/classes',
    title: 'Class',
    icon: <CastForEducationIcon fontSize="18px" />,
  },
  {
    segment: 'admin/students',
    title: 'Student',
    icon: <StudentIcon size={18} />,
  },
  {
    segment: 'admin/sessions',
    title: 'Session',
    icon: <CalendarDays size={18} />,
  },
  {
    segment: 'admin/attendance',
    title: 'Attendance',
    icon: <ListCheck size={18} />,
  },

  {
    segment: 'admin/reports',
    title: 'Report',
    icon: <ChartPie size={18} />,
    children: [
      {
        segment: 'attendance',
        title: 'Attendance',
        icon: <ChecklistIcon size={18} />,
      },
    ],
  },

  { kind: 'divider' },

  { kind: 'header', title: 'General' },
  {
    segment: 'admin/payment',
    title: 'Usage and plan',
    icon: <Zap size={18} />,
  },
  {
    segment: 'admin/settings',
    title: 'Settings',
    icon: <Settings2 size={18} />,
    children: [
      {
        segment: 'account',
        title: 'Account',
        icon: <Person size={18} />,
      },
    ],
  },
];

const teacherSiteNavigation = [
  { kind: 'header', title: 'Menu' },
  {
    segment: 'teacher/home',
    title: 'Home',
    icon: <HomeIcon />,
  },
  {
    segment: 'teacher/schedule',
    title: 'Schedule',
    icon: <CalendarMonthIcon size={18} />,
  },

  { kind: 'divider' },

  { kind: 'header', title: 'General' },

  {
    segment: 'teacher/settings',
    title: 'Settings',
    icon: <SettingsIcon size={18} />,
    children: [
      {
        segment: 'account',
        title: 'Account',
        icon: <Person size={18} />,
      },
    ],
  },
];

export { navigation, teacherSiteNavigation };

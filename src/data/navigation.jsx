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
  LogOutIcon,
  Zap,
  UserRoundIcon as Person,
} from 'lucide-react';

const navigation = [
  { kind: 'header', title: 'Menu' },
  {
    segment: 'admin/home',
    title: 'Home',
    icon: <HomeIcon />,
  },
  {
    segment: 'admin/class-periods',
    title: 'Class Period',
    icon: <ClassPeriodIcon />,
  },
  {
    segment: 'admin/subjects',
    title: 'Subject',
    icon: <SubjectIcon size={20} />,
  },
  {
    segment: 'admin/classes',
    title: 'Class',
    icon: <ClassIcon />,
  },
  {
    segment: 'admin/students',
    title: 'Student',
    icon: <StudentIcon size={20} />,
  },
  {
    segment: 'admin/teachers',
    title: 'Teacher',
    icon: <TeacherIcon size={20} />,
  },
  {
    segment: 'admin/sessions',
    title: 'Session',
    icon: <CalendarMonthIcon />,
  },
  {
    segment: 'admin/attendance',
    title: 'Attendance',
    icon: <ChecklistIcon />,
  },

  {
    segment: 'admin/reports',
    title: 'Report',
    icon: <ReportGmailerrorredIcon size={20} />,
    children: [
      {
        segment: 'attendance',
        title: 'Attendance',
        icon: <ChecklistIcon size={20} />,
      },
    ],
  },

  { kind: 'divider' },

  { kind: 'header', title: 'General' },
  {
    segment: 'admin/payment',
    title: 'Usage and plan',
    icon: <Zap size={20} />,
  },
  {
    segment: 'admin/settings',
    title: 'Settings',
    icon: <SettingsIcon size={20} />,
    children: [
      {
        segment: 'account',
        title: 'Account',
        icon: <Person size={20} />,
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
    icon: <CalendarMonthIcon size={20} />,
  },

  { kind: 'divider' },

  { kind: 'header', title: 'General' },

  {
    segment: 'teacher/settings',
    title: 'Settings',
    icon: <SettingsIcon size={20} />,
    children: [
      {
        segment: 'account',
        title: 'Account',
        icon: <Person size={20} />,
      },
    ],
  },
];

export { navigation, teacherSiteNavigation };

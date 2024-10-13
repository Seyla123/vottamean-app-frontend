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
  UserRoundIcon as Person,
} from 'lucide-react';

const navigation = [
  { kind: 'header', title: 'Menu' },
  {
    segment: 'admin/dashboard',
    title: 'Dashboard',
    icon: <HomeIcon />,
  },
  {
    segment: 'admin/sessions',
    title: 'Session',
    icon: <CalendarMonthIcon />,
  },
  {
    segment: 'admin/classes',
    title: 'Class',
    icon: <ClassIcon />,
  },
  {
    segment: 'admin/subjects',
    title: 'Subject',
    icon: <SubjectIcon />,
  },
  {
    segment: 'admin/students',
    title: 'Student',
    icon: <StudentIcon />,
  },
  {
    segment: 'admin/teachers',
    title: 'Teacher',
    icon: <TeacherIcon />,
  },
  {
    segment: 'admin/class-periods',
    title: 'Class Period',
    icon: <ClassPeriodIcon />,
  },
  {
    segment: 'payment',
    title: 'Payment Trial',
    icon: <ClassPeriodIcon />,
  },
  {
    segment: 'admin/attendance',
    title: 'Attendance',
    icon: <ChecklistIcon />,
  },
  {
    segment: 'admin/reports',
    title: 'Report',
    icon: <ReportGmailerrorredIcon />,
    children: [
      {
        segment: 'attendance',
        title: 'Attendance Report ',
        icon: <ChecklistIcon />,
      },
    ],
  },

  { kind: 'divider' },

  { kind: 'header', title: 'General' },

  {
    segment: 'admin/settings',
    title: 'Settings',
    icon: <SettingsIcon />,
    children: [
      {
        segment: 'account',
        title: 'Account',
        icon: <Person />,
      },
    ],
  },
];

const teacherSiteNavigation = [
  { kind: 'header', title: 'Menu' },
  {
    segment: 'teacher/dashboard',
    title: 'Dashboard',
    icon: <HomeIcon />,
  },
  {
    segment: 'teacher/schedule',
    title: 'Schedule',
    icon: <CalendarMonthIcon />,
  },

  { kind: 'divider' },

  { kind: 'header', title: 'General' },

  {
    segment: 'teacher/settings',
    title: 'Settings',
    icon: <SettingsIcon />,
    children: [
      {
        segment: 'account',
        title: 'Account',
        icon: <Person />,
      },
    ],
  },
];

export { navigation, teacherSiteNavigation };

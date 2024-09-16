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
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <HomeIcon />,
    },
    {
        segment: 'dashboard/sessions',
        title: 'Session',
        icon: <CalendarMonthIcon />,
    },
    {
        segment: 'dashboard/classes',
        title: 'Class',
        icon: <ClassIcon />,
    },
    {
        segment: 'dashboard/subjects',
        title: 'Subject',
        icon: <SubjectIcon />,
    },
    {
        segment: 'dashboard/students',
        title: 'Student',
        icon: <StudentIcon />,
    },
    {
        segment: 'dashboard/teachers',
        title: 'Teacher',
        icon: <TeacherIcon />,
    },
    {
        segment: 'dashboard/class-periods',
        title: 'Class Period',
        icon: <ClassPeriodIcon />,
    },
    {
        segment: 'dashboard/reports',
        title: 'Report',
        icon: <ReportGmailerrorredIcon />,
        children: [
            {
                segment: 'attendance',
                title: 'Attendance',
                icon: <ChecklistIcon />,
            },
        ],
    },

    { kind: 'divider' },

    { kind: 'header', title: 'General' },

    {
        segment: 'dashboard/settings',
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
        segment: 'teacher/reports',
        title: 'Report',
        icon: <ReportGmailerrorredIcon />,
        children: [
            {
                segment: 'attendance',
                title: 'Attendance',
                icon: <ChecklistIcon />,
            },
        ],
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

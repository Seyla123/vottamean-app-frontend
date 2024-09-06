import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppProvider } from '@toolpad/core/AppProvider';
import Logo from '../../assets/images/Logo.png';
import theme from '../../styles/theme';
import {
    Home as HomeIcon,
    CalendarMonth as CalendarMonthIcon,
    Class as ClassIcon,
    Subject as SubjectIcon,
    School as StudentIcon,
    CoPresent as TeacherIcon,
    LibraryBooks as ClassPeriodIcon,
    Settings as SettingsIcon,
    Logout as LogoutIcon,
    Person,
} from '@mui/icons-material';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { Box } from '@mui/system';

const navigation = [
    { kind: 'header', title: 'Menu' },
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <HomeIcon />,
    },
    {
        segment: 'session',
        title: 'Sessions',
        icon: <CalendarMonthIcon />,
    },
    {
        segment: 'class',
        title: 'Class',
        icon: <ClassIcon />,
    },
    {
        segment: 'subject',
        title: 'Subject',
        icon: <SubjectIcon />,
    },
    {
        segment: 'students',
        title: 'Students',
        icon: <StudentIcon />,
    },
    {
        segment: 'teacher',
        title: 'Teacher',
        icon: <TeacherIcon />,
    },
    {
        segment: 'class-periods',
        title: 'Class Periods',
        icon: <ClassPeriodIcon />,
    },
    {
        segment: 'report',
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
    { kind: 'header', title: 'General' },

    {
        segment: 'setting',
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

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [session, setSession] = React.useState({
        user: {
            name: 'Doggo',
            email: 'doggo@gmail.com',
            image: 'https://i.pinimg.com/236x/10/18/97/10189726fde11a8182c4ff075bfe094b.jpg',
        },
    });

    const authentication = React.useMemo(() => {
        return {
            signIn: () => {
                setSession({
                    user: {
                        name: 'Doggo',
                        email: 'doggo@gmail.com',
                        image: 'https://i.pinimg.com/236x/10/18/97/10189726fde11a8182c4ff075bfe094b.jpg',
                    },
                });
            },
            signOut: () => {
                setSession(null);
            },
        };
    }, []);

    const router = React.useMemo(() => {
        return {
            pathname: location.pathname,
            searchParams: new URLSearchParams(location.search),
            navigate: path => navigate(path),
        };
    }, [location, navigate]);
    return (
        <AppProvider
            branding={{
                title: '',
                logo: <img src={Logo} alt='WaveTrack' />,
            }}
            navigation={navigation}
            router={router}
            theme={theme}
            session={session}
            authentication={authentication}
        >
            <Box padding={2}>{children}</Box>
        </AppProvider>
    );
};

export default Layout;

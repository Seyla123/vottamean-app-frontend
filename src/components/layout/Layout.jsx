import React from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { AppProvider } from "@toolpad/core/AppProvider";
import Logo from "../../assets/images/Logo.png";
import theme from "../../styles/theme";

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
} from "lucide-react";
import { Box } from "@mui/system";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Container } from "@mui/material";

const navigation = [
    { kind: "header", title: "Menu" },
    {
        segment: "dashboard",
        title: "Dashboard",
        icon: <HomeIcon />,
    },
    {
        segment: "dashboard/sessions",
        title: "Session",
        icon: <CalendarMonthIcon />,
    },
    {
        segment: "dashboard/classes",
        title: "Class",
        icon: <ClassIcon />,
    },
    {
        segment: "dashboard/subjects",
        title: "Subject",
        icon: <SubjectIcon />,
    },
    {
        segment: "dashboard/students",
        title: "Student",
        icon: <StudentIcon />,
    },
    {
        segment: "dashboard/teachers",
        title: "Teacher",
        icon: <TeacherIcon />,
    },
    {
        segment: "dashboard/class-periods",
        title: "Class Period",
        icon: <ClassPeriodIcon />,
    },
    {
        segment: "dashboard/reports",
        title: "Report",
        icon: <ReportGmailerrorredIcon />,
        children: [
            {
                segment: "attendance",
                title: "Attendance",
                icon: <ChecklistIcon />,
            },
        ],
    },

    { kind: "divider" },

    { kind: "header", title: "General" },

    {
        segment: "dashboard/settings",
        title: "Settings",
        icon: <SettingsIcon />,
        children: [
            {
                segment: "account",
                title: "Account",
                icon: <Person />,
            },
        ],
    },
];

const teacherSiteNavigation = [
    { kind: "header", title: "Menu" },
    {
        segment: "dashboard",
        title: "Dashboard",
        icon: <HomeIcon />,
    },
    {
        segment: "dashboard/reports",
        title: "Report",
        icon: <ReportGmailerrorredIcon />,
        children: [
            {
                segment: "attendance",
                title: "Attendance",
                icon: <ChecklistIcon />,
            },
        ],
    },

    { kind: "divider" },

    { kind: "header", title: "General" },

    {
        segment: "dashboard/settings",
        title: "Settings",
        icon: <SettingsIcon />,
        children: [
            {
                segment: "account",
                title: "Account",
                icon: <Person />,
            },
        ],
    },
];
const Layout = ({ teacherSite, adminSite }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [session, setSession] = React.useState({
        user: {
            name: "Selena",
            email: "selena@gmail.com",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
    });

    const authentication = React.useMemo(() => {
        return {
            signIn: () => {
                setSession({
                    user: {
                        name: "Selena",
                        email: "selena@gmail.com",
                        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
            navigate: (path) => navigate(path),
        };
    }, [location, navigate]);
    return (
        <AppProvider
            branding={{
                title: "",
                logo: <img src={Logo} alt="WaveTrack" />,
            }}
            navigation={teacherSite ? teacherSiteNavigation : navigation}
            router={router}
            theme={theme}
            session={session}
            authentication={authentication}
        >
            {/* Render the component to show different sidebar layout in teacher and admin site */}
            {teacherSite || adminSite ? (
                <Box paddingTop={2}>
                    {/* Render other components or nothing based on your requirements */}
                    <DashboardLayout>
                        <Container maxWidth="xl">
                            <Outlet />
                        </Container>
                    </DashboardLayout>
                </Box>
            ) : (
                <Outlet />
            )}
        </AppProvider>
    );
};

export default Layout;

// auth
import LoginPage from "../pages/auth/LoginPage";
import SignupPage from "../pages/auth/SignupPage";
import PasswordForgotPage from "../pages/auth/PasswordForgotPage";
import PasswordResetPage from "../pages/auth/PasswordResetPage";
import PasswordChangePage from "../pages/auth/PasswordChangePage";
import AccountVerifyPage from "../pages/auth/AccountVerifyPage";
import AccountSuccessPage from "../pages/auth/AccountSuccessPage";

import NotFoundPage from "../pages/NotFoundPage";

// admin
import DashboardPage from "../pages/admin/dashboard/DashboardPage";

import SessionListPage from "../pages/admin/session/SessionListPage";
import SessionDetailPage from "../pages/admin/session/SessionDetailPage";
import SessionCreatePage from "../pages/admin/session/SessionCreatePage";
import SessionUpdatePage from "../pages/admin/session/SessionUpdatePage";

import StudentListPage from "../pages/admin/student/StudentListPage";
import StudentDetailPage from "../pages/admin/student/StudentDetailPage";
import StudentCreatePage from "../pages/admin/student/StudentCreatePage";
import StudentUpdatePage from "../pages/admin/student/StudentUpdatePage";

import SubjectListPage from "../pages/admin/subject/SubjectListPage";
import SubjectDetailPage from "../pages/admin/subject/SubjectDetailPage";
import SubjectCreatePage from "../pages/admin/subject/SubjectCreatePage";
import SubjectUpdatePage from "../pages/admin/subject/SubjectUpdatePage";

import ClassPeriodListPage from "../pages/admin/class-period/ClassPeriodListPage";
import ClassPeriodDetailPage from "../pages/admin/class-period/ClassPeriodDetailPage";
import ClassPeriodCreatePage from "../pages/admin/class-period/ClassPeriodCreatePage";
import ClassPeriodUpdatePage from "../pages/admin/class-period/ClassPeriodUpdatePage";

import TeacherListPage from "../pages/admin/teacher/TeacherListPage";
import TeacherDetailPage from "../pages/admin/teacher/TeacherDetailPage";
import TeacherCreatePage from "../pages/admin/teacher/TeacherCreatePage";
import TeacherUpdatePage from "../pages/admin/teacher/TeacherUpdatePage";

import ClassListPage from "../pages/admin/class/ClassListPage";
import ClassDetailPage from "../pages/admin/class/ClassDetailPage";
import ClassCreatePage from "../pages/admin/class/ClassCreatePage";
import ClassUpdatePage from "../pages/admin/class/ClassUpdatePage";

import SchoolUpdatePage from "../pages/admin/setting/account/SchoolUpdatePage";

import AccountProfilePage from "../pages/admin/setting/account/AccountProfilePage";

import AttendanceReportPage from "../pages/admin/report/attendance/AttendanceReportPage";
import AttendanceViewPage from "../pages/admin/report/attendance/AttendanceViewPage";

import UserUpdatePage from "../pages/admin/setting/account/UserUpdatePage";

// Teacher site 
import TeacherAttendanceListPage from "../pages/teacherSite/teacherClass/TeacherAttendanceListPage";
import TeacherClassPage from "../pages/teacherSite/teacherClass/TeacherClassPage";
import TeacherAccountProfilePage from "../pages/teacherSite/settings/TeacherAccountProfilePage";
import TeacherSessionPage from "../pages/teacherSite/session/TeacherSessionPage";

// Layout 
import Layout from "../components/layout/Layout";
import ProtectedRoutes from "./ProtectedRoutes";
// Routes configuration
const routesConfig = [
    {
        path: "/auth",
        element: <Layout/>,
        children: [
            {
                path: "login",
                element: <LoginPage />,
            },
            {
                path: "signup",
                element: <SignupPage />,
            },
            {
                path: "forgot-password",
                element: <PasswordForgotPage />,
            },
            {
                path: "reset-password",
                element: <PasswordResetPage />,
            },
            {
                path: "change-password",
                element: <PasswordChangePage />,
            },
            {
                path: "verify-account",
                element: <AccountVerifyPage />,
            },
            {
                path: "success",
                element: <AccountSuccessPage />,
            },
        ]
    },
    {
        path: '/teacher',
        element: <ProtectedRoutes teacherSite></ProtectedRoutes>,
        children: [
            {
                path: 'classes',
                children: [
                    {
                        path: '',   
                        element: <TeacherClassPage />,
                    },
                    {
                        path: 'attendance/:id',
                        element: <TeacherAttendanceListPage />,
                    }
                ]
            },
            {
                path: 'sessions',
                element: <TeacherSessionPage />,
            },
            {
                path: 'settings',
                children: [
                    {
                        path: 'account',
                        element: <TeacherAccountProfilePage />,
                    }
                ]
            }
        ],
    },
    {
        path: '/dashboard',
        showSidebar: true,
        element:<ProtectedRoutes adminSite></ProtectedRoutes>,
        children: [
            {
                path: "",
                element: <DashboardPage />,
                children: [],
            },
            {
                path: "sessions",
                children: [
                    {
                        path: "",
                        element: <SessionListPage />,
                    },
                    {
                        path: ":id",
                        element: <SessionDetailPage />,
                    },
                    {
                        path: "create",
                        element: <SessionCreatePage />,
                    },
                    {
                        path: "update/:id",
                        element: <SessionUpdatePage />,
                    },
                ],
            },
            {
                path: "students",
                children: [
                    {
                        path: "",
                        element: <StudentListPage />,
                    },
                    {
                        path: ":id",
                        element: <StudentDetailPage />,
                    },
                    {
                        path: "create",
                        element: <StudentCreatePage />,
                    },
                    {
                        path: "update/:id",
                        element: <StudentUpdatePage />,
                    },
                ],
            },
            {
                path: "subjects",
                children: [
                    {
                        path: "",
                        element: <SubjectListPage />,
                    },
                    {
                        path: ":id",
                        element: <SubjectDetailPage />,
                    },
                    {
                        path: "create",
                        element: <SubjectCreatePage />,
                    },
                    {
                        path: "update/:id",
                        element: <SubjectUpdatePage />,
                    },
                ],
            },
            {
                path: "class-periods",
                children: [
                    {
                        path: "",
                        element: <ClassPeriodListPage />,
                    },
                    {
                        path: ":id",
                        element: <ClassPeriodDetailPage />,
                    },
                    {
                        path: "create",
                        element: <ClassPeriodCreatePage />,
                    },
                    {
                        path: "update/:id",
                        element: <ClassPeriodUpdatePage />,
                    },
                ],
            },
            {
                path: "teachers",
                children: [
                    {
                        path: "",
                        element: <TeacherListPage />,
                    },
                    {
                        path: ":id",
                        element: <TeacherDetailPage />,
                    },
                    {
                        path: "create",
                        element: <TeacherCreatePage />,
                    },
                    {
                        path: "update/:id",
                        element: <TeacherUpdatePage />,
                    },
                ],
            },
            {
                path: "classes",
                children: [
                    {
                        path: "",
                        element: <ClassListPage />,
                    },
                    {
                        path: ":id",
                        element: <ClassDetailPage />,
                    },
                    {
                        path: "create",
                        element: <ClassCreatePage />,
                    },
                    {
                        path: "update/:id",
                        element: <ClassUpdatePage />,
                    },
                ],
            },
            {
                path: "settings",
                children: [
                    {
                        path: "account",
                        children: [
                            {
                                path: "",
                                element: <AccountProfilePage />,
                            },
                            {
                                path: "user/update/:id",
                                element: <UserUpdatePage />,
                            },
                            {
                                path: "school/:id",
                                element: <SchoolUpdatePage />,
                            },
                            {
                                path: "school/update/:id",
                                element: <SchoolUpdatePage />,
                            }
                        ],
                    },
                ],
            },
            {
                path: "reports",
                children: [
                    {
                        path: "attendance",
                        children: [
                            {
                                path: "",
                                element: <AttendanceReportPage />,
                            },
                            {
                                path: ":id",
                                element: <AttendanceViewPage />,
                            },  
                        ]
                    }
                ],
            },
        ],
    },
    {
        path: "*",
        element: <Layout/>,
        children: [
            {
                path: "",
                element: <NotFoundPage />,
            },
        ]
    },
];

export default routesConfig;


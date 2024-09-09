import React from 'react';
import { lazy } from 'react';

// Lazy-loaded Pages
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const SignupPage = lazy(() => import('../pages/auth/SignupPage'));
const PasswordForgotPage = lazy(
    () => import('../pages/auth/PasswordForgotPage')
);
const PasswordResetPage = lazy(() => import('../pages/auth/PasswordResetPage'));
const PasswordChangePage = lazy(
    () => import('../pages/auth/PasswordChangePage')
);
const AccountVerifyPage = lazy(() => import('../pages/auth/AccountVerifyPage'));
const AccountSuccessPage = lazy(
    () => import('../pages/auth/AccountSuccessPage')
);

const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

const DashboardPage = lazy(
    () => import('../pages/admin/dashboard/DashboardPage')
);

const SessionListPage = lazy(
    () => import('../pages/admin/session/SessionListPage')
);
const SessionDetailPage = lazy(
    () => import('../pages/admin/session/SessionDetailPage')
);
const SessionCreatePage = lazy(
    () => import('../pages/admin/session/SessionCreatePage')
);
const SessionUpdatePage = lazy(
    () => import('../pages/admin/session/SessionUpdatePage')
);

const StudentListPage = lazy(
    () => import('../pages/admin/student/StudentListPage')
);
const StudentDetailPage = lazy(
    () => import('../pages/admin/student/StudentDetailPage')
);
const StudentCreatePage = lazy(
    () => import('../pages/admin/student/StudentCreatePage')
);
const StudentUpdatePage = lazy(
    () => import('../pages/admin/student/StudentUpdatePage')
);

const SubjectListPage = lazy(
    () => import('../pages/admin/subject/SubjectListPage')
);
const SubjectDetailPage = lazy(
    () => import('../pages/admin/subject/SubjectDetailPage')
);
const SubjectCreatePage = lazy(
    () => import('../pages/admin/subject/SubjectCreatePage')
);
const SubjectUpdatePage = lazy(
    () => import('../pages/admin/subject/SubjectUpdatePage')
);

const ClassPeriodListPage = lazy(
    () => import('../pages/admin/class-period/ClassPeriodListPage')
);
const ClassPeriodDetailPage = lazy(
    () => import('../pages/admin/class-period/ClassPeriodDetailPage')
);
const ClassPeriodCreatePage = lazy(
    () => import('../pages/admin/class-period/ClassPeriodCreatePage')
);
const ClassPeriodUpdatePage = lazy(
    () => import('../pages/admin/class-period/ClassPeriodUpdatePage')
);

const TeacherListPage = lazy(
    () => import('../pages/admin/teacher/TeacherListPage')
);
const TeacherDetailPage = lazy(
    () => import('../pages/admin/teacher/TeacherDetailPage')
);
const TeacherCreatePage = lazy(
    () => import('../pages/admin/teacher/TeacherCreatePage')
);
const TeacherUpdatePage = lazy(
    () => import('../pages/admin/teacher/TeacherUpdatePage')
);

const ClassListPage = lazy(() => import('../pages/admin/class/ClassListPage'));
const ClassDetailPage = lazy(
    () => import('../pages/admin/class/ClassDetailPage')
);
const ClassCreatePage = lazy(
    () => import('../pages/admin/class/ClassCreatePage')
);
const ClassUpdatePage = lazy(
    () => import('../pages/admin/class/ClassUpdatePage')
);

const SchoolUpdatePage = lazy(
    () => import('../pages/admin/school/SchoolUpdatePage')
);

const AccountProfilePage = lazy(
    () => import('../pages/admin/setting/account/AccountProfilePage')
);

const AttendanceReportPage = lazy(
    () => import('../pages/admin/report/attendance/AttendanceReportPage')
);

// Teacher site 

const TeacherAttendanceListPage = lazy(() => import('../pages/teacherSite/teacherClass/TeacherAttendanceListPage'));
const TeacherClassPage = lazy(() => import('../pages/teacherSite/teacherClass/TeacherClassPage'));
const TeacherAccountProfilePage = lazy(() => import('../pages/teacherSite/settings/TeacherAccountProfilePage'));
const TeacherSessionPage = lazy(() => import('../pages/teacherSite/session/TeacherSessionPage'));
// Routes configuration
const routesConfig = [
    {
        path: '/login',
        element: <LoginPage />,
        showSidebar: false,
    },
    {
        path: '/signup',
        element: <SignupPage />,
        showSidebar: false,
    },
    {
        path: '/forgot-password',
        element: <PasswordForgotPage />,
        showSidebar: false,
    },
    {
        path: '/reset-password',
        element: <PasswordResetPage />,
        showSidebar: false,
    },
    {
        path: '/change-password',
        element: <PasswordChangePage />,
        showSidebar: false,
    },
    {
        path: '/verify-account',
        element: <AccountVerifyPage />,
        showSidebar: false,
    },
    {
        path: '/success',
        element: <AccountSuccessPage />,
        showSidebar: false,
    },
    {
        path: '/teacher',
        teacherSidebar: true,
        children: [
            {
                path: 'classes',
                children: [
                    {
                        path: '',
                        element: <TeacherClassPage />,
                    },
                    {
                        path: 'attendace/:id',
                        element: <TeacherAttendanceListPage />,
                    }
                ]
            },
            {
                path: 'sessions',
                element: <TeacherSessionPage />,
            },
            {
                path:'settings',
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
        children: [
            {
                path: '',
                element: <DashboardPage />,
                children: [],
            },
            {
                path: 'sessions',
                children: [
                    {
                        path: '',
                        element: <SessionListPage />,
                    },
                    {
                        path: ':id',
                        element: <SessionDetailPage />,
                    },
                    {
                        path: 'create',
                        element: <SessionCreatePage />,
                    },
                    {
                        path: 'update/:id',
                        element: <SessionUpdatePage />,
                    },
                ],
            },
            {
                path: 'students',
                children: [
                    {
                        path: '',
                        element: <StudentListPage />,
                    },
                    {
                        path: ':id',
                        element: <StudentDetailPage />,
                    },
                    {
                        path: 'create',
                        element: <StudentCreatePage />,
                    },
                    {
                        path: 'update/:id',
                        element: <StudentUpdatePage />,
                    },
                ],
            },
            {
                path: 'subjects',
                children: [
                    {
                        path: '',
                        element: <SubjectListPage />,
                    },
                    {
                        path: ':id',
                        element: <SubjectDetailPage />,
                    },
                    {
                        path: 'create',
                        element: <SubjectCreatePage />,
                    },
                    {
                        path: 'update/:id',
                        element: <SubjectUpdatePage />,
                    },
                ],
            },
            {
                path: 'class-periods',
                children: [
                    {
                        path: '',
                        element: <ClassPeriodListPage />,
                    },
                    {
                        path: ':id',
                        element: <ClassPeriodDetailPage />,
                    },
                    {
                        path: 'create',
                        element: <ClassPeriodCreatePage />,
                    },
                    {
                        path: 'update/:id',
                        element: <ClassPeriodUpdatePage />,
                    },
                ],
            },
            {
                path: 'teachers',
                children: [
                    {
                        path: '',
                        element: <TeacherListPage />,
                    },
                    {
                        path: ':id',
                        element: <TeacherDetailPage />,
                    },
                    {
                        path: 'create',
                        element: <TeacherCreatePage />,
                    },
                    {
                        path: 'update/:id',
                        element: <TeacherUpdatePage />,
                    },
                ],
            },
            {
                path: 'classes',
                element: <ClassListPage />,
                children: [
                    {
                        path: '',
                        element: <ClassListPage />,
                    },
                    {
                        path: ':id',
                        element: <ClassDetailPage />,
                    },
                    {
                        path: 'create',
                        element: <ClassCreatePage />,
                    },
                    {
                        path: 'update/:id',
                        element: <ClassUpdatePage />,
                    },
                ],
            },
            {
                path: 'school',
                element: <SchoolUpdatePage />,
                children: [
                    {
                        path: 'update/:id',
                        element: <SchoolUpdatePage />,
                    },
                ],
            },
            {
                path: 'settings',
                children: [
                    {
                        path: 'account',
                        element: <AccountProfilePage />,
                    },
                ],
            },
            {
                path: 'reports',
                children: [
                    {
                        path: 'attendance',
                        element: <AttendanceReportPage />,
                    },
                ],
            },
        ],
    },
    {
        path: '*',
        element: <NotFoundPage />,
        showSidebar: false,
    },
];

export default routesConfig;

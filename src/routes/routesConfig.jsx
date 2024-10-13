// auth
import SignupPage from '../pages/auth/SignupPage';
import SigninPage from '../pages/auth/SigninPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import ResetNewPasswordPage from '../pages/auth/ResetNewPasswordPage';
import VerifySuccessfullyPage from '../pages/auth/VerifySuccessfullyPage';
import VerifyEmailPage from '../pages/auth/VerifyEmailPage';
import VerifyTeacherEmailPage from '../pages/auth/VerifyTeacherEmailPage';

// Teacher Invitation and registration
import TeacherRegistrationPage from '../pages/admin/teacher/TeacherRegistrationPage';
import TeacherInvitationPage from '../pages/admin/teacher/TeacherInvitationPage';

// Payment
import PaymentSuccessPage from '../pages/payment/PaymentSuccessPage';
import PaymentCancelPage from '../pages/payment/PaymentCancelPage';
import PaymentRequiredPage from '../pages/payment/PaymentRequiredPage';
import SubscriptionPlansPage from '../pages/payment/SubscriptionPlansPage';

import UnauthorizedPage from '../pages/UnauthorizedPage';

// admin
import AdminDashboardPage from '../pages/admin/dashboard/DashboardPage';

import SessionListPage from '../pages/admin/session/SessionListPage';
import SessionDetailPage from '../pages/admin/session/SessionDetailPage';
import SessionCreatePage from '../pages/admin/session/SessionCreatePage';
import SessionUpdatePage from '../pages/admin/session/SessionUpdatePage';

import StudentListPage from '../pages/admin/student/StudentListPage';
import StudentDetailPage from '../pages/admin/student/StudentDetailPage';
import StudentCreatePage from '../pages/admin/student/StudentCreatePage';
import StudentUpdatePage from '../pages/admin/student/StudentUpdatePage';

import SubjectListPage from '../pages/admin/subject/SubjectListPage';
import SubjectDetailPage from '../pages/admin/subject/SubjectDetailPage';
import SubjectCreatePage from '../pages/admin/subject/SubjectCreatePage';
import SubjectUpdatePage from '../pages/admin/subject/SubjectUpdatePage';

import ClassPeriodListPage from '../pages/admin/class-period/ClassPeriodListPage';
import ClassPeriodDetailPage from '../pages/admin/class-period/ClassPeriodDetailPage';
import ClassPeriodCreatePage from '../pages/admin/class-period/ClassPeriodCreatePage';
import ClassPeriodUpdatePage from '../pages/admin/class-period/ClassPeriodUpdatePage';

import TeacherListPage from '../pages/admin/teacher/TeacherListPage';
import TeacherDetailPage from '../pages/admin/teacher/TeacherDetailPage';
import TeacherCreatePage from '../pages/admin/teacher/TeacherCreatePage';
import TeacherUpdatePage from '../pages/admin/teacher/TeacherUpdatePage';

import ClassListPage from '../pages/admin/class/ClassListPage';
import ClassDetailPage from '../pages/admin/class/ClassDetailPage';
import ClassCreatePage from '../pages/admin/class/ClassCreatePage';
import ClassUpdatePage from '../pages/admin/class/ClassUpdatePage';

import SchoolUpdatePage from '../pages/admin/setting/account/SchoolUpdatePage';

import AccountSettingsPage from '../pages/admin/setting/account/AccountSettingsPage';

import AttendanceReportPage from '../pages/admin/report/attendance/AttendanceReportPage';
import AttendanceViewPage from '../pages/admin/report/attendance/AttendanceViewPage';
import AttendanceListPage from '../pages/admin/report/attendance/AttendanceListPage';

import UserUpdatePage from '../pages/admin/setting/account/UserUpdatePage';

// Teacher site
import MarkAttendanceClass from '../pages/teacherSite/schedule/MarkAttendanceClass';
import TeacherScheduleClassPage from '../pages/teacherSite/schedule/TeacherScheduleClassPage';
import TeacherAccountProfilePage from '../pages/teacherSite/settings/TeacherAccountProfilePage';

// Layout
import Layout from '../components/layout/Layout';
import ProtectedRoutes from './ProtectedRoutes';
import TeacherDashboardPage from '../pages/teacherSite/dashboard/TeacherDashboardPage';
// Routes configuration
const routesConfig = [
  {
    path: '/',
    element: <ProtectedRoutes />,
  },
  {
    path: '/auth',
    element: <Layout />,
    children: [
      {
        path: 'signin',
        element: <SigninPage />,
      },
      {
        path: 'signup',
        element: <SignupPage />,
      },
      {
        path: 'verify-email/:verificationToken',
        element: <VerifyEmailPage />,
      },
      {
        path: 'verify-teacher-email/:verificationToken',
        element: <VerifyTeacherEmailPage />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPasswordPage />,
      },
      {
        path: 'verify-reset-password/:token',
        element: <VerifySuccessfullyPage />,
      },
      {
        path: 'reset-password/:token',
        element: <ResetNewPasswordPage />,
      },
      {
        path: 'complete-registration/:token',
        element: <TeacherRegistrationPage />,
      },
    ],
  },
  {
    path: '/payment',
    children: [
      {
        path: '',
        element: <SubscriptionPlansPage />,
      },
      {
        path: 'success',
        element: <PaymentSuccessPage />,
      },
      {
        path: 'cancel',
        element: <PaymentCancelPage />,
      },
      {
        path: 'payment-required',
        element: <PaymentRequiredPage />,
      },
    ],
  },
  {
    path: 'teacher',
    element: <ProtectedRoutes teacherSite></ProtectedRoutes>,
    children: [
      {
        path: 'dashboard',
        children: [
          {
            path: '',
            element: <TeacherDashboardPage />,
          },
        ],
      },
      {
        path: 'schedule',
        children: [
          {
            path: '',
            element: <TeacherScheduleClassPage />,
          },
          {
            path: ':id',
            element: <MarkAttendanceClass />,
          }
        ],
      },
      {
        path: 'settings',
        children: [
          {
            path: 'account',
            element: <TeacherAccountProfilePage />,
          },
        ],
      },
    ],
  },
  {
    path: 'admin',
    showSidebar: true,
    element: <ProtectedRoutes adminSite />,
    children: [
      {
        path: 'dashboard',
        element: <AdminDashboardPage />,
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
          {
            path: 'invitation',
            element: <TeacherInvitationPage />,
          },
        ],
      },
      {
        path: 'classes',
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
        path: 'settings',
        children: [
          {
            path: 'account',
            children: [
              {
                path: '',
                element: <AccountSettingsPage />,
              },
              // {
              //   path: 'change-password',
              //   element: <ChangePasswordForm />,
              // },
              {
                path: 'update-me',
                element: <UserUpdatePage />,
              },
              {
                path: 'update-school',
                element: <SchoolUpdatePage />,
              },
            ],
          },
        ],
      },
      {
        path: 'reports',
        children: [
          {
            path: 'attendance',
            children: [
              {
                path: '',
                element: <AttendanceListPage />,
              },
              {
                path: ':id',
                element: <AttendanceViewPage />,
              },
              {
                path: 'reports',
                element: <AttendanceReportPage />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/unauthorized',
    element: <UnauthorizedPage />,
  },
];

export default routesConfig;

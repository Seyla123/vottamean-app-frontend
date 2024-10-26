// auth
import SignupPage from '../pages/auth/SignupPage';
import SigninPage from '../pages/auth/SigninPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import ResetNewPasswordPage from '../pages/auth/ResetNewPasswordPage';
import VerifyEmailPage from '../pages/auth/VerifyEmailPage';
import VerifyTeacherEmailPage from '../pages/auth/VerifyTeacherEmailPage';

// Payment
import PaymentSuccessPage from '../pages/payment/PaymentSuccessPage';
import PaymentFailurePage from '../pages/payment/PaymentFailurePage';
import SubscriptionPlansPage from '../pages/payment/SubscriptionPlansPage';

import UnauthorizedPage from '../pages/UnauthorizedPage';
import NotFoundPage from '../pages/NotFoundPage';
// admin
import AdminHomePage from '../pages/admin/home/HomePage';

import SessionListPage from '../pages/admin/session/SessionListPage';
import SessionDetailPage from '../pages/admin/session/SessionDetailPage';
import SessionCreatePage from '../pages/admin/session/SessionCreatePage';
import SessionUpdatePage from '../pages/admin/session/SessionUpdatePage';

import StudentListPage from '../pages/admin/student/StudentListPage';
import StudentDetailPage from '../pages/admin/student/StudentDetailPage';
import StudentCreatePage from '../pages/admin/student/StudentCreatePage';

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

import ClassListPage from '../pages/admin/class/ClassListPage';
import ClassCreatePage from '../pages/admin/class/ClassCreatePage';
import ClassUpdatePage from '../pages/admin/class/ClassUpdatePage';

import AccountSettingsPage from '../pages/admin/setting/account/AccountSettingsPage';

import AttendanceReportPage from '../pages/admin/report/attendance/AttendanceReportPage';
import AttendanceViewPage from '../pages/admin/report/attendance/AttendanceViewPage';
import AttendanceListPage from '../pages/admin/report/attendance/AttendanceListPage';

// Teacher site
import MarkAttendanceClass from '../pages/teacherSite/schedule/MarkAttendanceClass';
import TeacherScheduleClassPage from '../pages/teacherSite/schedule/TeacherScheduleClassPage';
import TeacherAccountProfilePage from '../pages/teacherSite/settings/TeacherAccountProfilePage';

// Layout
import Layout from '../components/layout/Layout';
import ProtectedRoutes from './ProtectedRoutes';
import TeacherHomePage from '../pages/teacherSite/home/TeacherHomePage';
import PageTitle from './PageTitle';
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
        element: <>
          <PageTitle title={'Sign In'} />
          <SigninPage />
        </>,
      },
      {
        path: 'signup',
        element: <>
          <PageTitle title={'Sing Up'} />
          <SignupPage />
        </>,
      },
      {
        path: 'verify-email/:verificationToken',
        element: <>
          <PageTitle title={'Verify Email'} />
          <VerifyEmailPage />,
        </>
      },
      {
        path: 'verify-teacher-email/:verificationToken',
        element: <>
          <PageTitle title={'Verify Email'} />
          <VerifyTeacherEmailPage />
        </>
      },
      {
        path: 'forgot-password',
        element: <>
          <PageTitle title={'Forgot Password'} />
          <ForgotPasswordPage />
        </>
      },
      {
        path: 'reset-password/:token',
        element: <>
          <PageTitle title={'Reset Password'} />
          <ResetNewPasswordPage />
        </>
      }
    ],
  },
  {
    path: 'teacher',
    element: <ProtectedRoutes teacherSite />,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            element: <>
              <PageTitle title={'Home'} />
              <TeacherHomePage />
            </>,
          },
        ],
      },
      {
        path: 'schedule',
        title: 'Schedule',
        children: [
          {
            path: '',
            element: <>
              <PageTitle title={'Teacher Schedule'} />
              <TeacherScheduleClassPage />
            </>,
          },
          {
            path: ':id',
            element:
              <>
                <PageTitle title={'Mark Attendance'} />
                <MarkAttendanceClass />
              </>,
          },
        ],
      },
      {
        path: 'settings',
        children: [
          {
            path: 'account',
            element:
              <>
                <PageTitle title={'Account Settings'} />
                <TeacherAccountProfilePage />
              </>,
          },
        ],
      },
    ],
  },
  {
    path: 'admin',
    element: <ProtectedRoutes adminSite />,
    children: [
      {
        path: 'home',
        element: <>
          <PageTitle title={'Home'} />
          <AdminHomePage />
        </>,
        children: [],
      },
      {
        path: 'sessions',
        children: [
          {
            path: '',
            element: <>
              <PageTitle title={'Sessions'} />
              <SessionListPage />
            </>,
          },
          {
            path: ':id',
            element: <>
              <PageTitle title={'Sessions'} />
              <SessionDetailPage />
            </>,
          },
          {
            path: 'create',
            element: <>
              <PageTitle title={'Sessions'} />
              <SessionCreatePage />
            </>,
          },
          {
            path: 'update/:id',
            element: <>
              <PageTitle title={'Sessions'} />
              <SessionUpdatePage />
            </>,
          },
        ],
      },
      {
        path: 'students',
        title: 'Students',
        children: [
          {
            path: '',
            element: <>
              <PageTitle title={'Students'} />
              <StudentListPage />
            </>,
          },
          {
            path: ':id',
            element: <>
              <PageTitle title={'Students'} />
              <StudentDetailPage />
            </>,
          },
          {
            path: 'create',
            element: <>
              <PageTitle title={'Students'} />
              <StudentCreatePage />
            </>,
          },
        ],
      },
      {
        path: 'payment',
        noLayout: true,
        children: [
          {
            path: '',
            element: <>
              <PageTitle title={'Subscription Plans'} />
              <SubscriptionPlansPage />
            </>,
          },
          {
            path: 'success',
            element: <>
              <PageTitle title={'Payment Success'} />
              <PaymentSuccessPage />
            </>,
          },
          {
            path: 'failure',
            element: <>
              <PageTitle title={'Payment Failure'} />
              <PaymentFailurePage />
            </>,
          }
        ],
      },
      {
        path: 'subjects',
        element: <>
          <PageTitle title={'Subjects'} />
          <SubjectListPage />
        </>,
        children: [
          {
            path: ':id',
            element: <>
              <PageTitle title={'Subjects'} />
              <SubjectDetailPage />
            </>,
          },
          {
            path: 'create',
            element: <>
              <PageTitle title={'Subjects'} />
              <SubjectCreatePage />
            </>,
          },
          {
            path: 'update/:id',
            element: <>
              <PageTitle title={'Subjects'} />
              <SubjectUpdatePage />
            </>,
          },
        ],
      },
      {
        path: 'class-periods',
        children: [
          {
            path: '',
            element: <>
              <PageTitle title={'Class Periods'} />
              <ClassPeriodListPage />
            </>,
          },
          {
            path: ':id',
            element: <>
              <PageTitle title={'Class Periods'} />
              <ClassPeriodDetailPage />
            </>,
          },
          {
            path: 'create',
            element: <>
              <PageTitle title={'Class Periods'} />
              <ClassPeriodCreatePage />
            </>,
          },
          {
            path: 'update/:id',
            element: <>
              <PageTitle title={'Class Periods'} />
              <ClassPeriodUpdatePage />
            </>,
          },
        ],
      },
      {
        path: 'teachers',
        children: [
          {
            path: '',
            element: <>
              <PageTitle title={'Teachers'} />
              <TeacherListPage />
            </>,
          },
          {
            path: ':id',
            element: <>
              <PageTitle title={'Teachers'} />
              <TeacherDetailPage />
            </>,
          },
          {
            path: 'create',
            element: <>
              <PageTitle title={'Teachers'} />
              <TeacherCreatePage />
            </>,
          },
        ],
      },
      {
        path: 'classes',
        children: [
          {
            path: '',
            element: <>
              <PageTitle title={'Classes'} />
              <ClassListPage />
            </>,
          },
          {
            path: 'create',
            element: <>
              <PageTitle title={'Classes'} />
              <ClassCreatePage />
            </>,
          },
          {
            path: 'update/:id',
            element: <>
              <PageTitle title={'Classes'} />
              <ClassUpdatePage />
            </>,
          },
        ],
      },
      {
        path: 'attendance',
        title: 'Attendance',
        children: [
          {
            path: '',
            element: <>
              <PageTitle title={'Attendance'} />
              <AttendanceListPage />
            </>,
          },
          {
            path: ':id',
            element: <>
              <PageTitle title={'Attendance'} />
              <AttendanceViewPage />
            </>,
          },
        ],
      },
      {
        path: 'reports',
        title: 'Reports',
        children: [
          {
            path: 'attendance',
            element: <>
              <PageTitle title={'Attendance Reports'} />
              <AttendanceReportPage />
            </>,
          },
        ],
      },
      {
        path: 'settings',
        title: 'Settings',
        children: [
          {
            path: 'account',
            element: <>
              <PageTitle title={'Account'} />
              <AccountSettingsPage />
            </>,
          },
        ],
      },
    ],
  },
  {
    path: '/unauthorized',
    element: <>
      <PageTitle title={'Unauthorized Access'} />
      <UnauthorizedPage />
    </>,
  },
  {
    path: '*',
    element: <>
      <PageTitle title={'404 Page Not Found'} />
      <NotFoundPage />
    </>,
  },
];

export default routesConfig;

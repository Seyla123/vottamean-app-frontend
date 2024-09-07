import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './routes/ProtectedRoutes';
import { CssBaseline } from '@mui/material';
// Authentication Pages
const LoginPage = lazy(() => import('./pages/auth/login/LoginPage'));
const SignupPage = lazy(() => import('./pages/auth/signup/SignupPage'));
const PasswordForgotPage = lazy(() => import('./pages/auth/PasswordForgotPage'));
const PasswordResetPage = lazy(() => import('./pages/auth/PasswordResetPage'));
const PasswordChangePage = lazy(() => import('./pages/auth/PasswordChangePage'));

// Protected Pages
const DashboardPage = lazy(() => import('./pages/admin/dashboard/DashboardPage'));
// Session Page
const SessionListPage = lazy(() => import('./pages/admin/session/SessionListPage'));
const SessionDetailPage = lazy(() => import('./pages/admin/session/SessionDetailPage'));
const SessionCreatePage = lazy(() => import('./pages/admin/session/SessionCreatePage'));
const SessionUpdatePage = lazy(() => import('./pages/admin/session/SessionUpdatePage'));
// Student Page
const StudentListPage = lazy(() => import('./pages/admin/student/StudentListPage'));
const StudentDetailPage = lazy(() => import('./pages/admin/student/StudentDetailPage'));
const StudentCreatePage = lazy(() => import('./pages/admin/student/StudentCreatePage'));
const StudentUpdatePage = lazy(() => import('./pages/admin/student/StudentUpdatePage'));
// Subject Page
const SubjectListPage = lazy(() => import('./pages/admin/subject/SubjectListPage'));
const SubjectDetailPage = lazy(() => import('./pages/admin/subject/SubjectDetailPage'));
const SubjectCreatePage = lazy(() => import('./pages/admin/subject/SubjectCreatePage'));
const SubjectUpdatePage = lazy(() => import('./pages/admin/subject/SubjectUpdatePage'));
// Class Period Page
const ClassPeriodCreatePage = lazy(() => import('./pages/admin/class-period/ClassPeriodCreatePage'));
const ClassPeriodDetailPage = lazy(() => import('./pages/admin/class-period/ClassPeriodDetailPage'));
const ClassPeriodListPage = lazy(() => import('./pages/admin/class-period/ClassPeriodListPage'));
const ClassPeriodUpdatePage = lazy(() => import('./pages/admin/class-period/ClassPeriodUpdatePage'));
// Teacher Page
const TeacherListPage = lazy(() => import('./pages/admin/teacher/TeacherListPage'));
const TeacherDetailPage = lazy(() => import('./pages/admin/teacher/TeacherDetailPage'));
const TeacherCreatePage = lazy(() => import('./pages/admin/teacher/TeacherCreatePage'));
const TeacherUpdatePage = lazy(() => import('./pages/admin/teacher/TeacherUpdatePage'));

// Error Page


// Class Page
const ClassListPage = lazy(() => import('./pages/admin/class/ClassListPage'));
const ClassDetailPage = lazy(() => import('./pages/admin/class/ClassDetailPage'));
const ClassCreatePage = lazy(() => import('./pages/admin/class/ClassCreatePage'));
const ClassUpdatePage = lazy(() => import('./pages/admin/class/ClassUpdatePage'));

const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const AppRoutes = () => (
  <>
  <CssBaseline />
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<PasswordForgotPage />} />
      <Route path='/reset-password' element={<PasswordResetPage />} />
      <Route path='/change-password' element={<PasswordChangePage />} />

      {/* Protected Routes */}
      {/* <Route element={<ProtectedRoutes />}> */}
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* Session Routes */}
        <Route path="/session">
          <Route path=''  element={<SessionListPage />}/>
          <Route path=":id" element={<SessionDetailPage />} /> 
          <Route path="create" element={<SessionCreatePage />} /> 
          <Route path="update/:id" element={<SessionUpdatePage />} />
        </Route>

        {/* Student Routes */}
        <Route path="/student">
          <Route path=''  element={<StudentListPage />}/>
          <Route path=":id" element={<StudentDetailPage />} /> 
          <Route path="create" element={<StudentCreatePage />} /> 
          <Route path="update/:id" element={<StudentUpdatePage />} />
        </Route>

        {/* Subject */}
        <Route path="/subject">
          <Route path=''  element={<SubjectListPage />}/>
          <Route path=":id" element={<SubjectDetailPage />} /> 
          <Route path="create" element={<SubjectCreatePage />} /> 
          <Route path="update/:id" element={<SubjectUpdatePage />} />
        </Route>

        {/* Class Period */}
        <Route path="/class-period">
          <Route path='' element={<ClassPeriodListPage/>} />
          <Route path=':id' element={<ClassPeriodDetailPage/>} />
          <Route path='create' element={<ClassPeriodCreatePage/>} />
          <Route path='update/:id' element={<ClassPeriodUpdatePage/>} />
        </Route>
        {/* Teacher Routes */}
        <Route path="/teacher">
          <Route path=''  element={<TeacherListPage />}/>
          <Route path=":id" element={<TeacherDetailPage />} /> 
          <Route path="create" element={<TeacherCreatePage />} /> 
          <Route path="update/:id" element={<TeacherUpdatePage />} />
        </Route>

         {/* Class */}
         <Route path="/class">
          <Route path=''  element={<ClassListPage />}/>
          <Route path=":id" element={<ClassDetailPage />} /> 
          <Route path="create" element={<ClassCreatePage />} /> 
          <Route path="update/:id" element={<ClassUpdatePage />} />

        </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Suspense>
  </>
);

export default AppRoutes;

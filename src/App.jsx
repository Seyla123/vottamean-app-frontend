import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './routes/ProtectedRoutes';
import { CssBaseline } from '@mui/material';
// Authentication Pages
const LoginPage = lazy(() => import('./pages/auth/login/LoginPage'));
const SignupPage = lazy(() => import('./pages/auth/signup/SignupPage'));

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

const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const AppRoutes = () => (
  <>
  <CssBaseline />
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

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
      {/* </Route> */}

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Suspense>
  </>
);

export default AppRoutes;

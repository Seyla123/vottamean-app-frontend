// src/routes/ProtectedRoutes.js
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from '../components/layout/Layout';

const ProtectedRoutes = ({ teacherSite, adminSite }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Check if the user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  // Role-based access control
  if (adminSite && user?.role !== 'admin') {
    return <Navigate to="/unauthorized" />;
  }

  if (teacherSite && user?.role !== 'teacher') {
    return <Navigate to="/unauthorized" />;
  }

  return (
    <Layout teacherSite={teacherSite} adminSite={adminSite}>
      <Outlet />
    </Layout>
  );
};

export default ProtectedRoutes;

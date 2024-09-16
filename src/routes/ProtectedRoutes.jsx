import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Layout from '../components/layout/Layout';

const ProtectedRoutes = ({ teacherSite, adminSite }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  console.log('ProtectedRoutes state:', { isAuthenticated, user });

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

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

import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { useCheckAuthQuery } from '../services/authApi';
import Layout from '../components/layout/Layout';
import LoadingPage from '../pages/LoadingPage';
const ProtectedRoutes = ({ teacherSite, adminSite }) => {
  // Fetch authentication state from Redux
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Call checkAuth query to verify session from the server
  const { isLoading } = useCheckAuthQuery();

  // If checkAuth query is still loading, we can render a loading screen
  if (isLoading) return <LoadingPage />;

  // If not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/auth/signin" />;
  }

  // redirect to the relevant dashboard
  // depending on their role
  if (window.location.pathname === '/') {
    if (user?.role === 'admin') {
      // Redirect to the admin dashboard
      return <Navigate to="/admin/home" />;
    }
    if (user?.role === 'teacher') {
      // Redirect to the teacher dashboard
      return <Navigate to="/teacher/home" />;
    } else {
      // If the user is not an admin or teacher
      return <Navigate to="/" />;
    }
  }

  // Check roles if the route is role-specific (admin or teacher)
  if (adminSite && user?.role !== 'admin') {
    return <Navigate to="/unauthorized" />;
  }
  if (teacherSite && user?.role !== 'teacher') {
    return <Navigate to="/unauthorized" />;
  }

  // Render the protected route
  return (
    <Layout teacherSite={teacherSite} adminSite={adminSite}>
      <Outlet />
    </Layout>
  );
};

export default ProtectedRoutes;

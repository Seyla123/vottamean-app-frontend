// src/routes/ProtectedRoutes.js
import {useState} from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from '../components/layout/Layout';
const ProtectedRoutes = ({teacherSite, adminSite}) => {
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
const [isAuthenticated, setIsAuthenticated] = useState(false);
  return isAuthenticated ? <Layout teacherSite={teacherSite} adminSite={adminSite}><Outlet/></Layout> : <Navigate to="/auth/login" />;
};

export default ProtectedRoutes;

import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

import { useLogoutMutation } from '../../services/authApi';
import { useCheckAuthQuery } from '../../services/authApi';
import { logout as logoutAction } from '../../store/slices/authSlice';

import { teacherSiteNavigation, navigation } from '../../data/navigation';
import Logo from '../../assets/images/new-logo-name.svg';
import { Box, Container } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import SnackbarComponent from '../common/SnackbarComponent';
import blankProfile from '../../assets/images/blank-profile-image.webp';

// User Profile Data formatting
import { getUserProfileDataLayout } from '../../utils/formatData';

const Layout = ({ teacherSite, adminSite }) => {
  const [userData, setUserData] = useState({
    username: 'Username',
    email: 'Useremail001@gmail.com',
    photo: '',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if ( user) {
      const userAuth = {
        data: user
      }
      const transformedData = getUserProfileDataLayout(userAuth);
      setUserData(transformedData);
    }
  }, [user]);


  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(logoutAction());
      window.location.href = '/auth/signin';
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const theme = createTheme({
    cssVariables: {
      colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    palette: {
      primary: {
        main: '#6c63ff',
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 1200,
        lg: 1200,
        xl: 1536,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: '#F5F5F5',
          },
        },
      },
    },
  });

  const router = useMemo(() => {
    return {
      pathname: location.pathname,
      searchParams: new URLSearchParams(location.search),
      navigate: (path) => navigate(path),
    };
  }, [location, navigate]);

  return (
    <AppProvider
      branding={{
        title: '',
        logo: (
          <img
            src={Logo}
            alt="LogoVottamean"
            style={{
              width: '150px',
              height: '100%',
            }}
          />
        ),
      }}
      navigation={teacherSite ? teacherSiteNavigation : navigation}
      router={router}
      theme={theme}
      session={{
        user: {
          name: userData.username,
          email: userData.email,
          image: userData.photo || blankProfile,
        },
      }}
      authentication={{
        signIn: () => { },
        signOut: handleLogout,
      }}
    >
      {teacherSite || adminSite ? (
        <Box>
          <DashboardLayout>
            <Container maxWidth="xl" sx={{ paddingBottom: 10 }}>
              <Outlet />
            </Container>
          </DashboardLayout>
        </Box>
      ) : (
        <Outlet />
      )}
      <SnackbarComponent />
    </AppProvider>
  );
};

export default Layout;

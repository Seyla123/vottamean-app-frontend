import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

import { useLogoutMutation } from '../../services/authApi';
import { useGetUserProfileQuery } from '../../services/userApi';
import { logout as logoutAction } from '../../store/slices/authSlice';

import { teacherSiteNavigation, navigation } from '../../data/navigation';
import Logo from '../../assets/images/Logo.svg';
import { Box, Container } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import SnackbarComponent from '../common/SnackbarComponent';

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

  const { data: userDataProfile, isSuccess, error } = useGetUserProfileQuery();
  console.log('User Data in the Layout :', userDataProfile);

  useEffect(() => {
    if (isSuccess && userDataProfile) {
      const transformedData = getUserProfileDataLayout(userDataProfile);
      console.log('Transformed Data in the Layout :', transformedData);
      setUserData(transformedData);
    }
  }, [isSuccess, userDataProfile]);

  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(logoutAction());
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
            backgroundColor: '#F5F5F7',
          },
        },
      },
    },
  });

  const getAvatarUrl = useMemo(() => {
    const getAvatarStyle = (gender) => {
      switch (gender?.toLowerCase()) {
        case 'male':
          return 'avataaars';
        case 'female':
          return 'lorelei';
        default:
          return 'bottts';
      }
    };

    const avatarStyle = getAvatarStyle(userData.gender);
    const randomParam = Math.random().toString(36).substring(7);
    return `https://api.dicebear.com/6.x/${avatarStyle}/svg?seed=${encodeURIComponent(userData.username)}&r=${randomParam}`;
  }, [userData.username, userData.gender]);

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
            alt="WaveTrack"
            style={{
              width: '150px',
              height: '100%',
              objectFit: 'contain',
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
          image: userData.photo || getAvatarUrl,
        },
      }}
      authentication={{
        signIn: () => {},
        signOut: handleLogout,
      }}
    >
      {teacherSite || adminSite ? (
        <Box paddingTop={2}>
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

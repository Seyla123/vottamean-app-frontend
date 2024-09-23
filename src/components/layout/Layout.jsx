import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

import { useLogoutMutation } from '../../services/authApi';
import { logout as logoutAction } from '../../store/slices/authSlice';

import { teacherSiteNavigation, navigation } from '../../data/navigation';
import Logo from '../../assets/images/Logo.svg';

import { Box, Container } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import userProfile from '../../assets/images/user.png';

const Layout = ({ teacherSite, adminSite }) => {
  // 1. Initialize navigation and location hooks for routing
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // 2. Fetch the current user from the Redux store to get user details
  const { user } = useSelector((state) => state.auth);

  // 3. Initialize the logout mutation using the custom API hook
  const [logout] = useLogoutMutation();

  // 4. Define the function to handle the logout process
  const handleLogout = async () => {
    try {
      // 4.1. Call the API to log the user out and unwrap the response to handle success or errors
      await logout().unwrap();

      // 4.2. Dispatch a logout action to clear the authentication state in Redux
      dispatch(logoutAction());

      // 4.3. Navigate the user back to the login page after successful logout
      navigate('/auth/login');
    } catch (error) {
      // Handle potential errors during logout
      console.error('Failed to logout:', error);
    }
  };

  // 5. Set up the Material UI theme for responsive design and custom breakpoints

  const theme = createTheme({
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

  // 6. Use React's useMemo to memoize the router details, optimizing performance by preventing unnecessary recalculations
  const router = React.useMemo(() => {
    return {
      pathname: location.pathname,
      searchParams: new URLSearchParams(location.search),
      navigate: (path) => navigate(path),
    };
  }, [location, navigate]);

  // 7. Render the AppProvider component, which provides context for layout, navigation, authentication, and theming
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
      // 8. Set navigation based on the site type (teacher/admin) using conditional logic
      navigation={teacherSite ? teacherSiteNavigation : navigation}
      // 9. Pass router details for navigation functionality
      router={router}
      // 10. Apply the customized theme
      theme={theme}
      // 11. Set the session object, which includes current user details like name, email, and image
      session={{
        user: {
          name:
            user?.adminProfile?.Info?.first_name +
              ' ' +
              user?.adminProfile?.Info?.last_name || 'Username',
          email: user?.email || 'Useremail001@gmail.com',
          image: user?.image || userProfile,
        },
      }}
      // 12. Provide authentication methods: signIn (placeholder) and signOut (real logout functionality)
      authentication={{
        signIn: () => {},
        signOut: handleLogout,
      }}
    >
      {teacherSite || adminSite ? (
        // 13. Conditional rendering of the dashboard layout for teacher or admin sites

        <Box paddingTop={2}>
          <DashboardLayout>
            <Container maxWidth="xl">
              <Outlet />
            </Container>
          </DashboardLayout>
        </Box>
      ) : (
        // 14. Render the Outlet for any other routes or layouts
        <Outlet />
      )}
    </AppProvider>
  );
};

export default Layout;

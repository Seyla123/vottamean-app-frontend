import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { AppProvider } from '@toolpad/core/AppProvider';
import Logo from '../../assets/images/Logo.png';
import { extendTheme } from '@mui/material';

import { Box } from '@mui/system';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { Container } from '@mui/material';
import { teacherSiteNavigation, navigation } from '../../data/navigation';

const Layout = ({ teacherSite, adminSite }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [session, setSession] = React.useState({
        user: {
            name: 'Selena',
            email: 'selena@gmail.com',
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
    });

    const theme = extendTheme({
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 1200,
                lg: 1200,
                xl: 1536,
            },
        },
    });

    const authentication = React.useMemo(() => {
        return {
            signIn: () => {
                setSession({
                    user: {
                        name: 'Selena',
                        email: 'selena@gmail.com',
                        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    },
                });
            },
            signOut: () => {
                setSession(null);
            },
        };
    }, []);

    const router = React.useMemo(() => {
        return {
            pathname: location.pathname,
            searchParams: new URLSearchParams(location.search),
            navigate: path => navigate(path),
        };
    }, [location, navigate]);
    return (
        <AppProvider
            branding={{
                title: '',
                logo: (
                    <img
                        src={Logo}
                        alt='WaveTrack'
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
            session={session}
            authentication={authentication}
        >
            {/* Render the component to show different sidebar layout in teacher and admin site */}
            {teacherSite || adminSite ? (
                <Box paddingTop={2}>
                    {/* Render other components or nothing based on your requirements */}
                    <DashboardLayout>
                        <Container maxWidth='xl'>
                            <Outlet />
                        </Container>
                    </DashboardLayout>
                </Box>
            ) : (
                <Outlet />
            )}
        </AppProvider>
    );
};

export default Layout;

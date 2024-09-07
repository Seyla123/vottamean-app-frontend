import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline, CircularProgress } from '@mui/material';
import Layout from './components/layout/Layout';
import routesConfig from './routes/routesConfig';

const renderRoutes = (routes) => (
    routes.map(({ path, element, children }) => (
        <Route
            key={path}
            path={path}
            element={element}
        >
            {children && renderRoutes(children)}
        </Route>
    ))
);

const App = () => {
    return (
        <>
            <CssBaseline />
            <Layout>
                <Suspense fallback={<CircularProgress />}>
                    <Routes>
                        {renderRoutes(routesConfig)}
                    </Routes>
                </Suspense>
            </Layout>
        </>
    );
};

export default App;

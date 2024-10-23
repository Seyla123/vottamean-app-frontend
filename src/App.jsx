import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import { CssBaseline, CircularProgress } from '@mui/material';
import routesConfig from './routes/routesConfig';
const LoadingPage = lazy(() => import('./pages/LoadingPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const renderRoutes = (routes) =>
  routes.map(({ path, element, children }) => (
    <Route
      key={path}
      path={path}
      element={element}
    >
      {children && renderRoutes(children)}
    </Route>
  ));

const App = () => {
  return (
    <>
      <CssBaseline />
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          {renderRoutes(routesConfig)}
          {/* Add a catch-all route at the end */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;

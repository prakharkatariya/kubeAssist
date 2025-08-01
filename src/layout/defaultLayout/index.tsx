import React from 'react';
import { Route, Routes } from 'react-router-dom';

import ProtectedRoute from '@guards/ProtectedRoute';
import PageNotFound from '@pages/not-found';
import routes from './routes';

function LoadingScreen() {
  return <div>Loading...</div>;
}

function DefaultLayout() {
  return (
    <>
      <Routes>
        {routes.map(
          (route, idx) =>
            route.element && (
              <Route
                key={idx}
                path={route.path}
                element={
                  <ProtectedRoute roles={route.roles}>
                    <React.Suspense fallback={<LoadingScreen />}>
                      <route.element />
                    </React.Suspense>
                  </ProtectedRoute>
                }
              />
            )
        )}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default DefaultLayout;

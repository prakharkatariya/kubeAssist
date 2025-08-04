import React from 'react';
import { RouteItem } from '@/types/nav';

const Login = React.lazy(() => import('@pages/auth/Login'));
const Dashboard = React.lazy(() => import('@/pages/dashboard'));

const routes: RouteItem[] = [
  {
    path: '/login',
    element: Login,
    roles: ['admin', 'user'],
  },
  {
    path: '/dashboard',
    element: Dashboard,
    roles: ['admin', 'user'],
  },
];

export default routes;

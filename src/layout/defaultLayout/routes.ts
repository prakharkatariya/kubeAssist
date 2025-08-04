import React from 'react';
import { RouteItem } from '@/types/nav';

const Dashboard = React.lazy(() => import('@/pages/dashboard'));
const Chat = React.lazy(() => import('@/pages/chat'));

const routes: RouteItem[] = [
  {
    path: '/dashboard',
    element: Dashboard,
    roles: ['admin', 'user'],
  },
  {
    path: '/chat',
    element: Chat,
    roles: ['admin', 'user'],
  },
  {
    path: '/',
    element: Dashboard,
    roles: ['admin', 'user'],
  },
];

export default routes;

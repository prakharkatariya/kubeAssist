export interface RouteConfig {
  path: string;
  component: string;
  requiredRoles?: string[];
  isProtected: boolean;
  title?: string;
}

export const routes: RouteConfig[] = [
  // Public routes
  {
    path: '/signin',
    component: 'SignIn',
    isProtected: false,
    title: 'Sign In'
  },
  
  // Protected routes
  {
    path: '/dashboard',
    component: 'Dashboard',
    isProtected: true,
    requiredRoles: ['user', 'admin'],
    title: 'Dashboard'
  },
  {
    path: '/profile',
    component: 'Profile',
    isProtected: true,
    requiredRoles: ['user', 'admin'],
    title: 'Profile'
  },
  {
    path: '/admin',
    component: 'Admin',
    isProtected: true,
    requiredRoles: ['admin'],
    title: 'Admin Panel'
  },
  {
    path: '/users',
    component: 'Users',
    isProtected: true,
    requiredRoles: ['admin'],
    title: 'User Management'
  },
  {
    path: '/settings',
    component: 'Settings',
    isProtected: true,
    requiredRoles: ['user', 'admin'],
    title: 'Settings'
  }
];

export const getRouteByPath = (path: string): RouteConfig | undefined => {
  return routes.find(route => route.path === path);
};

export const getProtectedRoutes = (): RouteConfig[] => {
  return routes.filter(route => route.isProtected);
};

export const getPublicRoutes = (): RouteConfig[] => {
  return routes.filter(route => !route.isProtected);
};

export const getRoutesByRole = (role: string): RouteConfig[] => {
  return routes.filter(route => 
    !route.isProtected || 
    !route.requiredRoles || 
    route.requiredRoles.includes(role)
  );
};
import { LazyExoticComponent, ComponentType } from 'react';

export interface NavItem {
  title: string;
  url: string;
  icon: JSX.Element;
  env: string[];
}
export interface RouteItem {
  path: string;
  element: LazyExoticComponent<ComponentType<any>>;
  roles: string[];
  exact?: boolean;
}

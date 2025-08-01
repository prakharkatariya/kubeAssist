// import { Navigate } from 'react-router-dom';

// import { useAuth } from '@/hooks/useAuth';

interface Props {
  children: JSX.Element;
  roles: any;
}

function ProtectedRoute({ children, roles }: Props) {
  // const { userInfo } = useAuth();

  // if (!userInfo) {
  //   return <Navigate to="/login" />;
  // }

  // if(!roles.includes(userInfo?.role)) {
  //   return <Redirect to='/unauthorized'/>
  // }
  localStorage.setItem('lastLoginPath', window.location.pathname);

  return children;
}

export default ProtectedRoute;

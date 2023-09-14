// import { useAuth } from 'utils/hooks/useAuth';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  // const { isLoggedIn } = useAuth();
  const isConnected = true;
  return isConnected ? Component : <Navigate to={redirectTo} />;
};

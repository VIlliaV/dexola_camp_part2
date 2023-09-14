// import { useAuth } from 'utils/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { useGlobalContext } from './Context/Context';

export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  // const { isLoggedIn } = useAuth();
  const { isConnected } = useGlobalContext();
  return isConnected ? Component : <Navigate to={redirectTo} />;
};

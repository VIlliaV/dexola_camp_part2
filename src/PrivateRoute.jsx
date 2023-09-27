import { Navigate } from 'react-router-dom';
import { useAccount } from 'wagmi';

export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  const { isConnected = false } = useAccount();

  return isConnected ? Component : <Navigate to={redirectTo} />;
};

// import { useAuth } from 'utils/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import {
  useAccount,
  // , useDisconnect, useEnsAvatar, useEnsName  useConnect,
} from 'wagmi';

export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  const {
    // address, connector,
    isConnected = false,
  } = useAccount();

  return isConnected ? Component : <Navigate to={redirectTo} />;
};

// import { useAuth } from 'utils/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import {
  useAccount,
  // , useConnect, useDisconnect, useEnsAvatar, useEnsName
} from 'wagmi';
// import { useGlobalContext } from './Context/Context';

export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  const {
    // address, connector,
    isConnected,
  } = useAccount();
  // const { isLoggedIn } = useAuth();
  // const { isConnected } = useGlobalContext();
  return isConnected ? Component : <Navigate to={redirectTo} />;
};

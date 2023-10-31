import { Navigate } from 'react-router-dom';
import { useWalletInfo } from './utils/hooks/ContractHooks/useWalletInfo';

export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  const { isConnected } = useWalletInfo({});

  return isConnected ? Component : <Navigate to={redirectTo} />;
};

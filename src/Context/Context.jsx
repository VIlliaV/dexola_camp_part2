import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GlobalContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => useContext(GlobalContext);

export const Context = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();

  const connectMask = () => {
    setIsConnected(true);
    navigate('/');
  };

  return <GlobalContext.Provider value={{ isConnected, connectMask }}>{children}</GlobalContext.Provider>;
};

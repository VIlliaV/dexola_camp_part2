import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { configureChains, mainnet, createConfig } from '@wagmi/core';
import { publicProvider } from '@wagmi/core/providers/public';
// import { MetaMaskConnector } from '@wagmi/core/connectors/metaMask';
import { MetaMaskSDK } from '@metamask/sdk';
import { connect } from '@wagmi/core';

const GlobalContext = createContext();
const { chains, publicClient, webSocketPublicClient } = configureChains([mainnet], [publicProvider()]);
const connector = new MetaMaskSDK();

const config = createConfig({
  chains,
  publicClient,
  webSocketPublicClient,
});

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => useContext(GlobalContext);

export const Context = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();

  const connectWallet = async () => {
    await connect({
      connector: connector,
    });

    setIsConnected(true);
    navigate('/');
  };

  return <GlobalContext.Provider value={{ isConnected, connectWallet }}>{children}</GlobalContext.Provider>;
};

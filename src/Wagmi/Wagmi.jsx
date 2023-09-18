// import { createContext, useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { WagmiConfig, createConfig, mainnet, configureChains } from 'wagmi';

import { publicProvider } from '@wagmi/core/providers/public';
// import { MetaMaskConnector } from '@wagmi/core/connectors/metaMask';
import { MetaMaskSDK } from '@metamask/sdk';
// import { connect } from '@wagmi/core';

// const GlobalContext = createContext();
const { chains, publicClient, webSocketPublicClient } = configureChains([mainnet], [publicProvider()]);
const connector = new MetaMaskSDK();
console.log('🚀 ~ connector:', connector);

const config = createConfig({
  chains,
  publicClient,
  webSocketPublicClient,
  // connector,
});

// eslint-disable-next-line react-refresh/only-export-components
// export const useGlobalContext = () => useContext(GlobalContext);

export const Wagmi = ({ children }) => {
  // const [isConnected, setIsConnected] = useState(false);
  // const navigate = useNavigate();

  // const connectWallet = async () => {
  //   await connect({
  //     connector: connector,
  //   });

  // setIsConnected(true);
  // navigate('/');
  // };

  return <WagmiConfig config={config}>{children}</WagmiConfig>;
};

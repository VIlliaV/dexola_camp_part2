// import { createWeb3Modal } from '@web3modal/wagmi/react';
// import { WagmiConfig } from 'wagmi';
// import { wagmiConfig } from './wagmiConfig';

// const { VITE_PROJECT_ID } = import.meta.env;
// const projectId = VITE_PROJECT_ID;

// createWeb3Modal({ wagmiConfig, projectId });

// export const Wagmi = ({ children }) => {
//   return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
// };

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
import { WagmiConfig } from 'wagmi';
import { arbitrum, sepolia, mainnet } from 'wagmi/chains';

const { VITE_PROJECT_ID } = import.meta.env;
const projectId = VITE_PROJECT_ID;
const chains = [mainnet, arbitrum, sepolia];

const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  appName: 'Web3Modal',
  // publicClient,
  // webSocketPublicClient,
});

createWeb3Modal({ wagmiConfig, projectId, chains });

export const Wagmi = ({ children }) => {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
};
